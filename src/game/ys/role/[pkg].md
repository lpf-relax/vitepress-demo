<script setup>
import { useData, useRouter } from 'vitepress'
import { getRandomIntInclusive } from "@utils/index"

// params 是一个 Vue ref
const { params } = useData();
const { route, go } = useRouter();

const handleClickRandom = () => {
  const roleList =  params.value.list
  
  const randomIndex = getRandomIntInclusive(0, roleList.length - 1);
  const randomId  = roleList[randomIndex].id;

  const pathList = route.path.split('/')
  pathList.pop()
  pathList.push(`${randomId}.html`)

  const newUrl = pathList.join('/')
  go(newUrl)
}
</script>

<el-space class="w-full p-16" direction="vertical" alignment="center">
  <el-image
      style="width: 100px; height: 100px"
      :src="params.data.icon"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :preview-src-list="[params.data.icon]"
      show-progress
      fit="cover"
    />

  <ViHideSpan>
    <b>{{params.data.name}}</b>
  </ViHideSpan>

  <div v-for="item in params.data.filters">
    <span class="pr-4">{{item[0]}}:</span>
    <ViHideSpan>{{item[1]}}</ViHideSpan>
  </div>

  <el-button type="primary" @click="handleClickRandom">随机</el-button>

</el-space>