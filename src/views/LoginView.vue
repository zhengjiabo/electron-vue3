<template>
  <div class=" flex flex-col justify-center align-middle h-full">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="90px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="Git 帐号" prop="account">
        <el-input v-model="ruleForm.account" placeholder="Please enter" :prefix-icon="User"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)" class=" m-auto" size="large" :icon="Pointer" round>
          Go
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { Pointer, User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useAppConfig } from "@/composables";

// bind object
const router = useRouter()

interface RuleForm {
  account: string
}

const appConfig = useAppConfig()
const formSize = ref<'default'>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  account: appConfig.value.account,
})
const rules = reactive<FormRules<RuleForm>>({
  account: [
    { required: true, message: '', trigger: ['change', 'blur' ]},
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (!valid) {
      console.log('error submit!', fields)
      return
    }
    appConfig.value.account = ruleForm.account
    router.push({name: 'home'})
  })
}


onMounted(() => {
  if(ruleForm.account) {
    submitForm(ruleFormRef.value)
  }
})

</script>
