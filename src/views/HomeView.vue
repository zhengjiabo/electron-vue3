<template>
  <el-watermark class="h-full" :font="font" :content="appConfig.account" :gap="[500, 300]">
    <el-tabs v-model="tabsVal" tab-position="left" class="demo-tabs !h-full">
      <el-tab-pane label="Message" name="Message">
        <HomeMessage></HomeMessage>
      </el-tab-pane>
      <el-tab-pane label="Setting" name="Setting">
        <HomeConfig></HomeConfig>
      </el-tab-pane>
      <el-tab-pane label="Logs" name="Logs">
        <HomeLog v-if="tabsVal === 'Logs'"></HomeLog>
      </el-tab-pane>
    </el-tabs>
  </el-watermark>
</template>
<script setup>
import HomeMessage from '@/views/home/HomeMessage.vue'
import HomeConfig from '@/views/home/HomeConfig.vue'
import HomeLog from '@/views/home/HomeLog.vue'
import { ref, reactive, watch } from 'vue'
import { useAppConfig, isDark } from "@/composables";

const tabsVal = ref('Message')


const appConfig = useAppConfig()
const font = reactive({
  color: 'rgba(0, 0, 0, .15)',
})

watch(
  isDark,
  () => {
    font.color = isDark.value
      ? 'rgba(255, 255, 255, .15)'
      : 'rgba(0, 0, 0, .15)'
  },
  {
    immediate: true,
  }
)

</script>
<style scoped lang="scss">
.demo-tabs {
  :deep() {
    .el-tabs__content,.el-tab-pane {
      height: 100%;
    }
  }
}
</style>