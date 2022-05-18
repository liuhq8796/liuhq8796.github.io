<script setup lang="ts">
// Classes
import MinesweeperClass from "@/classes/MinesweeperClass";

const Minesweeper = new MinesweeperClass(6, 6, 10);

const minesLeft = Minesweeper.useMinesLeft();
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
      <div class="mt-2">
        <button
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          @click="Minesweeper.reset()"
        >
          重置
        </button>
      </div>
      <div>
        <span>剩余：{{ minesLeft }}</span>
      </div>
    </div>
  </main>

  <Confetti :passed="Minesweeper.gameState.value === 'won'" />
</template>
