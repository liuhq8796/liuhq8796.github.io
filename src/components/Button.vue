<template>
  <button
    class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineEmits<{
  (e: "click"): void;
}>();
</script>
