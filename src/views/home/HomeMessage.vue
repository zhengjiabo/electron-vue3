<template>
  <div class=" h-full">
    <div style="height: 40px">
      <el-switch
        v-model="showMore"
        class="mb-2"
        active-text="展示历史"
        inactive-text="当前"
      />
    </div>
    <div style="height: calc(100% - 40px);">
      <el-table class="message-table" height="100%" :data="data" :row-class-name="tableRowClassName">
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          v-bind="column"
        >
          <template v-if="column.prop === 'type'" #default="scope">
            <el-tag
              :type="scope.row.tag"
            >
              {{ scope.row.type }}
            </el-tag>
          </template>

          <template v-else-if="column.prop === 'operations'" #default="scope">
            <el-button v-if="scope.row.canEdit" link type="primary" size="small" @click="handleDeal(scope.row)">处理</el-button>
            <el-button v-else link type="primary" size="small" @click="handleDeal(scope.row)">查看</el-button>
            <el-button v-if="scope.row.status" link type="primary" size="small" @click="handleDel(scope.row)">强制取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, markRaw, ref, reactive } from 'vue'
import {
  Bicycle, 
} from '@element-plus/icons-vue'
import {type Message, addMessage, useMessage, removeMessage } from "@/composables";

// import { shell } from 'electron'

const showMore = ref(false)

const messages = useMessage()

const tableRowClassName = ({ row }: {row: Message}) => {
  return !row.status? 'history': '';
}
const data = computed(() => {
  const msgs = [...messages.value]
  type TagMap = {
    [key: string]: string[]; // 添加索引签名
    success: string[];
    info: string[];
    danger: string[];
    warning: string[];
  };
  const tagMap:TagMap = {
    success: ['Merged', 'Open'],
    info: [],
    danger: ['Error'],
    warning: ['Closed'],
  }

  return msgs.reverse().map((item: Message) => {
    const tag = Object.keys(tagMap).find((key:string) => tagMap[key].includes(item.type))
    return Object.assign({}, item, {
      tag 
    })
  }).filter((item:Message) => {
    return showMore.value? true: item.status
  })
})

const columns = computed(() => {
  type FilterMap = {
    [key: string]: boolean
  }

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
  const typeFiltersMap:FilterMap = {} 
  data.value.forEach(( row:Message ) => {
    typeFiltersMap[row.type] = true
  })
  const typeFilters = Object.keys(typeFiltersMap).map(value => ({value, text: value}))
  return [
    {
      prop: 'timestamp',
      label: 'Date',
      align: 'center',
      sortable: true,
      width: 125,
      formatter: (row:Message) => formatTimestamp(row.timestamp)
    },
    {
      prop: 'type',
      label: '类型',
      align: 'center',
      filterMultiple: true,
      filters: typeFilters,
      filterMethod: (value:string, row:Message) => row.type === value,
      filterPlacement: "bottom-end",
      width: 90,
    },
    {
      prop: 'title',
      label: 'Title',
      width: 150,
    },
    {
      prop: 'message',
      label: 'Message',
      minWidth: 150,
    },
    {
      prop: 'operations',
      label:'Operations',
      width: 100,
      align: 'center',
    }
  ]
})

const handleDeal = (row:Message) => {
  // shell.openExternal(row.url)
}

const handleDel = async (row:Message) => {
  await ElMessageBox.confirm(
    '【强制取消】仅限软件出问题时清理消息，请确认当前消息已经处理完成？',
    'Tip',
    {
      type: 'warning',
      icon: markRaw(Bicycle),
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    },
  )
  removeMessage(row.id)   
}


// shell.openExternal('https://www.bing.com');
addMessage({message: 'ddjasjdh', title: '111111111111111111111111111111111111111', type: 'Error', url: 'https://www.bind.com'})

</script>

<style scoped lang="scss">

.message-table {
  :deep() {
    .history {
      color: #777;
      text-decoration: line-through;
      filter: blur(0.5px);
      &:hover {
        text-decoration: auto;
        filter: none;
      }
    }
    .el-button+.el-button {
      margin-left: 0;
    }
  }
}
</style>
