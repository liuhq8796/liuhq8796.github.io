<script setup lang="ts">
import { reactive } from "vue";

interface BlockState {
  x: number;
  y: number;
  adjacentMines: number;
  revealed?: boolean;
  mine?: boolean;
  flagged?: boolean;
}

const WIDTH = 10;
const HEIGHT = 10;
const data = reactive(
  Array.from({ length: HEIGHT }, (_, y) =>
    Array.from(
      { length: WIDTH },
      (_, x): BlockState => ({
        x,
        y,
        adjacentMines: 0,
      })
    )
  )
);

const onClick = (x: number, y: number) => {
  console.log(x, y);
};

const generateMines = () => {
  for (const row of data) {
    for (const block of row) {
      block.mine = Math.random() < 0.1;
    }
  }
};

generateMines();

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
      for (const [dx, dy] of DIRECTIONS) {
        const x = item.x + dx;
        const y = item.y + dy;
        if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) continue;
        if (data[y][x].mine) {
          item.adjacentMines++;
        }
      }
    }
  }
};

updateNumbers();

const getBlockClass = (item: BlockState) => {
  return item.mine ? "text-red-400" : "text-gray-400";
};
</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <div>
      <h1 class="text-center">Minesweeper</h1>
      <div class="mt-2">
        <div v-for="(row, y) in data" :key="y">
          <button
            class="w-10 h-10 border hover:bg-gray-400"
            :class="getBlockClass(item)"
            v-for="(item, x) in row"
            :key="x"
            @click="onClick(x, y)"
          >
            <div v-if="item.mine">x</div>
            <div v-else>{{ item.adjacentMines }}</div>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
