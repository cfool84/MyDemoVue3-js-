<!---------------------------------------
模板结构 
--------------------------------------->
<template>
    <!-- <el-dialog
      v-model="store.tipVisible"
      title="提示"
      width="480"
    >
    <div style="padding: 24px; word-break: break-all; font-size: 15px; color: #f56c6c;">
        {{ store.tipMessage }}    
    </div>
    <template #footer>
        <div style="text-align: center;">
          <el-button style="width: 120px;" @click="store.tipVisible = false">关闭</el-button>
        </div>
      </template>
    </el-dialog> -->
  </template>
  
  <!---------------------------------------
  行为 
  --------------------------------------->
  <script setup>
    // 引入Vue api
    import { ref } from 'vue'

      // **************************************
    // 接收父组件传来的值和方法
    // **************************************
    // 接收父组件传来的值
    const props = defineProps(['msg'])
    // **************************************
    // 接收父组件传来的值和方法
    // **************************************
    const emits = defineEmits(["onClose"]) // 接收父组件传来的方法


    // **************************************
    // 显示对话框
    // ************************************** 
    let isVisible = ref(false)
    const show = () => {
        console.log("props", props)
        isVisible.value = true
    }
    
    // **************************************
    // 暴露方法给父类使用
    // **************************************
    defineExpose({ show })
  </script>
  
  <!---------------------------------------
  样式 
  --------------------------------------->
  <style scoped>
  
  </style>