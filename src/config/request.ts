import {HttpRequestConfig, HttpResponse} from "uview-plus/libs/luch-request";
import {GlobalStore} from "../store";
import {tryWxLogin} from "../common/login";
import useAuth from "../hooks/useAuth";

const install = (Vue: any) => {
  const store = GlobalStore()
  const auth = useAuth()
  // 初始化请求配置
  uni.$u.http.setConfig((config: HttpRequestConfig) => {
    /* config 为默认全局配置*/
    config.baseURL = 'http://localhost:7801'; /* 根域名 */
    config.baseURL = 'https://mall-api.idb.com.cn'; /* 根域名 */
    config.timeout = 10000  //10s
    return config
  })
  let t = -1;
  //请求拦截
  uni.$u.http.interceptors.request.use(async (config: HttpRequestConfig) => { // 可使用async await 做异步操作
    //判断是否存在token,且token准备超时了
    const now = new Date().getTime() / 1000 + 60 * 10
    if (store.login.expiresIn && now > store.login.expiresIn) {
      //TODO 并发请求可能会发起多次登录，需要加锁处理
      await tryWxLogin(store)
    }
    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
    config.data = config.data || {}
    //设置token
    config.header!.Authorization = store.login.token
    //创建定时器
    if (t > 0) {
      clearTimeout(t)
    }
    if(config.custom&&config.custom!.noTip){
      t=9999
    }else {
      t = setTimeout(() => {
        t = -1
        let message = "Loading..."
        if (config.method === "GET") {
          message = "加载中..."
        }
        if (config.method === "POST") {
          message = "处理中..."
        }
        uni.showLoading({
          title: message,
          mask: true
        })
      }, 500)
    }
    return config
  }, (config: HttpRequestConfig) => { // 可使用async await 做异步操作
    return Promise.reject(config)
  })

  // 响应拦截
  uni.$u.http.interceptors.response.use((response: HttpResponse) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
    finish()
    const data = response.data
    if (data.code && data.code <= 0) {
      //业务逻辑错误
      uni.showToast({title: data ? data.msg : '处理异常！！', icon: "none"});
      return Promise.reject(response)
    }
    if(response.header['New-Token']){
      //如果存在则替换现在的token
      store.login.token=response.header['New-Token']
      store.login.expiresIn=Number(response.header['New-Expires-At'])
    }
    return response
  }, (response) => {
    finish()
    if (response.statusCode === 401) {
      //TODO 如果是401就是没登录的错误，这个时候一般是账号密码登录导致的，小程序登录会静默登录不可能出现401
      if(auth.isNotAccount()){
        //直接返回不提示
        return Promise.reject(response)
      }
    }
    const data = response.data
    uni.showToast({title: data ? data.msg : '网络错误！', icon: "none"});
    return Promise.reject(response)
  })

  //响应完成
  function finish() {
    if (t > 0) {
      clearTimeout(t)
      t = -1
    } else {
      uni.hideLoading()
    }
  }
}


export default install
