import { computed } from "vue"

export const usePkgId = (idListRef: {
  value: (string | number)[]
}, id: string | number) => {
  return computed(() => {
    const idList = idListRef.value

    if (!idList?.length) {
      return {}
    }

    const currentIndex = idList.findIndex(item => item === id)
    if (currentIndex < 0) {
      return {
        first: idList[0],
        last: idList[idList.length - 1],
      }
    }

    const firstId = idList[0]
    const lastId = idList[idList.length - 1]
    const prevId = idList[currentIndex - 1 < 0 ? 0 : currentIndex - 1]
    const nextId = idList[currentIndex + 1 > idList.length - 1 ? idList.length - 1 : currentIndex + 1]

    return {
      first: firstId === id ? undefined : firstId,
      last: lastId === id ? undefined : lastId,
      current: id,
      prev: prevId === id ? undefined : prevId,
      next: nextId === id ? undefined : nextId,
    }
  })
}