<script setup lang="ts">
import { onMounted, ref } from "vue";

// utils
import { useWindowSize } from "@vueuse/core";

// Interface
interface Point {
  x: number;
  y: number;
}

interface Branch {
  start: Point;
  length: number;
  angle: number;
}

const el = ref<HTMLCanvasElement>();
const ctx = ref<CanvasRenderingContext2D>();

const { width, height } = useWindowSize();
const color = "#88888825";

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ctx.value = setupCanvas(el.value!, width.value, height.value);
  ctx.value.strokeStyle = color;

  step({
    start: { x: width.value / 2, y: height.value },
    length: 10,
    angle: -Math.PI / 2,
  });
});

const setupCanvas = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) => {
  // Get the device pixel ratio, falling back to 1.
  var dpr = window.devicePixelRatio || 1;

  // Init Canvas
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // Get the size of the canvas in CSS pixels.
  var rect = canvas.getBoundingClientRect();

  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  var ctx = canvas.getContext("2d")!;

  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);
  return ctx;
};

const pendingTask: (() => void)[] = [];

function step(b: Branch, depth = 0) {
  const end = getEndPoint(b);
  drawBranch(b);

  if (depth < 5 || Math.random() < 0.5) {
    pendingTask.push(() =>
      step(
        {
          start: end,
          length: b.length + Math.random() * 10 - 5,
          angle: b.angle - 0.3 * Math.random(),
        },
        depth + 1
      )
    );
  }

  if (depth < 5 || Math.random() < 0.5) {
    pendingTask.push(() =>
      step(
        {
          start: end,
          length: b.length + Math.random() * 10 - 5,
          angle: b.angle + 0.3 * Math.random(),
        },
        depth + 1
      )
    );
  }
}

function frame() {
  const task = [...pendingTask];
  pendingTask.length = 0;
  task.forEach((fn) => fn());
}

let frameCount = 0;
function startFrame() {
  requestAnimationFrame(() => {
    frameCount += 1;
    if (!pendingTask.length) return;
    if (frameCount % 10 === 0) frame();
    startFrame();
  });
}

startFrame();

function lineTo(p1: Point, p2: Point) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const context = ctx.value!;
  context.beginPath(); // Start a new path
  context.moveTo(p1.x, p1.y); // Move the pen to (30, 50)
  context.lineTo(p2.x, p2.y); // Draw a line to (150, 40)
  context.stroke(); // Render the path
}

function getEndPoint(b: Branch) {
  return {
    x: b.start.x + b.length * Math.cos(b.angle),
    y: b.start.y + b.length * Math.sin(b.angle),
  };
}

function drawBranch(b: Branch) {
  lineTo(b.start, getEndPoint(b));
}
</script>

<template>
  <main class="bg-neutral-900 w-screen h-screen">
    <canvas ref="el"></canvas>
  </main>
</template>
