const http = require('http');
const { spawn } = require('child_process');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--remote-debugging-port=9222',
  '--headless=new',
  '--disable-gpu',
  '--user-data-dir=' + os.tmpdir() + '/chrome_test_' + Date.now(),
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

      ws.onopen = () => {
        const evalMsg = {
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `
              (async () => {
                const videos = Array.from(document.querySelectorAll('video'));
                const results = [];
                
                // Test first 4 videos
                for (let i = 0; i < Math.min(4, videos.length); i++) {
                  const v = videos[i];
                  const canvas = document.createElement('canvas');
                  canvas.width = 100;
                  canvas.height = 100;
                  const ctx = canvas.getContext('2d');
                  
                  // Wait for readyState >= 2
                  await new Promise(r => {
                    if (v.readyState >= 2) return r();
                    v.onloadeddata = r;
                    setTimeout(r, 2000);
                  });
                  
                  // Sample 1 at t=1s
                  v.currentTime = 1.0;
                  await new Promise(r => setTimeout(r, 400));
                  ctx.drawImage(v, 0, 0, 100, 100);
                  const data1 = Array.from(ctx.getImageData(0, 0, 100, 100).data);
                  
                  // Sample 2 at t=4s
                  v.currentTime = 4.0;
                  await new Promise(r => setTimeout(r, 400));
                  ctx.drawImage(v, 0, 0, 100, 100);
                  const data2 = Array.from(ctx.getImageData(0, 0, 100, 100).data);
                  
                  // Compare
                  let diff = 0;
                  for (let j = 0; j < data1.length; j++) {
                    diff += Math.abs(data1[j] - data2[j]);
                  }
                  
                  results.push({
                    src: v.src.split('/').pop(),
                    diffPixels: diff,
                    isVisuallyChanging: diff > 1000
                  });
                }
                return results;
              })()
            `,
            awaitPromise: true,
            returnByValue: true
          }
        };
        ws.send(JSON.stringify(evalMsg));
      };

      ws.onmessage = (event) => {
        const resp = JSON.parse(event.data);
        if (resp.id === 1) {
          console.log('\nFRAME COMPARISON RESULTS:');
          console.log(JSON.stringify(resp.result?.result?.value || resp.result?.value, null, 2));
          ws.close();
          chrome.kill();
          process.exit(0);
        }
      };
    });
  });
}, 3000);

