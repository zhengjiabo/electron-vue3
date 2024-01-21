import { reactive } from 'vue';
import { useStorage } from '@vueuse/core'

export interface Message {
  [key: string]: any; // 添加索引签名
  id: string,
  type: string;
  url: string;
  message: string;
  title: string;
  status: boolean,
  canEdit: boolean,
  timestamp: number;
}

const theDefault = reactive<Message[]>([])

const status = useStorage('messages', theDefault, localStorage )

const TIME_SPACING = 7 * 24 * 60 * 60 * 1000 // 超时间的删除
export const addMessage = ({  message = '' , type = 'info', title = '', id = Math.random().toString(36).substr(2, 9), canEdit = true, url = '' } : Partial<Message>) => {
  const item: Message = {
    id,
    timestamp: Date.now(),
    url,
    type,
    message,
    title,
    canEdit,
    status: true
  };

  while(status.value.length && Date.now() - status.value[0].timestamp > TIME_SPACING) {
    status.value.shift();
  }

  status.value.push(item)
}

export const removeMessage = (id: string) => {
  const removeArr = status.value.filter(item => item.id === id)
  removeArr.forEach(item => {
    item.status = false
  })
}

export const useMessage = () => status 