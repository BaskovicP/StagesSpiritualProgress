// Isolated real-Chrome QA: temporary profile, localhost only, no user browser.
// Run manually with `node tests/browser-smoke.cjs`; no npm packages required.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { spawn } = require('node:child_process');

const root = path.resolve(__dirname, '../dist');
const profile = fs.mkdtempSync('/private/tmp/spiritual-v4-browser-');
const screenshotDirectory = fs.mkdtempSync('/private/tmp/spiritual-v4-screenshots-');
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let browser;
let socket;
let server;

async function main() {
  try {
    await fetch('http://127.0.0.1:4173/');
  } catch {
    server = http.createServer((request, response) => {
      const relative = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
      const file = path.resolve(root, `.${relative === '/' ? '/index.html' : relative}`);
      if (!file.startsWith(`${root}${path.sep}`)) return response.writeHead(403).end();
      const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };
      response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
      fs.createReadStream(file).on('error', () => response.writeHead(404).end()).pipe(response);
    });
    await new Promise((resolve, reject) => server.listen(4173, '127.0.0.1', resolve).once('error', reject));
  }
  browser = spawn(chromePath, [
    '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-extensions',
    '--disable-background-networking', '--disable-component-update', '--disable-sync',
    '--disable-domain-reliability', '--metrics-recording-only',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1', 'about:blank'
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
  let chromeErrors = '';
  browser.stderr.on('data', (chunk) => { chromeErrors += String(chunk); });
  const portFile = path.join(profile, 'DevToolsActivePort');
  for (let attempt = 0; !fs.existsSync(portFile) && attempt < 100; attempt += 1) await pause(100);
  assert.ok(fs.existsSync(portFile), `Chrome did not start: ${chromeErrors.slice(-1500)}`);
  const port = fs.readFileSync(portFile, 'utf8').split('\n')[0];
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  socket = new WebSocket(targets.find((target) => target.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve); socket.addEventListener('error', reject); });
  let nextId = 0;
  const pending = new Map();
  const exceptions = [];
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails);
    if (!pending.has(message.id)) return;
    const { resolve, reject, timer } = pending.get(message.id);
    pending.delete(message.id);
    clearTimeout(timer);
    message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message.result);
  });
  function cdp(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++nextId;
      const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 15000);
      pending.set(id, { resolve, reject, timer });
      socket.send(JSON.stringify({ id, method, params }));
    });
  }
  async function evaluate(expression) {
    const response = await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    assert.equal(response.exceptionDetails, undefined, JSON.stringify(response.exceptionDetails));
    return response.result.value;
  }
  await cdp('Page.enable');
  await cdp('Runtime.enable');
  await cdp('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.__reflectionTools = new Map();
    Object.defineProperty(document, 'modelContext', { value: {
      registerTool(tool) { window.__reflectionTools.set(tool.name, tool); }
    }});
  ` });
  await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await cdp('Page.navigate', { url: 'http://127.0.0.1:4173/' });
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await evaluate('Boolean(window.__reflectionTools?.has("calculate_spiritual_reflection_result"))')) break;
    await pause(100);
  }
  assert.equal(await evaluate('window.spiritualAssessment.questionnaireVersion'), 4);
  await evaluate(`window.__strongAnswers = (() => {
    const answers = {};
    for (const q of window.spiritualAssessment.questionBlueprints) {
      const latest = Math.max(...Object.keys(q.requirements).map(Number));
      answers[q.id] = q.requirements[latest]?.accepted[0] ?? 0;
    }
    for (const q of window.spiritualAssessment.questionBlueprints) {
      const condition = q.exemptWhen;
      if (condition?.bidirectional && condition.accepted.includes(answers[condition.questionId])) answers[q.id] = condition.optionIndex;
    }
    return answers;
  })()`);

  for (const language of ['hr', 'en']) {
    await evaluate(`(() => { const select = document.querySelector('#language-select'); select.value = '${language}'; select.dispatchEvent(new Event('change', { bubbles: true })); })()`);
    for (const stage of [null, 1, 2, 3, 4]) {
      const result = await evaluate(`(() => {
        const answers = { ...window.__strongAnswers };
        const expectedStage = ${JSON.stringify(stage)};
        if (expectedStage === null) answers['prayer-vocal-v4'] = 0;
        if (expectedStage === 1) answers['prayer-vocal-v4'] = 1;
        if (expectedStage === 2) answers['examen-frequency-v4'] = 1;
        if (expectedStage === 3) answers['examen-frequency-v4'] = 2;
        window.__reflectionTools.get('set_spiritual_reflection_answers').execute({ answers: Object.entries(answers).map(([questionId, optionIndex]) => ({ questionId, optionIndex })) });
        const result = window.__reflectionTools.get('calculate_spiritual_reflection_result').execute({});
        return { stage: result.stage, heading: document.querySelector('#result-heading').textContent, visible: !document.querySelector('#result-view').hidden, criteria: document.querySelector('#criteria-checks').textContent };
      })()`);
      assert.equal(result.stage, stage);
      assert.equal(result.visible, true);
      assert.ok(result.heading.length > 0);
      assert.ok(result.criteria.length > 40);
    }
    for (const width of [1440, 390]) {
      await cdp('Emulation.setDeviceMetricsOverride', { width, height: 1100, deviceScaleFactor: 1, mobile: width < 600 });
      await evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
      const geometry = await evaluate(`({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, bodyWidth: document.body.scrollWidth })`);
      assert.ok(geometry.scrollWidth <= geometry.width + 1, JSON.stringify({ language, width, geometry }));
      const labels = await evaluate(`[...document.querySelectorAll('.ascent-stage')].map(node => {
        const rect = node.getBoundingClientRect(); return { top: rect.top, bottom: rect.bottom, text: node.innerText };
      }).sort((a, b) => a.top - b.top)`);
      for (let index = 1; index < labels.length; index += 1) {
        assert.ok(labels[index - 1].bottom <= labels[index].top + 1,
          JSON.stringify({ issue: 'Overlapping ascent labels', language, width, previous: labels[index - 1], next: labels[index] }));
      }
      const screenshot = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      const file = path.join(screenshotDirectory, `${language}-${width}-stage-IV.png`);
      fs.writeFileSync(file, Buffer.from(screenshot.data, 'base64'));
      console.log(`Screenshot: ${file}`);
    }
  }
  await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
  const review = await evaluate(`(() => {
    const select = document.querySelector('#language-select'); select.value = 'hr'; select.dispatchEvent(new Event('change', { bubbles: true }));
    const answers = { ...window.__strongAnswers, 'examen-frequency-v4': 2 };
    window.__reflectionTools.get('set_spiritual_reflection_answers').execute({ answers: Object.entries(answers).map(([questionId, optionIndex]) => ({ questionId, optionIndex })) });
    const result = window.__reflectionTools.get('calculate_spiritual_reflection_result').execute({});
    document.querySelector('.criteria-card').scrollIntoView({ block: 'start' });
    return { stage: result.stage, targetStage: result.targetStage };
  })()`);
  assert.equal(review.stage, 3);
  assert.equal(review.targetStage, 4);
  await evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
  const reviewScreenshot = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  const reviewFile = path.join(screenshotDirectory, 'hr-1440-stage-III-checks-for-IV.png');
  fs.writeFileSync(reviewFile, Buffer.from(reviewScreenshot.data, 'base64'));
  console.log(`Screenshot: ${reviewFile}`);
  await cdp('Emulation.setEmulatedMedia', { media: 'print' });
  const print = await evaluate(`(() => {
    const card = document.querySelector('.criteria-card');
    const items = [...card.querySelectorAll('.criterion-item')];
    return { display: getComputedStyle(card).display, height: card.getBoundingClientRect().height, text: card.textContent.length,
      items: items.length, visibleItems: items.filter(item => item.getBoundingClientRect().height > 0).length };
  })()`);
  assert.notEqual(print.display, 'none');
  assert.ok(print.height > 100 && print.text > 40);
  assert.ok(print.items > 0);
  assert.equal(print.visibleItems, print.items, JSON.stringify(print));
  assert.deepEqual(exceptions, []);
  console.log('PASS: real Chrome renders null and I–IV in both languages, narrow/desktop without overflow, criteria visible in print, no uncaught exceptions.');
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(async () => {
  if (socket && socket.readyState === WebSocket.OPEN) socket.close();
  if (browser && browser.exitCode === null) browser.kill('SIGTERM');
  if (server) await new Promise((resolve) => server.close(resolve));
  // Deliberately leave the isolated profile and screenshots in OS temporary
  // storage for diagnosis. Never remove or reuse a real user browser profile.
});
