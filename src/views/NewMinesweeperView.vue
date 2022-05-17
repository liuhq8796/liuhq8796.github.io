<script setup lang="ts">
// Classes
import MinesweeperClass from "@/classes/MinesweeperClass";

const Minesweeper = new MinesweeperClass(6, 6, 10);
</script>

<template>
  <main class="w-screen h-screen flex flex-col justify-center items-center">
    <div>
      <div class="flex">
        <RouterLink to="/"><IconRoundChevronLeft class="w-6 h-6" /></RouterLink>
        <h1>Minesweeper</h1>
      </div>
      <div class="mt-2">
        <div v-for="row in Minesweeper.blocks.value" class="flex">
          <MineBlock
            v-for="block in row"
            :data="block"
            @click="Minesweeper.onClick(block)"
            @right-click="Minesweeper.onRightClick(block)"
          ></MineBlock>
        </div>
      </div>
    </div>
  </main>

  <Confetti :passed="Minesweeper.gameState.value === 'won'" />
</template>
