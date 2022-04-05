<script setup lang="ts">
// Components
import IconBomb from "../components/icons/IconBomb.vue";
import IconFlag from "../components/icons/IconFlag.vue";

// Interfaces
import type { BlockState } from "@/types/Minesweeper";

defineProps<{
  data: BlockState[];
}>();

defineEmits<{
  (e: "click", value: BlockState): void;
  (e: "right-click", value: BlockState): void;
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
    :class="getBlockClass(item)"
    v-for="(item, x) in data"
    :key="x"
    @click="$emit('click', item)"
    @contextmenu.prevent="$emit('right-click', item)"
  >
    <template v-if="item.flagged"><IconFlag /></template>
    <template v-else-if="item.revealed">
      <div v-if="item.mine">
        <IconBomb />
      </div>
      <div v-else>{{ item.adjacentMines }}</div>
    </template>
  </button>
</template>
