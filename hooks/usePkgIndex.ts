import { computed } from "vue"

export const usePkgIndex = (arr: { id: unknown }[], currentIndex: number) => {
  return computed(() => {
    const firstIndex = 0;
    const lastIndex = arr.length - 1;
    const prevIndex = currentIndex === 0 ? 0 : currentIndex - 1;
    const nextIndex = currentIndex === lastIndex ? lastIndex : currentIndex + 1

    return {
      first: firstIndex,
      last: lastIndex,
      current: currentIndex,
      prev: prevIndex,
      next: nextIndex,
    }
  })
}