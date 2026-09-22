(function () {
  "use strict";

  var app = document.getElementById("experience");
  var scenes = Array.prototype.slice.call(document.querySelectorAll("[data-scene]"));
  var startButton = document.getElementById("start-button");
  var growthButton = document.getElementById("growth-button");
  var replayButton = document.getElementById("replay-button");
  var bloomStage = document.getElementById("bloom-stage");
  var bloomPhase = document.getElementById("bloom-phase");
  var bloomNote = document.getElementById("bloom-note");
  var pollinationStage = document.getElementById("pollination-stage");
  var targetAnther = document.getElementById("target-anther");
  var targetStigma = document.getElementById("target-stigma");
  var bee = document.getElementById("bee");
  var pollinationStatus = document.getElementById("pollination-status");
  var pollinationDetail = document.getElementById("pollination-detail");
  var pollinationDetailImage = document.getElementById("pollination-detail-image");
  var pollenSlides = Array.prototype.slice.call(document.querySelectorAll("[data-pollen-slide]"));
  var pollenDots = Array.prototype.slice.call(document.querySelectorAll("[data-pollen-dot]"));
  var pollenNext = document.getElementById("pollen-next");
  var pollenNextLabel = document.getElementById("pollen-next-label");
  var anatomyFrames = Array.prototype.slice.call(document.querySelectorAll("[data-anatomy-frame]"));
  var anatomyTabs = Array.prototype.slice.call(document.querySelectorAll("[data-anatomy-step]"));
  var anatomyCallout = document.getElementById("anatomy-callout");
  var anatomyNext = document.getElementById("anatomy-next");
  var fertilizationStage = document.getElementById("fertilization-stage");
  var fertilizationButton = document.getElementById("fertilization-button");
  var fertilizationButtonLabel = document.getElementById("fertilization-button-label");
  var fertilizationStatus = document.getElementById("fertilization-status");
  var fertilizationDetail = document.getElementById("fertilization-detail");
  var globalMenuButton = document.getElementById("global-menu-button");
  var chapterMenu = document.getElementById("chapter-menu");
  var endingMenuButton = document.getElementById("ending-menu-button");
  var primaryNavigation = document.getElementById("primary-navigation");
  var primaryNavigationButtons = Array.prototype.slice.call(document.querySelectorAll("[data-primary-jump]"));
  var toGrowthButton = document.getElementById("to-growth-button");
  var growthStage = document.getElementById("growth-stage");
  var growthFrames = Array.prototype.slice.call(document.querySelectorAll("[data-growth-frame]"));
  var growthRange = document.getElementById("growth-range");
  var growthStageName = document.getElementById("growth-stage-name");
  var growthStageDetail = document.getElementById("growth-stage-detail");
  var growthHint = document.getElementById("growth-hint");
  var toFlavorButton = document.getElementById("to-flavor-button");
  var foundationObserver = document.getElementById("foundation-observer");
  var foundationFrames = Array.prototype.slice.call(document.querySelectorAll("[data-foundation-frame]"));
  var foundationTabs = Array.prototype.slice.call(document.querySelectorAll("[data-foundation-step]"));
  var foundationName = document.getElementById("foundation-name");
  var foundationDetail = document.getElementById("foundation-detail");
  var foundationNext = document.getElementById("foundation-next");
  var foundationNextLabel = document.getElementById("foundation-next-label");
  var daynightStage = document.getElementById("daynight-stage");
  var daynightRange = document.getElementById("daynight-range");
  var daynightName = document.getElementById("daynight-name");
  var daynightDetail = document.getElementById("daynight-detail");
  var daynightHint = document.getElementById("daynight-hint");
  var toRipenessButton = document.getElementById("to-ripeness-button");
  var ripenessObserver = document.getElementById("ripeness-observer");
  var ripenessFrames = Array.prototype.slice.call(document.querySelectorAll("[data-ripeness-frame]"));
  var ripenessTabs = Array.prototype.slice.call(document.querySelectorAll("[data-ripeness-state]"));
  var ripenessName = document.getElementById("ripeness-name");
  var ripenessDetail = document.getElementById("ripeness-detail");
  var storageButton = document.getElementById("storage-button");
  var abnormalButton = document.getElementById("abnormal-button");
  var toFeedbackButton = document.getElementById("to-feedback-button");
  var feedbackForm = document.getElementById("feedback-form");
  var feedbackStatus = document.getElementById("feedback-status");
  var finishButton = document.getElementById("finish-button");
  var infoOverlay = document.getElementById("info-overlay");
  var infoEyebrow = document.getElementById("info-eyebrow");
  var infoTitle = document.getElementById("info-title");
  var infoImage = document.getElementById("info-image");
  var infoCopy = document.getElementById("info-copy");
  var careStartButton = document.getElementById("care-start-button");
  var openCameraButton = document.getElementById("open-camera-button");
  var choosePhotoButton = document.getElementById("choose-photo-button");
  var useDemoButton = document.getElementById("use-demo-button");
  var photoInput = document.getElementById("photo-input");
  var cameraVideo = document.getElementById("camera-video");
  var cameraCanvas = document.getElementById("camera-canvas");
  var cameraStatus = document.getElementById("camera-status");
  var closeCameraButton = document.getElementById("close-camera-button");
  var cameraGalleryButton = document.getElementById("camera-gallery-button");
  var cameraShutterButton = document.getElementById("camera-shutter-button");
  var cameraDemoButton = document.getElementById("camera-demo-button");
  var previewImage = document.getElementById("preview-image");
  var analysisImage = document.getElementById("analysis-image");
  var resultImage = document.getElementById("result-image");
  var retakeButton = document.getElementById("retake-button");
  var analyzeButton = document.getElementById("analyze-button");
  var resultBadge = document.getElementById("result-badge");
  var resultTitle = document.getElementById("result-title");
  var resultSummary = document.getElementById("result-summary");
  var resultDisclaimer = document.getElementById("result-disclaimer");
  var normalResultActions = document.getElementById("normal-result-actions");
  var specialResultActions = document.getElementById("special-result-actions");
  var confirmResultButton = document.getElementById("confirm-result-button");
  var adjustResultButton = document.getElementById("adjust-result-button");
  var resultRetakeButton = document.getElementById("result-retake-button");
  var specialResultButton = document.getElementById("special-result-button");
  var specialRetakeButton = document.getElementById("special-retake-button");
  var adviceImage = document.getElementById("advice-image");
  var adviceStateName = document.getElementById("advice-state-name");
  var adviceTitle = document.getElementById("advice-title");
  var adviceDetail = document.getElementById("advice-detail");
  var adviceProfileButton = document.getElementById("advice-profile-button");
  var afterSalesButton = document.getElementById("after-sales-button");
  var issueRetakeButton = document.getElementById("issue-retake-button");
  var manualOverlay = document.getElementById("manual-overlay");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var state = {
    scene: "start",
    timers: [],
    swipeStartY: null,
    bee: {
      dragging: false,
      pointerId: null,
      moved: false,
      progressed: false,
      startX: 0,
      startY: 0,
      pollen: false,
      attempts: 0,
      complete: false
    },
    pollenStep: 0,
    anatomyStep: 0,
    fertilizationStep: 0,
    growthStep: 0,
    growthReleaseCount: 0,
    foundationStep: 0,
    daynightReleaseCount: 0,
     ripenessState: "firm",
    aiResult: "unknown",
     capturedImage: "assets/ch5-turning-ripe.webp",
     capturedSource: "demo",
     captureAssessment: null,
     capturedObjectUrl: "",
    cameraStream: null,
    routeOverlay: false,
    overlayReturnFocus: null
  };

  var sceneModules = {
    start: "system",
    "care-home": "care",
    "camera-guide": "care",
    camera: "care",
    preview: "care",
    analyzing: "care",
    "ai-result": "care",
    advice: "care",
    issue: "care",
    ripeness: "care",
    feedback: "care",
    ending: "care",
    product: "profile",
    bloom: "science",
    pollination: "science",
    pollen: "science",
    anatomy: "science",
    fertilization: "science",
    "pollination-complete": "science",
    growth: "science",
    daynight: "science",
    "flavor-foundation": "science"
  };

  var sceneRoutes = {
    start: "#/start",
    "care-home": "#/care",
    "camera-guide": "#/care/camera-guide",
    camera: "#/care/camera",
    preview: "#/care/preview",
    analyzing: "#/care/analyzing",
    "ai-result": "#/care/result",
    advice: "#/care/advice",
    issue: "#/care/issue",
    ripeness: "#/care/legacy",
    feedback: "#/care/service",
    ending: "#/care/service",
    product: "#/profile",
    bloom: "#/science/pollination",
    pollination: "#/science/pollination",
    pollen: "#/science/growth",
    anatomy: "#/science/growth",
    fertilization: "#/science/growth",
    "pollination-complete": "#/science/growth",
    growth: "#/science/growth",
    daynight: "#/science/day-night",
    "flavor-foundation": "#/science/summary"
  };

  var routeScenes = {
    start: "start",
    care: "care-home",
    "care/camera-guide": "camera-guide",
    "care/camera": "camera-guide",
    "care/preview": "preview",
    "care/analyzing": "preview",
    "care/result": "ai-result",
    "care/advice": "advice",
    "care/issue": "issue",
    "care/service": "feedback",
    profile: "product",
    "science/pollination": "bloom",
    "science/growth": "growth",
    "science/day-night": "daynight",
    "science/summary": "flavor-foundation"
  };

  function schedule(callback, delay) {
    var id = window.setTimeout(callback, delay);
    state.timers.push(id);
    return id;
  }

  function clearTimers() {
    state.timers.forEach(function (id) { window.clearTimeout(id); });
    state.timers = [];
  }

  function showScene(name) {
    clearTimers();
    var previousScene = scenes.find(function (scene) { return scene.classList.contains("is-active"); });
    if (previousScene && previousScene.dataset.scene === "camera" && name !== "camera") stopCamera();
    state.scene = name;
    app.dataset.currentScene = name;
    app.dataset.currentModule = sceneModules[name] || "system";
    var focusedCareFlow = ["start", "camera-guide", "camera", "preview", "analyzing"].indexOf(name) >= 0;
    app.classList.toggle("has-primary-nav", !focusedCareFlow);
    scenes.forEach(function (scene) {
      var active = scene.dataset.scene === name;
      scene.classList.remove("is-leaving");
      scene.classList.toggle("is-active", active);
      scene.setAttribute("aria-hidden", active ? "false" : "true");
    });
    if (previousScene && previousScene.dataset.scene !== name) {
      previousScene.classList.add("is-leaving");
      schedule(function () { previousScene.classList.remove("is-leaving"); }, reducedMotion ? 1 : 360);
    }
    primaryNavigation.hidden = focusedCareFlow;
    primaryNavigation.setAttribute("aria-hidden", focusedCareFlow ? "true" : "false");
    primaryNavigationButtons.forEach(function (button) {
      var active = button.dataset.module === sceneModules[name];
      button.classList.toggle("is-current", active);
      button.setAttribute("aria-current", active ? "page" : "false");
    });

    if (name === "bloom") playBloomSequence();
    if (name === "pollination") resetPollination();
    if (name === "pollen") showPollenStep(0);
    if (name === "anatomy") showAnatomyStep(0);
    if (name === "fertilization") resetFertilization();
    if (name === "growth") updateGrowth(Number(growthRange.value));
    if (name === "flavor-foundation") showFoundationStep(state.foundationStep);
    if (name === "daynight") updateDaynight(Number(daynightRange.value));
    if (name === "ripeness") showRipeness(state.ripenessState);
    if (name === "preview") syncCapturedImages();
    if (name === "ai-result") {
      /* A direct result URL has no preceding analysis step. Keep the
       * built-in demonstration image and its sample state in sync, while
       * leaving real camera/gallery captures on the honest unknown path. */
      if (state.capturedSource === "demo" && state.aiResult === "unknown") {
        state.aiResult = selectedMockResult();
      }
      renderAiResult();
    }
    if (name === "advice") renderAdvice();
    if (!state.routeOverlay && sceneRoutes[name] && window.location.hash !== sceneRoutes[name]) {
      window.history.replaceState(null, "", sceneRoutes[name]);
    }
  }

  function playBloomSequence() {
    var interval = reducedMotion ? 500 : 1250;
    bloomStage.dataset.phase = "1";
    bloomPhase.textContent = "花芽膨大";
    bloomNote.textContent = "同一枝条，开始进入花期。";

    schedule(function () {
      bloomStage.dataset.phase = "2";
      bloomPhase.textContent = "初花";
      bloomNote.textContent = "花瓣展开，花药与柱头逐渐清晰。";
    }, interval);

    schedule(function () {
      bloomStage.dataset.phase = "3";
      bloomPhase.textContent = "盛花";
      bloomNote.textContent = "花开放后，花药释放花粉。";
    }, interval * 2);

    schedule(function () {
      showScene("pollination");
    }, interval * 3.2);
  }

  function resetPollination() {
    Object.assign(state.bee, {
      dragging: false,
      pointerId: null,
      moved: false,
      progressed: false,
      pollen: false,
      attempts: 0,
      complete: false
    });
    bee.disabled = false;
    bee.classList.remove("is-dragging", "has-pollen");
    bee.style.left = "18%";
    bee.style.top = "52%";
    pollinationStage.classList.remove("has-pollen", "is-assisted");
    pollinationDetailImage.src = "assets/ch1-pollen-grain-hybrid.webp";
    pollinationDetailImage.alt = "桃花、花粉与访花蜜蜂观察图";
    pollinationStatus.textContent = "拖动蜜蜂，先经过花药。";
    pollinationDetail.textContent = "花药成熟后裂开，释放花粉。";
  }

  function pointInside(element, x, y) {
    var rect = element.getBoundingClientRect();
    var padding = state.bee.attempts >= 2 ? 10 : 0;
    return x >= rect.left - padding && x <= rect.right + padding &&
      y >= rect.top - padding && y <= rect.bottom + padding;
  }

  function collectPollen() {
    if (state.bee.pollen || state.bee.complete) return;
    state.bee.pollen = true;
    state.bee.progressed = true;
    bee.classList.add("has-pollen");
    pollinationStage.classList.add("has-pollen");
    pollinationDetailImage.src = "assets/ch1-pollen-grain-hybrid.webp";
    pollinationDetailImage.alt = "蜜蜂接触花药并携带花粉的观察图";
    pollinationStatus.textContent = "花粉已经附着。";
    pollinationDetail.textContent = "沿着提示路径，把花粉带到中央花朵的柱头。";
  }

  function completePollination() {
    if (!state.bee.pollen || state.bee.complete) return;
    state.bee.complete = true;
    state.bee.progressed = true;
    state.bee.dragging = false;
    bee.disabled = true;
    bee.classList.remove("is-dragging");
    pollinationDetailImage.src = "assets/ch1-stigma-detail-hybrid.webp";
    pollinationDetailImage.alt = "桃花柱头与花柱纵剖面观察图";
    pollinationStatus.textContent = "花粉抵达柱头，授粉完成。";
    pollinationDetail.textContent = "柱头接收花粉，但授粉还不是受精。";
    schedule(function () { showScene("pollen"); }, reducedMotion ? 500 : 1200);
  }

  function beePointerDown(event) {
    if (state.scene !== "pollination" || state.bee.complete) return;
    event.preventDefault();
    state.bee.dragging = true;
    state.bee.pointerId = event.pointerId;
    state.bee.moved = false;
    state.bee.progressed = false;
    state.bee.startX = event.clientX;
    state.bee.startY = event.clientY;
    bee.classList.add("is-dragging");
    if (bee.setPointerCapture) bee.setPointerCapture(event.pointerId);
  }

  function beePointerMove(event) {
    if (!state.bee.dragging || event.pointerId !== state.bee.pointerId) return;
    event.preventDefault();
    var rect = pollinationStage.getBoundingClientRect();
    var x = Math.max(42, Math.min(rect.width - 42, event.clientX - rect.left));
    var y = Math.max(96, Math.min(rect.height - 92, event.clientY - rect.top));
    bee.style.left = x + "px";
    bee.style.top = y + "px";

    if (Math.hypot(event.clientX - state.bee.startX, event.clientY - state.bee.startY) > 8) {
      state.bee.moved = true;
    }

    if (!state.bee.pollen && pointInside(targetAnther, event.clientX, event.clientY)) {
      collectPollen();
    } else if (state.bee.pollen && pointInside(targetStigma, event.clientX, event.clientY)) {
      completePollination();
    }
  }

  function beePointerEnd(event) {
    if (!state.bee.dragging || event.pointerId !== state.bee.pointerId) return;
    state.bee.dragging = false;
    bee.classList.remove("is-dragging");
    if (bee.hasPointerCapture && bee.hasPointerCapture(event.pointerId)) {
      bee.releasePointerCapture(event.pointerId);
    }

    if (event.type !== "pointercancel" && state.bee.moved && !state.bee.progressed && !state.bee.complete) {
      state.bee.attempts += 1;
      if (state.bee.attempts >= 2) {
        pollinationStage.classList.add("is-assisted");
        pollinationStatus.textContent = state.bee.pollen
          ? "沿着提示路径，把花粉带到柱头。"
          : "沿着提示路径，先到花药，再到柱头。";
        pollinationDetail.textContent = state.bee.pollen
          ? "柱头位于中央花朵雌蕊的顶端，目标区域已经扩大。"
          : "先到花药，花粉附着后再前往柱头。";
      } else {
        pollinationStatus.textContent = state.bee.pollen
          ? "花粉已经附着，继续到柱头。"
          : "让蜜蜂再靠近花药一些。";
        pollinationDetail.textContent = state.bee.pollen
          ? "松手不会清空已经携带的花粉。"
          : "先寻找花朵中央周围的花药。";
      }
    }
  }

  function beeKeyboard(event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    if (!state.bee.pollen) collectPollen();
    else completePollination();
  }

  var pollenButtonLabels = [
    "继续：放大花药",
    "继续：花粉如何被携带",
    "继续：放大一粒花粉",
    "继续：花粉抵达哪里",
    "继续：寻找受精位置"
  ];

  function showPollenStep(step) {
    state.pollenStep = Math.max(0, Math.min(pollenSlides.length - 1, step));
    pollenSlides.forEach(function (slide, index) {
      slide.classList.toggle("is-active", index === state.pollenStep);
    });
    pollenDots.forEach(function (dot, index) {
      dot.classList.toggle("is-current", index === state.pollenStep);
      dot.setAttribute("aria-current", index === state.pollenStep ? "step" : "false");
    });
    pollenNextLabel.textContent = pollenButtonLabels[state.pollenStep];
  }

  function advancePollen() {
    if (state.pollenStep < pollenSlides.length - 1) {
      showPollenStep(state.pollenStep + 1);
    } else {
      showScene("anatomy");
    }
  }

  var anatomyCopy = [
    ["整花纵剖", "雄蕊环绕雌蕊，中央雌蕊连接柱头、花柱和子房。"],
    ["花部结构", "花药位于雄蕊顶端；雌蕊位于花朵中央。"],
    ["雌蕊纵剖", "柱头接收花粉，花柱是花粉管向下生长的通道，基部膨大处是子房。"],
    ["子房与胚珠", "子房包围胚珠；受精发生在胚珠内部，而不是柱头表面。"],
    ["胚珠内部", "花粉管最终进入胚珠，抵达胚囊并释放精细胞。"]
  ];

  function showAnatomyStep(step) {
    state.anatomyStep = Math.max(0, Math.min(anatomyFrames.length - 1, step));
    anatomyFrames.forEach(function (frame, index) {
      frame.classList.toggle("is-active", index === state.anatomyStep);
    });
    anatomyTabs.forEach(function (tab, index) {
      tab.classList.toggle("is-current", index === state.anatomyStep);
      tab.setAttribute("aria-selected", index === state.anatomyStep ? "true" : "false");
    });
    anatomyCallout.innerHTML = "<b>" + anatomyCopy[state.anatomyStep][0] + "</b><span>" + anatomyCopy[state.anatomyStep][1] + "</span>";
  }

  function resetFertilization() {
    state.fertilizationStep = 0;
    fertilizationStage.dataset.step = "0";
    fertilizationButton.disabled = false;
    fertilizationButtonLabel.textContent = "轻触花粉，观察萌发";
    fertilizationStatus.textContent = "授粉完成，但受精还没有发生。";
    fertilizationDetail.textContent = "轻触柱头上的花粉，继续观察。";
  }

  function advanceFertilization() {
    if (state.scene !== "fertilization") return;
    if (state.fertilizationStep === 5) {
      showScene("pollination-complete");
      return;
    }

    state.fertilizationStep += 1;
    fertilizationStage.dataset.step = String(state.fertilizationStep);

    if (state.fertilizationStep === 1) {
      fertilizationStatus.textContent = "花粉在柱头表面吸水萌发。";
      fertilizationDetail.textContent = "花粉粒伸出花粉管，进入柱头组织。";
      fertilizationButtonLabel.textContent = "继续观察花粉管生长";
    } else if (state.fertilizationStep === 2) {
      fertilizationStatus.textContent = "花粉管沿花柱向下生长。";
      fertilizationDetail.textContent = "花粉管为精细胞建立通往子房的路径。";
      fertilizationButtonLabel.textContent = "继续：进入子房";
    } else if (state.fertilizationStep === 3) {
      fertilizationStatus.textContent = "花粉管进入子房，向胚珠延伸。";
      fertilizationDetail.textContent = "它继续寻找胚珠中的胚囊。";
      fertilizationButtonLabel.textContent = "继续：抵达胚珠";
    } else if (state.fertilizationStep === 4) {
      fertilizationStatus.textContent = "花粉管进入胚珠，释放两个精细胞。";
      fertilizationDetail.textContent = "一个与卵细胞结合形成受精卵，另一个参与形成胚乳。";
      fertilizationButtonLabel.textContent = "继续：观察受精卵形成";
    } else {
      fertilizationStatus.textContent = "精细胞与卵细胞结合，形成受精卵。";
      fertilizationDetail.textContent = "受精完成后，胚珠继续发育为种子，子房逐渐膨大成果实。";
      fertilizationButtonLabel.textContent = "查看从花到果";
    }
  }

  var growthCopy = [
    ["坐果", "受精后，胚珠开始发育为种子，子房逐渐形成幼果。"],
    ["幼果生长", "幼果早期生长较快，细胞数量和体积不断变化。"],
    ["果核硬化", "内果皮逐渐木质化，形成保护种子的果核；这段时间，果实外观的生长相对放缓。"],
    ["果实膨大", "随后，果实再次明显膨大，并逐渐接近成熟。"],
    ["接近成熟", "果实接近成熟体量，色泽、质地和内部代谢仍在变化。"]
  ];

  function growthStepFromValue(value) {
    if (value < 18) return 0;
    if (value < 38) return 1;
    if (value < 62) return 2;
    if (value < 84) return 3;
    return 4;
  }

  function updateGrowth(value) {
    var progress = Math.max(0, Math.min(100, value));
    var step = growthStepFromValue(progress);
    state.growthStep = step;
    growthStage.dataset.step = String(step);
    growthRange.value = String(progress);
    growthRange.style.setProperty("--range-progress", progress + "%");
    growthFrames.forEach(function (frame, index) {
      frame.classList.toggle("is-active", index === step);
    });
    growthStageName.textContent = growthCopy[step][0];
    growthStageDetail.textContent = growthCopy[step][1];
    toFlavorButton.hidden = false;
    if (progress >= 100) {
      growthHint.textContent = "从坐果到再次膨大，生长节奏并不相同。";
    }
  }

  function growthReleased() {
    if (Number(growthRange.value) >= 100) return;
    state.growthReleaseCount += 1;
    growthHint.textContent = state.growthReleaseCount >= 2
      ? "沿着时间轴滑到果实膨大。"
      : "继续向前滑动，观察后面的生长阶段。";
  }

  var foundationCopy = [
    ["品种基础", "品种决定果形、成熟期和风味表现的遗传基础。", "继续：成熟过程"],
    ["生长与成熟", "授粉、坐果、膨大和成熟共同构成果实形成过程。", "继续：环境与管理"],
    ["环境与管理", "光照、温度、水分、土壤条件和栽培管理共同影响生长表现。", "返回食用与保存"]
  ];

  function showFoundationStep(step) {
    state.foundationStep = Math.max(0, Math.min(foundationFrames.length - 1, step));
    foundationObserver.dataset.step = String(state.foundationStep);
    foundationFrames.forEach(function (frame, index) {
      frame.classList.toggle("is-active", index === state.foundationStep);
    });
    foundationTabs.forEach(function (tab, index) {
      tab.classList.toggle("is-current", index === state.foundationStep);
      tab.setAttribute("aria-selected", index === state.foundationStep ? "true" : "false");
    });
    foundationName.textContent = foundationCopy[state.foundationStep][0];
    foundationDetail.textContent = foundationCopy[state.foundationStep][1];
    foundationNextLabel.textContent = foundationCopy[state.foundationStep][2];
  }

  function advanceFoundation() {
    if (state.foundationStep < foundationFrames.length - 1) {
      showFoundationStep(state.foundationStep + 1);
    } else {
      showScene("care-home");
    }
  }

  function updateDaynight(value) {
    var progress = Math.max(0, Math.min(100, value));
    var nightOpacity = progress <= 40 ? 0 : Math.min(1, (progress - 40) / 15);
    var photoOpacity = progress <= 40 ? 1 : Math.max(0, 1 - ((progress - 40) / 15));
    var ripeOpacity = Math.max(0, Math.min(1, (progress - 88) / 12));
    daynightRange.value = String(progress);
    daynightRange.style.setProperty("--range-progress", progress + "%");
    daynightStage.style.setProperty("--night-opacity", nightOpacity.toFixed(2));
    daynightStage.style.setProperty("--photo-opacity", photoOpacity.toFixed(2));
    daynightStage.style.setProperty("--day-flow-opacity", photoOpacity.toFixed(2));
    daynightStage.style.setProperty("--ripe-opacity", ripeOpacity.toFixed(2));
    daynightStage.classList.toggle("is-complete", progress >= 100);
    toRipenessButton.hidden = progress < 100 && state.daynightReleaseCount < 2;

    if (progress < 40) {
      daynightStage.dataset.phase = "day";
      daynightName.textContent = "白天";
      daynightDetail.textContent = "叶片进行光合作用，合成有机物；白天，呼吸也在进行。";
    } else if (progress < 55) {
      daynightStage.dataset.phase = "twilight";
      daynightName.textContent = "黄昏";
      daynightDetail.textContent = "光合作用随光线减弱，植物的呼吸仍在进行。";
    } else if (progress < 90) {
      daynightStage.dataset.phase = "night";
      daynightName.textContent = "夜晚";
      daynightDetail.textContent = "没有光合作用，植物的呼吸仍在进行，并消耗一部分有机物。";
    } else if (progress < 100) {
      daynightStage.dataset.phase = "net";
      daynightName.textContent = "首个昼夜结束";
      daynightDetail.textContent = "合成减去消耗，剩下的才是净积累。";
    } else {
      daynightStage.dataset.phase = "complete";
      daynightName.textContent = "多个昼夜后";
      daynightDetail.textContent = "成熟过程中，糖、酸、香气物质和质地都在发生变化。";
      daynightHint.textContent = "风味不由土壤、光照或温度中的单一条件决定。";
    }
  }

  function daynightReleased() {
    if (Number(daynightRange.value) >= 100) return;
    state.daynightReleaseCount += 1;
    if (state.daynightReleaseCount >= 2) {
      daynightHint.textContent = "也可以直接查看品质形成总结。";
      toRipenessButton.hidden = false;
    } else {
      daynightHint.textContent = "继续滑动，观察完整的昼夜变化。";
    }
  }

  var aiResultCopy = {
    firm: {
      label: "偏硬",
      summary: "果面仍接近偏硬阶段，建议结合果肩手感与香气再次确认。",
      image: "assets/ch5-firm.webp",
      adviceImage: "assets/ch5-storage-room.webp?v=5.12",
      adviceTitle: "阴凉通风，继续观察",
      advice: "单层摆放，避免挤压和阳光直射。每天轻按果肩并闻气味，达到喜欢的软硬度后食用。"
    },
    turning: {
      label: "正在转熟",
      summary: "果面状态接近转熟阶段，建议结合果肩手感与香气再次确认。",
      image: "assets/ch5-turning-ripe.webp",
      adviceImage: "assets/ch5-storage-room.webp?v=5.12",
      adviceTitle: "阴凉通风，近期食用",
      advice: "单层摆放，避免挤压和阳光直射。每天轻按果肩并闻气味，达到喜欢的软硬度后食用。"
    },
    ready: {
      label: "适合食用",
      summary: "照片特征接近适食阶段，请结合正常香气与果肩弹性确认。",
      image: "assets/ch5-ready.webp",
      adviceImage: "assets/ch5-storage-cold.webp?v=5.12",
      adviceTitle: "建议尽快食用",
      advice: "如果暂不食用，可按包装说明短时冷藏并避免挤压。食用前取出，再检查果面、气味和手感。"
    },
    soft: {
      label: "偏软",
      summary: "果面特征接近偏软阶段，需要结合是否有异味、渗液或霉变判断。",
      image: "assets/ch5-soft.webp",
      adviceImage: "assets/ch5-storage-cold.webp?v=5.12",
      adviceTitle: "尽快食用并检查异常",
      advice: "避免继续常温久放。食用前检查是否有异常异味、渗液或霉变；发现异常时请勿食用。"
    },
    abnormal: {
      label: "发现异常特征",
      summary: "照片中出现疑似损伤或异常特征，无法仅凭图像确认是否可以食用。",
      image: "assets/ch5-abnormal-reference.webp"
    },
    unknown: {
       label: "暂时无法判断",
       summary: "画面中的桃果特征不足或拍摄条件不合适，请重新拍摄，并结合手感、香气和果面检查。",
       image: "assets/ch5-turning-ripe.webp"
     }
  };

  function stopCamera() {
    if (!state.cameraStream) return;
    state.cameraStream.getTracks().forEach(function (track) { track.stop(); });
    state.cameraStream = null;
    cameraVideo.srcObject = null;
  }

  function syncCapturedImages() {
    var source = state.capturedImage || "assets/ch5-turning-ripe.webp";
    previewImage.src = source;
    analysisImage.src = source;
    resultImage.src = source;
  }

  function setCapturedImage(source, isObjectUrl) {
    if (state.capturedObjectUrl && state.capturedObjectUrl !== source) {
      window.URL.revokeObjectURL(state.capturedObjectUrl);
    }
     state.capturedObjectUrl = isObjectUrl ? source : "";
     state.capturedImage = source;
     state.capturedSource = isObjectUrl ? "user" : "demo";
     state.captureAssessment = null;
     syncCapturedImages();
     showScene("preview");
  }

  function useDemoPhoto() {
    setCapturedImage("assets/ch5-turning-ripe.webp", false);
  }

  function pickPhoto() {
    /* The gallery path must not inherit a mobile `capture` hint. Otherwise
       iOS/Android may open the camera instead of the photo library. */
    photoInput.removeAttribute("capture");
    photoInput.value = "";
    photoInput.click();
  }

  function handlePhotoSelected() {
    var file = photoInput.files && photoInput.files[0];
    if (!file) return;
    if (!file.type || file.type.indexOf("image/") !== 0) {
      window.alert("请选择图片文件。");
      return;
    }
    setCapturedImage(window.URL.createObjectURL(file), true);
  }

  function openCamera() {
    showScene("camera");
    cameraStatus.textContent = "正在请求相机权限…";
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      cameraStatus.textContent = "当前环境无法打开相机，请使用相册或示范照片。";
      return;
    }
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" },
        width: { ideal: 1280 },
        height: { ideal: 1280 }
      },
      audio: false
    }).then(function (stream) {
      if (state.scene !== "camera") {
        stream.getTracks().forEach(function (track) { track.stop(); });
        return;
      }
      state.cameraStream = stream;
      cameraVideo.srcObject = stream;
      cameraVideo.play();
      cameraStatus.textContent = "保持桃子完整、光线均匀";
    }).catch(function () {
      cameraStatus.textContent = "未获得相机权限，请使用相册或示范照片。";
    });
  }

  function captureCameraFrame() {
    if (!state.cameraStream || cameraVideo.readyState < 2) {
      cameraStatus.textContent = "相机尚未准备好，可选择相册或示范照片。";
      return;
    }
    var width = cameraVideo.videoWidth;
    var height = cameraVideo.videoHeight;
    var side = Math.min(width, height);
    var sourceX = (width - side) / 2;
    var sourceY = (height - side) / 2;
    cameraCanvas.width = 900;
    cameraCanvas.height = 900;
    cameraCanvas.getContext("2d").drawImage(cameraVideo, sourceX, sourceY, side, side, 0, 0, 900, 900);
    cameraCanvas.toBlob(function (blob) {
      if (!blob) return;
      setCapturedImage(window.URL.createObjectURL(blob), true);
    }, "image/jpeg", 0.9);
  }

  function selectedMockResult() {
    var queryResult = new URLSearchParams(window.location.search).get("result");
    return aiResultCopy[queryResult] ? queryResult : "turning";
  }

  /*
   * This prototype does not call a vision model. Keep the local gate
   * deliberately conservative: a user photo must contain enough warm,
   * peach-like pixels before we offer a visual reference state. All other
   * images are surfaced as "暂时无法判断" instead of being labelled as ripe.
   * A production build should replace this gate and classifier with a
   * server-side model.
   */
  function assessCapturedImage(source) {
    return new Promise(function (resolve) {
      var image = new Image();
      image.onload = function () {
        var side = 240;
        var canvas = document.createElement("canvas");
        canvas.width = side;
        canvas.height = side;
        var context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) {
          resolve({ usable: false, reason: "browser" });
          return;
        }
        var ratio = Math.max(image.naturalWidth, image.naturalHeight) / side;
        var drawWidth = Math.max(1, Math.round(image.naturalWidth / ratio));
        var drawHeight = Math.max(1, Math.round(image.naturalHeight / ratio));
        var offsetX = Math.round((side - drawWidth) / 2);
        var offsetY = Math.round((side - drawHeight) / 2);
        context.fillStyle = "#f7f2eb";
        context.fillRect(0, 0, side, side);
        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
        var pixels;
        try {
          pixels = context.getImageData(0, 0, side, side).data;
        } catch (error) {
          resolve({ usable: false, reason: "security" });
          return;
        }
        var sampled = 0;
        var visible = 0;
        var warm = 0;
        var warmCenter = 0;
        var warmRed = 0;
        var warmGreen = 0;
        var warmBlue = 0;
        var warmSaturation = 0;
        var colored = 0;
        var greenPixels = 0;
        var orangePixels = 0;
        var redPixels = 0;
        var neutralPixels = 0;
        var darkPixels = 0;
        var warmMinX = side;
        var warmMinY = side;
        var warmMaxX = -1;
        var warmMaxY = -1;
        for (var y = 0; y < side; y += 2) {
          for (var x = 0; x < side; x += 2) {
            sampled += 1;
            var index = (y * side + x) * 4;
            var r = pixels[index];
            var g = pixels[index + 1];
            var b = pixels[index + 2];
            var luminance = (r * 299 + g * 587 + b * 114) / 1000;
            if (luminance < 24 || luminance > 250) continue;
            visible += 1;
            var maxChannel = Math.max(r, g, b);
            var minChannel = Math.min(r, g, b);
            var saturation = maxChannel ? (maxChannel - minChannel) / maxChannel : 0;
            if (saturation > 0.12 && luminance < 248) {
              colored += 1;
              if (g > r * 0.9 && g > b * 1.25) greenPixels += 1;
              if (r > g * 1.04 && g > b * 1.08) orangePixels += 1;
              if (r > g * 1.12 && r > b * 1.2) redPixels += 1;
              if (saturation < 0.22 && luminance < 220) neutralPixels += 1;
              if (luminance < 145) darkPixels += 1;
            }
            /* Peach skin is a warm, moderately saturated orange/pink range. */
            var peachLike = r > 92 && g > 42 && b > 18 && r > b * 1.24 && g > b * 1.04 && r - b > 28 && r - g < 145;
            if (!peachLike) continue;
            warm += 1;
            warmRed += r;
            warmGreen += g;
            warmBlue += b;
            warmSaturation += (Math.max(r, g, b) - Math.min(r, g, b)) / Math.max(r, g, b);
            warmMinX = Math.min(warmMinX, x);
            warmMinY = Math.min(warmMinY, y);
            warmMaxX = Math.max(warmMaxX, x);
            warmMaxY = Math.max(warmMaxY, y);
            if (x > side * 0.18 && x < side * 0.82 && y > side * 0.12 && y < side * 0.88) warmCenter += 1;
          }
        }
        var warmRatio = visible ? warm / visible : 0;
        var centerRatio = warm ? warmCenter / warm : 0;
        var widthRatio = warmMaxX >= 0 ? (warmMaxX - warmMinX) / side : 0;
        var heightRatio = warmMaxY >= 0 ? (warmMaxY - warmMinY) / side : 0;
        var subjectBoxArea = warmMaxX >= 0
          ? Math.max(1, (warmMaxX - warmMinX + 2) * (warmMaxY - warmMinY + 2))
          : 1;
        var warmFillRatio = warm ? (warm * 4) / subjectBoxArea : 0;
        var coloredRatio = sampled ? colored / sampled : 0;
        var orangeRatio = colored ? orangePixels / colored : 0;
        var greenRatio = colored ? greenPixels / colored : 0;
        var redRatio = colored ? redPixels / colored : 0;
        var neutralRatio = colored ? neutralPixels / colored : 0;
        var darkRatio = colored ? darkPixels / colored : 0;
        var closeCrop = heightRatio > 0.94 && warmRatio >= 0.22 && centerRatio >= 0.45;
        /* Real phone photos often contain several peaches, leaves or a dark
         * orchard background. Keep the silhouette gate, but allow a broad
         * warm subject instead of requiring one isolated cutout. */
        var broadSceneSubject = widthRatio >= 0.34 && heightRatio >= 0.34 &&
          warmRatio >= 0.12 && centerRatio >= 0.45;
        var tallSceneSubject = heightRatio > 0.94 && widthRatio >= 0.42 &&
          warmRatio >= 0.14 && centerRatio >= 0.55;
        var compactWarmSubject = widthRatio >= 0.18 && heightRatio >= 0.18 &&
          ((widthRatio <= 0.94 && heightRatio <= 0.94) || closeCrop || tallSceneSubject);
        /* A single peach fills its warm subject box; a normal product photo
         * may contain several peaches and therefore has a lower fill ratio. */
        var singleSubject = warmFillRatio >= 0.62 || closeCrop || broadSceneSubject;
        var peachColour = coloredRatio >= 0.08 &&
          (greenRatio >= 0.42 || orangeRatio >= 0.55 || redRatio >= 0.18) &&
          /* Background shadows are acceptable when the warm subject is
           * sufficiently large and centred. A yellow/black striped object
           * (for example the bee cutout) has neither a peach-sized fill nor
           * the leaf/orchard context expected in a fruit photograph. */
          (darkRatio < 0.16 || closeCrop || warmFillRatio >= 0.52 ||
            (warmRatio >= 0.18 && centerRatio >= 0.6 && greenRatio >= 0.08));
        /* Require colour, a centred subject, and a plausible fruit-sized
         * silhouette. Images with no warm fruit evidence still fall back to
         * "暂时无法判断" rather than being labelled ripe. */
        var peachConfidence = warmRatio >= 0.12 && warmRatio <= 0.96 &&
          centerRatio >= 0.38 && compactWarmSubject && singleSubject && peachColour;
        var averageRed = warm ? warmRed / warm : 0;
        var averageGreen = warm ? warmGreen / warm : 0;
        var averageBlue = warm ? warmBlue / warm : 0;
        var averageSaturation = warm ? warmSaturation / warm : 0;
        var greenRedRatio = averageRed ? averageGreen / averageRed : 0;
        var suggestedState = "unknown";

        if (peachConfidence) {
          /*
           * Yellow-green skin reads earlier in the ripening cycle. As the
           * skin warms, red dominance and saturation increase. These broad
           * bands are only a visual teaching aid; they intentionally do not
           * claim to measure firmness or sweetness.
           */
          /* Only very dark, neutral damage-like areas enter the safety branch;
           * ordinary shadows and the peach crease should remain classifiable. */
          if (closeCrop && darkRatio >= 0.30 && neutralRatio >= 0.12) suggestedState = "abnormal";
          else if (greenRedRatio >= 0.98) suggestedState = "firm";
          else if (greenRedRatio < 0.74 || (averageSaturation >= 0.64 && greenRedRatio < 0.82)) suggestedState = "soft";
          else if (greenRedRatio < 0.81) suggestedState = "ready";
          else suggestedState = "turning";
        }

        resolve({
          usable: peachConfidence,
          warmRatio: warmRatio,
          centerRatio: centerRatio,
          averageSaturation: averageSaturation,
          greenRedRatio: greenRedRatio,
          coloredRatio: coloredRatio,
          warmFillRatio: warmFillRatio,
          closeCrop: closeCrop,
          suggestedState: suggestedState
        });
      };
      image.onerror = function () { resolve({ usable: false, reason: "load" }); };
      image.src = source;
    });
  }

  function classifyCapturedImage() {
    /* The built-in image is explicitly a demonstration path. */
    if (state.capturedSource === "demo") return Promise.resolve(selectedMockResult());
    return assessCapturedImage(state.capturedImage).then(function (assessment) {
      state.captureAssessment = assessment;
      if (!assessment.usable) return "unknown";
      /*
       * This is a deliberately small, local reference classifier rather than
       * an AI model. It lets a peach-like user photo demonstrate different
       * states without pretending that the browser can assess firmness,
       * aroma, internal damage, or food safety.
       */
      return assessment.suggestedState || "unknown";
    });
  }

  function beginAnalysis() {
    syncCapturedImages();
    showScene("analyzing");
    var analysisPromise = classifyCapturedImage();
    analysisPromise.then(function (result) {
      schedule(function () {
        state.aiResult = result;
        showScene("ai-result");
      }, reducedMotion ? 120 : 1750);
    });
  }

  function renderAiResult() {
    var result = aiResultCopy[state.aiResult] || aiResultCopy.turning;
    var normal = ["firm", "turning", "ready", "soft"].indexOf(state.aiResult) >= 0;
    resultBadge.textContent = result.label;
    resultTitle.textContent = result.label;
    if (state.aiResult === "unknown" && state.capturedSource === "user" && state.captureAssessment && state.captureAssessment.usable) {
      resultSummary.textContent = "画面可能包含桃果，但当前静态原型未接入视觉模型，不能可靠判断成熟度。请结合手感、香气和果面检查。";
    } else if (state.capturedSource === "user" && normal) {
      resultSummary.textContent = "画面符合桃果特征，系统已根据果面颜色给出成熟阶段参考。请再结合果肩手感、香气和果面检查。";
    } else {
      resultSummary.textContent = result.summary;
    }
    resultImage.src = state.capturedImage || result.image;
    resultDisclaimer.textContent = state.capturedSource === "user"
      ? (normal
        ? "颜色识别为原型参考，无法判断实际硬度、内部损伤、甜度或气味。"
        : "当前图像特征不足，无法可靠给出成熟阶段，请重新拍摄或使用人工判断。")
      : (normal
        ? "示范状态仅用于说明交互流程，请以人工检查和食用安全原则为准。"
        : "图像判断仅作提示，请以人工检查和食用安全原则为准。");
    normalResultActions.hidden = !normal;
    specialResultActions.hidden = normal;
    specialResultButton.textContent = state.aiResult === "abnormal" ? "查看异常与售后" : "查看人工判断方法";
  }

  function openManual(trigger) {
    state.overlayReturnFocus = trigger || document.activeElement;
    manualOverlay.hidden = false;
    manualOverlay.querySelector("[data-manual-state]").focus();
  }

  function closeManual(restoreFocus) {
    manualOverlay.hidden = true;
    if (restoreFocus !== false && state.overlayReturnFocus && state.overlayReturnFocus.focus) {
      state.overlayReturnFocus.focus();
    }
  }

  function confirmManualState(name) {
    if (!aiResultCopy[name]) return;
    state.aiResult = name;
    closeManual(false);
    showScene("advice");
  }

  function renderAdvice() {
    var result = aiResultCopy[state.aiResult] || aiResultCopy.turning;
    adviceStateName.textContent = result.label;
    adviceTitle.textContent = result.adviceTitle || "结合手感与气味再次确认";
    adviceDetail.textContent = result.advice || "请重新检查果肩手感、正常香气以及是否有霉变、异味或异常渗液。";
    adviceImage.src = result.adviceImage || "assets/ch5-storage-room.webp?v=5.12";
  }

  var ripenessCopy = {
    firm: ["偏硬", "果肩仍硬、香气较弱。放在阴凉通风处，继续观察。"],
    turning: ["正在转熟", "果肩略有弹性，香气开始出现。准备近期食用。"],
    ready: ["适合食用", "具有品种应有的底色、正常香气与适度弹性。建议尽快食用。"],
    soft: ["偏软", "果肩明显变软。尽快食用，并检查是否有异味、渗液或霉变。"]
  };

  function showRipeness(name) {
    if (!ripenessCopy[name]) name = "firm";
    state.ripenessState = name;
    ripenessObserver.dataset.state = name;
    ripenessFrames.forEach(function (frame) {
      frame.classList.toggle("is-active", frame.dataset.ripenessFrame === name);
    });
    ripenessTabs.forEach(function (tab) {
      var active = tab.dataset.ripenessState === name;
      tab.classList.toggle("is-current", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    ripenessName.textContent = ripenessCopy[name][0];
    ripenessDetail.textContent = ripenessCopy[name][1];
  }

  function openMenu(trigger) {
    state.overlayReturnFocus = trigger || document.activeElement;
    chapterMenu.hidden = false;
    chapterMenu.querySelector("[data-menu-close]").focus();
  }

  function closeMenu(restoreFocus) {
    chapterMenu.hidden = true;
    if (restoreFocus !== false && state.overlayReturnFocus && state.overlayReturnFocus.focus) state.overlayReturnFocus.focus();
  }

  var infoContent = {
    storageRoom: {
      eyebrow: "储存提示",
      title: "准备近期食用",
      image: "assets/ch5-storage-room.webp?v=5.12",
      alt: "阴凉通风处储存桃果",
      copy: "<p><strong>阴凉通风</strong></p><p>避免阳光直射和相互挤压，继续观察果面、果肩手感和气味。</p>"
    },
    storageCold: {
      eyebrow: "储存提示",
      title: "需要延缓成熟",
      image: "assets/ch5-storage-cold.webp?v=5.12",
      alt: "冷藏保存桃果",
      copy: "<p><strong>按包装说明冷藏</strong></p><p>食用前取出，再次观察果面、手感和气味。不要依据单一红晕判断成熟。</p>"
    },
    abnormal: {
      eyebrow: "食用安全",
      title: "发现异常？",
      image: "assets/ch5-abnormal-reference.webp",
      alt: "桃果明显异常状态示例",
      copy: "<p>如果出现明显霉变、异常异味或异常渗液，请勿食用。</p><p>明显霉变的桃应整只丢弃，也不要凑近闻霉变部位。食用前用流动清水清洗，不使用洗涤剂。</p>"
    },
    afterSales: {
      eyebrow: "虚拟原型",
      title: "售后说明",
      image: "assets/ch5-package-product.webp",
      alt: "一枝鲜桃包装与产品",
      copy: "<p>如果发现明显霉变、异常异味或异常渗液，请勿食用。</p><p>当前虚拟原型不处理真实售后，请以正式包装标注为准。</p>"
    },
    repurchase: {
      eyebrow: "虚拟原型",
      title: "再次购买",
      image: "assets/ch5-package-product.webp",
      alt: "一枝鲜桃包装与产品",
      copy: "<p>当前为商品入口示范，不生成订单，也不进入支付流程。</p><p>正式使用时需要连接经过确认的商品页面。</p>"
    },
    privacy: {
      eyebrow: "虚拟原型",
      title: "隐私说明",
      image: "assets/ch5-package-product.webp",
      alt: "一枝鲜桃包装与产品",
      copy: "<p>本页面只在当前浏览会话中记录选择，不提交姓名、电话、地址、精确位置或完整产品编码。</p><p>关闭页面后，本次体验选择不再保留。</p>"
    }
  };

  function openInfo(kind, trigger, isRoute) {
    var content = infoContent[kind];
    if (!content) return;
    state.overlayReturnFocus = trigger || document.activeElement;
    state.routeOverlay = Boolean(isRoute);
    infoEyebrow.textContent = content.eyebrow;
    infoTitle.textContent = content.title;
    infoImage.src = content.image;
    infoImage.alt = content.alt;
    infoCopy.innerHTML = content.copy;
    infoOverlay.hidden = false;
    infoOverlay.querySelector("[data-info-close]").focus();
  }

  function closeInfo() {
    infoOverlay.hidden = true;
    if (state.routeOverlay && state.scene === "feedback") {
      window.history.replaceState(null, "", "#/care/service");
    }
    state.routeOverlay = false;
    if (state.overlayReturnFocus && state.overlayReturnFocus.focus) state.overlayReturnFocus.focus();
  }

  function openStorage(trigger) {
    var useCold = state.ripenessState === "ready" || state.ripenessState === "soft";
    openInfo(useCold ? "storageCold" : "storageRoom", trigger, false);
  }

  function submitFeedback(event) {
    event.preventDefault();
    var maturity = feedbackForm.querySelector("input[name='maturity']:checked");
    var experiences = Array.prototype.slice.call(feedbackForm.querySelectorAll("input[name='experience']:checked"));
    if (!maturity && experiences.length === 0) {
      feedbackStatus.textContent = "请选择至少一项食用感受。";
      return;
    }
    var record = {
      maturity: maturity ? maturity.value : "",
      experience: experiences.map(function (input) { return input.value; })
    };
    try { window.sessionStorage.setItem("peach-h5-feedback", JSON.stringify(record)); } catch (error) { /* Session storage is optional. */ }
    feedbackStatus.textContent = "已在当前页面记录本次体验。";
  }

  function resetExperience() {
    growthRange.value = "0";
    daynightRange.value = "0";
    state.growthReleaseCount = 0;
    state.daynightReleaseCount = 0;
    state.foundationStep = 0;
    state.ripenessState = "firm";
    state.aiResult = "unknown";
    if (state.capturedObjectUrl) window.URL.revokeObjectURL(state.capturedObjectUrl);
    state.capturedObjectUrl = "";
    state.capturedImage = "assets/ch5-turning-ripe.webp";
    state.capturedSource = "demo";
    state.captureAssessment = null;
    syncCapturedImages();
    feedbackForm.reset();
    feedbackStatus.textContent = "";
    updateGrowth(0);
    updateDaynight(0);
    showFoundationStep(0);
    showRipeness("firm");
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    showScene("start");
  }

  function handleHashRoute() {
    var route = window.location.hash.replace("#/", "");
    if (routeScenes[route]) {
      if (state.scene !== routeScenes[route]) showScene(routeScenes[route]);
      return;
    }
    if (route === "after-sales" || route === "repurchase" || route === "privacy") {
      if (state.scene !== "issue") showScene("issue");
      var infoKind = route === "after-sales" ? "afterSales" : route;
      openInfo(infoKind, null, true);
    }
  }

  function productPointerDown(event) {
    if (state.scene !== "product" || event.target.closest("button")) return;
    state.swipeStartY = event.clientY;
  }

  function productPointerUp(event) {
    if (state.scene !== "product" || state.swipeStartY === null) return;
    var delta = event.clientY - state.swipeStartY;
    state.swipeStartY = null;
    if (delta < -46) showScene("bloom");
  }

  startButton.addEventListener("click", function () { showScene("care-home"); });
  growthButton.addEventListener("click", function () { showScene("bloom"); });
  replayButton.addEventListener("click", function () { showScene("care-home"); });
  toGrowthButton.addEventListener("click", function () { showScene("growth"); });
  toFlavorButton.addEventListener("click", function () { showScene("daynight"); });
  foundationNext.addEventListener("click", advanceFoundation);
  toRipenessButton.addEventListener("click", function () { showScene("flavor-foundation"); });
  toFeedbackButton.addEventListener("click", function () { showScene("feedback"); });
  finishButton.addEventListener("click", function () { showScene("ending"); });
  growthRange.addEventListener("input", function () { updateGrowth(Number(growthRange.value)); });
  growthRange.addEventListener("change", growthReleased);
  daynightRange.addEventListener("input", function () { updateDaynight(Number(daynightRange.value)); });
  daynightRange.addEventListener("change", daynightReleased);
  document.querySelectorAll("[data-growth-value]").forEach(function (button) {
    button.addEventListener("click", function () { updateGrowth(Number(button.dataset.growthValue)); });
  });
  document.querySelectorAll("[data-daynight-value]").forEach(function (button) {
    button.addEventListener("click", function () { updateDaynight(Number(button.dataset.daynightValue)); });
  });
  storageButton.addEventListener("click", function () { openStorage(storageButton); });
  abnormalButton.addEventListener("click", function () { openInfo("abnormal", abnormalButton, false); });
  feedbackForm.addEventListener("submit", submitFeedback);
  globalMenuButton.addEventListener("click", function () { openMenu(globalMenuButton); });
  endingMenuButton.addEventListener("click", function () { openMenu(endingMenuButton); });
  careStartButton.addEventListener("click", function () { showScene("camera-guide"); });
  openCameraButton.addEventListener("click", openCamera);
  choosePhotoButton.addEventListener("click", pickPhoto);
  useDemoButton.addEventListener("click", useDemoPhoto);
  photoInput.addEventListener("change", handlePhotoSelected);
  closeCameraButton.addEventListener("click", function () { showScene("camera-guide"); });
  cameraGalleryButton.addEventListener("click", pickPhoto);
  cameraShutterButton.addEventListener("click", captureCameraFrame);
  cameraDemoButton.addEventListener("click", useDemoPhoto);
  retakeButton.addEventListener("click", function () { showScene("camera-guide"); });
  analyzeButton.addEventListener("click", beginAnalysis);
  confirmResultButton.addEventListener("click", function () { showScene("advice"); });
  adjustResultButton.addEventListener("click", function () { openManual(adjustResultButton); });
  resultRetakeButton.addEventListener("click", function () { showScene("camera-guide"); });
  specialResultButton.addEventListener("click", function () {
    if (state.aiResult === "abnormal") showScene("issue");
    else openManual(specialResultButton);
  });
  specialRetakeButton.addEventListener("click", function () { showScene("camera-guide"); });
  adviceProfileButton.addEventListener("click", function () { showScene("product"); });
  afterSalesButton.addEventListener("click", function () { openInfo("afterSales", afterSalesButton, false); });
  issueRetakeButton.addEventListener("click", function () { showScene("camera-guide"); });

  foundationTabs.forEach(function (tab) {
    tab.addEventListener("click", function () { showFoundationStep(Number(tab.dataset.foundationStep)); });
  });
  ripenessTabs.forEach(function (tab) {
    tab.addEventListener("click", function () { showRipeness(tab.dataset.ripenessState); });
  });
  document.querySelectorAll("[data-menu-close]").forEach(function (button) {
    button.addEventListener("click", closeMenu);
  });
  document.querySelectorAll("[data-jump]").forEach(function (button) {
    button.addEventListener("click", function () {
      closeMenu(false);
      showScene(button.dataset.jump);
    });
  });
  primaryNavigationButtons.forEach(function (button) {
    button.addEventListener("click", function () { showScene(button.dataset.primaryJump); });
  });
  document.querySelectorAll("[data-info-close]").forEach(function (button) {
    button.addEventListener("click", closeInfo);
  });
  document.querySelectorAll("[data-manual-close]").forEach(function (button) {
    button.addEventListener("click", closeManual);
  });
  document.querySelectorAll("[data-manual-state]").forEach(function (button) {
    button.addEventListener("click", function () { confirmManualState(button.dataset.manualState); });
  });
  document.querySelectorAll("[data-service-route]").forEach(function (button) {
    button.addEventListener("click", function () {
      window.location.hash = "#/" + button.dataset.serviceRoute;
    });
  });

  document.querySelectorAll("[data-back]").forEach(function (button) {
    button.addEventListener("click", function () { showScene(button.dataset.back); });
  });

  app.addEventListener("pointerdown", productPointerDown);
  app.addEventListener("pointerup", productPointerUp);
  bee.addEventListener("pointerdown", beePointerDown);
  bee.addEventListener("pointermove", beePointerMove);
  bee.addEventListener("pointerup", beePointerEnd);
  bee.addEventListener("pointercancel", beePointerEnd);
  bee.addEventListener("keydown", beeKeyboard);
  fertilizationButton.addEventListener("click", advanceFertilization);
  pollenNext.addEventListener("click", advancePollen);
  pollenDots.forEach(function (dot) {
    dot.addEventListener("click", function () { showPollenStep(Number(dot.dataset.pollenDot)); });
  });
  anatomyTabs.forEach(function (tab) {
    tab.addEventListener("click", function () { showAnatomyStep(Number(tab.dataset.anatomyStep)); });
  });
  anatomyNext.addEventListener("click", function () { showScene("fertilization"); });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    if (!infoOverlay.hidden) closeInfo();
    else if (!manualOverlay.hidden) closeManual();
    else if (!chapterMenu.hidden) closeMenu();
  });

  window.addEventListener("hashchange", handleHashRoute);

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      clearTimers();
      if (state.scene === "camera") stopCamera();
    }
    else if (state.scene === "bloom") playBloomSequence();
  });

  window.addEventListener("beforeunload", function () {
    stopCamera();
    if (state.capturedObjectUrl) window.URL.revokeObjectURL(state.capturedObjectUrl);
  });

  updateGrowth(0);
  updateDaynight(0);
  showFoundationStep(0);
  showRipeness("firm");
  if (window.location.hash.indexOf("#/") === 0) {
    handleHashRoute();
  } else {
    showScene("start");
  }
})();
