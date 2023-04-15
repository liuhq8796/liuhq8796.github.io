<script setup lang="ts">
// 精通技术栈
const technologyStack = [
  {
    name: 'Vue',
    href: 'https://vuejs.org/',
  },
  {
    name: 'Vite',
    href: 'https://vitejs.dev/',
  },
  {
    name: 'Vue Router',
    href: 'https://router.vuejs.org/',
  },
  {
    name: 'Pinia',
    href: 'https://pinia.vuejs.org/',
  },
  {
    name: 'Vue Use',
    href: 'https://vueuse.org/',
  },
  {
    name: 'TypeScript',
    href: 'https://www.typescriptlang.org/',
  },
  {
    name: 'Element Plus',
    href: 'https://element-plus.org/',
  },
  {
    name: 'Webpack',
    href: 'https://webpack.js.org/',
  },
  {
    name: 'Rollup',
    href: 'https://rollupjs.org/',
  },
  {
    name: 'Git',
    href: 'https://git-scm.com/',
  },
]

// 了解技术栈
const technologyStack2 = [
  {
    name: 'Tailwind CSS',
    href: 'https://tailwindcss.com/',
  },
  {
    name: 'Express',
    href: 'https://expressjs.com/',
  },
  {
    name: 'Node.js',
    href: 'https://nodejs.org/',
  },
  {
    name: 'MongoDB',
    href: 'https://www.mongodb.com/',
  },
  {
    name: 'Nginx',
    href: 'https://www.nginx.com/',
  },
  {
    name: 'Docker',
    href: 'https://www.docker.com/',
  },
]
</script>

<template>
  <article class="m-auto max-w-2xl">
    <h1 class="text-white text-3xl font-serif mb-8 mt-0">Lucas Liu</h1>

    <section>
      <p class="my-4 first:mt-0 text-gray-400 text-base">
        Hi，我是 Lucas Liu，一名前端开发工程师，在
        <BaseLink href="https://www.duxiaoman.com/">度小满科技（北京）有限公司</BaseLink>
        工作。
      </p>
      <p class="my-4 first:mt-0 text-gray-400 text-base">
        目前正在使用的技术栈有
        <template v-for="(technology, index) of technologyStack" :key="index">
          <BaseLink :href="technology.href">{{ technology.name }}</BaseLink
          ><span v-if="index + 1 < technologyStack.length">、</span>
        </template>
        等。
      </p>
      <p class="my-4 first:mt-0 text-gray-400 text-base">
        除了日常的业务开发，也参加了一些技术项目，比如：<BaseLink href="https://www.cypress.io/"
          >Cypress</BaseLink
        >/<BaseLink href="https://playwright.dev/">playwright</BaseLink>
        E2E自动化测试项目、<BaseLink href="#" target="_self">Chrome 浏览器扩展</BaseLink>
        开发等等。
      </p>
      <p class="my-4 first:mt-0 text-gray-400 text-base">
        分享过行业流行/前沿技术，例如：
        <BaseLink href="#" target="_self">BEM、Atomic CSS 方法论</BaseLink>、<BaseLink
          href="#"
          target="_self"
          >Nginx JavaScript</BaseLink
        >
        等。
      </p>
      <p class="my-4 first:mt-0 text-gray-400 text-base">
        另外，因个人兴趣了解过的技术栈有
        <template v-for="(technology, index) of technologyStack2" :key="index">
          <BaseLink :href="technology.href">{{ technology.name }}</BaseLink
          ><span v-if="index + 1 < technologyStack2.length">、</span>
        </template>
        等。
      </p>
      <p class="my-4 first:mt-0 text-gray-400 text-base">
        在编程之外，我对动漫和游戏很感兴趣，经常在 B
        站看番，玩一玩原神和一些音游，偶尔看看科幻或者搞笑电影。
      </p>
    </section>
  </article>
</template>
