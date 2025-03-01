<script setup>
import { computed } from "vue"
import { useData, useRouter } from 'vitepress'
import { getOtherPkgPath, getArrayRandomItem } from "@utils"
import {usePkgIndex} from '@hooks'

// params 是一个 Vue ref
const { params } = useData();
const { route, go } = useRouter();
const pkgIndex = usePkgIndex(params.value.list, params.value.pkg)

const imageUrl = computed(() => params.value.data?.avatar?.m || params.value.data.icon)
const imagesInfo = computed(() => {
  return {
    icon: params.value.data.icon,
    bg: params.value.data?.avatar?.m || params.value.data.icon,
    list: [params.value.data?.avatar?.m, params.value.data.icon].filter(Boolean)
  }
})

console.log('params.value', params)

const handleClickRandom = () => {
  go(getOtherPkgPath(route.path, getArrayRandomItem(params.value.list).id))
}
const handleClickBtn = (index) => {
  go(getOtherPkgPath(route.path, params.value.list[index].id))
}
</script>

<div class="max-w-lg mx-auto bg-no-repeat bg-cover" :style="{backgroundImage: `url(${imagesInfo.bg})`}">
  <el-space class="w-full px-4 py-8 backdrop-blur-lg" direction="vertical" alignment="normal" >
    <div class="flex justify-center">
      <el-image
        style="width: 100px; height: 100px"
        :src="imagesInfo.icon"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :preview-src-list="imagesInfo.list"
        show-progress
        fit="cover"
      />
    </div>
    <!--  -->
    <div class="flex justify-center">
      <ViHideSpan class="rounded-xs flex bg-neutral-100/70 mb-3 p-1.5">
        <b>{{params.data.name}}</b>
      </ViHideSpan>
    </div>
    <!--  -->
    <div class="flex justify-center" v-if="params.data.summary">
      <ViHideSpan class="rounded-xs flex bg-neutral-100/70 mb-3 p-1.5">
        <b>{{params.data.summary}}</b>
      </ViHideSpan>
    </div>
    <!--  -->
    <div class="flex flex-wrap justify-between">
      <div v-for="item in params.data.attrs" class="rounded-xs flex bg-neutral-100/70 mb-3" style="width: calc(50% - 16px)">
        <div class="bg-teal-800 text-white font-bold p-1.5 flex-none">{{item[0]}}</div>
        <ViHideDiv class="p-1.5 text-right flex-1">{{item[1]}}</ViHideDiv>
      </div>
    </div>
    <!--  -->
    <template v-if="params.data.skill">
      <div class="rounded-xs flex bg-neutral-100/70 mb-3 p-1.5 my-8 justify-center">
          <b>技能</b>
      </div>
      <div class="flex flex-wrap justify-between">
        <div v-for="item in params.data.skill" class="rounded-xs bg-neutral-100/70 mb-3 w-full">
          <ViHideDiv class="bg-teal-800 font-bold p-1.5 flex-none" unActiveClass="text-white" activeClass="text-teal-800">{{item.title}}</ViHideDiv>
          <ViHideDiv class="p-1.5 flex-1">{{item.desc}}</ViHideDiv>
        </div>
      </div>
    </template>
    <!--  -->
    <template v-if="params.data.destiny">
      <div class="rounded-xs flex bg-neutral-100/70 mb-3 p-1.5 my-8 justify-center">
          <b>命之座</b>
      </div>
      <div class="flex flex-wrap justify-between">
        <div v-for="item in params.data.destiny" class="rounded-xs bg-neutral-100/70 mb-3 w-full">
          <ViHideDiv class="bg-teal-800 font-bold p-1.5 flex-none" unActiveClass="text-white" activeClass="text-teal-800">
            <div v-html="item[0]"></div>
          </ViHideDiv>
          <ViHideDiv class="p-1.5 text-right flex-1">
            <div v-html="item[1]"></div>
          </ViHideDiv>
        </div>
      </div>
    </template>
    <!--  -->
    <div class="flex items-center justify-center">
      <el-button-group size="default">
        <el-button type="primary" @click="handleClickBtn(pkgIndex.first)"><div class="px-2">首</div></el-button>
        <el-button type="primary" @click="handleClickBtn(pkgIndex.prev)" :disabled="pkgIndex.prev === pkgIndex.current"><div class="px-2">上一个</div></el-button>
        <el-button type="primary" @click="handleClickRandom"><div class="px-2">随机</div></el-button>
        <el-button type="primary" @click="handleClickBtn(pkgIndex.next)" :disabled="pkgIndex.next === pkgIndex.current"><div class="px-2">下一个</div></el-button>
        <el-button type="primary" @click="handleClickBtn(pkgIndex.last)"><div class="px-2">尾</div></el-button>
      </el-button-group>
    </div>
  </el-space>
</div>