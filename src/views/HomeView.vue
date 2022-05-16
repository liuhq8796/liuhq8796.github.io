<script lang="ts" setup>
// Polyfills
import { padStart } from "@/utils/polyfills";

// Something Interesting Links
const links = ref([
  {
    title: "Plum",
    url: "/plum",
  },
  {
    title: "Minesweeper",
    url: "/minesweeper",
  },
  {
    title: "New Minesweeper",
    url: "/new-minesweeper",
  },
]);

// 目标长度
const targetLength = links.value.length.toString().length;

// 生成编号并自动补零函数
const generateId = (current: number) => {
  return padStart(current + "", targetLength, "0");
};
</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <div>
      <h1 class="text-lg font-bold">Something Interesting</h1>
      <div class="w-96 mt-2 gap-8 columns-2">
        <RouterLink
          v-for="(link, index) of links"
          class="block text-gray-400 hover:text-gray-600"
          :to="link.url"
        >
          <span class="opacity-50">{{ generateId(index + 1) }}. </span>
          <strong>{{ link.title }}</strong>
        </RouterLink>
      </div>
      <h1 class="mt-8">
        <a
          class="text-gray-400 hover:text-gray-600"
          href="https://github.com/liuhq8796/liuhq8796.github.io"
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
