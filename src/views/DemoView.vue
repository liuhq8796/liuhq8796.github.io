<script setup lang="ts">

</script>

<template>
  <div class="text-white">
    <h1 class="text-xl my-2">
      This is demo page
    </h1>

    <ol class="mx-2 list-decimal">
      <li>
        <RouterLink :to="{name: 'demo-search'}">
          漂亮的动态搜索框
        </RouterLink>
      </li>
    </ol>
  </div>
</template>
