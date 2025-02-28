import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'element-plus/dist/index.css'
import './style.css'

import HideSpan from './components/HideSpan/index.vue'
import HideDiv from './components/HideDiv/index.vue'
import { ElButton, ElSpace, ElImage, ElText } from 'element-plus'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('ViHideSpan', HideSpan)
    app.component('ViHideDiv', HideDiv)

    app.component('ElButton', ElButton)
    app.component('ElSpace', ElSpace)
    app.component('ElImage', ElImage)
    app.component('ElText', ElText)
  }
} satisfies Theme