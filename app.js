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
    fertilizationStep: 0
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
    state.scene = name;
    scenes.forEach(function (scene) {
      var active = scene.dataset.scene === name;
      scene.classList.toggle("is-active", active);
      scene.setAttribute("aria-hidden", active ? "false" : "true");
    });

    if (name === "bloom") playBloomSequence();
    if (name === "pollination") resetPollination();
    if (name === "pollen") showPollenStep(0);
    if (name === "anatomy") showAnatomyStep(0);
    if (name === "fertilization") resetFertilization();
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
    bee.style.left = "25%";
    bee.style.top = "79%";
    pollinationStage.classList.remove("has-pollen", "is-assisted");
    pollinationDetailImage.src = "assets/ch1-anther-scene.webp";
    pollinationDetailImage.alt = "桃花花药局部观察图";
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
    pollinationDetailImage.src = "assets/ch1-pollen-release.webp";
    pollinationDetailImage.alt = "桃花花粉粒局部观察图";
    pollinationStatus.textContent = "花粉已经附着。";
    pollinationDetail.textContent = "继续移动到画面最下方大花朵的柱头。";
  }

  function completePollination() {
    if (!state.bee.pollen || state.bee.complete) return;
    state.bee.complete = true;
    state.bee.progressed = true;
    state.bee.dragging = false;
    bee.disabled = true;
    bee.classList.remove("is-dragging");
    pollinationDetailImage.src = "assets/ch1-stigma-section.webp";
    pollinationDetailImage.alt = "桃花柱头与花柱纵剖面观察图";
    pollinationStatus.textContent = "花粉抵达柱头，授粉完成。";
    pollinationDetail.textContent = "柱头接收花粉，但授粉还不是受精。";
    schedule(function () { showScene("pollen"); }, reducedMotion ? 700 : 1500);
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
          ? "目标在画面最下方的大花朵中央。"
          : "目标区域已经扩大。";
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
    if (state.fertilizationStep === 4) {
      showScene("complete");
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
    } else {
      fertilizationStatus.textContent = "花粉管进入胚珠，释放两个精细胞。";
      fertilizationDetail.textContent = "一个与卵细胞结合形成受精卵，另一个参与形成胚乳。";
      fertilizationButtonLabel.textContent = "查看本章结论";
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

  startButton.addEventListener("click", function () { showScene("product"); });
  growthButton.addEventListener("click", function () { showScene("bloom"); });
  replayButton.addEventListener("click", function () { showScene("start"); });

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

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) clearTimers();
    else if (state.scene === "bloom") playBloomSequence();
  });
})();
