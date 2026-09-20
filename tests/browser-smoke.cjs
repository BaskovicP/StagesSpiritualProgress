// Isolated real-Chrome QA: temporary profile, localhost only, no user browser.
// Run manually with `node tests/browser-smoke.cjs`; no npm packages required.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { spawn } = require('node:child_process');

const root = path.resolve(__dirname, '../dist');
const profile = fs.mkdtempSync('/private/tmp/spiritual-v6-browser-');
const screenshotDirectory = fs.mkdtempSync('/private/tmp/spiritual-v6-screenshots-');
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
  assert.equal(await evaluate('window.spiritualAssessment.questionnaireVersion'), 6);
  await evaluate(`document.documentElement.style.scrollBehavior = 'auto'`);
  for (const language of ['hr', 'en']) {
    await evaluate(`(() => { const select = document.querySelector('#language-select'); select.value = '${language}'; select.dispatchEvent(new Event('change', { bubbles: true })); })()`);
    assert.equal(await evaluate(`document.querySelectorAll('#stage-path button[data-stage-index]').length`), 7);
    assert.equal(await evaluate(`document.querySelector('#intro-results-button').hidden`), true);
    const contextNote = await evaluate(`(() => {
      const note=document.querySelector('.three-ways-context');
      note.querySelector('summary').click();
      const copy=window.spiritualLocales['${language}'];
      return {open:note.open,translated:note.querySelector('p').textContent===copy.threeWaysBody,
        untouched:Object.keys(JSON.parse(sessionStorage.getItem('spiritual-progress-reflection:v6')).answers).length===0};
    })()`);
    assert.deepEqual(contextNote,{open:true,translated:true,untouched:true});
    await evaluate(`document.querySelector('.three-ways-context').open=false`);
    await evaluate(`document.querySelector('#all-stages-button').click()`);
    assert.equal(await evaluate(`document.querySelectorAll('#stage-all-descriptions .all-stage-entry').length`), 7);
    assert.equal(await evaluate(`getComputedStyle(document.querySelector('#stage-dialog-navigation')).display`), 'none');
    await evaluate(`document.querySelector('#stage-dialog-close').click()`);
    await evaluate('new Promise(resolve => requestAnimationFrame(resolve))');
    assert.equal(await evaluate(`document.activeElement.id`), 'all-stages-button');
    for (let stageIndex = 0; stageIndex < 7; stageIndex += 1) {
      const dialog = await evaluate(`(() => {
        document.querySelector('[data-stage-index="${stageIndex}"]').click();
        const stage = window.spiritualLocales['${language}'].stages[${stageIndex}];
        return { open: document.querySelector('#stage-dialog').open, focused: document.activeElement.id,
          titleMatches: document.querySelector('#stage-dialog-heading').textContent.endsWith(stage.name),
          sourceMatches: stage.sourceDescription.every(item => document.querySelector('#stage-dialog-description').textContent.includes(item.text)),
          first: document.querySelector('#stage-dialog-previous').disabled, last: document.querySelector('#stage-dialog-next').disabled,
          noAnswers: Object.keys(JSON.parse(sessionStorage.getItem('spiritual-progress-reflection:v6')).answers).length === 0 };
      })()`);
      assert.equal(dialog.open, true);
      assert.equal(dialog.focused, 'stage-dialog-heading');
      assert.equal(dialog.titleMatches && dialog.sourceMatches && dialog.noAnswers, true);
      assert.equal(dialog.first, stageIndex === 0);
      assert.equal(dialog.last, stageIndex === 6);
      await evaluate(`document.querySelector('#stage-dialog-close').click()`);
    }
    for (const width of [1440, 390, 320]) {
      await cdp('Emulation.setDeviceMetricsOverride', { width, height: 1100, deviceScaleFactor: 1, mobile: width < 600 });
      await evaluate(`document.querySelector('[data-stage-index="4"]').click()`);
      const geometry = await evaluate(`(() => { const dialog = document.querySelector('#stage-dialog'); const rect = dialog.getBoundingClientRect(); return { left: rect.left, right: rect.right, width: innerWidth, clientWidth: dialog.clientWidth, scrollWidth: dialog.scrollWidth, height: rect.height }; })()`);
      assert.ok(geometry.left >= 0 && geometry.right <= width + 1 && geometry.height <= 1100, JSON.stringify(geometry));
      assert.ok(geometry.scrollWidth <= geometry.clientWidth + 1, JSON.stringify(geometry));
      const screenshot = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      const file = path.join(screenshotDirectory, `${language}-${width}-stage-explorer.png`);
      fs.writeFileSync(file, Buffer.from(screenshot.data, 'base64'));
      console.log(`Screenshot: ${file}`);
      await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
      await cdp('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
      await evaluate('new Promise(resolve => requestAnimationFrame(resolve))');
      assert.equal(await evaluate(`document.querySelector('#stage-dialog').open`), false);
      assert.equal(await evaluate(`document.activeElement.dataset.stageIndex`), '4');
    }
  }
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
    for (const stage of [null, 1, 2, 3, 4, 5, 6]) {
      const result = await evaluate(`(() => {
        const answers = { ...window.__strongAnswers };
        const expectedStage = ${JSON.stringify(stage)};
        if (expectedStage === null) answers['prayer-pattern-v6'] = 0;
        if (expectedStage === 1) answers['prayer-pattern-v6'] = 1;
        if (expectedStage === 2) answers['examen-pattern-v6'] = 1;
        if (expectedStage === 3) answers['examen-pattern-v6'] = 2;
        if (expectedStage === 4) answers['imperfections-consent-v5'] = 1;
        if (expectedStage === 5) answers['prayer-self-forgetfulness-v5'] = 1;
        window.__reflectionTools.get('set_spiritual_reflection_answers').execute({ answers: Object.entries(answers).map(([questionId, optionIndex]) => ({ questionId, optionIndex })) });
        const result = window.__reflectionTools.get('calculate_spiritual_reflection_result').execute({});
        return { stage: result.stage, heading: document.querySelector('#result-heading').textContent, visible: !document.querySelector('#result-view').hidden, criteria: document.querySelector('#criteria-checks').textContent };
      })()`);
      assert.equal(result.stage, stage);
      assert.equal(result.visible, true);
      assert.ok(result.heading.length > 0);
      assert.ok(result.criteria.length > 40);
      if (stage === 2) {
        const independentProfiles = await evaluate(`(() => {
          const saved = sessionStorage.getItem('spiritual-progress-reflection:v6');
          const cards = document.querySelectorAll('#domain-profile [data-domain-level]');
          const prayerButton = document.querySelector('[data-review-domain="prayer"]');
          const examenButton = document.querySelector('[data-review-domain="examen"]');
          const prayer = prayerButton.closest('.domain-row').querySelector('[data-domain-level]');
          const examen = examenButton.closest('.domain-row').querySelector('[data-domain-level]');
          prayerButton.click();
          const prayerTarget = document.querySelector('#criteria-stage-select').value;
          const prayerOpen = document.querySelector('[data-criteria-domain="prayer"]').open;
          examenButton.click();
          const examenTarget = document.querySelector('#criteria-stage-select').value;
          const examenOpen = document.querySelector('[data-criteria-domain="examen"]').open;
          const api = window.__reflectionTools.get('calculate_spiritual_reflection_result').execute({});
          return { count: cards.length, prayer: prayer.dataset.domainLevel, examen: examen.dataset.domainLevel,
            named: prayer.textContent.includes(window.spiritualLocales['${language}'].stages[5].name),
            prayerTarget, examenTarget, prayerOpen, examenOpen, overall: api.stage, apiCount: api.domainProfiles.length,
            unchanged: saved === sessionStorage.getItem('spiritual-progress-reflection:v6') };
        })()`);
        assert.deepEqual(independentProfiles, { count: 7, prayer: '6-6', examen: '2-2', named: true,
          prayerTarget: '6', examenTarget: '3', prayerOpen: true, examenOpen: true,
          overall: 2, apiCount: 7, unchanged: true });
      }
    }
    const returnNavigation = await evaluate(`(() => {
      document.querySelector('#result-home-button').click();
      const home = !document.querySelector('#intro-view').hidden && !document.querySelector('#intro-results-button').hidden;
      document.querySelector('#intro-results-button').click();
      const returned = !document.querySelector('#result-view').hidden;
      document.querySelector('#review-button').click();
      const reviewing = !document.querySelector('#question-view').hidden && !document.querySelector('#question-results-button').hidden;
      document.querySelector('#question-results-button').click();
      const result = !document.querySelector('#result-view').hidden && document.querySelector('#result-number').textContent === 'VI';
      return { home, returned, reviewing, result };
    })()`);
    assert.deepEqual(returnNavigation, { home: true, returned: true, reviewing: true, result: true });
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
      const file = path.join(screenshotDirectory, `${language}-${width}-stage-VI.png`);
      fs.writeFileSync(file, Buffer.from(screenshot.data, 'base64'));
      console.log(`Screenshot: ${file}`);
    }

  }

  assert.equal(await evaluate(`document.querySelector('#mystical-section')`), null);
  assert.equal(await evaluate(`document.querySelectorAll('.domain-growth').length`), 7);
  assert.equal(await evaluate(`document.querySelector('#result-scope').hidden`), false);
  assert.equal(await evaluate(`document.querySelector('#criteria-stage-select').options.length`), 6);
  await evaluate(`document.querySelector('[data-result-stage-index="5"]').click()`);
  assert.equal(await evaluate(`document.querySelector('#stage-dialog').open`), true);
  assert.ok((await evaluate(`document.querySelector('#stage-dialog-heading').textContent`)).startsWith('VI.'));
  await evaluate(`document.querySelector('#stage-dialog-close').click()`);
  await evaluate('new Promise(resolve => requestAnimationFrame(resolve))');
  assert.equal(await evaluate(`document.activeElement.dataset.resultStageIndex`), '5');
  const savedBeforeReload = await evaluate(`JSON.parse(sessionStorage.getItem('spiritual-progress-reflection:v6'))`);
  const blocksBeforeReload = await evaluate(`[...document.querySelectorAll('.stage-block-item')].map(e => e.dataset.stageStatus)`);
  await cdp('Page.reload', { ignoreCache: true });
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await evaluate('Boolean(window.__reflectionTools?.has("calculate_spiritual_reflection_result"))')) break;
    await pause(100);
  }
  const savedAfterReload = await evaluate(`JSON.parse(sessionStorage.getItem('spiritual-progress-reflection:v6'))`);
  assert.deepEqual(savedAfterReload.answers, savedBeforeReload.answers);
  assert.equal(blocksBeforeReload.length, 49);
  assert.deepEqual(await evaluate(`[...document.querySelectorAll('.stage-block-item')].map(e => e.dataset.stageStatus)`), blocksBeforeReload);
  await evaluate(`window.__strongAnswers = JSON.parse(sessionStorage.getItem('spiritual-progress-reflection:v6')).answers`);
  await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
  const review = await evaluate(`(() => {
    const select = document.querySelector('#language-select'); select.value = 'hr'; select.dispatchEvent(new Event('change', { bubbles: true }));
    const answers = { ...window.__strongAnswers, 'examen-pattern-v6': 2 };
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
  for (const width of [1440, 390, 320]) {
    await cdp('Emulation.setDeviceMetricsOverride', { width, height: 1100, deviceScaleFactor: 1, mobile: width < 600 });
    const cards = await evaluate(`(() => {
      const card = document.querySelector('.profile-card'); card.scrollIntoView({ block: 'start', behavior: 'instant' });
      const chips = [...card.querySelectorAll('.status-chip')];
      return { allLabelled: chips.every(chip => chip.querySelector('svg[aria-hidden="true"]') && chip.querySelector('.status-chip-label').textContent.length > 0),
        allPositive: chips.every(chip => Number(chip.querySelector('.status-chip-count').textContent) > 0),
        failed: card.querySelectorAll('.status-chip-notMet').length, legend: card.querySelectorAll('.criteria-visual-legend li').length,
        scrollWidth: document.documentElement.scrollWidth, width: innerWidth };
    })()`);
    assert.equal(cards.allLabelled && cards.allPositive, true);
    assert.ok(cards.failed > 0);
    assert.equal(cards.legend, 4);
    assert.ok(cards.scrollWidth <= cards.width + 1, JSON.stringify(cards));
    const screenshot = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    const file = path.join(screenshotDirectory, `hr-${width}-criteria-overview.png`);
    fs.writeFileSync(file, Buffer.from(screenshot.data, 'base64'));
    console.log(`Screenshot: ${file}`);
  }
  const criteriaLink = await evaluate(`(() => {
    const select = document.querySelector('#criteria-stage-select'); select.value = '1'; select.dispatchEvent(new Event('change', {bubbles:true}));
    document.querySelector('[data-review-domain="examen"]').click();
    const group = document.querySelector('[data-criteria-domain="examen"]');
    return { open: group.open, focused: group.querySelector('summary') === document.activeElement,
      stage: select.value, text: group.textContent, keyboardReachable: group.querySelector('summary').tabIndex >= 0 };
  })()`);
  assert.equal(criteriaLink.open && criteriaLink.focused && criteriaLink.keyboardReachable, true);
  assert.equal(criteriaLink.stage, '4');
  assert.ok(criteriaLink.text.includes('Odgovor ne podupire uvjet'));
  await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
  const growthNavigation = await evaluate(`(() => {
    const button = document.querySelector('[data-review-domain="examen"]').closest('.domain-row').querySelector('[data-growth-question]');
    const index = Number(button.dataset.growthQuestion);
    const before = JSON.parse(sessionStorage.getItem('spiritual-progress-reflection:v6')).answers;
    button.click();
    const prompt = document.querySelector('#question-title').textContent;
    const expected = window.spiritualQuestions.hr[index].title;
    document.querySelector('#question-results-button').click();
    return { correct: prompt === expected, returned: !document.querySelector('#result-view').hidden,
      unchanged: JSON.stringify(before) === JSON.stringify(JSON.parse(sessionStorage.getItem('spiritual-progress-reflection:v6')).answers) };
  })()`);
  assert.deepEqual(growthNavigation, {correct:true,returned:true,unchanged:true});
  const lowerArea = await evaluate(`(() => {
    const answers={...window.__strongAnswers,'venial-pattern-v6':0,'venial-regret-v4':0};
    window.__reflectionTools.get('set_spiritual_reflection_answers').execute({answers:Object.entries(answers).map(([questionId,optionIndex])=>({questionId,optionIndex}))});
    const result=window.__reflectionTools.get('calculate_spiritual_reflection_result').execute({});
    const card=document.querySelector('[data-review-domain="venialSin"]').closest('.domain-row');
    const more=card.querySelector('.growth-more'); more.open=true;
    return {stage:result.stage,step:card.querySelector('.domain-growth h4').textContent,
      count:card.querySelectorAll('[data-growth-id]').length,action:card.querySelector('.growth-item').textContent};
  })()`);
  assert.equal(lowerArea.stage,1);
  assert.ok(lowerArea.step.includes('II.'));
  assert.equal(lowerArea.count,2);
  assert.ok(lowerArea.action.includes('Nemoj propust odmah otpisati'));
  for (const width of [1440,390,320]) {
    await cdp('Emulation.setDeviceMetricsOverride', {width,height:1100,deviceScaleFactor:1,mobile:width<600});
    await evaluate(`document.querySelector('#result-stages-button').click()`);
    const geometry = await evaluate(`(() => { const dialog=document.querySelector('#stage-dialog'); return {visible:dialog.open,scroll:dialog.scrollWidth,width:dialog.clientWidth}; })()`);
    assert.equal(geometry.visible,true);
    assert.ok(geometry.scroll<=geometry.width+1);
    const screenshot = await cdp('Page.captureScreenshot', {format:'png',captureBeyondViewport:false});
    const file=path.join(screenshotDirectory,'hr-'+width+'-all-stages.png');
    fs.writeFileSync(file,Buffer.from(screenshot.data,'base64'));
    console.log('Screenshot: '+file);
    await cdp('Input.dispatchKeyEvent', {type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    await cdp('Input.dispatchKeyEvent', {type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    await evaluate('new Promise(resolve=>requestAnimationFrame(resolve))');
    assert.equal(await evaluate(`document.activeElement.id`),'result-stages-button');
  }
  for (const language of ['hr','en']) {
    for (const width of [1440,390,320]) {
      await cdp('Emulation.setDeviceMetricsOverride', {width,height:1100,deviceScaleFactor:1,mobile:width<600});
      const ladders = await evaluate(`(() => {
        const language=document.querySelector('#language-select'); language.value='${language}'; language.dispatchEvent(new Event('change',{bubbles:true}));
        const answers={...window.__strongAnswers,'venial-occurrence-v4':2,'examen-pattern-v6':1};
        window.__reflectionTools.get('set_spiritual_reflection_answers').execute({answers:Object.entries(answers).map(([questionId,optionIndex])=>({questionId,optionIndex}))});
        window.__reflectionTools.get('calculate_spiritual_reflection_result').execute({});
        const ladders=[...document.querySelectorAll('[data-gradation-domain]')];
        const venial=document.querySelector('[data-gradation-domain="venialSin"]');
        const details=venial.querySelector('.is-selected details');details.open=true;
        document.querySelector('#domain-profile').scrollIntoView({block:'start'});
        return {
          count:ladders.length,
          noOverflow:document.documentElement.scrollWidth<=innerWidth+1 && ladders.every(el=>el.scrollWidth<=el.clientWidth+1),
          noOverlap:ladders.every(el=>[...el.querySelectorAll('.gradation-step')].every((row,i,rows)=>!i||rows[i-1].getBoundingClientRect().bottom<=row.getBoundingClientRect().top+1)),
          selected:venial.querySelector('.is-selected').dataset.gradationStage,
          supported:venial.querySelector('.is-supported').dataset.gradationStage,
          mismatch:venial.textContent.includes(window.spiritualLocales['${language}'].gradation.different),
          unfolded:details.getBoundingClientRect().height>40
        };
      })()`);
      if(!ladders.noOverflow) console.log('Overflow diagnostics',language,width,await evaluate(`({page:[document.documentElement.scrollWidth,innerWidth], ladders:[...document.querySelectorAll('[data-gradation-domain]')].map(el=>[el.dataset.gradationDomain,el.scrollWidth,el.clientWidth]),wide:[...document.querySelectorAll('#result-view *')].filter(el=>el.getBoundingClientRect().right>innerWidth+1).map(el=>({tag:el.tagName,cls:el.className,right:el.getBoundingClientRect().right,text:el.textContent.slice(0,60)})).slice(0,20)})`));
      assert.deepEqual(ladders,{count:7,noOverflow:true,noOverlap:true,selected:'4-4',supported:'3-3',mismatch:true,unfolded:true});
      const shot=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
      const file=path.join(screenshotDirectory,language+'-'+width+'-gradations.png');
      fs.writeFileSync(file,Buffer.from(shot.data,'base64'));console.log('Screenshot: '+file);
      const question = await evaluate(`(() => {
        document.querySelector('[data-gradation-domain="venialSin"] [data-growth-question]').click();
        const inputs=[...document.querySelectorAll('#answer-options input')];
        inputs[1].click();
        return {headings:document.querySelectorAll('.answer-heading').length,radios:inputs.length,checked:inputs[1].checked,
          hint:!document.querySelector('#gradation-question-hint').hidden,
          fits:document.documentElement.scrollWidth<=innerWidth+1,
          saved:JSON.parse(sessionStorage.getItem('spiritual-progress-reflection:v6')).answers['venial-pattern-v6']};
      })()`);
      assert.deepEqual(question,{headings:5,radios:6,checked:true,hint:true,fits:true,saved:1});
      await evaluate(`document.querySelector('#answer-options').scrollIntoView({block:'start'})`);
      const questionShot=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
      fs.writeFileSync(path.join(screenshotDirectory,language+'-'+width+'-overview-question.png'),Buffer.from(questionShot.data,'base64'));
      await evaluate(`document.querySelector('#question-results-button').click()`);
      assert.equal(await evaluate(`document.querySelector('[data-gradation-domain="venialSin"] .is-supported').dataset.gradationStage`),'2-2');
    }
  }
  for(const language of ['hr','en']) {
    for(const width of [1440,320]) {
      await cdp('Emulation.setDeviceMetricsOverride',{width,height:1100,deviceScaleFactor:1,mobile:width<600});
      const refined=await evaluate(`(() => {
        const select=document.querySelector('#language-select');select.value='${language}';select.dispatchEvent(new Event('change',{bubbles:true}));
        const bank=window.spiritualQuestions['${language}'].filter(q=>q.contextSources);
        return bank.map(q=>{
          window.__reflectionTools.get('set_spiritual_reflection_answers').execute({answers:[{questionId:q.id,optionIndex:0}]});
          return {id:q.id,story:document.querySelector('#question-example-text').textContent===q.example,
            clarification:document.querySelector('#question-clarification').textContent===q.clarification,
            visible:document.querySelector('#question-example-text').getBoundingClientRect().height>0,
            fits:document.documentElement.scrollWidth<=innerWidth+1};
        });
      })()`);
      assert.equal(refined.length,20);
      assert.ok(refined.every(q=>q.story&&q.clarification&&q.visible&&q.fits),JSON.stringify(refined));
      await evaluate(`window.__reflectionTools.get('set_spiritual_reflection_answers').execute({answers:[{questionId:'prayer-loving-response-v4',optionIndex:2}]});document.querySelector('.question-example').scrollIntoView({block:'start'})`);
      const shot=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
      const file=path.join(screenshotDirectory,language+'-'+width+'-three-ways-question.png');
      fs.writeFileSync(file,Buffer.from(shot.data,'base64'));console.log('Screenshot: '+file);
    }
  }
  // Seven square blocks per domain: independent evidence, source gaps and narrow-screen geometry.
  for (const language of ['hr', 'en']) {
    for (const width of [1440, 390, 320]) {
      await cdp('Emulation.setDeviceMetricsOverride', {width, height:1100, deviceScaleFactor:1, mobile:width<600});
      const blocks = await evaluate(`(() => {
        const select=document.querySelector('#language-select');select.value='${language}';select.dispatchEvent(new Event('change',{bubbles:true}));
        const answers={...window.__strongAnswers,'examen-pattern-v6':2};
        window.__reflectionTools.get('set_spiritual_reflection_answers').execute({answers:Object.entries(answers).map(([questionId,optionIndex])=>({questionId,optionIndex}))});
        window.__reflectionTools.get('calculate_spiritual_reflection_result').execute({});
        const result=window.spiritualAssessmentEngine.evaluate(window.spiritualAssessment,answers);
        const panels=[...document.querySelectorAll('[data-stage-blocks]')];
        const matches=panels.every(panel=>{
          const area=result.domainProfiles.find(item=>item.domain===panel.dataset.stageBlocks);
          return [...panel.querySelectorAll('.stage-block-item')].every((node,index)=>node.dataset.stage===String(index+1)&&node.dataset.stageStatus===(index===6?'notAssessed':area.stages[index]?.status??'notAssessed'));
        });
        const geometry=panels.every(panel=>{
          const squares=[...panel.querySelectorAll('.stage-blocks-track .stage-block-square')].map(e=>e.getBoundingClientRect());
          return squares.length===7&&squares.every((r,i)=>Math.abs(r.width-r.height)<1&&r.width>20&&Math.abs(r.top-squares[0].top)<1&&(i===0||r.left>=squares[i-1].right));
        });
        const examen=document.querySelector('[data-stage-blocks="examen"]');
        examen.closest('.domain-row').scrollIntoView({block:'start',behavior:'instant'});
        return {count:panels.length,items:document.querySelectorAll('.stage-block-item').length,matches,geometry,
          translated:panels.every(p=>p.querySelector('.stage-blocks-heading').textContent===window.spiritualLocales['${language}'].stageBlocks.heading),
          fits:document.documentElement.scrollWidth<=innerWidth+1,
          statuses:[...examen.querySelectorAll('.stage-block-item')].map(e=>e.dataset.stageStatus)};
      })()`);
      assert.deepEqual(blocks, {count:7,items:49,matches:true,geometry:true,translated:true,fits:true,
        statuses:['supported','supported','supported','notSupported','notAssessed','notAssessed','notAssessed']});
      const shot=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
      const file=path.join(screenshotDirectory,language+'-'+width+'-stage-blocks.png');
      fs.writeFileSync(file,Buffer.from(shot.data,'base64'));console.log('Screenshot: '+file);
    }
  }
  const changedBlocks=await evaluate(`(() => {
    const answers={...window.__strongAnswers,'examen-pattern-v6':1};
    window.__reflectionTools.get('set_spiritual_reflection_answers').execute({answers:Object.entries(answers).map(([questionId,optionIndex])=>({questionId,optionIndex}))});
    window.__reflectionTools.get('calculate_spiritual_reflection_result').execute({});
    return [...document.querySelectorAll('[data-stage-blocks="examen"] .stage-block-item')].map(e=>e.dataset.stageStatus);
  })()`);
  assert.deepEqual(changedBlocks,['supported','supported','notSupported','notSupported','notAssessed','notAssessed','notAssessed']);
  // Next-overall-stage plan: all seven areas are accounted for, without higher-stage gates.
  for(const language of ['hr','en']) {
    for(const width of [1440,390,320]) {
      await cdp('Emulation.setDeviceMetricsOverride',{width,height:1100,deviceScaleFactor:1,mobile:width<600});
      const nextSummary=await evaluate(`(() => {
        const select=document.querySelector('#language-select');select.value='${language}';select.dispatchEvent(new Event('change',{bubbles:true}));
        const answers={...window.__strongAnswers,'prayer-pattern-v6':1,'examen-pattern-v6':0,'venial-pattern-v6':0,'mortal-occasions-v4':1,'imperfections-pattern-v6':0};
        window.__reflectionTools.get('set_spiritual_reflection_answers').execute({answers:Object.entries(answers).map(([questionId,optionIndex])=>({questionId,optionIndex}))});
        const result=window.__reflectionTools.get('calculate_spiritual_reflection_result').execute({});
        const panel=document.querySelector('#next-stage-summary');
        const saved=sessionStorage.getItem('spiritual-progress-reflection:v6');
        const domains=[...panel.querySelectorAll('[data-next-domain]')].map(e=>e.dataset.nextDomain);
        const primaryVisible=[...panel.querySelectorAll('.next-stage-area')].every(e=>e.querySelector('.next-stage-action').getBoundingClientRect().height>0);
        const toggles=[...panel.querySelectorAll('summary')];toggles.forEach(e=>e.click());
        const allVisible=[...panel.querySelectorAll('.next-stage-item')].every(e=>e.getBoundingClientRect().height>0);
        const fits=document.documentElement.scrollWidth<=innerWidth+1&&[...panel.querySelectorAll('*')].every(e=>e.getBoundingClientRect().right<=innerWidth+1);
        const untouched=saved===sessionStorage.getItem('spiritual-progress-reflection:v6');
        toggles.forEach(e=>e.click());
        panel.scrollIntoView({block:'start',behavior:'instant'});
        return {stage:result.stage,target:panel.querySelector('[data-next-criteria]').dataset.nextCriteria,domains,primaryVisible,allVisible,fits,untouched};
      })()`);
      assert.deepEqual(nextSummary,{stage:1,target:'2',domains:['seriousSin','venialSin','prayer','examen'],primaryVisible:true,allVisible:true,fits:true,untouched:true});
      const shot=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
      const file=path.join(screenshotDirectory,language+'-'+width+'-next-stage-II.png');
      fs.writeFileSync(file,Buffer.from(shot.data,'base64'));console.log('Screenshot: '+file);
      await evaluate(`document.querySelector('[data-next-criteria]').click()`);
      assert.equal(await evaluate(`document.querySelector('#criteria-stage-select').value`),'2');
      assert.equal(await evaluate(`document.activeElement.id`),'criteria-heading');
    }
  }
  const pendingQuestion=await evaluate(`(() => {
    const answers={...window.__strongAnswers,'prayer-pattern-v6':1};
    window.__reflectionTools.get('set_spiritual_reflection_answers').execute({answers:Object.entries(answers).map(([questionId,optionIndex])=>({questionId,optionIndex}))});
    window.__reflectionTools.get('calculate_spiritual_reflection_result').execute({});
    const button=document.querySelector('[data-next-domain="prayer"] [data-next-question]');
    const index=Number(button.dataset.nextQuestion);
    button.focus();
    return {index,title:window.spiritualQuestions.en[index].title,answers:JSON.parse(sessionStorage.getItem('spiritual-progress-reflection:v6')).answers};
  })()`);
  await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r',unmodifiedText:'\r'});
  await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  await evaluate('new Promise(resolve=>requestAnimationFrame(resolve))');
  assert.equal(await evaluate(`document.querySelector('#question-view').hidden`),false);
  assert.equal(await evaluate(`document.querySelector('#question-title').textContent`),pendingQuestion.title);
  assert.deepEqual(await evaluate(`JSON.parse(sessionStorage.getItem('spiritual-progress-reflection:v6')).answers`),pendingQuestion.answers);
  await evaluate(`document.querySelector('#answer-options input[value="5"]').click();document.querySelector('#question-results-button').click()`);
  assert.equal(await evaluate(`document.querySelector('#result-number').textContent`),'VI');
  assert.equal(await evaluate(`document.querySelectorAll('#next-stage-summary [data-next-question]').length`),0);
  assert.equal(await evaluate(`document.querySelector('#next-stage-heading').textContent`),'What to nurture next');
  // All definitions, including collapsed related terms, are tested in the real DOM.
  for(const language of ['hr','en']) {
    for(const width of [1440,320]) {
      await cdp('Emulation.setDeviceMetricsOverride',{width,height:1100,deviceScaleFactor:1,mobile:width<600});
      const definitions=await evaluate(`(() => {
        const select=document.querySelector('#language-select');
        select.value='${language}';select.dispatchEvent(new Event('change',{bubbles:true}));
        return window.spiritualQuestions['${language}'].map(q=>{
          window.__reflectionTools.get('set_spiritual_reflection_answers').execute({answers:[{questionId:q.id,optionIndex:0}]});
          const model=window.spiritualTerminology.describe('${language}',q.id);
          const section=document.querySelector('#question-terminology');
          const primary=section.querySelector('.term-primary');
          const saved=sessionStorage.getItem('spiritual-progress-reflection:v6');
          const rows=[...section.querySelectorAll('[data-term-id]')];
          const summaries=[...section.querySelectorAll('summary')];
          summaries.forEach(s=>s.click());
          const correct=rows.every((row,i)=>row.querySelector('.term-meaning').textContent===model.terms[i].meaning&&
            row.querySelector('.term-example').textContent.includes(model.terms[i].example)&&
            row.querySelector('.term-meaning').getBoundingClientRect().height>0);
          const fits=document.documentElement.scrollWidth<=innerWidth+1&&
            [...section.querySelectorAll('*')].every(el=>el.getBoundingClientRect().right<=innerWidth+1);
          summaries.forEach(s=>s.click());
          return {id:q.id,correct,fits,visible:primary.querySelector('.term-meaning').getBoundingClientRect().height>0,
            count:rows.length===model.terms.length,untouched:saved===sessionStorage.getItem('spiritual-progress-reflection:v6')};
        });
      })()`);
      assert.equal(definitions.length,36);
      assert.ok(definitions.every(q=>q.correct&&q.fits&&q.visible&&q.count&&q.untouched),JSON.stringify(definitions));
      for(const [id,label] of [['prayer-meditation-v4','meditation'],['examen-method-v4','examen'],['mortal-occasions-v4','occasions']]) {
        await evaluate(`window.__reflectionTools.get('set_spiritual_reflection_answers').execute({answers:[{questionId:'${id}',optionIndex:0}]});
          document.querySelector('.term-extra').open=true;
          document.querySelector('#question-terminology').scrollIntoView({block:'start'});`);
        const shot=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
        const file=path.join(screenshotDirectory,language+'-'+width+'-terms-'+label+'.png');
        fs.writeFileSync(file,Buffer.from(shot.data,'base64'));console.log('Screenshot: '+file);
      }
    }
  }
  const beforeTerms=await evaluate(`JSON.parse(sessionStorage.getItem('spiritual-progress-reflection:v6'))`);
  await evaluate(`document.querySelector('.term-related summary').focus()`);
  assert.equal(await evaluate(`document.activeElement===document.querySelector('.term-related summary')`),true);
  await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r',unmodifiedText:'\r'});
  await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  await evaluate('new Promise(resolve=>requestAnimationFrame(resolve))');
  assert.equal(await evaluate(`document.querySelector('.term-related').open`),true);
  await evaluate(`(() => {const select=document.querySelector('#language-select');select.value='hr';select.dispatchEvent(new Event('change',{bubbles:true}));})()`);
  assert.equal(await evaluate(`document.querySelector('.term-primary h4').textContent`),'Bliska i daleka grešna prigoda');
  assert.deepEqual(await evaluate(`JSON.parse(sessionStorage.getItem('spiritual-progress-reflection:v6')).answers`),beforeTerms.answers);
  await cdp('Page.reload',{ignoreCache:true});
  for(let attempt=0;attempt<100;attempt+=1) {
    if(await evaluate('Boolean(window.__reflectionTools?.has("calculate_spiritual_reflection_result"))'))break;
    await pause(100);
  }
  assert.deepEqual(await evaluate(`JSON.parse(sessionStorage.getItem('spiritual-progress-reflection:v6')).answers`),beforeTerms.answers);
  assert.equal(await evaluate(`document.querySelector('.term-primary').dataset.termId`),'occasions');
  assert.equal(await evaluate(`document.querySelector('#answer-options input:checked').value`),'0');
  await evaluate(`document.querySelector('#answer-options input[value="1"]').click()`);
  assert.equal(await evaluate(`JSON.parse(sessionStorage.getItem('spiritual-progress-reflection:v6')).answers['mortal-occasions-v4']`),1);
  console.log('Terminology: 36 questions, 28 definitions, both languages, mobile/desktop, keyboard and refresh verified.');
  await evaluate(`window.__reflectionTools.get('calculate_spiritual_reflection_result').execute({})`);
  await cdp('Emulation.setDeviceMetricsOverride', {width:1440,height:1100,deviceScaleFactor:1,mobile:false});
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
  const nextPrint=await evaluate(`(() => {
    const panel=document.querySelector('#next-stage-summary');
    const items=[...panel.querySelectorAll('.next-stage-item')];
    return {items:items.length,visible:items.filter(e=>e.getBoundingClientRect().height>0).length,
      printed:getComputedStyle(panel).display!=='none'};
  })()`);
  assert.ok(nextPrint.printed && nextPrint.items>0);
  assert.equal(nextPrint.visible,nextPrint.items,'print must include collapsed next-stage items');
  assert.equal(print.visibleItems, print.items, JSON.stringify(print));
  const printBlocks=await evaluate(`(() => {
    const squares=[...document.querySelectorAll('.stage-blocks-track .stage-block-square')];
    return {count:squares.length,visible:squares.every(e=>e.getBoundingClientRect().height>0),
      marked:squares.every(e=>e.classList.contains('stage-block-supported')?e.textContent==='✓':true),
      legends:[...document.querySelectorAll('.stage-blocks-legend')].every(e=>e.getBoundingClientRect().height>0)};
  })()`);
  assert.deepEqual(printBlocks,{count:49,visible:true,marked:true,legends:true});
  assert.deepEqual(exceptions, []);
  console.log('PASS: seven source dialogs, Escape/focus, home/result navigation, independent domain levels and their own detail targets, criteria icons, tailored practical guidance and bilingual results; desktop/mobile without overflow, refresh/print, strict I–VI practical thresholds, no uncaught exceptions.');
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(async () => {
  if (socket && socket.readyState === WebSocket.OPEN) socket.close();
  if (browser && browser.exitCode === null) browser.kill('SIGTERM');
  if (server) await new Promise((resolve) => server.close(resolve));
  // Deliberately leave the isolated profile and screenshots in OS temporary
  // storage for diagnosis. Never remove or reuse a real user browser profile.
});
