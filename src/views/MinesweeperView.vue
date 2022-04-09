<script setup lang="ts">
import MineBlock from "@/components/MIneBlock.vue";

import { GamePlay } from "@/components/MineClass";
import { computed, watchEffect } from "vue";
import { useStorage } from "@vueuse/core";

const play = new GamePlay(10, 10);
useStorage("vuesweeper-state", play);
const data = computed(() => play.board);

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
            :key="x"
            :data="item"
            @click="play.onClick(item)"
            @right-click="play.onRightClick(item)"
          />
        </div>
      </div>
      <div class="flex justify-center">
        <button @click="play.reset()">Reset</button>
      </div>
    </div>
  </main>
</template>
