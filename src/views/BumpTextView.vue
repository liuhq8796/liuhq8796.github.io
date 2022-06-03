<template>
  <main class="w-screen h-screen flex flex-col justify-center items-center">
    <div>
      <div class="flex">
        <RouterLink to="/"><IconRoundChevronLeft class="w-6 h-6" /></RouterLink>
        <h1>BumpText</h1>
      </div>
      <div class="bg-gray-400 p-8">
        <div>
          <span
            class="text-8xl font-bold text-gray-400 [text-shadow:1px_1px_1px_#000,-1px_-1px_1px_#fff]"
            >我是凸起的文字</span
          >
        </div>
        <div class="mt-8">
          <span
            class="text-8xl font-bold text-gray-400 [text-shadow:-1px_-1px_1px_#000,1px_1px_1px_#fff]"
            >我是凹下的文字</span
          >
        </div>
      </div>
    </div>
  </main>
</template>
