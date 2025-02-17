<script setup>
import { ref } from 'vue'
const isActive = ref(true)
</script>

<template>
  <span :class="{ active: isActive }"  @click="isActive = !isActive">
    <slot></slot>
  </span>
</template>

<style scoped>
.active {
  background: var(--vp-c-text-1)
}
</style>