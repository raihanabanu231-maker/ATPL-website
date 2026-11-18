
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
  '--window-size=1280,1000',
  '--user-data-dir=' + os.tmpdir() + '/chrome_capture_scroll_' + Date.now(),
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
        let msgId = 1;

        // Scroll to the hardware cards
        ws.send(JSON.stringify({
          id: ++msgId,
          method: 'Runtime.evaluate',
          params: {
            expression: `
              document.querySelector('.container').scrollIntoView();
              window.scrollBy(0, 500);
            `
          }
        }));

        await new Promise(r => setTimeout(r, 2000));

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

        console.log('Capturing cards at t=0...');
        await takeShot('cards_rotation_0s.png');

        await new Promise(r => setTimeout(r, 2000));
        console.log('Capturing cards at t=2s...');
        await takeShot('cards_rotation_2s.png');

        ws.close();
        chrome.kill();
        process.exit(0);
      };
    });
  });
}, 3000);
