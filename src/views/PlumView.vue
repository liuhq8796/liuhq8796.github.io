<script setup lang="ts">
// Interface
import type { Point, Branch } from "@/types/Plum";

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
  // 初始化 canvas
  ctx.value = setupCanvas(el.value!);
  // 设置画笔颜色
  ctx.value.strokeStyle = COLOR;

  // 向队列中添加第一个递归渲染分支函数
  branchRenderQueue.push(() => {
    branchLoop({
      start: { x: width / 2, y: height },
      angle: -Math.PI / 2,
      length: length.value,
    });
  });
  // 启动渲染分支函数队列
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
  ctx!.scale(dpr, dpr);

  return ctx!;
};

// 递归渲染分支函数
const branchLoop = (b: Branch, depth = 0) => {
  // 渲染分支并获取结束位置作为下一个分支起点
  const end = drawBranch(b);
  // 超出画布外的分支不再渲染
  if (end.x < 0 || end.x > width || end.y < 0 || end.y > height) return;

  // 如果深度小于最小深度则必定执行，否则按概率执行
  if (depth < minDepth.value || Math.random() < 0.5) {
    // 设置左分支
    const leftBranch: Branch = {
      start: end,
      length: b.length,
      angle: b.angle - (Math.random() * Math.PI) / 6,
    };
    // 将左分支渲染函数添加到队列中，并将深度加1
    branchRenderQueue.push(() => branchLoop(leftBranch, depth + 1));
  }

  // 如果深度小于最小深度则必定执行，否则按概率执行
  if (depth < minDepth.value || Math.random() < 0.5) {
    // 设置右分支
    const rightBranch: Branch = {
      start: end,
      length: b.length,
      angle: b.angle + (Math.random() * Math.PI) / 6,
    };
    // 将右分支渲染函数添加到队列中，并将深度加1
    branchRenderQueue.push(() => branchLoop(rightBranch, depth + 1));
  }
};

// 上一次执行时间
let lastTime = 0;

// 启动渲染分支函数队列
const renderStart = () => {
  requestAnimationFrame((time) => {
    // 如果距离上一次执行时间小于 16ms 则不执行
    // 统一高刷新率屏幕动画间隔
    if (time - lastTime > 16) {
      // 更新上一次执行时间
      lastTime = time;
      // 浅拷贝队列
      const tempQueue = [...branchRenderQueue];
      // 清空队列
      branchRenderQueue.length = 0;
      // 遍历执行队列中的渲染函数
      tempQueue.forEach((fn) => fn());
    }
    // 如果队列中还有渲染函数则继续执行
    if (branchRenderQueue.length > 0) {
      renderStart();
    }
  });
};

// 绘制分支
const drawBranch = (b: Branch) => {
  const end = getEndPoint(b);
  lineTo(b.start, end);
  return end;
};

// 获取分支结束点
const getEndPoint = (b: Branch) => {
  const x = b.start.x + b.length * Math.cos(b.angle);
  const y = b.start.y + b.length * Math.sin(b.angle);
  return { x, y };
};

// 绘制线段
const lineTo = (start: Point, end: Point) => {
  ctx.value!.beginPath(); // Start a new path
  ctx.value!.moveTo(start.x, start.y); // Move the pen to (30, 50)
  ctx.value!.lineTo(end.x, end.y); // Draw a line to (150, 40)
  ctx.value!.stroke(); // Render the path
};

// 重置画布
const clearCanvas = () => {
  ctx.value!.clearRect(0, 0, width, height);
};

// 重新绘制
const repaint = () => {
  // 清除画布
  clearCanvas();
  // 清除渲染队列
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
      <RouterLink to="/"><IconRoundChevronLeft class="w-6 h-6" /></RouterLink>
      <canvas ref="el" class="mt-4 w-96 h-96 border border-black"></canvas>
      <div class="mt-4">
        <button @click="repaint">重新绘制</button>
      </div>
      <div class="mt-4">分支长度：<input type="text" v-model="length" /></div>
      <div class="mt-4">最小深度：<input type="text" v-model="minDepth" /></div>
    </div>
  </main>
</template>
