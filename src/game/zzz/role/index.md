---
outline: deep
---

<script setup>
import { ref } from "vue";
import { useRouter } from 'vitepress'
import { getArrayRandomItem, getChildPkgPath } from "@utils"
import roleList from "@data/zzz/role/server.json"

const loading = ref(false)

const { route, go } = useRouter();

const handleClickRandom = async() => {
  go(getChildPkgPath(route.path, getArrayRandomItem(roleList).id))
}
</script>

<el-space class="w-full p-16" direction="vertical" alignment="center">
  <el-button type="primary" @click="handleClickRandom" :loading="loading">随机</el-button>
</el-space>