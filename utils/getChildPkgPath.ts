export const getChildPkgPath = (path: string, id: string | number) => {
  const pathList = path.split('/').filter(Boolean)
  pathList.pop()
  pathList.push('role')
  pathList.push(`${id}.html`)

  const newUrl = pathList.join('/')

  return newUrl
}