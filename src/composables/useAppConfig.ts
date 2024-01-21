import { reactive } from 'vue';
import { useStorage } from '@vueuse/core'

export interface AppConfig {
  [key: string]: any; // 添加索引签名
  account: string;
}

const theDefault = reactive<AppConfig>({ 
    account: '',
})

const appConfig = useStorage('AppConfig', theDefault, localStorage, { mergeDefaults: true })

export const useAppConfig = () => appConfig