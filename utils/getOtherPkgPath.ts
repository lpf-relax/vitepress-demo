export const getOtherPkgPath = (path: string, id: string | number) => {
  const pathList = path.split('/').filter(Boolean)
  pathList.pop()
  pathList.push(`${id}.html`)

  const newUrl = pathList.join('/')

  return newUrl
}