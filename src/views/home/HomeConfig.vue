<template>
  <el-descriptions
    class="descriptions"
    :column="3"
    border
  >
    <template #title>
      <div class=" cursor-pointer select-none" @click="toggleDark()">
          <template v-if="!isDark" >
            <el-icon :size="20">
              <Sunrise  />
            </el-icon>
            Good Morning
          </template>
          <template v-else>
            <el-icon :size="20">
              <MoonNight />
            </el-icon>
            Ngiht~
          </template>
      </div>
    </template>
    <template #extra>
      <el-button v-if="!isEdit" type="primary" :icon="Edit" circle @click="btnClickEdit"></el-button>
      <template v-else>
        <el-button type="success" :icon="Check" circle @click="btnClickSave"></el-button>
        <el-button type="danger" :icon="Close" circle @click="btnClickCancle"></el-button>
      </template>
      <!-- <el-button type="primary" @click="btnClick">Operation</el-button> -->
    </template>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <user />
          </el-icon>
          Git 帐号
        </div>
      </template>
      <el-input v-if="isEdit" v-model="status.account"></el-input>
      <span v-else>{{ status.account }}</span> 
    </el-descriptions-item>
    <!-- <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <tickets />
          </el-icon>
          Remarks
        </div>
      </template>
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <office-building />
          </el-icon>
          Address
        </div>
      </template>
      No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </el-descriptions-item> -->
  </el-descriptions>
</template>

<script setup lang="ts">
// import "element-plus/theme-chalk/el-message-box.css";
import { markRaw , ref, reactive } from 'vue'
import {
  Edit, Check, Close, User, MoonNight, Sunrise, Bicycle, 
} from '@element-plus/icons-vue'
import { type AppConfig, useAppConfig, toggleDark, isDark } from "@/composables";

const appConfig = useAppConfig()

const status = reactive<AppConfig>({
  account: appConfig.value.account,
})

const initStatus = () => {
 // 将 appConfig 所有属性解构成响应式引用
  const { ...appConfigRefs } = appConfig.value;

  // 将解构后的属性赋值给 status
  Object.assign(status, appConfigRefs);
}

const iconStyle = {
  marginRight: '6px',
}


const isEdit = ref<boolean>(false)

const toggleEdit = () => {
  isEdit.value = !isEdit.value
}
const btnClickEdit = () => {
  toggleEdit()
}
const btnClickSave = () => {
  // 将 appConfig 所有属性解构成响应式引用
  const { ...statusRefs } = status

  // 将解构后的属性赋值给 status
  Object.assign(appConfig.value, statusRefs);
  toggleEdit()
}

const btnClickCancle = async () => {
  const isEqual = (obj1:AppConfig, obj2:AppConfig) => {
    const keys1:string[] = Object.keys(obj1);

    return !keys1.some((key:string) => {
      return obj1[key] !== obj2[key]
    })

  };
  if(!isEqual(status, appConfig.value)) {
    await ElMessageBox.confirm(
      '您有修改未保存，确定放弃未保存内容吗？',
      'Tip',
      {
        type: 'warning',
        icon: markRaw(Bicycle),
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      },
    )
  }
  toggleEdit()
  initStatus()
}


</script>

<style scoped lang="scss">
.descriptions {
  margin-top: 20px;
  :deep() {
    .el-descriptions__label  {
      user-select: none;
    }
  }
}
</style>
