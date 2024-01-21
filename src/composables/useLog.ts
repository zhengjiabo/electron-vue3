import { reactive, readonly } from 'vue';
import { useStorage } from '@vueuse/core'

export interface Log {
  [key: string]: any; // 添加索引签名
  timestamp: number;
  type: string;
  message: string;
}

const theDefault = reactive<Log[]>([])

const status = useStorage('logs', theDefault, localStorage)

const LOG_MAX = 3000 // 超则删
const LOG_TOP = 2500 // 删到什么程度
const TIME_SPACING = 4 * 24 * 60 * 60 * 1000 // 超时间的删除
export const addLog = ({  message = '' , type = 'info' }) => {
  const log: Log = {
    timestamp: Date.now(),
    type,
    message,
  };

  while(status.value.length && Date.now() - status.value[0].timestamp > TIME_SPACING) {
    status.value.shift();
  }

  if(status.value.length > LOG_MAX) {
    status.value.splice(0, LOG_MAX - LOG_TOP)
  }
  status.value.push(log)
}
export const logs = readonly(status)