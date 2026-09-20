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
    questionTerminology: document.querySelector("#question-terminology"),
    questionTermsHeading: document.querySelector("#question-terms-heading"),
    questionTermsHint: document.querySelector("#question-terms-hint"),
    questionTermsContent: document.querySelector("#question-terms-content"),
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
    view: restoredState?.view ?? "intro",
    reviewUpdatedQuestions: restoredState?.reviewUpdatedQuestions ?? false
  };

  if (state.view === "result" && !isComplete()) {
    state.view = "question";
    state.currentIndex = questionBlueprints.findIndex(question => state.answers[question.id] === undefined);
  }
  if (state.reviewUpdatedQuestions) {
    const firstMissing = questionBlueprints.findIndex(question => state.answers[question.id] === undefined);
    if (firstMissing >= 0) state.currentIndex = firstMissing;
  }

  let ascentAnimationFrame = 0;
  let selectedStageIndex = 0;
  let stageOpener = null;
  let stageDialogMode = "single";

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
      const current = sessionStorage.getItem(storageKey);
      const saved = JSON.parse(current || sessionStorage.getItem("spiritual-progress-reflection:v5") || sessionStorage.getItem("spiritual-progress-reflection:v4") || "null");
      if (!saved || ![4, 5, storageVersion].includes(saved.version)) return null;

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

      const reviewUpdatedQuestions = Boolean(saved.reviewUpdatedQuestions ||
        (saved.version !== storageVersion && Object.keys(saved.answers || {}).length));
      return { language, currentIndex, answers, view, reviewUpdatedQuestions };
    } catch {
      return null;
    }
  }

  function persistState() {
    if (questionBlueprints.filter(question => question.gradation).every(question => state.answers[question.id] !== undefined)) {
      state.reviewUpdatedQuestions = false;
    }
    document.querySelector("#migration-notice").hidden = !state.reviewUpdatedQuestions;
    try {
      sessionStorage.setItem(storageKey, JSON.stringify({
        version: storageVersion,
        language: state.language,
        currentIndex: state.currentIndex,
        answers: state.answers,
        view: state.view,
        reviewUpdatedQuestions: state.reviewUpdatedQuestions
      }));
      // Preserve only unchanged, stable IDs; rewritten questions must be answered again.
      sessionStorage.removeItem("spiritual-progress-reflection:v5");
      sessionStorage.removeItem("spiritual-progress-reflection:v4");
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
        <li class="${index >= highestAssessedStage ? "is-unassessed" : ""}">
          <button type="button" class="stage-explore-button" data-stage-index="${index}" aria-haspopup="dialog" aria-label="${escapeHtml(format(copy.exploreStageLabel, {stage:toRoman(index + 1),name:stage.name}))}">
          <span class="stage-dot" aria-hidden="true"></span>
          <span class="stage-copy">
            <strong>${toRoman(index + 1)}. ${escapeHtml(stage.name)}</strong>
            <span>${escapeHtml(copy.families[stage.family])}</span>
            <span class="stage-explore-label">${escapeHtml(copy.readStage)}</span>
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
    const all = stageDialogMode === "all";
    document.querySelector("#stage-single-content").hidden = all;
    document.querySelector("#stage-all-descriptions").hidden = !all;
    document.querySelector("#stage-dialog-navigation").hidden = all;
    if (all) {
      document.querySelector("#stage-dialog-heading").textContent = copy.allStagesTitle;
      document.querySelector("#stage-dialog-family").textContent = copy.pathEyebrow;
      document.querySelector("#stage-all-descriptions").innerHTML = copy.stages.map((item, index) =>
        `<details class="all-stage-entry"><summary><span>${toRoman(index + 1)}. ${escapeHtml(item.name)}</span><span class="stage-open-hint">${escapeHtml(copy.readStage)}</span></summary>
        <p class="all-stage-family">${escapeHtml(copy.families[item.family])}</p>${item.assessmentNote ? `<p class="stage-dialog-note">${escapeHtml(item.assessmentNote)}</p>` : ""}
        ${item.sourceDescription.length ? sourceParagraphs(item, copy) : `<p>${escapeHtml(item.summary)}</p>`}
        <p class="source-description-reference">${escapeHtml(format(copy.sourceDescriptionReference, {stage:toRoman(index + 1)}))}</p></details>`).join("")
        + `<p class="source-description-caution">${escapeHtml(copy.sourceDescriptionCaution)}</p>`;
      return;
    }
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

  function openStageDetails(index, opener) {
    if (!Number.isInteger(index) || index < 0 || index >= translations[state.language].stages.length) return;
    selectedStageIndex = index;
    stageDialogMode = "single";
    stageOpener = opener || document.activeElement;
    renderStageDetails();
    document.querySelector("#stage-dialog").showModal();
    document.querySelector("#stage-dialog-content").scrollTop = 0;
    document.querySelector("#stage-dialog-heading").focus();
  }

  function openAllStages(event) {
    stageDialogMode = "all";
    stageOpener = event?.currentTarget || document.activeElement;
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
    elements.questionContext.open = false;
    const terminology = window.spiritualTerminology.describe(state.language, blueprint.id);
    elements.questionTerminology.hidden = !terminology.terms.length;
    elements.questionTermsHeading.textContent = terminology.labels.title;
    elements.questionTermsHint.textContent = terminology.terms.length > 1 ? terminology.labels.hint : terminology.labels.singleHint;
    elements.questionTermsContent.innerHTML = window.spiritualTerminology.render(state.language, blueprint.id);
    elements.questionProgress.value = state.currentIndex + 1;
    elements.questionProgress.max = questionBlueprints.length;
    elements.previousButton.disabled = state.currentIndex === 0;
    elements.nextButton.disabled = selected === undefined;
    elements.nextButtonLabel.textContent = isLast ? copy.seeResult : copy.next;
    elements.assessmentMessage.hidden = true;
    const gradationHint = document.querySelector("#gradation-question-hint");
    gradationHint.textContent = copy.gradation.questionHint;
    gradationHint.hidden = !blueprint.gradation;

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
          <span class="answer-content"><span class="answer-copy">${question.optionHeadings?.[choice.value] ? `<strong class="answer-heading">${escapeHtml(question.optionHeadings[choice.value])}</strong>` : ""}<span>${escapeHtml(choice.label)}</span></span></span>
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
    document.querySelector("#result-scope").hidden = !(result.stage >= 5);
    document.querySelector("#result-scope").textContent = copy.advancedPracticalNote;
    const describedStage=result.stage || result.targetStage;
    const description=copy.stages[describedStage - 1];
    document.querySelector("#source-description-heading").textContent=`${toRoman(describedStage)}. ${description.name}`;
    document.querySelector("#source-description-intro").textContent=stage ? copy.sourceDescriptionIntro : copy.sourceDescriptionFallback;
    document.querySelector("#source-description-body").innerHTML=sourceParagraphs(description,copy);
    document.querySelector("#source-description-reference").textContent=format(copy.sourceDescriptionReference,{stage:toRoman(describedStage)});
    document.querySelector("#criteria-badge").textContent=copy.ruleBased;
    document.querySelector("#result-range").textContent=result.stage===highestAssessedStage
      ? copy.upperLimitNote : format(copy.nextThreshold,{stage:toRoman(result.targetStage)});
    const nextStage = window.spiritualNextStage.describe(assessment, result, questionCopies[state.language], copy, state.language);
    document.querySelector("#next-stage-summary").innerHTML = window.spiritualNextStage.render(nextStage, copy);
    document.querySelector("#profile-title").textContent=copy.domainLevels.title;
    document.querySelector("#domain-profile").innerHTML=result.domainProfiles.map(profile =>
      resultPresentation.renderDomain(profile.domain, profile.targetChecks, copy, profile,
        window.spiritualGrowthGuidance.describe(profile, questionCopies[state.language], copy, state.language),
        window.spiritualGradation.describe(assessment, state.answers, profile, questionCopies[state.language]))
    ).join("");
    document.querySelector("#criteria-legend").innerHTML = resultPresentation.renderLegend(copy);
    document.querySelector("#answered-summary").textContent=format(copy.answeredSummary,{answered:result.answeredCount,total:questionBlueprints.length,skipped:result.skippedCount});
    document.querySelector("#criteria-summary").textContent=copy.criteriaSummary;
    document.querySelector("#criteria-stage-select").innerHTML=copy.stages.slice(0,highestAssessedStage).map((item,index)=>`<option value="${index + 1}" ${index + 1===result.targetStage ? "selected" : ""}>${toRoman(index + 1)}. ${escapeHtml(item.name)}</option>`).join("");
    renderCriteria(result,result.targetStage);
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

        if (stageNumber > highestAssessedStage) classes.push("is-unassessed");
        return `
          <li class="${classes.join(" ")} ascent-stage-${stageNumber}">
            <button type="button" class="ascent-stage-button" data-result-stage-index="${index}" aria-haspopup="dialog" aria-label="${escapeHtml(format(copy.exploreStageLabel,{stage:toRoman(stageNumber),name:item.name}))}">
            <strong><span>${toRoman(stageNumber)}</span>${escapeHtml(item.name)}</strong>
            <small>${escapeHtml(copy.families[item.family])}</small>
            </button>
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
    state.reviewUpdatedQuestions = false;
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
            terminology: window.spiritualTerminology.describe(state.language, question.id).terms,
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
  document.querySelector("#all-stages-button").addEventListener("click", openAllStages);
  document.querySelector("#result-stages-button").addEventListener("click", openAllStages);
  elements.stagePath.addEventListener("click", (event) => {
    const button = event.target.closest("[data-stage-index]");
    if (button) openStageDetails(Number(button.dataset.stageIndex), button);
  });
  document.querySelector("#result-ascent-labels").addEventListener("click", (event) => {
    const button = event.target.closest("[data-result-stage-index]");
    if (button) openStageDetails(Number(button.dataset.resultStageIndex), button);
  });
  document.querySelector("#stage-dialog-previous").addEventListener("click", () => moveStageDetails(-1));
  document.querySelector("#stage-dialog-next").addEventListener("click", () => moveStageDetails(1));
  document.querySelector("#stage-dialog-close").addEventListener("click", () => document.querySelector("#stage-dialog").close());
  document.querySelector("#stage-dialog").addEventListener("close", () => {
    stageOpener?.focus();
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
    const review = event.target.closest("[data-growth-question]");
    if (review) {
      const index = Number(review.dataset.growthQuestion);
      if (!Number.isInteger(index) || index < 0 || index >= questionBlueprints.length) return;
      state.currentIndex = index;
      openQuestionnaire();
      return;
    }
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
  document.querySelector("#next-stage-summary").addEventListener("click", (event) => {
    const review = event.target.closest("[data-next-question]");
    if (review) {
      const index = Number(review.dataset.nextQuestion);
      if (!Number.isInteger(index) || index < 0 || index >= questionBlueprints.length) return;
      state.currentIndex = index;
      openQuestionnaire();
      return;
    }
    const details = event.target.closest("[data-next-criteria]");
    if (!details) return;
    const stageNumber = Number(details.dataset.nextCriteria);
    if (!Number.isInteger(stageNumber) || stageNumber < 1 || stageNumber > highestAssessedStage) return;
    document.querySelector("#criteria-stage-select").value = String(stageNumber);
    renderCriteria(calculateResult(), stageNumber);
    const heading = document.querySelector("#criteria-heading");
    heading.setAttribute("tabindex", "-1");
    heading.scrollIntoView({block:"start",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
    heading.focus({preventScroll:true});
  });
  elements.printButton.addEventListener("click", () => window.print());
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
