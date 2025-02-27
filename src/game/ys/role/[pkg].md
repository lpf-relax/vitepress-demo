<script setup>
import { useData } from 'vitepress'

// params 是一个 Vue ref
const { params } = useData()

console.log(params.value)
</script>

<pre>{params}</pre>