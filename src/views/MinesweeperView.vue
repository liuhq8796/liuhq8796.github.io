<script setup lang="ts">
import { reactive, watchEffect } from "vue";

import MineBlock from "@/components/MIneBlock.vue";

// Interfaces
import type { BlockState } from "@/types/Minesweeper";

const WIDTH = 5;
const HEIGHT = 5;
const data = reactive(
  Array.from({ length: HEIGHT }, (_, y) =>
    Array.from(
      { length: WIDTH },
      (_, x): BlockState => ({
        x,
        y,
        adjacentMines: 0,
        revealed: false,
      })
    )
  )
);

let mineGenerated = false;

const onClick = (item: BlockState) => {
  if (!mineGenerated) {
    generateMines(item);
    updateNumbers();
    mineGenerated = true;
  }

  item.revealed = true;
  if (item.mine) {
    alert("BOOM!");
  } else {
    expendZero(item);
  }
};

const onRightClick = (block: BlockState) => {
  block.flagged = !block.flagged;
};

const generateMines = (initial: BlockState) => {
  for (const row of data) {
    for (const block of row) {
      if (
        Math.abs(initial.x - block.x) <= 1 &&
        Math.abs(initial.y - block.y) <= 1
      )
        continue;
      block.mine = Math.random() < 0.1;
    }
  }
};

const DIRECTIONS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
] as const;

const updateNumbers = () => {
  for (const row of data) {
    for (const item of row) {
      if (item.mine) continue;
      getSibilings(item).forEach((sibiling) => {
        if (sibiling.mine) item.adjacentMines++;
      });
    }
  }
};

const expendZero = (block: BlockState) => {
  if (block.adjacentMines > 0) return;
  getSibilings(block).forEach((sibiling) => {
    if (sibiling.flagged || sibiling.revealed) return;
    sibiling.revealed = true;
    expendZero(sibiling);
  });
};

const getSibilings = (block: BlockState) => {
  const sibilings = [] as BlockState[];
  for (const [dx, dy] of DIRECTIONS) {
    const x = block.x + dx;
    const y = block.y + dy;
    if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) continue;
    sibilings.push(data[y][x]);
  }
  return sibilings;
};

const flat = (arr: BlockState[][]) => {
  return arr.reduce((acc, val) => acc.concat(val), []);
};

const checkGameState = () => {
  const blocks = flat(data);

  if (blocks.every((block) => block.revealed || block.flagged)) {
    if (blocks.every((block) => block.flagged && block.mine)) {
      alert("You cheat!");
    } else {
      alert("You win!");
    }
  }
};

watchEffect(checkGameState);
</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <div>
      <h1 class="text-center">Minesweeper</h1>
      <div class="mt-2">
        <div v-for="(row, y) in data" :key="y" class="flex">
          <MineBlock :data="row" @click="onClick" @right-click="onRightClick" />
        </div>
      </div>
    </div>
  </main>
</template>
