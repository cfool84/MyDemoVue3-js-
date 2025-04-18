import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 引入自定义json
import config from './src/confings/config.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
	// 静态资源基础路径 base: './' || '',
	// base: process.env.NODE_ENV === 'production' ? '/vue' : '/', 
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
	server: {
		host: '0.0.0.0',
		port: 8992, // 开发用端口(npm run dev)
		proxy: {
			// 以api为前缀开启代理
			'/api': {
				target: config.serverUrl, //'http://127.0.0.1:8220',
				changeOrigin: true,  // 允许跨域，可以代理反向的地址
				rewrite: path => path.replace(/^\/api/,'') // 把请求的URL进行重写，这里假设后端的API路径不带/api段，所以使用rewrite去掉 /api
			},
			'/upload': {
				target: config.filesUrl, //'http://127.0.0.1:8201',
				changeOrigin: true,  // 允许跨域，可以代理反向的地址
				rewrite: path => path.replace(/^\/upload/,'')
			}
		}
	}
})
