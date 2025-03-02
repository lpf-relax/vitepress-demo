import { getRoleList } from "./getRoleList.js"
import { saveFileByNode } from '../../node/index.js'
import path from 'path'
import { fileURLToPath } from 'url';

// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前模块所在的目录路径
const __dirname = path.dirname(__filename);

export const getData = async () => {
  const roleList = await getRoleList()
  saveFileByNode(path.resolve(__dirname, '../../data/starRail/role/server.json'), JSON.stringify(roleList))
}

getData()