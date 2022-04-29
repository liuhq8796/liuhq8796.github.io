<script lang="ts" setup>
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
]);

// 生成编号并自动补零函数
const generateId = (function (targetLength) {
  let id = 1;
  return function () {
    return padStart(`${id++}`, targetLength, "0");
  };
})(links.value.length.toString().length);

// padStart 函数
const padStart = (current: string, targetLength: number, padString: string) => {
  targetLength = targetLength >> 0; // truncate if number, or convert non-number to 0;
  padString = String(typeof padString !== "undefined" ? padString : " ");
  if (current.length >= targetLength) {
    return String(current);
  } else {
    targetLength = targetLength - current.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); // append to original to ensure we are longer than needed
    }
    return padString.slice(0, targetLength) + String(current);
  }
};
</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <div>
      <h1 class="text-lg font-bold">Something Interesting</h1>
      <div class="w-96 mt-2 gap-8 columns-2">
        <RouterLink
          v-for="link of links"
          class="block text-gray-400 hover:text-gray-600"
          :to="link.url"
        >
          <span class="opacity-50">{{ generateId() }}. </span>
          <strong>{{ link.title }}</strong>
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
