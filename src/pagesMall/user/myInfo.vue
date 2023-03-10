<template>
  <view class="container">
    <view class="body">
      <view>
        <view class="u-avatar-wrap" @click="chooseAvatar">
          <image :src="user.avatarUrl" mode="aspectFill"></image>
        </view>
      </view>
      <u-field v-model="user.username" :disabled="true" label="账号"></u-field>
      <u-field v-model="user.nickName" required :clearable="false" label="昵称" placeholder="请输入昵称"></u-field>
      <u-field v-model="user.mobile" required :clearable="false" label="手机号码"
               placeholder="请输入手机号码"></u-field>
      <u-field v-model="user.email" :clearable="false" label="邮箱" placeholder="请输入邮箱"></u-field>

      <u-button shape="circle" :customStyle="{...customStyle,width:'50vw',height:'70rpx',marginTop:'130rpx'}"
                :color="store.theme.color"
                @click="updateInfo" text="更新"></u-button>

    </view>


    <!-- 退出登录 -->
    <view class="exit" v-if="store.user.nickName" :style="'color:' + store.theme.color" @tap="logout">
      退出登录
    </view>
  </view>
</template>

<script setup lang="ts">
import UField from "../../components/u-field/u-field.vue";
import {onMounted, onUnmounted, ref} from "vue";
import {GlobalStore} from "../../store";
import {CartStore} from "../../store/modules/cart";
import {onPullDownRefresh} from "@dcloudio/uni-app";
import {User} from "../../store/interface/user";
import {UserStore} from "../../store/modules/user";

const store = GlobalStore()
const userStore = UserStore()
const user = ref({...store.user})

onMounted(() => {
  uni.$on('uAvatarCropper', path => {
    //小程序上传图片
    uni.$u.http.upload("/static/upload/image", {
      formData: {use: "wechat"},
      name: 'file',
      filePath: path
    }).then(({data}) => {
      user.value.avatarUrl = data.path
      uni.$u.http.post("/wx/userUpdate", user.value).then(() => {
        uni.$u.toast('头像更新成功')
      })
      store.user.avatarUrl =data.path
    })
  })
})
onUnmounted(() => {
  uni.$off('uAvatarCropper')
})

//更新数据
const updateInfo = async () => {
  if (!user.value.nickName || !user.value.mobile) {
    uni.$u.toast('昵称或手机号码不能为空！')
    return
  }
  await uni.$u.http.post("/wx/userUpdate", user.value)
  uni.$u.toast('更新成功')
  store.user = Object.assign(store.user, user.value)
}

const chooseAvatar = () => {
  // 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
  uni.$u.route({
    // 关于此路径，请见下方"注意事项"
    url: 'pagesMall/user/u-avatar-cropper/u-avatar-cropper',
    // 内部已设置以下默认参数值，可不传这些参数
    params: {
      // 输出图片宽度，高等于宽，单位px
      destWidth: 600,
      // 裁剪框宽度，高等于宽，单位px
      rectWidth: 200,
      // 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
      fileType: 'jpg',
    }
  })
}

//下来刷新数据
onPullDownRefresh(async () => {
  const {data} = await uni.$u.http.get<User>("/wx/getUserInfo")
  user.value = data
  //TODO 如果修改整个对象的地址需要这样设置
  store.setData('user', data)
  uni.stopPullDownRefresh() //停止
})


const logout = () => {
  //退出登录
  uni.showModal({
    cancelColor: '#999',
    content: '确认要退出登录吗?',
    confirmColor: store.theme.color,
    success: function (res) {
      if (res.confirm) {
        //清空缓存的数据
        //登录信息
        store.setData('user', {})
        store.login.token = ''
        store.login.expiresIn = 0
        //购物车
        const cartStore = CartStore()
        cartStore.list = []//购物车清空
        //账号信息
        userStore.updateAccount()

        uni.showToast({title: '退出成功', icon: 'none'});
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          })
        }, 500);
      }
    }
  });
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background: #f4f5f6;
  width: 100vw;
  padding: 10rpx 2%;

  .body {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    background: #FFFFFF;
    width: 96vw;
    padding-bottom: 50rpx;
    border-radius: 10rpx;
    box-shadow: 5rpx 10rpx 10rpx #cecbcb;
  }

  u-field {
    width: 90vw;
  }

  .u-avatar-wrap {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 30rpx;
    margin-top: 50rpx;

    & > image {
      width: 100%;
      height: 100%;
      border-radius: 10rpx;
    }
  }
}

:deep(view.u-flex) {
  width: 100%;
}


.exit {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background-color: #FFFFFF;
  font-size: 30rpx;
  position: fixed;
  left: 0;
  bottom: 50rpx;
}
</style>
