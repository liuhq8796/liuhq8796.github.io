<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <div>
      <h1 class="text-lg font-bold">Something Interesting</h1>
      <div class="w-96 mt-2 gap-8 columns-2">
        <RouterLink class="block text-gray-400 hover:text-gray-600" to="/plum">
          <span class="opacity-50">01.</span>
          <strong>Plum</strong>
        </RouterLink>
        <RouterLink
          class="block text-gray-400 hover:text-gray-600"
          to="/minesweeper"
        >
          <span class="opacity-50">02.</span>
          <strong>Minesweeper</strong>
        </RouterLink>
      </div>
      <h1 class="mt-8">
        <a
          class="text-gray-400 hover:text-gray-600"
          href="https://github.com/liuhq8796/personal-website"
          target="_blank"
          rel="noopener noreferrer"
          >Github</a
        >
        <br />
        <span class="text-gray-300">from 2022/3/12</span>
      </h1>
    </div>
  </main>
</template>
