<script setup lang="ts">
export interface BaseLinkProps {
  href: string
  target?: '_blank' | '_self'
  textColor?: string
}

withDefaults(defineProps<BaseLinkProps>(), {
  target: '_blank',
  textColor: '',
})
</script>

<template>
  <a
    class="cursor-pointer no-underline border-0 border-b border-solid border-b-gray-400/30 hover:border-b-gray-400 transition-300 ease-in-out italic text-[rgb(0,43,128)]"
    :class="[textColor]"
    :href="href"
    :target="target"
    rel="noopener noreferrer"
  ><slot /></a>
</template>
