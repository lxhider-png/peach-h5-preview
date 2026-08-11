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
    }
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
    pollinationStatus.textContent = "拖动蜜蜂，先经过花药。";
    pollinationDetail.textContent = "花药释放花粉，柱头接收花粉。";
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
    pollinationStatus.textContent = "花粉已经附着。";
    pollinationDetail.textContent = "继续移动到另一朵花的柱头。";
  }

  function completePollination() {
    if (!state.bee.pollen || state.bee.complete) return;
    state.bee.complete = true;
    state.bee.progressed = true;
    state.bee.dragging = false;
    bee.disabled = true;
    bee.classList.remove("is-dragging");
    pollinationStatus.textContent = "花粉抵达柱头，授粉完成。";
    pollinationDetail.textContent = "但授粉还不是受精。";
    schedule(function () { showScene("complete"); }, reducedMotion ? 600 : 1500);
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
        pollinationDetail.textContent = "目标区域已经扩大。";
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

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) clearTimers();
    else if (state.scene === "bloom") playBloomSequence();
  });
})();
