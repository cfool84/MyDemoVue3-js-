// 引入Vue api
import { reactive } from 'vue'
import router from "@/router/index"
// 引入path-to-regexp
import { pathToRegexp } from "path-to-regexp"

/**
 * 导航
 * @returns 
 */
const useBreadcrumb = () => {
  // 定义变量
  let items = reactive<[]>(
    [{
      title:"首页",
      path:"/"
    }]
  )

  /***
   * 设置显示当前页面的路径
   */
  function setItems(newPath) {
    // 移除所有元素
    items.splice(0, items.length);
    // 寻找匹配的路由
    let matchedList = []
    router.getRoutes().forEach((item) => {
      let _ptr = pathToRegexp(item.path, [], {end:false, start:true})
      if (_ptr.test(newPath)) {
        if (item.meta.order) {
          matchedList.push(item);
        }
      }
    });
    // 按路由级别排序
    matchedList.sort((a, b)=> a.meta.order - b.meta.order)
    // 显示导航
    matchedList.forEach((item) => {
      return items.push({
        title: item.meta.title,
        path: item.path
      });
    });
  }

  return {items, setItems}
}
export default useBreadcrumb