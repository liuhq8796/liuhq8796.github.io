<script setup lang="ts">
// Interfaces
import type { BlockState } from "@/types/Minesweeper";

defineProps<{
  data: BlockState;
}>();

defineEmits<{
  (e: "click"): void;
  (e: "right-click"): void;
}>();

const NUMBER_COLOR = [
  "text-transparent",
  "text-blue-500",
  "text-green-500",
  "text-red-500",
  "text-orange-500",
  "text-purple-500",
  "text-pink-500",
  "text-yellow-500",
  "text-gray-500",
];

const getBlockClass = (item: BlockState) => {
  if (!item.revealed) return "bg-gray-400/10 hover:bg-gray-400";
  return item.mine ? "text-red-400" : NUMBER_COLOR[item.adjacentMines];
};
</script>

<template>
  <button
    class="w-10 h-10 border border-gray-400 flex justify-center items-center"
    :class="getBlockClass(data)"
    @click="$emit('click')"
    @contextmenu.prevent="$emit('right-click')"
  >
    <template v-if="data.flagged"><IconFlag /></template>
    <template v-else-if="data.revealed">
      <div v-if="data.mine">
        <IconBomb />
      </div>
      <div v-else class="font-semibold">{{ data.adjacentMines }}</div>
    </template>
  </button>
</template>
