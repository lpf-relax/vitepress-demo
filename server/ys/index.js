import { getYsRoleList } from "./getYsRoleList.js"
import { saveFileByNode } from '../../node/index.js'
import path from 'path'
import { fileURLToPath } from 'url';

// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前模块所在的目录路径
const __dirname = path.dirname(__filename);

export const getYsData = async () => {
  const roleList = await getYsRoleList()
  saveFileByNode(path.resolve(__dirname, '../../data/ys/role/server.json'), JSON.stringify(roleList))
}

getYsData()