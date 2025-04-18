<template>
		<button @click="onLogin">登录</button>
</template>

<!-- setup(组合式 API) -->
<script setup>
	import { ref, reactive, onMounted, onUnmounted } from 'vue'
	// 引入路由
	import router from "@/router/index"
	// 引入useStore全局状态
	import { useStore } from '@/stores/useStore'
	// 引入接口
	import { login } from "@/request/Interface";
	
	// 可以在组件中的任意位置访问 `store` 变量
	const store = useStore()
	
	onMounted(()=>{
		console.log("onMounted")
	})
	
	onUnmounted(()=>{
		console.log("onUnmounted")
	})
	
	async function onLogin() {
		console.log("onLogin")
		
		// 接口参数
		const params = {
			username: "username",
			password: "password" //SparkMD5.hash(formState.password).toLocaleUpperCase()
		}
		try {
			// const res = await login(params);
			const isRemember = false
			const token = 'token'
			// 保存到本地
			if (isRemember) {
				store.saveToken(token)
			}
			// 用户信息
			// const _user = res.data.user
			// Object.assign(store.userInfo, _user)
			// 把token暂存在会话数据中
			store.setSessionToken(token)
			// store.token = _user.token
			// 跳转到首页
			router.push('home');
		} catch(e) { 
			store.removeToken()
		}
	}
</script>

<style>
</style>