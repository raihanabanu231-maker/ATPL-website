const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const artifactDir = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\d28d0593-d5f1-440b-a60c-47f1221f7e20';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const chrome = spawn(chromePath, [
  '--remote-debugging-port=9222',
  '--headless=new',
  '--window-size=1280,900',
  '--user-data-dir=' + os.tmpdir() + '/chrome_capture_' + Date.now(),
  'http://localhost:5180/#hardware'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9222/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const tabs = JSON.parse(data);
      const targetTab = tabs.find(t => t.url.includes('localhost:5180'));
      const ws = new WebSocket(targetTab.webSocketDebuggerUrl);

      ws.onopen = async () => {
        // Wait 2.5s for videos to load and start spinning
        await new Promise(r => setTimeout(r, 2500));

        let msgId = 1;
        const takeShot = (filename) => new Promise((resolve) => {
          const id = ++msgId;
          const handler = (evt) => {
            const resp = JSON.parse(evt.data);
            if (resp.id === id) {
              ws.removeEventListener('message', handler);
              const b64 = resp.result.data;
              fs.writeFileSync(path.join(artifactDir, filename), Buffer.from(b64, 'base64'));
              console.log('Saved', filename);
              resolve();
            }
          };
          ws.addEventListener('message', handler);
          ws.send(JSON.stringify({
            id,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        });

        console.log('Capturing shot 1...');
        await takeShot('turntable_frame_1.png');

        await new Promise(r => setTimeout(r, 1200));
        console.log('Capturing shot 2...');
        await takeShot('turntable_frame_2.png');

        await new Promise(r => setTimeout(r, 1200));
        console.log('Capturing shot 3...');
        await takeShot('turntable_frame_3.png');

        // Check video currentTime on page
        const evalId = ++msgId;
        const evalHandler = (evt) => {
          const resp = JSON.parse(evt.data);
          if (resp.id === evalId) {
            console.log('Page video state:', JSON.stringify(resp.result.result.value, null, 2));
            ws.close();
            chrome.kill();
            process.exit(0);
          }
        };
        ws.addEventListener('message', evalHandler);
        ws.send(JSON.stringify({
          id: evalId,
          method: 'Runtime.evaluate',
          params: {
            expression: `
              Array.from(document.querySelectorAll('video')).slice(0, 3).map(v => ({
                src: v.src.split('/').pop(),
                currentTime: v.currentTime,
                paused: v.paused,
                readyState: v.readyState
              }))
            `,
            returnByValue: true
          }
        }));
      };
    });
  });
}, 3000);

