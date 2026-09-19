(() => {
  "use strict";

  const assessment = window.spiritualAssessment;
  const domainOrder = assessment.domainOrder;
  const questionBlueprints = assessment.questionBlueprints;
  const minimumAnswers = 21;
  const minimumItemsPerDomain = 2;
  const lowestAssessedStage = 1;
  const highestAssessedStage = 6;
  const storageVersion = 2;
  const storageKey = "spiritual-progress-reflection:v2";

  const translations = window.spiritualLocales;


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
    view: restoredState?.view ?? "intro"
  };

  if (state.view === "result" && !hasMinimumCoverage(getAnsweredEntries())) {
    state.view = "question";
  }

  let ascentAnimationFrame = 0;

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
        if (answer === "skip" || (Number.isInteger(answer) && answer >= 0 && answer < 5)) {
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

      return { language, currentIndex, answers, view };
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
    updateStartLabel();
    if (state.view === "question") renderQuestion();
    if (state.view === "result") renderResult();
  }

  function renderStagePath() {
    const copy = translations[state.language];
    elements.stagePath.innerHTML = copy.stages
      .map((stage, index) => `
        <li class="${stage.assessmentNote ? "is-unassessed" : ""}">
          <span class="stage-dot" aria-hidden="true"></span>
          <span class="stage-copy">
            <strong>${toRoman(index + 1)}. ${escapeHtml(stage.name)}</strong>
            <span>${escapeHtml(copy.families[stage.family])}</span>
            ${stage.assessmentNote ? `<small>${escapeHtml(stage.assessmentNote)}</small>` : ""}
          </span>
        </li>
      `)
      .join("");
  }

  function renderQuestion() {
    const copy = translations[state.language];
    const blueprint = questionBlueprints[state.currentIndex];
    const question = copy.questions[state.currentIndex];
    const selected = state.answers[blueprint.id];
    const isLast = state.currentIndex === questionBlueprints.length - 1;

    document.querySelector("#question-number").textContent = String(state.currentIndex + 1);
    document.querySelector("#question-total").textContent = String(questionBlueprints.length);
    document.querySelector("#progress-domain").textContent = copy.domains[blueprint.domain];
    document.querySelector("#question-kicker").textContent = question.kicker;
    document.querySelector("#question-title").textContent = question.title;
    elements.questionExampleText.textContent = question.example;
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
    persistState();
    window.scrollTo({ top: 0, behavior: "smooth" });
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

    const answered = getAnsweredEntries();
    if (!hasMinimumCoverage(answered)) {
      const counts = countAnsweredByDomain(answered);
      const firstSkipped = questionBlueprints.findIndex((question) =>
        state.answers[question.id] === "skip" && counts[question.domain] < minimumItemsPerDomain
      );
      const anySkipped = questionBlueprints.findIndex((question) => state.answers[question.id] === "skip");
      state.currentIndex = firstSkipped >= 0 ? firstSkipped : (anySkipped >= 0 ? anySkipped : 0);
      renderQuestion();
      persistState();
      elements.assessmentMessage.textContent = translations[state.language].needMore;
      elements.assessmentMessage.hidden = false;
      return;
    }

    showView("result");
    renderResult();
    requestAnimationFrame(() => document.querySelector("#result-heading").focus());
  }

  function renderResult() {
    const copy = translations[state.language];
    const result = calculateResult();
    const stage = copy.stages[result.stage - 1];

    renderAscent(result, copy);

    document.querySelector("#result-number").textContent = toRoman(result.stage);
    document.querySelector("#result-family").textContent = copy.families[stage.family];
    document.querySelector("#result-heading").textContent = stage.name;
    document.querySelector("#result-summary").textContent = stage.summary;
    document.querySelector("#confidence-badge").textContent = `${result.stabilityPercent}% · ${copy.confidence[result.confidence]}`;

    const rangeText = result.lower === result.upper
      ? format(copy.rangeSingle, { stage: toRoman(result.stage) })
      : format(copy.rangeMultiple, { lower: toRoman(result.lower), upper: toRoman(result.upper) });
    document.querySelector("#result-range").textContent = rangeText;

    document.querySelector("#domain-profile").innerHTML = domainOrder
      .map((domain) => {
        const score = result.domainScores[domain];
        if (score === null) {
          return `
            <div class="domain-row">
              <div class="domain-row-head">
                <span>${escapeHtml(copy.domains[domain])}</span>
                <span class="domain-unanswered">${escapeHtml(copy.notAnswered)}</span>
              </div>
              <progress
                class="domain-track"
                value="0"
                max="${highestAssessedStage}"
                aria-label="${escapeHtml(copy.domains[domain])}"
                aria-valuetext="${escapeHtml(copy.notAnswered)}"
              ></progress>
            </div>
          `;
        }
        const stageNumber = clamp(Math.round(score), lowestAssessedStage, highestAssessedStage);
        const stageName = copy.stages[stageNumber - 1].name;
        return `
          <div class="domain-row">
            <div class="domain-row-head">
              <span>${escapeHtml(copy.domains[domain])}</span>
              <span class="domain-stage">${toRoman(stageNumber)} · ${escapeHtml(stageName)}</span>
            </div>
            <progress
              class="domain-track"
              value="${score.toFixed(1)}"
              max="${highestAssessedStage}"
              aria-label="${escapeHtml(copy.domains[domain])}"
              aria-valuetext="${toRoman(stageNumber)} · ${escapeHtml(stageName)}"
            ></progress>
          </div>
        `;
      })
      .join("");

    document.querySelector("#answered-summary").textContent = format(copy.answeredSummary, {
      answered: result.answeredCount,
      total: questionBlueprints.length,
      domains: result.domainCount
    });
    document.querySelector("#confidence-summary").textContent = format(copy.stabilitySummary, {
      percent: result.stabilityPercent,
      stage: toRoman(result.stage),
      lower: toRoman(result.lower),
      upper: toRoman(result.upper)
    });
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
    const score = clamp(result.overallScore, lowestAssessedStage, highestAssessedStage);
    const lowerIndex = Math.min(Math.floor(score) - lowestAssessedStage, highestAssessedStage - 1);
    const fraction = score >= highestAssessedStage ? 0 : score - Math.floor(score);
    const start = stagePoints[lowerIndex];
    const end = stagePoints[Math.min(lowerIndex + 1, highestAssessedStage - 1)];
    const markerX = start.x + (end.x - start.x) * fraction;
    const markerY = start.y + (end.y - start.y) * fraction;

    positionAscentMarker(
      document.querySelector("#result-ascent-marker"),
      markerX,
      markerY
    );

    const ascent = document.querySelector("#result-ascent");
    ascent.setAttribute("aria-valuenow", score.toFixed(1));
    ascent.setAttribute("aria-valuetext", format(copy.ascentPosition, {
      score: score.toFixed(1),
      stage: toRoman(result.stage)
    }));

    document.querySelector("#result-ascent-labels").innerHTML = stagePoints
      .map((point, index) => {
        const stageNumber = index + 1;
        const item = copy.stages[index];
        const classes = ["ascent-stage"];
        if (stageNumber === result.stage) classes.push("is-closest");
        if (stageNumber >= result.lower && stageNumber <= result.upper) classes.push("is-in-range");
        if (item.assessmentNote) classes.push("is-unassessed");
        return `
          <li class="${classes.join(" ")} ascent-stage-${stageNumber}">
            <strong><span>${toRoman(stageNumber)}</span>${escapeHtml(item.name)}</strong>
            <small>${escapeHtml(copy.families[item.family])}</small>
            ${item.assessmentNote ? `<em>${escapeHtml(item.assessmentNote)}</em>` : ""}
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
    const answered = getAnsweredEntries();
    const grouped = Object.fromEntries(domainOrder.map((domain) => [domain, []]));
    answered.forEach(({ blueprint, score }) => grouped[blueprint.domain].push(score));

    const domainScores = Object.fromEntries(domainOrder.map((domain) => {
      const values = grouped[domain];
      return [domain, values.length ? average(values) : null];
    }));

    const representedScores = Object.values(domainScores).filter((score) => score !== null);
    const overallScore = clamp(average(representedScores), lowestAssessedStage, highestAssessedStage);
    const stage = clamp(Math.round(overallScore), lowestAssessedStage, highestAssessedStage);
    const stability = estimatePatternStability(grouped, stage);
    const lower = Math.min(
      stage,
      clamp(Math.round(stability.lowerScore), lowestAssessedStage, highestAssessedStage)
    );
    const upper = Math.max(
      stage,
      clamp(Math.round(stability.upperScore), lowestAssessedStage, highestAssessedStage)
    );
    const domainCount = representedScores.length;
    const counts = countAnsweredByDomain(answered);
    const minimumDomainItems = Math.min(...Object.values(counts));
    const intervalWidth = stability.upperScore - stability.lowerScore;
    let confidence = "low";
    if (answered.length >= 26 && minimumDomainItems >= 3 && stability.support >= 0.8 && intervalWidth <= 1) {
      confidence = "high";
    } else if (answered.length >= minimumAnswers && minimumDomainItems >= minimumItemsPerDomain && stability.support >= 0.6 && intervalWidth <= 1.8) {
      confidence = "moderate";
    }

    return {
      stage,
      overallScore,
      lower,
      upper,
      confidence,
      stabilityPercent: Math.round(stability.support * 100),
      domainScores,
      domainCount,
      answeredCount: answered.length
    };
  }

  function getAnsweredEntries() {
    const scale = [1, 2.25, 3.5, 4.75, 6];
    return questionBlueprints.flatMap((blueprint) => {
      const selected = state.answers[blueprint.id];
      if (selected === undefined || selected === "skip") return [];
      const directScore = scale[selected];
      const score = blueprint.reverse
        ? highestAssessedStage + lowestAssessedStage - directScore
        : directScore;
      return [{ blueprint, score }];
    });
  }

  function getQuestionOptions(copy, index) {
    return copy.questions[index].options || copy.frequencyOptions;
  }

  function countAnsweredByDomain(answered) {
    const counts = Object.fromEntries(domainOrder.map((domain) => [domain, 0]));
    answered.forEach(({ blueprint }) => { counts[blueprint.domain] += 1; });
    return counts;
  }

  function hasMinimumCoverage(answered) {
    const counts = countAnsweredByDomain(answered);
    return answered.length >= minimumAnswers
      && domainOrder.every((domain) => counts[domain] >= minimumItemsPerDomain);
  }

  function estimatePatternStability(grouped, stage) {
    const signature = questionBlueprints
      .map((question) => `${question.id}:${state.answers[question.id] ?? "x"}`)
      .join("|");
    const random = seededRandom(signature);
    const sampleScores = [];
    let stageMatches = 0;

    for (let iteration = 0; iteration < 1000; iteration += 1) {
      const sampledDomains = domainOrder.flatMap((domain) => {
        const values = grouped[domain];
        if (!values.length) return [];
        const resampled = Array.from(
          { length: values.length },
          () => values[Math.floor(random() * values.length)]
        );
        return [average(resampled)];
      });
      const sampleScore = clamp(
        average(sampledDomains),
        lowestAssessedStage,
        highestAssessedStage
      );
      sampleScores.push(sampleScore);
      if (
        clamp(Math.round(sampleScore), lowestAssessedStage, highestAssessedStage) === stage
      ) stageMatches += 1;
    }

    return {
      support: stageMatches / sampleScores.length,
      lowerScore: percentile(sampleScores, 0.025),
      upperScore: percentile(sampleScores, 0.975)
    };
  }

  function seededRandom(text) {
    let seed = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      seed ^= text.charCodeAt(index);
      seed = Math.imul(seed, 16777619);
    }
    return () => {
      seed += 0x6d2b79f5;
      let value = seed;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function clearAndRetake() {
    state.answers = {};
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

  function average(values) {
    if (!values.length) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function percentile(values, ratio) {
    if (!values.length) return 1;
    const sorted = [...values].sort((a, b) => a - b);
    const position = (sorted.length - 1) * ratio;
    const lower = Math.floor(position);
    const upper = Math.ceil(position);
    if (lower === upper) return sorted[lower];
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower);
  }

  function standardDeviation(values) {
    const mean = average(values);
    return Math.sqrt(average(values.map((value) => (value - mean) ** 2)));
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
            prompt: copy.questions[index].title,
            example: copy.questions[index].example,
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
        const answered = getAnsweredEntries();
        if (!hasMinimumCoverage(answered)) {
          throw new Error(toolCopy.coverageRequired);
        }
        const result = calculateResult();
        const copy = translations[state.language];
        showView("result");
        renderResult();
        return {
          stage: result.stage,
          stageName: copy.stages[result.stage - 1].name,
          approximateScore: Number(result.overallScore.toFixed(1)),
          range: { lower: result.lower, upper: result.upper },
          patternStabilityPercent: result.stabilityPercent,
          answered: result.answeredCount,
          representedDomains: result.domainCount
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
  elements.previousButton.addEventListener("click", movePrevious);
  elements.nextButton.addEventListener("click", moveNext);
  elements.reviewButton.addEventListener("click", () => {
    state.currentIndex = 0;
    openQuestionnaire();
  });
  elements.printButton.addEventListener("click", () => window.print());
  elements.retakeButton.addEventListener("click", clearAndRetake);
  elements.optionsRoot.addEventListener("change", (event) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    const blueprint = questionBlueprints[state.currentIndex];
    state.answers[blueprint.id] = event.target.value === "skip" ? "skip" : Number(event.target.value);
    persistState();
    elements.nextButton.disabled = false;
    elements.assessmentMessage.hidden = true;
  });

  applyLanguage();
  showView(state.view);
  registerWebMcpTools();
})();
