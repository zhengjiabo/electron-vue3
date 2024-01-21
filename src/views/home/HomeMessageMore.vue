<template>
  <div class=" h-full">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="columns"
          :cell-props="cellProps"
          :data="data"
          :width="width"
          :height="height"
          fixed
        />
      </template>
    </el-auto-resizer>
  </div>
</template>

<script setup lang="ts">
// import "element-plus/theme-chalk/el-message-box.css";
import { markRaw , computed, ref, reactive, getCurrentInstance} from 'vue'
import {type Message, addMessage, useMessage } from "@/composables";

const columns = [
  {
    key: 'title',
    dataKey: 'title',
    title: 'Title',
    width: 150,
  },
  {
    key: 'message',
    dataKey: 'message',
    title: 'Message',
    width: 450,
  },
  {
    key: 'type',
    dataKey: 'type',
    title: '类型',
    width: 150,
  },
  {
    key: 'timestamp',
    dataKey: 'timestamp',
    title: 'Date',
    width: 150,
  },
]

const cellProps = ({ columnIndex } : { columnIndex: number }) => {
  const key = `hovering-col-${columnIndex}`
  return {
    ['data-key']: key,
    onMouseenter: () => {
      kls.value = key
    },
    onMouseleave: () => {
      kls.value = ''
    },
  }
}
const kls = ref<string>('')

const data = useMessage()
addMessage({message: '222222222222222222222222222222222222222222222222222222222222', title: '111111111111111111111111111111111111111', type: 'success'})

</script>

<style scoped lang="scss">

</style>
