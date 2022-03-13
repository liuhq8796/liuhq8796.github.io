<script setup lang="ts">
import BookmarksJson from "@/json/bookmarks.json";
</script>

<template>
  <main class="bookmarks">
    <h1>This is an bookmarks page</h1>

    <ul>
      <li v-for="(item, index) of BookmarksJson" :key="index" class="card">
        <div class="card__header">{{ item.name }}</div>
        <div class="card__body">
          <div v-for="(link, index) of item.children" :key="index">
            <a :href="link.href">
              <img v-if="link.icon" :src="link.icon" :alt="link.name" />
              {{ link.name }}
            </a>
          </div>
        </div>
      </li>
    </ul>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .bookmarks {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
