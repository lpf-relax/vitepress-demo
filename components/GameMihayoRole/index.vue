<script setup>
import { ref, computed, watch } from "vue"
import { useData, useRouter } from 'vitepress'
import { ElButton, ElButtonGroup, ElSpace, ElImage, ElText, ElRow, ElCol, ElAffix, ElSwitch, ElIcon } from 'element-plus'
import { StarFilled, Star } from '@element-plus/icons-vue'

import { getOtherPkgPath, getArrayRandomItem, safeJsonParse } from "@utils"
import { usePkgId } from '@hooks'

// params 是一个 Vue ref
const { params } = useData();
const { route, go } = useRouter();

const roleId = params.value.data.id
const roleInfo = params.value.data
const roleIdList = params.value.idList
const favModalLocalKey = params.value.favModalLocalKey
const favLocalKey = params.value.favLocalKey

const isFavModal = ref(safeJsonParse(localStorage.getItem(favModalLocalKey), false) || false)

const getFavIdListFromLocal = () => {
  const localFavIdList = safeJsonParse(localStorage.getItem(favLocalKey), [])
  return Array.isArray(localFavIdList) ? localFavIdList : []
}

const idList = ref(roleIdList);

const favIdList = ref(getFavIdListFromLocal())
const isFav = computed(() => favIdList.value.some(item => item === roleId))

const pkgId = usePkgId(idList, roleId)

const handleToggleFav = () => {
  const localFavIdList = getFavIdListFromLocal()
  if (localFavIdList.some(item => item === roleId)) {
    favIdList.value = localFavIdList.filter
  } else {
    favIdList.value = [...localFavIdList, roleId]
  }
  if (isFavModal.value) {
    idList.value = favIdList.value
  }
  localStorage.setItem(favLocalKey, JSON.stringify(favIdList.value))
}

watch(isFavModal, async (newValue, oldValue) => {
  if (newValue) {
    favIdList.value = getFavIdListFromLocal()
    idList.value = favIdList.value
  } else {
    idList.value = roleIdList
  }
  localStorage.setItem(favModalLocalKey, JSON.stringify(newValue))
}, { immediate: true })


const imagesInfo = computed(() => {
  return {
    icon: roleInfo.icon,
    bg: roleInfo?.avatar?.m || roleInfo.icon,
    list: [roleInfo?.avatar?.m, roleInfo.icon].filter(Boolean)
  }
})

const handleClickRandom = () => {
  go(getOtherPkgPath(route.path, getArrayRandomItem(idList.value)))
}
const handleClickBtn = (id) => {
  go(getOtherPkgPath(route.path, id))
}
</script>


<template>
  <div id="pkg-wrap" class="max-w-lg mx-auto bg-contain" :style="{ backgroundImage: `url(${imagesInfo.bg})` }">
    <el-space class="w-full px-4 py-16 backdrop-blur-lg" direction="vertical" alignment="normal">
      <div class="flex justify-center">
        <el-image style="width: 100px; height: 100px" :src="imagesInfo.icon" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                  :preview-src-list="imagesInfo.list" show-progress preview-teleported fit="cover" />
      </div>
      <!--  -->
      <div class="flex justify-center">
        <ViHideSpan class="rounded-xs flex bg-neutral-100/70 mb-3 p-1.5">
          <b>{{ params.data.name }}</b>
        </ViHideSpan>
      </div>
      <!--  -->
      <div class="flex justify-center" v-if="params.data.summary">
        <ViHideSpan class="rounded-xs flex bg-neutral-100/70 mb-3 p-1.5">
          <b>{{ params.data.summary }}</b>
        </ViHideSpan>
      </div>
      <!--  -->
      <div class="flex flex-wrap justify-between">
        <div v-for="item in params.data.attrs" class="rounded-xs flex bg-neutral-100/70 mb-3" style="width: calc(50% - 16px)">
          <div class="bg-teal-800 text-white font-bold p-1.5 flex-none">{{ item[0] }}</div>
          <ViHideDiv class="p-1.5 text-right flex-1">{{ item[1] }}</ViHideDiv>
        </div>
      </div>
      <!--  -->
      <template v-if="params.data.skill">
        <div class="rounded-xs flex bg-neutral-100/70 mb-3 p-1.5 my-8 justify-center">
          <b>技能</b>
        </div>
        <div class="flex flex-wrap justify-between">
          <div v-for="item in params.data.skill" class="rounded-xs bg-neutral-100/70 mb-3 w-full">
            <ViHideDiv class="bg-teal-800 font-bold p-1.5 flex-none" unActiveClass="text-white" activeClass="text-teal-800">{{ item.title }}</ViHideDiv>
            <ViHideDiv class="p-1.5 flex-1">{{ item.desc }}</ViHideDiv>
          </div>
        </div>
      </template>
      <!--  -->
      <template v-if="params.data.destiny">
        <div class="rounded-xs flex bg-neutral-100/70 mb-3 p-1.5 my-8 justify-center">
          <div>命之座</div>
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
    </el-space>
  </div>

  <el-affix target="body" position="bottom" :offset="32">
    <div class="flex items-center justify-center pt-8">
      <el-button-group size="default">
        <el-button type="primary" @click="handleClickBtn(pkgId.first)" :disabled="!pkgId.first">首</el-button>
        <el-button type="primary" @click="handleClickBtn(pkgId.prev)" :disabled="!pkgId.prev">上一个</el-button>
        <el-button type="primary" @click="handleClickRandom" :disabled="!idList.length">随机</el-button>
        <el-button type="primary" @click="handleClickBtn(pkgId.next)" :disabled="!pkgId.next">下一个</el-button>
        <el-button type="primary" @click="handleClickBtn(pkgId.last)" :disabled="!pkgId.last">尾</el-button>
        <el-button type="primary">
          <el-icon class="w-4" @click="handleToggleFav">
            <StarFilled v-if="isFav" />
            <Star v-else />
          </el-icon>
        </el-button>
        <el-button type="primary">
          <el-switch v-model="isFavModal" inline-prompt :active-icon="StarFilled" :inactive-icon="Star" />
        </el-button>
      </el-button-group>
    </div>
  </el-affix>
</template>