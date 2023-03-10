import {GlobalStore} from "../store";
import {tryWxLogin} from "../common/login";
import {User} from "../store/interface/user";
import {CartStore} from "../store/modules/cart";
import {UserStore} from "../store/modules/user";

export default function useAuth() {
  const store = GlobalStore()
  //判断是否需要登陆
  //TODO 这个判断主要是一些特殊页面进行跳转前的判断，大部分页面不需要判断接口拦截会判断401，会重定向到登陆页面
  const isLogin = async (): Promise<boolean> => {
    await tryWxLogin(store)
    let flag = true
    if (store.user) {
      if (store.user.roleType === 'wechat' && !store.user.mobile) {
        uni.$u.toast("请绑定手机号码")
      } else {
        if (store.login.expiresIn) {
          const now = new Date().getTime() / 1000 + 60 * 10
          //是否登陆超时了
          if (now > store.login.expiresIn) {
            showToast("请重新登录")
          } else {
            flag = false
          }
        } else {
          showToast("请先登陆")
        }
      }
    } else {
      showToast("请先登陆")
    }
    if (flag) {
      //登录
      uni.navigateTo({
        url: '/pages/login/login'
      })
      return false
    } else {
      return true
    }
  }

  const showToast = (title: string) => {
    setTimeout(() => {
      uni.$u.toast(title)
    }, 300)
  }

  //登录成功后的处理
  const loginSuccess = async (data: { expiresIn: number, token: string, userInfo: User }) => {
    //1.设置缓存信息
    store.setData('user', data.userInfo)
    store.login.token = data.token
    store.login.expiresIn = data.expiresIn
    //2.刷新缓存信息
    const cartStore = CartStore()
    await cartStore.updateList()
    //3.账号信息
    const userStore=UserStore()
    await userStore.updateAccount()
  }

  //判断是否没账号信息
  const isNotAccount = () => {
    const now = new Date().getTime() / 1000 + 60 * 10
    if (store.login.token && store.login.expiresIn && (now < store.login.expiresIn)) {
      //如果有登录且token没超时就不跳登录页面了
      return false
    } else {
      //跳转登录
      uni.navigateTo({
        url: '/pages/login/login'
      })
      uni.$u.toast("请先登录！")
      return true
    }
  }

  //是否没有登录
  const isNotLogin = () => {
    const now = new Date().getTime() / 1000 + 60 * 10
    if (store.login.token && store.login.expiresIn && (now < store.login.expiresIn)) {
      //如果有登录且token没超时就不跳登录页面了
      return false
    } else {
      return true
    }
  }
  return {isLogin, loginSuccess, isNotAccount,isNotLogin}
}
