import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') 
      // 这里假设你的文档根目录是 docs，你可以根据实际情况修改
    }
  }
});