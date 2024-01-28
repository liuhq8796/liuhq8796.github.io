<script setup lang="ts">
const blogUrl = import.meta.env.VITE_BLOG_URL

let blogTarget = '_blank'
if (import.meta.env.DEV) {
  blogTarget = '_self'
}
</script>

<template>
  <header class="h-16 px-8">
    <nav class="h-full flex justify-between items-center">
      <RouterLink :to="{name: 'home'}" class="select-none"
        ><span class="text-3xl font-semibold font-serif">劉</span></RouterLink
      >
      <div>
        <RouterLink :to="{name: 'demo'}" class="mx-2"
        ><span class="font-semibold font-serif">Demo</span></RouterLink
      >
        <a :href="blogUrl" :target="blogTarget" class="no-underline mx-2"
          ><span class="font-semibold font-serif">Blog</span></a
        >
      </div>
    </nav>
  </header>
</template>
