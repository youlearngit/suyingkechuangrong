<template>
  <view class="userbox">
    <!-- 头部个人信息 不变-->
    <view class="userHeader" :style="{background:colors}">
      <image src="/static/images/user/user-bg.png" class="user_bg"></image>
      <view class="nav">
        <view class="user" @click="onLogin">
          <image :src="userInfo.avatarUrl" v-if="userInfo.avatarUrl"></image>
          <text>{{ userInfo.nickName || '登录' }}</text>
        </view>
      </view>
      <view class="vip">
        <image src="/static/images/user/vip-card.png" class="vip_bg"></image>
        <view class="vipname">
          <text class="iconfont icon-zuanshi zuanshi"></text>
          <text class="names">
            商城尊享会员
          </text>
          <text class="vip_level">钻石会员</text>
        </view>
        <view class="banquan">
          商城版权所有©
        </view>
      </view>
    </view>
    <!-- 中间菜单栏 -->
    <view class="userMenu" @touchstart="coverTouchStart" @touchmove="coverTouchMove" @touchend="coverTouchEnd"
          :style="'transform:' + coverTransform + ';transition:' + coverTransition">
      <image src="/static/images/user/arc.png" class="arc"></image>
      <!-- 我的账户 -->
      <my-account :info="accountInfo" :colors="colors"></my-account>
      <!-- 全部订单 -->
      <my-order :info="accountInfo" :colors="colors"></my-order>
      <!-- 我的足迹 -->
      <my-footprint :colors="colors"></my-footprint>
      <!-- 我的服务 -->
      <my-server :serverList="serverList" :colors="colors"></my-server>
    </view>
  </view>
</template>

<script setup lang="ts">
//全局监听
import useGlobal from "../../../hooks/useGlobal";
import {GlobalStore} from "../../../store";
import {computed, onMounted} from "vue";
import useTouchMove from "./useTouchMove";
import MyAccount from "../../commponent/user/my-account";
import MyOrder from "../../commponent/user/my-order";
import MyFootprint from "../../commponent/user/my-footprint";
import MyServer from "../../commponent/user/my-server";
import {onShow} from "@dcloudio/uni-app";
import {UserStore} from "../../../store/modules/user";

onShow(() => {
  uni.setNavigationBarColor({ //设置标题栏颜色
    backgroundColor: store.theme.color,
    frontColor: '#ffffff'
  });
});

useGlobal()

//获取颜色
const store = GlobalStore()
const colors = computed(() => {
  return store.theme.color
})
//登录的用户
const userInfo = computed(() => {
  return store.user
})

const userStore = UserStore()
//账户信息
const accountInfo = computed(() => {
  return userStore.account
})
//头部移动
const {coverTransform, coverTransition, coverTouchStart, coverTouchMove, coverTouchEnd} = useTouchMove(async () => {
  uni.showLoading({
    title: 'Loading...'
  })
  await userStore.updateAccount()
  uni.hideLoading()
})
const serverList = [{
  name: '我的收藏',
  icon: 'icon-shoucang',
  url: '/pagesMall/user/myFavorite',
  id: 1,
  elseUrl: ''
}, {
  name: '地址管理',
  icon: 'icon-dizhi',
  url: '/pagesMall/user/myAddress',
  id: 2,
  elseUrl: ''
}, {
  name: '分销中心',
  icon: 'icon-fenxiaojiesuan2',
  url: '/pages/views/user/mydistribution',
  id: 6,
  elseUrl: ''
}, {
  name: '设置',
  icon: 'icon-icon_shezhi',
  url: '/pages/tabbar/user/setting',
  id: 9,
  elseUrl: ''
}]

//登录处理
const onLogin = () => {
  if (userInfo.value.avatarUrl) {
    //跳转个人中心
    uni.navigateTo({
      url: '/pagesMall/user/myInfo'
    })
    return
  }
  //登录
  uni.navigateTo({
    url: '/pages/login/login'
  })
}

</script>

<style lang="scss" scoped>
@import "./user";
</style>