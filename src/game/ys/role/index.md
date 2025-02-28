---
outline: deep
---

<script setup>
import { ref } from "vue";
import { useRouter } from 'vitepress'
import { getRandomIntInclusive } from "@utils/index"
import { ysApi } from "@server/ys-api"

const loading = ref(false)

const { route, go } = useRouter();

const handleClickRandom = async() => {
  const roleList = await ysApi.role

  const randomIndex = getRandomIntInclusive(0, roleList.length - 1);
  const randomId  = roleList[randomIndex].id;

  const pathList = route.path.split('/')
  pathList.pop()
  pathList.push('role')
  pathList.push(`${randomId}.html`)

  const newUrl = pathList.join('/')
  go(newUrl)
}
</script>

<el-space class="w-full p-16" direction="vertical" alignment="center">
  <el-button type="primary" @click="handleClickRandom" :loading="loading">随机</el-button>
</el-space>