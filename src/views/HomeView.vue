<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const el = ref<HTMLCanvasElement>();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ctx = computed(() => el.value!.getContext("2d")!);

const WIDTH = 600;
const HEIGHT = 600;

interface Point {
  x: number;
  y: number;
}

interface Branch {
  start: Point;
  length: number;
  angle: number;
}

function init() {
  ctx.value.strokeStyle = "#fff";

  step({
    start: { x: WIDTH / 2, y: HEIGHT },
    length: 40,
    angle: -Math.PI / 2,
  });
}

const pendingTask: (() => void)[] = [];

function step(b: Branch, depth = 0) {
  const end = getEndPoint(b);
  drawBranch(b);

  if (depth < 2 || Math.random() < 0.5) {
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

  if (depth < 2 || Math.random() < 0.5) {
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
    if (frameCount % 30 === 0) frame();
    startFrame();
  });
}

startFrame();

function lineTo(p1: Point, p2: Point) {
  ctx.value.beginPath(); // Start a new path
  ctx.value.moveTo(p1.x, p1.y); // Move the pen to (30, 50)
  ctx.value.lineTo(p2.x, p2.y); // Draw a line to (150, 40)
  ctx.value.stroke(); // Render the path
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

onMounted(() => {
  init();
});
</script>

<template>
  <main class="bg-neutral-900 w-screen h-screen">
    <canvas ref="el" width="600" height="600"></canvas>
  </main>
</template>
