import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'element-plus/dist/index.css'
import './style.css'

import HideSpan from './components/HideSpan/index.vue'
import HideDiv from './components/HideDiv/index.vue'

import { ElButton, ElButtonGroup, ElSpace, ElImage, ElText, ElRow, ElCol, ElAffix, ElSwitch, ElIcon } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('ViHideSpan', HideSpan)
    app.component('ViHideDiv', HideDiv)

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }

    app.component('ElButton', ElButton)
    app.component('ElButtonGroup', ElButtonGroup)
    app.component('ElSpace', ElSpace)
    app.component('ElImage', ElImage)
    app.component('ElText', ElText)
    app.component('ElRow', ElRow)
    app.component('ElCol', ElCol)
    app.component('ElAffix', ElAffix)
    app.component('ElSwitch', ElSwitch)
    app.component('ElIcon', ElIcon)
  }
} satisfies Theme