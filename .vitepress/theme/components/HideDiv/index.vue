<script setup>
import { ref } from 'vue'
const isActive = ref(true)
</script>

<template>
  <div :class="{ active: isActive }"  @click="isActive = !isActive">
    <slot></slot>
  </div>
</template>

<style scoped>
.active {
  background: var(--vp-c-text-1)
}
</style>