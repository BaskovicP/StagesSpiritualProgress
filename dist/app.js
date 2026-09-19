(() => {
  "use strict";

  const assessment = window.spiritualAssessment;
  const domainOrder = assessment.domainOrder;
  const questionBlueprints = assessment.questionBlueprints;
  const highestAssessedStage = assessment.highestAssessedStage;
  const storageVersion = assessment.questionnaireVersion;
  const storageKey = `spiritual-progress-reflection:v${storageVersion}`;

  const translations = window.spiritualLocales;
  const questionCopies = window.spiritualQuestions;
  const mysticalConfig = window.spiritualMysticalReflection;
  const mysticalCopies = window.spiritualMysticalContent;
  const resultPresentation = window.spiritualResultPresentation;


  const elements = {
    metaDescription: document.querySelector('meta[name="description"]'),
    brandLink: document.querySelector(".brand"),
    summaryRow: document.querySelector(".summary-row"),
    languageSelect: document.querySelector("#language-select"),
    introView: document.querySelector("#intro-view"),
    questionView: document.querySelector("#question-view"),
    resultView: document.querySelector("#result-view"),
    startButton: document.querySelector("#start-button"),
    restartButton: document.querySelector("#restart-button"),
    exitButton: document.querySelector("#exit-button"),
    previousButton: document.querySelector("#previous-button"),
    nextButton: document.querySelector("#next-button"),
    nextButtonLabel: document.querySelector("#next-button-label"),
    questionProgress: document.querySelector("#question-progress"),
    stagePath: document.querySelector("#stage-path"),
    optionsRoot: document.querySelector("#answer-options"),
    questionExampleText: document.querySelector("#question-example-text"),
    questionClarification: document.querySelector("#question-clarification"),
    questionContext: document.querySelector("#question-context"),
    questionContextText: document.querySelector("#question-context-text"),
    assessmentMessage: document.querySelector("#assessment-message"),
    reviewButton: document.querySelector("#review-button"),
    printButton: document.querySelector("#print-button"),
    retakeButton: document.querySelector("#retake-button")
  };

  const restoredState = readStoredState();
  const state = {
    language: restoredState?.language ?? detectLanguage(),
    currentIndex: restoredState?.currentIndex ?? 0,
    answers: restoredState?.answers ?? {},
    mysticalAnswers: restoredState?.mysticalAnswers ?? {},
    mysticalOpen: restoredState?.mysticalOpen ?? false,
    view: restoredState?.view ?? "intro"
  };

  if (state.view === "result" && !isComplete()) {
    state.view = "question";
  }

  let ascentAnimationFrame = 0;
  let selectedStageIndex = 0;
  let stageOpenerIndex = 0;

  function detectLanguage() {
    const supported = Object.keys(translations);
    const requested = navigator.languages?.length ? navigator.languages : [navigator.language || "en"];
    for (const entry of requested) {
      const base = String(entry).toLowerCase().split("-")[0];
      if (supported.includes(base)) return base;
    }
    return "en";
  }

  function readStoredState() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) || "null");
      if (!saved || saved.version !== storageVersion) return null;

      const answers = {};
      questionBlueprints.forEach((question) => {
        const answer = saved.answers?.[question.id];
        if (answer === "skip" || (Number.isInteger(answer) && answer >= 0 && answer < question.optionCount)) {
          answers[question.id] = answer;
        }
      });

      const language = Object.hasOwn(translations, saved.language)
        ? saved.language
        : detectLanguage();
      const currentIndex = Number.isInteger(saved.currentIndex)
        ? clamp(saved.currentIndex, 0, questionBlueprints.length - 1)
        : 0;
      const view = ["intro", "question", "result"].includes(saved.view)
        ? saved.view
        : "intro";

      const mysticalAnswers = {};
      if (saved.mysticalVersion === mysticalConfig.version) {
        mysticalConfig.questions.forEach((question) => {
          const answer = saved.mysticalAnswers?.[question.id];
          if (question.options.includes(answer)) mysticalAnswers[question.id] = answer;
        });
      }
      const mysticalOpen = saved.mysticalVersion === mysticalConfig.version && saved.mysticalOpen === true;
      return { language, currentIndex, answers, view, mysticalAnswers, mysticalOpen };
    } catch {
      return null;
    }
  }

  function persistState() {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify({
        version: storageVersion,
        language: state.language,
        currentIndex: state.currentIndex,
        answers: state.answers,
        mysticalVersion: mysticalConfig.version,
        mysticalAnswers: state.mysticalAnswers,
        mysticalOpen: state.mysticalOpen,
        view: state.view
      }));
    } catch {
      // The questionnaire remains usable when browser storage is unavailable.
    }
  }

  function applyLanguage() {
    const copy = translations[state.language];
    document.documentElement.lang = state.language;
    document.title = copy.metaTitle;
    elements.metaDescription.setAttribute("content", copy.metaDescription);
    elements.brandLink.setAttribute("aria-label", copy.brandHomeLabel);
    elements.summaryRow.setAttribute("aria-label", copy.questionnaireSummaryLabel);
    elements.languageSelect.value = state.language;
    elements.languageSelect.setAttribute("aria-label", copy.languageLabel);
    elements.questionProgress.setAttribute("aria-label", copy.yourProgress);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = copy[element.dataset.i18n];
      if (typeof value === "string") element.textContent = value;
    });

    renderStagePath();
    if (document.querySelector("#stage-dialog").open) renderStageDetails();
    renderSourceGuide();
    updateStartLabel();
    if (state.view === "question") renderQuestion();
    if (state.view === "result") renderResult();
  }

  function renderStagePath() {
    const copy = translations[state.language];
    elements.stagePath.innerHTML = copy.stages
      .map((stage, index) => `
        <li class="${stage.assessmentNote ? "is-unassessed" : ""}">
          <button type="button" class="stage-explore-button" data-stage-index="${index}" aria-haspopup="dialog" aria-label="${escapeHtml(format(copy.exploreStageLabel, {stage:toRoman(index + 1),name:stage.name}))}">
          <span class="stage-dot" aria-hidden="true"></span>
          <span class="stage-copy">
            <strong>${toRoman(index + 1)}. ${escapeHtml(stage.name)}</strong>
            <span>${escapeHtml(copy.families[stage.family])}</span>
            ${stage.assessmentNote ? `<small>${escapeHtml(stage.assessmentNote)}</small>` : ""}
          </span>
          <svg class="stage-explore-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
          </button>
        </li>
      `)
      .join("");
  }

  function renderStageDetails() {
    const copy = translations[state.language];
    const stage = copy.stages[selectedStageIndex];
    document.querySelector("#stage-dialog-heading").textContent = `${toRoman(selectedStageIndex + 1)}. ${stage.name}`;
    document.querySelector("#stage-dialog-family").textContent = copy.families[stage.family];
    document.querySelector("#stage-dialog-description").innerHTML = stage.sourceDescription.length
      ? sourceParagraphs(stage, copy) : `<p>${escapeHtml(stage.summary)}</p>`;
    document.querySelector("#stage-dialog-note").textContent = stage.assessmentNote || "";
    document.querySelector("#stage-dialog-note").hidden = !stage.assessmentNote;
    document.querySelector("#stage-dialog-reference").textContent = format(copy.sourceDescriptionReference, {stage:toRoman(selectedStageIndex + 1)});
    document.querySelector("#stage-dialog-position").textContent = `${selectedStageIndex + 1} / ${copy.stages.length}`;
    document.querySelector("#stage-dialog-previous").disabled = selectedStageIndex === 0;
    document.querySelector("#stage-dialog-next").disabled = selectedStageIndex === copy.stages.length - 1;
  }

  function openStageDetails(index) {
    if (!Number.isInteger(index) || index < 0 || index >= translations[state.language].stages.length) return;
    selectedStageIndex = index;
    stageOpenerIndex = index;
    renderStageDetails();
    document.querySelector("#stage-dialog").showModal();
    document.querySelector("#stage-dialog-content").scrollTop = 0;
    document.querySelector("#stage-dialog-heading").focus();
  }

  function moveStageDetails(offset) {
    const next = selectedStageIndex + offset;
    if (next < 0 || next >= translations[state.language].stages.length) return;
    selectedStageIndex = next;
    renderStageDetails();
    document.querySelector("#stage-dialog-content").scrollTop = 0;
    document.querySelector("#stage-dialog-heading").focus();
  }

  function renderQuestion() {
    const copy = translations[state.language];
    const blueprint = questionBlueprints[state.currentIndex];
    const question = questionCopies[state.language][state.currentIndex];
    const selected = state.answers[blueprint.id];
    const isLast = state.currentIndex === questionBlueprints.length - 1;

    document.querySelector("#question-number").textContent = String(state.currentIndex + 1);
    document.querySelector("#question-total").textContent = String(questionBlueprints.length);
    document.querySelector("#progress-domain").textContent = copy.domains[blueprint.domain];
    document.querySelector("#question-kicker").textContent = question.kicker;
    document.querySelector("#question-title").textContent = question.title;
    elements.questionExampleText.textContent = question.example;
    elements.questionClarification.textContent = question.clarification || "";
    elements.questionClarification.hidden = !question.clarification;
    elements.questionContextText.textContent = copy.domainHelp[blueprint.domain];
    elements.questionContext.open = ["seriousSin", "venialSin"].includes(blueprint.domain);
    elements.questionProgress.value = state.currentIndex + 1;
    elements.questionProgress.max = questionBlueprints.length;
    elements.previousButton.disabled = state.currentIndex === 0;
    elements.nextButton.disabled = selected === undefined;
    elements.nextButtonLabel.textContent = isLast ? copy.seeResult : copy.next;
    elements.assessmentMessage.hidden = true;

    const choices = getQuestionOptions(copy, state.currentIndex)
      .map((label, index) => ({ label, value: String(index) }));
    choices.push({ label: copy.preferNot, value: "skip" });
    elements.optionsRoot.innerHTML = choices
      .map((choice) => `
        <label class="answer-option">
          <input
            type="radio"
            name="answer"
            value="${choice.value}"
            ${String(selected) === choice.value ? "checked" : ""}
          />
          <span class="answer-content">${escapeHtml(choice.label)}</span>
        </label>
      `)
      .join("");
  }

  function showView(view) {
    state.view = view;
    elements.introView.hidden = view !== "intro";
    elements.questionView.hidden = view !== "question";
    elements.resultView.hidden = view !== "result";
    updateResultNavigation();
    persistState();
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  function openQuestionnaire() {
    showView("question");
    renderQuestion();
    requestAnimationFrame(() => document.querySelector("#question-title").focus());
  }

  function returnToIntro() {
    showView("intro");
    updateStartLabel();
    requestAnimationFrame(() => elements.startButton.focus());
  }

  function updateResultNavigation() {
    const complete = isComplete();
    document.querySelector("#intro-results-button").hidden = !complete;
    document.querySelector("#question-results-button").hidden = !complete;
  }

  function openResults() {
    if (!isComplete()) return;
    showView("result");
    renderResult();
    requestAnimationFrame(() => document.querySelector("#result-heading").focus());
  }

  function movePrevious() {
    if (state.currentIndex === 0) return;
    state.currentIndex -= 1;
    renderQuestion();
    persistState();
    requestAnimationFrame(() => document.querySelector("#question-title").focus());
  }

  function moveNext() {
    const blueprint = questionBlueprints[state.currentIndex];
    if (state.answers[blueprint.id] === undefined) return;

    if (state.currentIndex < questionBlueprints.length - 1) {
      state.currentIndex += 1;
      renderQuestion();
      persistState();
      requestAnimationFrame(() => document.querySelector("#question-title").focus());
      return;
    }

    if (!isComplete()) {
      state.currentIndex = questionBlueprints.findIndex((question) => state.answers[question.id] === undefined);
      renderQuestion();
      elements.assessmentMessage.textContent = translations[state.language].needMore;
      elements.assessmentMessage.hidden = false;
      return;
    }
    openResults();
  }

  function sourceParagraphs(stage, copy) {
    return stage.sourceDescription.map(({domain,text}) => `<p><strong>${escapeHtml(copy.domains[domain])}:</strong> ${escapeHtml(text)}</p>`).join("");
  }

  function renderSourceGuide() {
    const copy = translations[state.language];
    document.querySelector("#advanced-source-guide").innerHTML = copy.stages.slice(4).map((stage,index) => `
      <section><h3>${toRoman(index + 5)}. ${escapeHtml(stage.name)}</h3>
      ${stage.sourceDescription.length ? sourceParagraphs(stage,copy) : `<p>${escapeHtml(stage.summary)}</p>`}
      </section>`).join("");
  }

  function renderMysticalSummary() {
    const copy = mysticalCopies[state.language];
    const entries = copy.questions.filter(question => Object.hasOwn(state.mysticalAnswers, question.id));
    document.querySelector("#mystical-progress").textContent = format(copy.progress, {
      answered: entries.length, total: mysticalConfig.questions.length
    });
    document.querySelector("#mystical-clear").disabled = entries.length === 0;
    document.querySelector("#mystical-section").setAttribute("data-has-answers", String(entries.length > 0));
    // Repeat only the person's chosen descriptions. No spiritual interpretation
    // is inferred, and none of this state is passed to calculateResult().
    document.querySelector("#mystical-summary").innerHTML = entries.length
      ? `<dl>${entries.map(question => {
        const option = question.options.find(item => item.value === state.mysticalAnswers[question.id]);
        return `<div><dt>${escapeHtml(question.title)}</dt><dd>${escapeHtml(option.label)}</dd></div>`;
      }).join("")}</dl>`
      : `<p>${escapeHtml(copy.summaryEmpty)}</p>`;
  }

  function renderMystical() {
    const copy = mysticalCopies[state.language];
    const labels = {
      "mystical-kicker": copy.kicker, "mystical-heading": copy.title,
      "mystical-intro": copy.intro, "mystical-timeframe": copy.timeframe,
      "mystical-privacy": copy.privacy, "mystical-clear": copy.clearButton,
      "mystical-summary-title": copy.summaryTitle, "mystical-summary-note": copy.summaryNote
    };
    Object.entries(labels).forEach(([id, text]) => { document.querySelector(`#${id}`).textContent = text; });
    const toggle = document.querySelector("#mystical-toggle");
    toggle.textContent = state.mysticalOpen ? copy.hideButton : copy.startButton;
    toggle.setAttribute("aria-expanded", String(state.mysticalOpen));
    const fields = document.querySelector("#mystical-fields");
    fields.hidden = !state.mysticalOpen;
    fields.innerHTML = copy.questions.map((question, index) => `
      <fieldset class="mystical-question" aria-describedby="mystical-${question.id}-clarification">
        <legend>${index + 1}. ${escapeHtml(question.title)}</legend>
        <div class="question-example">
          <p class="question-example-label">${escapeHtml(translations[state.language].exampleLabel)}</p>
          <p class="mystical-story">${escapeHtml(question.example)}</p>
        </div>
        <p id="mystical-${question.id}-clarification" class="question-clarification">${escapeHtml(question.clarification)}</p>
        <div class="answer-options">${question.options.map(option => `
          <label class="answer-option">
            <input type="radio" name="mystical-${question.id}" data-mystical-question="${question.id}" value="${option.value}" ${state.mysticalAnswers[question.id] === option.value ? "checked" : ""} />
            <span class="answer-content">${escapeHtml(option.label)}</span>
          </label>`).join("")}
        </div>
        <p class="mystical-source"><strong>${escapeHtml(copy.sourceLabel)}</strong> ${escapeHtml(question.sourceNote)}</p>
      </fieldset>`).join("");
    document.querySelector("#mystical-status").textContent = "";
    renderMysticalSummary();
  }

  function renderCriteria(result,stageNumber) {
    const copy=translations[state.language];
    const checks=result.stageChecks[stageNumber - 1].checks;
    document.querySelector("#criteria-heading").textContent=format(copy.criteriaTitle,{stage:toRoman(stageNumber)});
    document.querySelector("#criteria-checks").innerHTML=domainOrder.map(domain=>{
      const domainChecks=checks.filter(check=>check.domain===domain);
      if(!domainChecks.length)return "";
      const needsReview=domainChecks.some(check=>["notMet","unknown"].includes(check.status));
      return `<details class="criterion-group" data-criteria-domain="${domain}" ${needsReview ? "open" : ""}>
        <summary>${escapeHtml(copy.domains[domain])}${resultPresentation.renderCounts(domainChecks,copy)}</summary>
        <ul>${domainChecks.map(check=>{
          const index=questionBlueprints.findIndex(question=>question.id===check.id);
          const question=questionCopies[state.language][index];
          const selected=Number.isInteger(check.selected) ? question.options[check.selected] || copy.notAnswered : copy.preferNot;
          return `<li class="criterion-item">
            <span class="criterion-status criterion-status-${check.status}">${resultPresentation.statusIcon(check.status)}${escapeHtml(copy.criterionStatuses[check.status])}</span>
            <h4>${escapeHtml(question.expectations[check.ruleStage])}</h4>
            <p>${escapeHtml(copy.yourAnswer)} ${escapeHtml(selected)}</p>
            ${check.status==="unknown" ? `<p>${escapeHtml(copy.criterionUnknownNote)}</p>` : ""}
            ${check.status==="notTriggered" ? `<p>${escapeHtml(copy.criterionExemptNote)}</p>` : ""}
            <p class="criterion-source">${escapeHtml(copy.criterionSource)} ${escapeHtml(questionBlueprints[index].sources.join("; "))}</p>
            <button type="button" class="text-button" data-review-question="${index}">${escapeHtml(copy.reviewThisAnswer)}</button>
          </li>`;
        }).join("")}</ul></details>`;
    }).join("");
  }

  function renderResult() {
    const copy=translations[state.language];
    const result=calculateResult();
    const stage=result.stage ? copy.stages[result.stage - 1] : null;
    renderAscent(result,copy);
    document.querySelector("#result-number").textContent=result.stage ? toRoman(result.stage) : "—";
    document.querySelector("#result-family").textContent=stage ? copy.families[stage.family] : copy.mixedFamily;
    document.querySelector("#result-heading").textContent=stage ? stage.name : copy.mixedTitle;
    document.querySelector("#result-summary").textContent=stage ? copy.resultSummary : copy.mixedSummary;
    const describedStage=result.stage || result.targetStage;
    const description=copy.stages[describedStage - 1];
    document.querySelector("#source-description-heading").textContent=`${toRoman(describedStage)}. ${description.name}`;
    document.querySelector("#source-description-intro").textContent=stage ? copy.sourceDescriptionIntro : copy.sourceDescriptionFallback;
    document.querySelector("#source-description-body").innerHTML=sourceParagraphs(description,copy);
    document.querySelector("#source-description-reference").textContent=format(copy.sourceDescriptionReference,{stage:toRoman(describedStage)});
    document.querySelector("#criteria-badge").textContent=copy.ruleBased;
    document.querySelector("#result-range").textContent=result.stage===highestAssessedStage
      ? copy.upperLimitNote : format(copy.nextThreshold,{stage:toRoman(result.targetStage)});
    document.querySelector("#profile-title").textContent=copy.domainLevels.title;
    document.querySelector("#domain-profile").innerHTML=result.domainProfiles.map(profile =>
      resultPresentation.renderDomain(profile.domain, profile.targetChecks, copy, profile)
    ).join("");
    document.querySelector("#criteria-legend").innerHTML = resultPresentation.renderLegend(copy);
    document.querySelector("#answered-summary").textContent=format(copy.answeredSummary,{answered:result.answeredCount,total:questionBlueprints.length,skipped:result.skippedCount});
    document.querySelector("#criteria-summary").textContent=copy.criteriaSummary;
    document.querySelector("#criteria-stage-select").innerHTML=copy.stages.slice(0,highestAssessedStage).map((item,index)=>`<option value="${index + 1}" ${index + 1===result.targetStage ? "selected" : ""}>${toRoman(index + 1)}. ${escapeHtml(item.name)}</option>`).join("");
    renderCriteria(result,result.targetStage);
    renderMystical();
  }

  function renderAscent(result, copy) {
    const stagePoints = [
      { x: 30, y: 530 },
      { x: 38, y: 446 },
      { x: 42, y: 362 },
      { x: 52, y: 278 },
      { x: 48, y: 194 },
      { x: 46, y: 110 },
      { x: 54, y: 26 }
    ];
    const marker = document.querySelector("#result-ascent-marker");
    marker.setAttribute("visibility", result.stage ? "visible" : "hidden");
    if (result.stage) {
      const point = stagePoints[result.stage - 1];
      positionAscentMarker(marker, point.x, point.y);
    }
    document.querySelector("#result-ascent").setAttribute("aria-label", result.stage
      ? format(copy.ascentPosition, { stage: toRoman(result.stage) }) : copy.mixedTitle);

    document.querySelector("#result-ascent-labels").innerHTML = stagePoints
      .map((point, index) => {
        const stageNumber = index + 1;
        const item = copy.stages[index];
        const classes = ["ascent-stage"];
        if (stageNumber === result.stage) classes.push("is-closest");

        if (item.assessmentNote) classes.push("is-unassessed");
        return `
          <li class="${classes.join(" ")} ascent-stage-${stageNumber}">
            <strong><span>${toRoman(stageNumber)}</span>${escapeHtml(item.name)}</strong>
            <small>${escapeHtml(copy.families[item.family])}</small>
          </li>
        `;
      })
      .join("");
  }

  function positionAscentMarker(marker, targetX, targetY) {
    const startX = Number(marker.dataset.x ?? 30);
    const startY = Number(marker.dataset.y ?? 530);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    cancelAnimationFrame(ascentAnimationFrame);
    marker.dataset.x = String(targetX);
    marker.dataset.y = String(targetY);

    if (reducedMotion || (Math.abs(startX - targetX) < 0.1 && Math.abs(startY - targetY) < 0.1)) {
      marker.setAttribute("transform", `translate(${targetX.toFixed(1)} ${targetY.toFixed(1)})`);
      return;
    }

    const startedAt = performance.now();
    const duration = 820;
    const animate = (timestamp) => {
      const elapsed = clamp((timestamp - startedAt) / duration, 0, 1);
      const eased = 1 - (1 - elapsed) ** 3;
      const x = startX + (targetX - startX) * eased;
      const y = startY + (targetY - startY) * eased;
      marker.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      if (elapsed < 1) ascentAnimationFrame = requestAnimationFrame(animate);
    };
    ascentAnimationFrame = requestAnimationFrame(animate);
  }

  function calculateResult() {
    return window.spiritualAssessmentEngine.evaluate(assessment,state.answers);
  }

  function getAnsweredEntries() {
    return questionBlueprints.filter(question=>Number.isInteger(state.answers[question.id]));
  }

  function getQuestionOptions(copy,index) {
    return questionCopies[state.language][index].options;
  }

  function isComplete() {
    return questionBlueprints.every(question=>{
      const value=state.answers[question.id];
      return value==="skip" || (Number.isInteger(value) && value>=0 && value<question.optionCount);
    });
  }

  function clearAndRetake() {
    state.answers = {};
    state.mysticalAnswers = {};
    state.mysticalOpen = false;
    renderMystical();
    state.currentIndex = 0;
    showView("question");
    renderQuestion();
    requestAnimationFrame(() => document.querySelector("#question-title").focus());
  }

  function updateStartLabel() {
    const hasProgress = Object.keys(state.answers).length > 0;
    const label = hasProgress
      ? translations[state.language].continue
      : translations[state.language].start;
    const span = elements.startButton.querySelector("span");
    if (span) span.textContent = label;
    elements.restartButton.hidden = !hasProgress;
  }

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function format(template, values) {
    return Object.entries(values).reduce(
      (output, [key, value]) => output.replaceAll(`{${key}}`, String(value)),
      template
    );
  }

  function toRoman(number) {
    return ["I", "II", "III", "IV", "V", "VI", "VII"][number - 1] || String(number);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function registerWebMcpTools() {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const toolCopy = translations[state.language].webMcp;

    const reportRegistrationError = (error) => {
      console.warn("WebMCP tool registration was unavailable.", error);
    };

    const register = (tool) => {
      try {
        void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal }))
          .catch(reportRegistrationError);
      } catch (error) {
        reportRegistrationError(error);
      }
    };

    register({
      name: "get_spiritual_reflection_questions",
      title: toolCopy.questionsTitle,
      description: toolCopy.questionsDescription,
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute() {
        const copy = translations[state.language];
        return {
          language: state.language,
          questions: questionBlueprints.map((question, index) => ({
            id: question.id,
            domain: copy.domains[question.domain],
            prompt: questionCopies[state.language][index].title,
            example: questionCopies[state.language][index].example,
            clarification: questionCopies[state.language][index].clarification || null,
            domainHelp: copy.domainHelp[question.domain],
            responseInstructions: copy.chooseClosest,
            skipLabel: copy.preferNot,
            options: getQuestionOptions(copy, index).map((label, optionIndex) => ({ optionIndex, label }))
          }))
        };
      }
    });

    register({
      name: "set_spiritual_reflection_answers",
      title: toolCopy.answersTitle,
      description: toolCopy.answersDescription,
      inputSchema: {
        type: "object",
        properties: {
          answers: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              properties: {
                questionId: { type: "string" },
                optionIndex: { type: "integer", minimum: 0 },
                skip: { type: "boolean" }
              },
              required: ["questionId"],
              additionalProperties: false
            }
          }
        },
        required: ["answers"],
        additionalProperties: false
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!input || !Array.isArray(input.answers) || input.answers.length === 0) {
          throw new Error(toolCopy.answerRequired);
        }
        let lastIndex = state.currentIndex;
        input.answers.forEach((answer) => {
          const index = questionBlueprints.findIndex((question) => question.id === answer.questionId);
          if (index < 0) throw new Error(format(toolCopy.unknownQuestion, { id: answer.questionId }));
          const blueprint = questionBlueprints[index];
          if (answer.skip === true) {
            state.answers[blueprint.id] = "skip";
          } else {
            const optionCount = getQuestionOptions(translations[state.language], index).length;
            if (!Number.isInteger(answer.optionIndex) || answer.optionIndex < 0 || answer.optionIndex >= optionCount) {
              throw new Error(format(toolCopy.invalidOption, { id: answer.questionId }));
            }
            state.answers[blueprint.id] = answer.optionIndex;
          }
          lastIndex = index;
        });
        state.currentIndex = lastIndex;
        showView("question");
        renderQuestion();
        return {
          updated: input.answers.length,
          answered: getAnsweredEntries().length,
          currentQuestionId: questionBlueprints[state.currentIndex].id
        };
      }
    });

    register({
      name: "calculate_spiritual_reflection_result",
      title: toolCopy.resultTitle,
      description: toolCopy.resultDescription,
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute() {
        if (!isComplete()) {
          throw new Error(toolCopy.coverageRequired);
        }
        const result = calculateResult();
        const copy = translations[state.language];
        showView("result");
        renderResult();
        return {
          stage: result.stage,
          stageName: result.stage ? copy.stages[result.stage - 1].name : null,
          interpretation: result.stage ? copy.resultSummary : copy.mixedSummary,
          targetStage: result.targetStage,
          stageChecks: result.stageChecks,
          domainProfiles: result.domainProfiles,
          sourceDescription: {
            describedStage: result.stage || result.targetStage,
            note: copy.sourceDescriptionIntro,
            areas: copy.stages[(result.stage || result.targetStage) - 1].sourceDescription.map(({ domain, text }) => ({
              domain, label: copy.domains[domain], text
            })),
            caution: copy.sourceDescriptionCaution
          },
          answered: result.answeredCount,
          skipped: result.skippedCount,
          limitation: copy.upperLimitNote
        };
      }
    });

    window.addEventListener("pagehide", () => lifecycle.abort(), { once: true });
  }

  elements.languageSelect.addEventListener("change", (event) => {
    state.language = event.target.value;
    applyLanguage();
    persistState();
  });

  elements.startButton.addEventListener("click", openQuestionnaire);
  elements.restartButton.addEventListener("click", () => {
    if (window.confirm(translations[state.language].restartConfirm)) clearAndRetake();
  });
  elements.exitButton.addEventListener("click", returnToIntro);
  elements.brandLink.addEventListener("click", (event) => {
    event.preventDefault();
    returnToIntro();
  });
  document.querySelector("#intro-results-button").addEventListener("click", openResults);
  document.querySelector("#question-results-button").addEventListener("click", openResults);
  document.querySelector("#result-home-button").addEventListener("click", returnToIntro);
  elements.stagePath.addEventListener("click", (event) => {
    const button = event.target.closest("[data-stage-index]");
    if (button) openStageDetails(Number(button.dataset.stageIndex));
  });
  document.querySelector("#stage-dialog-previous").addEventListener("click", () => moveStageDetails(-1));
  document.querySelector("#stage-dialog-next").addEventListener("click", () => moveStageDetails(1));
  document.querySelector("#stage-dialog-close").addEventListener("click", () => document.querySelector("#stage-dialog").close());
  document.querySelector("#stage-dialog").addEventListener("close", () => {
    elements.stagePath.querySelector(`[data-stage-index="${stageOpenerIndex}"]`)?.focus();
  });
  elements.previousButton.addEventListener("click", movePrevious);
  elements.nextButton.addEventListener("click", moveNext);
  elements.reviewButton.addEventListener("click", () => {
    state.currentIndex = 0;
    openQuestionnaire();
  });
  document.querySelector("#criteria-stage-select").addEventListener("change", (event) => {
    const selectedStage = Number(event.target.value);
    if (Number.isInteger(selectedStage) && selectedStage >= 1 && selectedStage <= highestAssessedStage) {
      renderCriteria(calculateResult(), selectedStage);
    }
  });
  document.querySelector("#domain-profile").addEventListener("click", (event) => {
    const button = event.target.closest("[data-review-domain]");
    if (!button || !domainOrder.includes(button.dataset.reviewDomain)) return;
    const result = calculateResult();
    const profile = result.domainProfiles.find(item => item.domain === button.dataset.reviewDomain);
    if (!profile?.targetStage) return;
    document.querySelector("#criteria-stage-select").value = String(profile.targetStage);
    renderCriteria(result, profile.targetStage);
    const group = document.querySelector(`[data-criteria-domain="${button.dataset.reviewDomain}"]`);
    if (!group) return;
    group.open = true;
    group.scrollIntoView({block:"start",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
    group.querySelector("summary").focus({preventScroll:true});
  });
  document.querySelector("#criteria-checks").addEventListener("click", (event) => {
    const button = event.target.closest("[data-review-question]");
    if (!button) return;
    state.currentIndex = Number(button.dataset.reviewQuestion);
    openQuestionnaire();
  });
  elements.printButton.addEventListener("click", () => window.print());
  document.querySelector("#mystical-toggle").addEventListener("click", () => {
    state.mysticalOpen = !state.mysticalOpen;
    renderMystical();
    persistState();
  });
  document.querySelector("#mystical-clear").addEventListener("click", () => {
    state.mysticalAnswers = {};
    renderMystical();
    persistState();
    document.querySelector("#mystical-toggle").focus();
  });
  document.querySelector("#mystical-fields").addEventListener("change", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    const question = mysticalConfig.questions.find(item => item.id === input.dataset.mysticalQuestion);
    if (!question || !question.options.includes(input.value)) return;
    state.mysticalAnswers[question.id] = input.value;
    persistState();
    // Do not replace the radio inputs here: preserve focus and arrow-key use.
    renderMysticalSummary();
    document.querySelector("#mystical-status").textContent = mysticalCopies[state.language].answerSaved;
  });
  elements.retakeButton.addEventListener("click", clearAndRetake);
  elements.optionsRoot.addEventListener("change", (event) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    const blueprint = questionBlueprints[state.currentIndex];
    state.answers[blueprint.id] = event.target.value === "skip" ? "skip" : Number(event.target.value);
    persistState();
    elements.nextButton.disabled = false;
    updateResultNavigation();
    elements.assessmentMessage.hidden = true;
  });

  applyLanguage();
  showView(state.view);
  registerWebMcpTools();
})();
