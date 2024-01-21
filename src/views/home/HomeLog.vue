<template>
  <div class=" h-full overflow-y-auto whitespace-pre-line">
    {{logTitle}}
  </div>
</template>

<script setup lang="ts">
// import "element-plus/theme-chalk/el-message-box.css";
import { markRaw , computed, ref, reactive, getCurrentInstance} from 'vue'
import { addLog, logs  } from "@/composables";
// import {
//    Bicycle, 
// } from '@element-plus/icons-vue'
const logTitle = computed(() => {
  function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    // const year = date.getFullYear().toString().slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  return logs.value.map(l => `${formatTimestamp(l.timestamp)} [${l.type}] ${l.message}`).join('\n') 
})

const addT = async () => {
  for(let i =0; i<10000; i++) {
    await new Promise(resolve => setTimeout(resolve, 100))
    addLog({
      message: 'Hello, world!' + i ,
    })
  }
}

// addT()

</script>

<style scoped lang="scss">

</style>
