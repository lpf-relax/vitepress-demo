<script setup>
import { ref } from 'vue'
const props = defineProps(['activeClass', 'unActiveClass'])

const isActive = ref(true)

console.log(props, [isActive ? (props.activeClass || 'active') : props.unActiveClass])

</script>

<template>
  <div :class="[isActive ? (props.activeClass || 'active') : props.unActiveClass]" @click="isActive = !isActive">
    <slot></slot>
  </div>
</template>

<style scoped>
.active {
  background: var(--vp-c-text-1)
}
</style>