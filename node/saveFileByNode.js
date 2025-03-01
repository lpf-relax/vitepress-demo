import { writeFile, mkdir } from "fs/promises";
import path from 'path'

export const saveFileByNode = async (filePath, content) => {

  try {
    // 确保目录存在
    const dir = path.dirname(filePath);

    await mkdir(dir, { recursive: true });
    await writeFile(filePath, content, 'utf8');
    console.log('文件已异步成功保存', dir, filePath);
  } catch (err) {
    console.error('保存文件时出错:', err);
  }
}