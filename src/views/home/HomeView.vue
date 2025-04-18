<template>
	<div>
		<button @click="onLog">日志</button>
		<div>
			<RouterView/>
		</div>
		
	</div>

</template>

<script setup>
  // 引入Vue api
  import { ref, 
           onMounted, 
           watch,
           computed,
           markRaw, // 将一个对象标记为不可被转为代理。返回该对象本身
        } from 'vue';
	// 引入路由
	import { RouterView, useRoute } from 'vue-router'
	import router from "@/router/index"
	// 引入useStore全局状态
	import { useStore } from '@/stores/useStore';

	// vue3中使用 useRoute 代替 this.$route
	const route = useRoute()
	// 可以在组件中的任意位置访问 `store` 变量
	const store = useStore()
	
	function onLog() {
		router.push({path: '/home/log'})
	}
</script>

<style>
</style>