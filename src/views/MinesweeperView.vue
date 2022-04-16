<script setup lang="ts">
import { GamePlay } from "@/components/MineClass";
import Confetti from "../components/Confetti.vue";

const play = new GamePlay(6, 6, 10);
useStorage("vuesweeper-state", play);
const data = computed(() => play.board);

const mineCount = computed(() => {
  return play.blocks.reduce((a, b) => a + (b.mine ? 1 : 0), 0);
});
watchEffect(() => play.checkGameState());
</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <div>
      <h1 class="text-center">Minesweeper</h1>
      <div class="mt-2">
        <div v-for="(row, y) in data" :key="y" class="flex">
          <MineBlock
            v-for="(item, x) in row"
            :key="y * 10 + x"
            :data="item"
            @click="play.onClick(item)"
            @right-click="play.onRightClick(item)"
          />
        </div>
      </div>

      <div>Count: {{ mineCount }}</div>

      <div class="flex justify-center">
        <button @click="play.reset()">Reset</button>
      </div>
    </div>
  </main>

  <Confetti :passed="play.state.value.gameState === 'won'" />
</template>
