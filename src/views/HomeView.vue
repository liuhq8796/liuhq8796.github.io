<script setup lang="ts">
import { type BaseLinkProps } from '@/components/BaseLink.vue'

const blogUrl = import.meta.env.VITE_BLOG_URL

let blogTarget = '_blank'
if (import.meta.env.DEV) {
  blogTarget = '_self'
}

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

const baseUrl = import.meta.env.VITE_BLOG_URL

const bemAndAtomicCssMethodologyUrl = `${baseUrl}/articles/css/bem-and-atomic-css-methodology.html`

const javascriptInNginxConfigurationUrl = `${baseUrl}/articles/nginx/javascript-in-nginx-configuration.html`

// 技术分享
const technologyShare: (BaseLinkProps & { name: string })[] = [
  {
    name: 'BEM 与 Atomic CSS 方法论',
    href: import.meta.env.DEV ? '#' : bemAndAtomicCssMethodologyUrl,
    target: import.meta.env.DEV ? '_self' : '_blank',
  },
  {
    name: 'Nginx 配置中的 JavaScript',
    href: import.meta.env.DEV ? '#' : javascriptInNginxConfigurationUrl,
    target: import.meta.env.DEV ? '_self' : '_blank',
  },
]
</script>

<template>
  <main class="w-full min-w-min h-full min-h-[836px] overflow-auto flex justify-center items-center bg-gradient-to-t from-blue-500 to-sky-300">
    <!-- 垃圾 Tailwind CSS -->
    <div class="w-[780px] shrink-0 basis-[780px] bg-white relative m-8">
      <picture>
        <source
          srcset="@/assets/images/avatar.webp"
          type="image/webp"
        >
        <img
          src="@/assets/images/avatar.jpg"
          alt="avatar"
          class="absolute top-[190px] left-[25px] w-[220px] z-[2] h-[220px] rounded-[50%] object-cover object-[center_top] border-[10px] border-white border-solid shadow-[0_5px_10px_#00000065]"
        >
      </picture>
      <div class="h-[340px] relative overflow-hidden z-[1]">
        <picture>
          <source
            srcset="@/assets/images/background.webp"
            type="image/webp"
          >
          <img
            class="w-full h-full absolute -z-[1] object-cover [clip-path:_path('M_0_0_H_780_V_300_L_0_340_V_0')]"
            src="@/assets/images/background.jpg"
            alt="background"
          >
        </picture>
        <div class="pt-[190px] pl-[276px] [text-shadow:_0_0_20px_#000]">
          <div class="text-white text-[50px] font-black font-[''] mb-[5px] relative">
            Lucas Liu
          </div>
          <div class="text-white font-medium text-2xl font-['']">
            前端开发热爱者
          </div>
        </div>
      </div>

      <div class=" flex">
        <section class="pl-[30px] pt-[100px] text-center basis-[250px] break-all">
          <a
            :href="blogUrl"
            :target="blogTarget"
          ><span class="whitespace-nowrap bg-[#eee4ad] text-[rgb(0,43,128)] rounded-[10px] py-[3px] px-2 text-sm leading-[35px] mr-1 cursor-pointer hover:bg-indigo-400 hover:text-white font-bold"># Blogs</span></a>
          <br>
          <a
            :href="blogUrl==='#' ? blogUrl : `${blogUrl}/articles/js/`"
            :target="blogTarget"
          ><span class="whitespace-nowrap bg-blue-400 text-white rounded-[10px] py-[3px] px-2 text-sm leading-[35px] mr-1 cursor-pointer hover:bg-[#eee4ad] hover:text-[rgb(0,43,128)]"># JS</span></a>
          <a
            :href="blogUrl==='#' ? blogUrl : `${blogUrl}/articles/html/`"
            :target="blogTarget"
          ><span class="whitespace-nowrap bg-blue-400 text-white rounded-[10px] py-[3px] px-2 text-sm leading-[35px] mr-1 cursor-pointer hover:bg-[#eee4ad] hover:text-[rgb(0,43,128)]"># HTML</span></a>
          <a
            :href="blogUrl==='#' ? blogUrl : `${blogUrl}/articles/css/`"
            :target="blogTarget"
          ><span class="whitespace-nowrap bg-blue-400 text-white rounded-[10px] py-[3px] px-2 text-sm leading-[35px] mr-1 cursor-pointer hover:bg-[#eee4ad] hover:text-[rgb(0,43,128)]"># CSS</span></a>
          <a
            :href="blogUrl==='#' ? blogUrl : `${blogUrl}/articles/vue/`"
            :target="blogTarget"
          ><span class="whitespace-nowrap bg-blue-400 text-white rounded-[10px] py-[3px] px-2 text-sm leading-[35px] mr-1 cursor-pointer hover:bg-[#eee4ad] hover:text-[rgb(0,43,128)]"># Vue</span></a>
          <a
            :href="blogUrl==='#' ? blogUrl : `${blogUrl}/articles/ts/`"
            :target="blogTarget"
          ><span class="whitespace-nowrap bg-blue-400 text-white rounded-[10px] py-[3px] px-2 text-sm leading-[35px] mr-1 cursor-pointer hover:bg-[#eee4ad] hover:text-[rgb(0,43,128)]"># TS</span></a>
          <a
            :href="blogUrl==='#' ? blogUrl : `${blogUrl}/articles/vite/`"
            :target="blogTarget"
          ><span class="whitespace-nowrap bg-blue-400 text-white rounded-[10px] py-[3px] px-2 text-sm leading-[35px] mr-1 cursor-pointer hover:bg-[#eee4ad] hover:text-[rgb(0,43,128)]"># Vite</span></a>
          <a
            :href="blogUrl==='#' ? blogUrl : `${blogUrl}/articles/node/`"
            :target="blogTarget"
          ><span class="whitespace-nowrap bg-blue-400 text-white rounded-[10px] py-[3px] px-2 text-sm leading-[35px] mr-1 cursor-pointer hover:bg-[#eee4ad] hover:text-[rgb(0,43,128)]"># Node</span></a>
          <a
            :href="blogUrl==='#' ? blogUrl : `${blogUrl}/articles/nginx/`"
            :target="blogTarget"
          ><span class="whitespace-nowrap bg-blue-400 text-white rounded-[10px] py-[3px] px-2 text-sm leading-[35px] mr-1 cursor-pointer hover:bg-[#eee4ad] hover:text-[rgb(0,43,128)]"># Nginx</span></a>
          <a
            :href="blogUrl==='#' ? blogUrl : `${blogUrl}/articles/engineering-design/`"
            :target="blogTarget"
          ><span class="whitespace-nowrap bg-blue-400 text-white rounded-[10px] py-[3px] px-2 text-sm leading-[35px] mr-1 cursor-pointer hover:bg-[#eee4ad] hover:text-[rgb(0,43,128)]"># 工程化设计</span></a>
          <a
            :href="blogUrl==='#' ? blogUrl : `${blogUrl}/articles/programming/`"
            :target="blogTarget"
          ><span class="whitespace-nowrap bg-blue-400 text-white rounded-[10px] py-[3px] px-2 text-sm leading-[35px] mr-1 cursor-pointer hover:bg-[#eee4ad] hover:text-[rgb(0,43,128)]"># 程序设计</span></a>
          <a
            :href="blogUrl==='#' ? blogUrl : `${blogUrl}/articles/reading/`"
            :target="blogTarget"
          ><span class="whitespace-nowrap bg-blue-400 text-white rounded-[10px] py-[3px] px-2 text-sm leading-[35px] mr-1 cursor-pointer hover:bg-[#eee4ad] hover:text-[rgb(0,43,128)]"># 阅读</span></a>
        </section>

        <section class="p-6 flex-1 text-[#444]">
          <p class="my-4 first:mt-0 text-base">
            Hi，我是 Lucas Liu，一名前端开发工程师，在
            <BaseLink href="https://www.duxiaoman.com/">
              度小满科技（北京）有限公司
            </BaseLink>
            工作。
          </p>
          <p class="my-4 first:mt-0 text-base">
            目前正在使用的技术栈有
            <template
              v-for="(technology, index) of technologyStack"
              :key="index"
            >
              <BaseLink :href="technology.href">
                {{ technology.name }}
              </BaseLink><span v-if="index + 1 < technologyStack.length">、</span>
            </template>
            等。
          </p>
          <p class="my-4 first:mt-0 text-base">
            除了日常的业务开发，也参加了一些技术项目，比如：<BaseLink href="https://www.cypress.io/">
              Cypress
            </BaseLink>
            /
            <BaseLink href="https://playwright.dev/">
              playwright
            </BaseLink> E2E自动化测试项目、<BaseLink
              href="#"
              target="_self"
            >
              Chrome 浏览器扩展
            </BaseLink>
            开发等等。
          </p>
          <p class="my-4 first:mt-0 text-base">
            同时，我也十分关注行业流行 / 前沿技术，分享过如：
            <template
              v-for="(technology, index) of technologyShare"
              :key="index"
            >
              <BaseLink
                :href="technology.href"
                :target="technology.target"
              >
                {{
                  technology.name
                }}
              </BaseLink><span v-if="index + 1 < technologyShare.length">、</span>
            </template>
            等主题。
          </p>
          <p class="my-4 first:mt-0 text-base">
            另外，因个人兴趣了解过的技术栈有
            <template
              v-for="(technology, index) of technologyStack2"
              :key="index"
            >
              <BaseLink :href="technology.href">
                {{ technology.name }}
              </BaseLink><span v-if="index + 1 < technologyStack2.length">、</span>
            </template>
            等。
          </p>
          <p class="my-4 first:mt-0 text-base">
            在编程之外，我对动漫和游戏很感兴趣，经常在 B
            站看番，玩一玩原神和一些音游，偶尔看看科幻或者搞笑电影。
          </p>
        </section>
      </div>
    </div>
  </main>
</template>
