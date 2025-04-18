// 引入Vue api
import { ref, nextTick} from 'vue'

/**
 * 重新加载页面
 * @returns 
 */
const useRouterReload = () => {
  // 定义变量
  const isAlive = ref(true) // 控制 RouterView 的显示或隐藏

  /**
   * 重新加载页面
   */
  function reload() {
    isAlive.value = false
    // nextTick方法在DOM更新循环结束后调用
    nextTick(()=> {
      isAlive.value = true
    })
  }

  return {isAlive, reload}
}
export default useRouterReload