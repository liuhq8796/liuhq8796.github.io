<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <TheHeader />

  <main class="px-7 py-10">
    <RouterView />

    <TheFooter />
  </main>
</template>
