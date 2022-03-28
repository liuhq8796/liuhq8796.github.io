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
    start: { x: width.value * (Math.random() * 0.6 + 0.2), y: height.value },
    length: 5,
    angle: -Math.PI / 2 + ((Math.random() * Math.PI) / 2 - Math.PI / 4),
  });

  step({
    start: { x: width.value * (Math.random() * 0.6 + 0.2), y: 0 },
    length: 5,
    angle: Math.PI / 2 + ((Math.random() * Math.PI) / 2 - Math.PI / 4),
  });

  step({
    start: { x: 0, y: height.value * (Math.random() * 0.6 + 0.2) },
    length: 5,
    angle: 0 + ((Math.random() * Math.PI) / 2 - Math.PI / 4),
  });

  step({
    start: { x: width.value, y: height.value * (Math.random() * 0.6 + 0.2) },
    length: 5,
    angle: -Math.PI + ((Math.random() * Math.PI) / 2 - Math.PI / 4),
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

const MaxDepth = 50;

const step = (b: Branch, depth = 0) => {
  const end = drawBranch(b);

  if ((depth < 5 || Math.random() < 0.5) && depth < MaxDepth) {
    pendingTask.push(() =>
      step(
        {
          start: end,
          length: b.length,
          angle: b.angle - 0.3 * Math.random(),
        },
        depth + 1
      )
    );
  }

  if ((depth < 5 || Math.random() < 0.5) && depth < MaxDepth) {
    pendingTask.push(() =>
      step(
        {
          start: end,
          length: b.length,
          angle: b.angle + 0.3 * Math.random(),
        },
        depth + 1
      )
    );
  }
};

const frame = () => {
  const task = [...pendingTask];
  pendingTask.length = 0;
  task.forEach((fn) => fn());
};

let lastFrame = 0;
const startFrame = () => {
  requestAnimationFrame((timestamp) => {
    if (timestamp - lastFrame > 16) {
      frame();
      lastFrame = timestamp;
    }
    if (!pendingTask.length) return;
    startFrame();
  });
};

startFrame();

const lineTo = (p1: Point, p2: Point) => {
  ctx.value?.beginPath(); // Start a new path
  ctx.value?.moveTo(p1.x, p1.y); // Move the pen to (30, 50)
  ctx.value?.lineTo(p2.x, p2.y); // Draw a line to (150, 40)
  ctx.value?.stroke(); // Render the path
};

const getEndPoint = (b: Branch) => {
  const x = b.start.x + b.length * Math.cos(b.angle);
  const y = b.start.y + b.length * Math.sin(b.angle);
  if (x < 0 || x > width.value || y < 0 || y > height.value) {
    b.angle += Math.PI;
  }
  return { x, y };
};

const drawBranch = (b: Branch) => {
  const end = getEndPoint(b);
  lineTo(b.start, end);
  return end;
};
</script>

<template>
  <main class="bg-neutral-900 w-screen h-screen">
    <canvas ref="el"></canvas>
  </main>
</template>
