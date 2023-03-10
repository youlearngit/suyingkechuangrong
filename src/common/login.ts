import {StateType} from "../store";
import useAuth from "../hooks/useAuth";

//TODO 微信小程序登录函数
//flag=1 强制登录
export function tryWxLogin(store: StateType, flag = 0): Promise<number> {
  //如果没有登录记录或者不是微信账号登录的 -直接不能进行登陆
  if (flag == 0 && (!store.login.expiresIn || store.user.roleType !== 'wechat')) {
    return Promise.resolve(0)
  }
  //1.判断是否有登录的必要
  const now = new Date().getTime() / 1000 + 60 * 10
  if (flag == 0 && store.login.expiresIn && now < store.login.expiresIn) {
    return Promise.resolve(1)
  }
  //2.进行登录
  return new Promise<number>((resolve, reject) => {
    //微信登录
    uni.login({
      fail: () => {
        uni.hideLoading()
        uni.showModal({
          title: '登录失败',
          content: '获取授权信息失败！',
        });
      },
      success: logins => {
        // 发送 logins.code 到后台换取 openId, sessionKey, unionId
        const info = uni.getSystemInfoSync()
        uni.request({
          url: uni.$u.http.config.baseURL + '/wx/login',
          data: {
            code: logins.code,
            brand: info.brand,
            model: info.model,
            version: info.version,
            system: info.system,
            platform: info.platform
          },
          method: 'POST',
          success: resp => {
            const data = resp.data as any;
            if (data.code == -1) {
              uni.showModal({
                title: '登录失败',
                content: data.msg,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定');
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                  }
                }
              });
              resolve(0)
            } else {
              //设置登录成功后信息
              const auth = useAuth()
              auth.loginSuccess(data).then(() => {
                resolve(1)
              })
            }
          },
          fail: (resp) => {
            resolve(0)
          },
          complete: () => {
            uni.hideLoading()
          }
        });
      }
    })
  })
}
