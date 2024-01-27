<script setup lang="ts">
let blogUrl = import.meta.env.VITE_BLOG_URL

const blogTarget = computed(() => {
  if (import.meta.env.DEV) {
    return '_self'
  }
  else {
    return '_blank'
  }
})
</script>

<template>
  <header class="h-16 px-8 bg-[#01031f]">
    <nav class="h-full flex justify-between items-center">
      <RouterLink to="/" class="no-underline select-none"
        ><span class="text-white text-3xl font-semibold font-serif">劉</span></RouterLink
      >
      <div>
        <a :href="blogUrl" :target="blogTarget" class="no-underline"
          ><span class="text-white font-semibold font-serif">Blog</span></a
        >
      </div>
    </nav>
  </header>
</template>
