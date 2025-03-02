export const safeJsonParse = (str?: string, def = "") => {
  try {
    if (!str) {
      return
    }
    return JSON.parse(str)
  } catch (error) {
    return def
  }
}