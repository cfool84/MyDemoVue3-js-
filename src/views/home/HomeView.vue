<template>
	<div>
		<button @click="onLog">日志</button>
		<button @click="onTipPopup">tip</button>
		<div>
			<!-- <el-breadcrumb separator="/">
            	<el-breadcrumb-item v-for="item in breadcrumb.items">
					<RouterLink v-if="!isCurPath(item.path)" :to="item.path">{{ item.title }}</RouterLink>
					<a v-else @click.prevent="routerReload.reload()" style="cursor:pointer;">{{item.title}}</a>
				</el-breadcrumb-item>
			</el-breadcrumb> -->
			<RouterView v-if="routerReload.isAlive.value"/>
		</div>
		<TipPopup ref="tipPopupRef" msg="test" @onClose="onTipPopupClose"/>
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
	// 引入path-to-regexp
	import { pathToRegexp } from "path-to-regexp";
	// 引入useStore全局状态
	import { useStore } from '@/stores/useStore';
	// 引入自定义hooks
	import useBreadcrumb from './hooks/useBreadcrumb'
  	import useRouterReload from './hooks/useRouterReload'
  	// 引入自定义组件
  	import TipPopup from './components/TipPopup.vue' // 提示对话框

	// vue3中使用 useRoute 代替 this.$route
	const route = useRoute()
	// 可以在组件中的任意位置访问 `store` 变量
	const store = useStore()
	// 自定义hooks
	const breadcrumb = useBreadcrumb() // 导航
  	const routerReload = useRouterReload() // 重新加载页面

	// **************************************
	// 定义变量
	// **************************************
	const tipPopupRef = ref()

	// **************************************
	// 声明计算属性
	// **************************************
	// 是否当前路径
	const isCurPath = computed(()=>(path) => {
		let regExp = pathToRegexp(path).exec(route.path)
		if (regExp) {
			return true
		}
		return false
	})

	function onLog() {
		router.push({path: '/home/log'})
	}

	function onTipPopup() {
		tipPopupRef.value.show()
	}

	function onTipPopupClose() {

	}
</script>

<style>
</style>