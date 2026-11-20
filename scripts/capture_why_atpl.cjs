const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const artifactDir = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\d28d0593-d5f1-440b-a60c-47f1221f7e20';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const chrome = spawn(chromePath, [
  '--remote-debugging-port=9223',
  '--headless=new',
  '--window-size=1440,960',
  '--user-data-dir=' + os.tmpdir() + '/chrome_why_atpl_' + Date.now(),
  'http://localhost:5180/why-atpl'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9223/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const tabs = JSON.parse(data);
        const targetTab = tabs.find(t => t.url.includes('localhost:5180')) || tabs[0];
        if (!targetTab) {
          console.error('No tab found');
          chrome.kill();
          process.exit(1);
        }

        const ws = new WebSocket(targetTab.webSocketDebuggerUrl);

        ws.onopen = async () => {
          let msgId = 1;

          // Wait 3.5 seconds for video and animations to render
          await new Promise(r => setTimeout(r, 3500));

          const takeShot = (filename) => new Promise((resolve) => {
            const id = ++msgId;
            const handler = (evt) => {
              const resp = JSON.parse(evt.data);
              if (resp.id === id) {
                ws.removeEventListener('message', handler);
                const b64 = resp.result.data;
                const outPath = path.join(artifactDir, filename);
                fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
                console.log('Saved screenshot to:', outPath);
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

          await takeShot('why_atpl_robot_verified.png');

          ws.close();
          chrome.kill();
          process.exit(0);
        };
      } catch (err) {
        console.error('Error connecting to Chrome:', err);
        chrome.kill();
        process.exit(1);
      }
    });
  }).on('error', (err) => {
    console.error('HTTP GET failed:', err);
    chrome.kill();
    process.exit(1);
  });
}, 3000);
