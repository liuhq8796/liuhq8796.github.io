<template>
  <a
    class="cursor-pointer no-underline border-0 border-b border-solid border-b-gray-400/30 hover:border-b-gray-400 transition-300 ease-in-out"
    :class="[textColor ? textColor : 'text-white']"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    ><slot></slot
  ></a>
</template>

<script setup lang="ts">
defineProps<{
  href: string
  textColor?: string
}>()
</script>
