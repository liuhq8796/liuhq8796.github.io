<script setup lang="ts">
const technologyStack = [
  {
    name: 'Vue',
    href: 'https://vuejs.org/'
  },
  {
    name: 'Vue Router',
    href: 'https://router.vuejs.org/'
  },
  {
    name: 'Pinia',
    href: 'https://pinia.vuejs.org/'
  },
  {
    name: 'Vue Use',
    href: 'https://vueuse.org/'
  },
  {
    name: 'Vite',
    href: 'https://vitejs.dev/'
  },
  {
    name: 'TypeScript',
    href: 'https://www.typescriptlang.org/'
  },
  {
    name: 'Element Plus',
    href: 'https://element-plus.org/'
  },
  {
    name: 'Tailwind CSS',
    href: 'https://tailwindcss.com/'
  },
  {
    name: 'playwright',
    href: 'https://playwright.dev/'
  },
  {
    name: 'Cypress',
    href: 'https://www.cypress.io/'
  }
]
</script>

<template>
  <main class="px-7 py-10">
    <article class="m-auto max-w-2xl">
      <h1 class="text-white text-3xl font-serif mb-8 mt-0">Lucas Liu</h1>

      <section>
        <p class="my-4 first:mt-0 text-gray-400 text-base">
          Hi，我是 Lucas Liu，一名前端开发工程师，在
          <BaseLink href="https://www.duxiaoman.com/">度小满科技（北京）有限公司</BaseLink>
          工作。
        </p>
        <p class="my-4 first:mt-0 text-gray-400 text-base">
          现在正在使用的技术栈有
          <template v-for="(technology, index) of technologyStack" :key="index">
            <BaseLink :href="technology.href">{{ technology.name }}</BaseLink
            ><span v-if="index + 1 < technologyStack.length">、</span>
          </template>
          等。
        </p>
        <p class="my-4 first:mt-0 text-gray-400 text-base">
          在编程之外，我对动漫和游戏很感兴趣，经常在 B
          站看番，玩一玩原神和一些音游，偶尔看看科幻或者搞笑电影。
        </p>
      </section>
    </article>
  </main>
</template>
