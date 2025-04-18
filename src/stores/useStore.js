import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

/**
 * 全局状态
 */
export const useStore = defineStore('useStore', () => {
  // **************************************
  // 声明属性
  // **************************************
  let loading = ref(false) // 全局加载状态
  let tipVisible = ref(false) // 显示全局弹窗提示
  let tipMessage = ref('') // 全局弹窗提示内容 

  // **************************************
  // 声明方法
  // **************************************
  /**
   * 设置运行时临时数据
   * @param token 
   */
  function setSessionToken(token) {
    sessionStorage.setItem("token", token)
    // 
  }
  /**
   * 获取运行时临时数据
   * @returns 
   */
  function getSessionToken() {
    return sessionStorage.getItem("token")
  }
	
	function setCookieToken(token) {
		document.cookie = `token=${token}; path=/;`
	}
  function getCookieToken() {
    console.log("document.cookie", document.cookie)
    let cookies = document.cookie;
    if (cookies != null) {
      let cookieArray = cookies.split(";");
      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        let [name, value] = cookie.split("=");
        if (name.trim() === "token") {
           return decodeURIComponent(value).trim();
        }
      }
    }
    return null
  }

  /**
   * 保存token到本地
   * @param token 
   */
  async function saveToken(token) {
    // 两次加密
    let encrypt1 = CryptoJS.AES.encrypt(token, "1234567").toString()
    let encrypt2 = CryptoJS.AES.encrypt(encrypt1, "abcdefg").toString()
    // 保存token到本地
    localStorage.setItem("token", encrypt2)
  }

  /**
   * 移除本地保存的token
   */
  function removeToken() {
    localStorage.removeItem("token")
    sessionStorage.removeItem("token")
    // document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  /***
   * 快速登录
   */
  async function quickLogin() {
    let _result = false
    // 当用户信息不存在时
    if (userInfo.token === undefined || userInfo.token === null) {
      loading.value = true // 加载中
      // 读取本地保存
      const _storage = localStorage.getItem("token")
      let _token = null
      if (_storage) {
        // 本地记录存在时
        // 两次解密
        const decrypt1 = CryptoJS.AES.decrypt(_storage, "abcdefg").toString(CryptoJS.enc.Utf8);
        const decrypt2 = CryptoJS.AES.decrypt(decrypt1, "1234567").toString(CryptoJS.enc.Utf8);
        _token = decrypt2
      } else {
        // 本地记录不存在时，寻找sessionStorage
        _token = getSessionToken()
      }
      if (_token != undefined && _token != null && _token !="") {
				/*
        // 接口参数
        const params : DtoBase = {
          token: _token
        }
        // 调用接口
        try {
          const res = await loginByToken(params)
          // 获得token和用户信息
          const _user: AdminUser = res.data.user
          Object.assign(userInfo, _user)
          // 把token暂存在sessionStorage中
          setSessionToken(_user.token!)
          // 更新本地保存
          if (_storage) {saveToken(_user.token)}
          _result = true
        } catch(e) {
          console.log("error", e)
          removeToken()
        }
				*/
      }
      loading.value = false // 加载中
    }
    return _result
  }

  // **************************************
  // 暴露变量和方法
  // **************************************
  return { loading, tipVisible, tipMessage, 
           saveToken, quickLogin, setSessionToken, getSessionToken, removeToken }
})