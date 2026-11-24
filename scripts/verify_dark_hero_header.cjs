const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const artifactDir = 'C:/Users/user/.gemini/antigravity/brain/d28d0593-d5f1-440b-a60c-47f1221f7e20';

const port = 9994;
const cp = spawn(chromePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--disable-gpu',
  '--no-first-run',
  '--user-data-dir=C:/Users/user/AppData/Local/Temp/chrome_dark_hero_header'
]);

function req(endpoint) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${port}${endpoint}`, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });
}

function send(ws, method, params = {}) {
  return new Promise(resolve => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (e) => {
      const data = JSON.parse(e.data);
      if (data.id === id) { ws.removeEventListener('message', handler); resolve(data.result); }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evalJs(ws, expression) {
  const res = await send(ws, 'Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true
  });
  return res && res.result ? res.result.value : null;
}

async function captureScreenshot(ws, filename, clip = null) {
  const params = { format: 'png' };
  if (clip) params.clip = clip;
  const res = await send(ws, 'Page.captureScreenshot', params);
  const buf = Buffer.from(res.data, 'base64');
  const outPath = path.join(artifactDir, filename);
  fs.writeFileSync(outPath, buf);
  console.log(`Saved screenshot: ${outPath} (${buf.length} bytes)`);
}

async function run() {
  try {
    await new Promise(r => setTimeout(r, 1200));
    const tabs = await req('/json/list');
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    await send(ws, 'Page.enable');
    await send(ws, 'Runtime.enable');

    // 1. Desktop 1440px
    await send(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('Navigating to http://localhost:5180...');
    await send(ws, 'Page.navigate', { url: 'http://localhost:5180' });
    await new Promise(r => setTimeout(r, 3000));

    // Capture Default White Header
    await captureScreenshot(ws, 'header_white_desktop.png', {
      x: 0,
      y: 0,
      width: 1440,
      height: 380,
      scale: 1
    });

    // Hover over Hardware dropdown item using CDP Input.dispatchMouseEvent
    const hwPos = await evalJs(ws, `
      (() => {
        const btns = Array.from(document.querySelectorAll('nav[role="menubar"] button'));
        const hwBtn = btns.find(b => b.textContent.includes('Hardware'));
        if (!hwBtn) return null;
        const rect = hwBtn.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      })()
    `);

    if (hwPos) {
      console.log('Moving mouse to Hardware button at:', hwPos);
      await send(ws, 'Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: hwPos.x,
        y: hwPos.y
      });
      await new Promise(r => setTimeout(r, 800));

      // Capture MegaMenu Open State
      await captureScreenshot(ws, 'header_white_hardware_hover.png', {
        x: 0,
        y: 0,
        width: 1440,
        height: 600,
        scale: 1
      });
    }

    // Hover over Why ATPL dropdown item
    const whyPos = await evalJs(ws, `
      (() => {
        const btns = Array.from(document.querySelectorAll('nav[role="menubar"] button'));
        const whyBtn = btns.find(b => b.textContent.includes('Why ATPL'));
        if (!whyBtn) return null;
        const rect = whyBtn.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      })()
    `);

    if (whyPos) {
      console.log('Moving mouse to Why ATPL button at:', whyPos);
      await send(ws, 'Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: whyPos.x,
        y: whyPos.y
      });
      await new Promise(r => setTimeout(r, 800));

      // Capture Why ATPL MegaMenu Open State
      await captureScreenshot(ws, 'header_dark_hero_why_atpl_hover.png', {
        x: 0,
        y: 0,
        width: 1440,
        height: 600,
        scale: 1
      });
    }

    // 2. Mobile 390px (iPhone 14 width)
    await send(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 800));

    // Click Hamburger Button
    const clickedHamburger = await evalJs(ws, `
      (() => {
        const btn = document.querySelector('.mobile-toggle-btn');
        if (btn) { btn.click(); return true; }
        return false;
      })()
    `);

    if (clickedHamburger) {
      await new Promise(r => setTimeout(r, 600));
      await captureScreenshot(ws, 'header_dark_hero_mobile_drawer.png');
    }

    ws.close();
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    cp.kill();
    process.exit(0);
  }
}

run();
