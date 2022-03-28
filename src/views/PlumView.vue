<script setup lang="ts">
import { onMounted, ref } from "vue";

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
const WIDTH = 400;
// canvas 高度
const HEIGHT = 400;
// 画笔颜色
const COLOR = "#888888";

const el = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

onMounted(() => {
  el.value && (ctx.value = setupCanvas(el.value, WIDTH, HEIGHT));
  ctx.value && (ctx.value.strokeStyle = COLOR);

  treeLoop({
    start: { x: WIDTH / 2, y: HEIGHT },
    angle: -Math.PI / 2,
    length: 5,
  });
});

// 启动 Canvas
// 适配高分屏
const setupCanvas = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) => {
  // Init Canvas
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // Get the device pixel ratio, falling back to 1.
  const dpr = window.devicePixelRatio || 1;
  // Get the size of the canvas in CSS pixels.
  const rect = canvas.getBoundingClientRect();
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  const ctx = canvas.getContext("2d");
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx && ctx.scale(dpr, dpr);

  return ctx;
};

const branchRenderQueue: (() => void)[] = [];

const treeLoop = (b: Branch, depth = 0) => {
  requestAnimationFrame(() => {
    const end = drawBranch(b);
    if (end.x < 0 || end.y < 0) return;

    if (depth < 3 || Math.random() < 0.5) {
      const leftBranch: Branch = {
        start: end,
        length: b.length,
        angle: b.angle + (-Math.random() * 0.9 * Math.PI) / 6,
      };
      branchRenderQueue.push(() => treeLoop(leftBranch, depth + 1));
    }

    if (depth < 3 || Math.random() < 0.5) {
      const rightBranch: Branch = {
        start: end,
        length: b.length,
        angle: b.angle + (Math.random() * 0.9 * Math.PI) / 6,
      };
      branchRenderQueue.push(() => treeLoop(rightBranch, depth + 1));
    }

    const temp = [...branchRenderQueue];
    branchRenderQueue.length = 0;
    temp.forEach((fn) => fn());
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
</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <canvas ref="el" class="border border-black"></canvas>
  </main>
</template>
