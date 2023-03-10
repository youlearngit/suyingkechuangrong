<template>
  <view class="login">
    <view class="logo">
      <image src="/static/images/log.png"></image>
    </view>
    <view class="login_from">
      <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
      <view style="height: 220rpx;display: flex;flex-direction: column;justify-content: space-between">
        <field v-model="user.username" :clearable="false" label="账号" placeholder="请输入账号"></field>
        <field v-model="user.password" label="密码" :clearable="false" password placeholder="请输入密码"></field>
      </view>
      <view style="display: flex;justify-content: space-between;align-items: center;width: 70vw">
        <u-button style="width: 30vw" shape="circle" @click="register">注册</u-button>
        <u-button style="width: 30vw" :color="colors" shape="circle" @click="submit">登录</u-button>
      </view>
    </view>
    <view class="wxLogin">
      <u-loadmore status="nomore" :line="true" height="30" nomore-text="授权登录"/>
      <view>
        <image v-if="loginType===1" @click="authorization" src="/static/images/wechat.png"></image>
        <u-button v-if="loginType===2" type="primary" :plain="true" :hairline="true" :color="colors"
                  open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">
          获取手机号
        </u-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
//获取颜色
import {GlobalStore} from "../../store";
import {computed, onMounted, reactive, ref} from "vue";
import {tryWxLogin} from "../../common/login";
import useAuth from "../../hooks/useAuth";
import Field from "../../components/u-field/u-field.vue"

const store = GlobalStore()
const colors = computed(() => {
  return store.theme.color
})

//登录类型
const loginType = ref(1)
onMounted(async () => {
  if (store.user.roleType === 'wechat' && store.user.avatarUrl && !store.user.mobile) {
    //如果账号信息都有，肯定没手机号码了
    loginType.value = 2
  }
})

//微信logo授权获取基础信息 TODO 可能失败
const authorization = async () => {
  uni.showLoading({
    title: "登录中...",
    mask: true
  })
  //强制登录下，不然没有token无法进行数据更新
  const flag = await tryWxLogin(store, 1)
  uni.hideLoading()
  if (flag == 0) {
    return
  }
  //如果存在这些信息直接返回
  if (store.user.mobile != "" && store.user.nickName) {
    uni.navigateBack({
      delta: 1
    });
    setTimeout(() => {
      uni.$u.toast('微信授权登录成功')
    }, 200)
    return
  }
  // 微信授权
  uni.showModal({
    title: '温馨提示',
    content: '你好，授权后才能正常使用小程序功能',
    success: (res) => {
      if (res.confirm) {
        uni.getUserProfile({
          lang: 'zh_CN',
          provider: 'weixin',
          desc: '获取用户个人信息',
          success: async (detail) => {
            await uni.$u.http.post('/wx/userUpdate', detail.userInfo)
            if (!store.user.mobile) {
              uni.$u.toast('请再授权获取手机号码！')
              loginType.value = 2
            } else {
              //直接返回
              uni.navigateBack({
                delta: 1
              });
            }
          },
          fail: (msg) => {
            console.log(msg)
          }
        })
      }
    }
  })
}

//按钮授权获取手机号码的
const decryptPhoneNumber = async (e: any) => {
  const {data} = await uni.$u.http.post('/wx/updateMobile', e.detail)
  if (data.data) {
    await tryWxLogin(store, 1) //刷新登录信息
    //手机号码绑定成功
    uni.navigateBack({
      delta: 1
    });
  }
}

//密码登录登录相关
const user = reactive({username: store.login.username, password: store.login.password})
const submit = async () => {
  uni.showLoading({
    title: "登录中...",
    mask: true
  })
  const {data} = await uni.$u.http.post("/wx/userLogin", user)
  const auth = useAuth()
  auth.loginSuccess(data).then(() => {
    //登陆成功就更新这个信息
    store.login.username = user.username
    store.login.password = user.password
    //账号登录成功直接返回
    uni.navigateBack({
      delta: 1
    });
    setTimeout(() => {
      uni.$u.toast('账号登录成功')
    }, 300)
  })
}

//注册
const register = async () => {
  await uni.$u.http.post("/wx/userRegister", user)
  uni.$u.toast('账号注册成功，请点击登陆')
}
</script>
<style scoped lang="scss">

.login {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}

.logo image {
  height: 160rpx;
  width: 160rpx;
  display: block;
  border-radius: 50%;
  margin: 80rpx auto 0;
  flex: 1;
}

.login_from {
  width: 80vw;
  flex: 2;
  margin-top: 50 rox;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  & > u-from {
    width: 100%;
  }
}


.wxLogin {
  flex: 1;
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  image {
    width: 80rpx;
    height: 80rpx;
  }

  & > view {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 50vw;
  }
}
</style>
