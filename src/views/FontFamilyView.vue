<template>
  <main class="w-screen h-screen flex flex-col justify-center items-center">
    <div>
      <div class="flex">
        <RouterLink to="/"><IconRoundChevronLeft class="w-6 h-6" /></RouterLink>
        <h1>Font Family</h1>
      </div>
      <GoogleLogo
        class="text-8xl leading-normal"
        :class="[fontFamily]"
      ></GoogleLogo>
    </div>

    <div class="mt-4">
      <Button
        v-for="fontFamily of fontFamilyGroup"
        class="ml-4 first-of-type:ml-0"
        @click="changeFontFamily(fontFamily.value)"
        >{{ fontFamily.title }}</Button
      >
    </div>
  </main>
</template>

<script lang="ts" setup>
interface FontFamily {
  title: string;
  value: string;
}

// 字体组
const fontFamilyGroup = ref<FontFamily[]>([
  {
    title: "sans",
    value: "font-sans",
  },
  {
    title: "serif",
    value: "font-serif",
  },
  {
    title: "mono",
    value: "font-mono",
  },
]);
// 当前字体
const fontFamily = ref(fontFamilyGroup.value[0].value);

// 切换字体
const changeFontFamily = (font: string) => {
  fontFamily.value = font;
};
</script>
