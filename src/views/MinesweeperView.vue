<script setup lang="ts">
import MineBlock from "@/components/MIneBlock.vue";

import { GamePlqy } from "@/components/MineClass";
import { watchEffect } from "vue";

const play = new GamePlqy(10, 10);
const data = play.state.value;

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
    </div>
  </main>
</template>
