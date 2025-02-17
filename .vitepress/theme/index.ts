import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import HideSpan from './components/HideSpan/index.vue'
import HideDiv from './components/HideDiv/index.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('ViHideSpan', HideSpan)
    app.component('ViHideDiv', HideDiv)
  }
} satisfies Theme