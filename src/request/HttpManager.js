// 1. 引入axios
import axios from "axios";
// 引入useStore全局状态
import { useStore } from '@/stores/useStore'
// 引入路由
import router from "@/router/index"

// 2. 配置信息
const config = {
	baseURL: '/api', // 所有的请求地址前缀部分
	timeout: 50000, // 请求超时时间毫秒
	withCredentials: true // 跨域请求携带cookie
}

// 3. 创建实例
const request = axios.create(config);

// 4. 请求拦截器
request.interceptors.request.use(
    // 请求之前做些什么
	(config) => {
		// 符合判断条件，做出响应处理，例如提交数据方式
		Object.assign(config.headers, 
			{
				"Content-Type": "application/json"
			} 
		)
		// 符合判断条件，做出响应处理，例如携带token
		const token = useStore().getSessionToken() 
		if (token != undefined && token != null && token != "") {
			config.data = {
				...config.data,
				token: token
			}
		}
		// 最后返回 config 代表继续发送请求
		return config;
	},
	error => {
		// console.log(error);
		// 如果不符合判断条件，直接 return 代表拦截该请求
		return Promise.reject(error)
	}
);

// 5. 响应拦截
request.interceptors.response.use(
    // 对于成功响应的处理
    response => {
			if (response.status >= 200 && response.status < 400) {
				// 网络正常
				let res = Object.assign(new Result(), response.data);
				if(res.isSuccess) {
					return Promise.resolve(res)
				} else {
					console.log("@error ", res)
					useStore().removeToken()
					// 跳回登录页面
					router.replace({ path: "/login" })
					return Promise.reject(res)
				}
			} else {
				// 网络异常
				return Promise.reject(response.data)
			}
    },
    // 对于错误响应的处理
    error => {
			console.log('err=>', error.response)
			// store.commit('SET_LOADING', false) // 关闭全局加载中
			if (error.response.status === 401) {
				useStore().removeToken()
				// 跳回登录页面
				router.replace({ path: "/login" })
			}
			return Promise.reject(error);
    }
);

// 6. 导出
export default request;