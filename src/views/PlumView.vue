<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

// Components
import { ChevronLeftIcon } from "@heroicons/vue/outline";

// Interface
interface Point {
  x: number;
  y: number;
}

interface Branch {
  start: Point;
  angle: number;
  length: number;
}

// canvas 宽度
let width = 0;
// canvas 高度
let height = 0;
// 画笔颜色
const COLOR = "#888888";
// 分支长度
const length = ref(10);
// 最小深度
const minDepth = ref(5);

// template ref
const el = ref<HTMLCanvasElement | null>(null);
// canvas context
const ctx = ref<CanvasRenderingContext2D | null>(null);
// 渲染分支函数队列
const branchRenderQueue: (() => void)[] = [];

onMounted(() => {
  el.value && (ctx.value = setupCanvas(el.value));
  ctx.value && (ctx.value.strokeStyle = COLOR);

  branchRenderQueue.push(() => {
    branchLoop({
      start: { x: width / 2, y: height },
      angle: -Math.PI / 2,
      length: length.value,
    });
  });
  renderStart();
});

// 启动 Canvas 同时适配高分屏
const setupCanvas = (canvas: HTMLCanvasElement) => {
  // Get the device pixel ratio, falling back to 1.
  const dpr = window.devicePixelRatio || 1;
  // Get the size of the canvas in CSS pixels.
  const rect = canvas.getBoundingClientRect();

  width = rect.width;
  height = rect.height;

  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const ctx = canvas.getContext("2d");
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx && ctx.scale(dpr, dpr);

  return ctx;
};

const branchLoop = (b: Branch, depth = 0) => {
  const end = drawBranch(b);
  // 超出画布外的分支不再渲染
  if (end.x < 0 || end.x > width || end.y < 0 || end.y > height) return;

  if (depth < minDepth.value || Math.random() < 0.5) {
    const leftBranch: Branch = {
      start: end,
      length: b.length,
      angle: b.angle - (Math.random() * Math.PI) / 6,
    };
    branchRenderQueue.push(() => branchLoop(leftBranch, depth + 1));
  }

  if (depth < minDepth.value || Math.random() < 0.5) {
    const rightBranch: Branch = {
      start: end,
      length: b.length,
      angle: b.angle + (Math.random() * 0.9 * Math.PI) / 6,
    };
    branchRenderQueue.push(() => branchLoop(rightBranch, depth + 1));
  }
};

let lastTime = 0;

const renderStart = () => {
  requestAnimationFrame((time) => {
    if (time - lastTime > 16) {
      const tempQueue = [...branchRenderQueue];
      branchRenderQueue.length = 0;
      tempQueue.forEach((fn) => fn());
    }
    if (branchRenderQueue.length > 0) {
      lastTime = time;
      renderStart();
    }
  });
};

const drawBranch = (b: Branch) => {
  const end = getEndPoint(b);
  lineTo(b.start, end);
  return end;
};

const getEndPoint = (b: Branch) => {
  const x = b.start.x + b.length * Math.cos(b.angle);
  const y = b.start.y + b.length * Math.sin(b.angle);
  return { x, y };
};

const lineTo = (start: Point, end: Point) => {
  ctx.value?.beginPath(); // Start a new path
  ctx.value?.moveTo(start.x, start.y); // Move the pen to (30, 50)
  ctx.value?.lineTo(end.x, end.y); // Draw a line to (150, 40)
  ctx.value?.stroke(); // Render the path
};

const clearCanvas = () => {
  ctx.value?.clearRect(0, 0, width, height);
};

const repaint = () => {
  clearCanvas();
  branchRenderQueue.length = 0;

  branchRenderQueue.push(() => {
    branchLoop({
      start: { x: width / 2, y: height },
      angle: -Math.PI / 2,
      length: length.value,
    });
  });
  renderStart();
};
</script>

<template>
  <main class="w-screen h-screen flex flex-col justify-center items-center">
    <div>
      <RouterLink to="/"><ChevronLeftIcon class="w-6 h-6" /></RouterLink>
      <canvas ref="el" class="mt-4 w-96 h-96 border border-black"></canvas>
      <div class="mt-4">
        <button @click="repaint">重新绘制</button>
      </div>
      <div class="mt-4">分支长度：<input type="text" v-model="length" /></div>
      <div class="mt-4">最小深度：<input type="text" v-model="minDepth" /></div>
    </div>
  </main>
</template>
