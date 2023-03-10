<template>
  <view class="setting">
    <view class="cell_box">
      <item-cell cellname="关于商城"></item-cell>
      <item-cell cellname="站点帮助"></item-cell>
      <item-cell cellname="意见反馈"></item-cell>
    </view>
    <!-- 选择主题 -->
    <view class="card-menu">
      <view>
        <text :class="'iconfont icon-zhuti_tiaosepan icon'"></text>
        <view class="box"></view>
        <view>主题色：{{ themeColor.title }}</view>
      </view>
      <view>
        <u-button height="30" shape="circle" :color="themeColor.color" @click="colorModal=true">选择主题色</u-button>
      </view>
    </view>
    <!-- 选择颜色模态框 -->
    <u-popup :show="colorModal" mode="center" :closeable="true" @close="colorModal=false">
      <view
          style="height: 90rpx;line-height: 90rpx;text-align: center;border-bottom: 2rpx #c7c5c5 solid;margin-bottom: 10rpx">
        选择主题颜色
      </view>
      <view class="colorModalView">
        <view v-for="(item, index) in themeList" :key="index" class="item" :style="{background:item.color}"
              @tap="SetColor(item)">
          {{ item.title }}
        </view>
      </view>
    </u-popup>
    <!-- 退出登录 -->
    <view class="exit" v-if="store.user.nickName" :style="'color:' + themeColor.color" @tap="logout">
      退出登录
    </view>
  </view>
</template>

<script setup lang="ts">
import ItemCell from "../../commponent/setting/item-cell";
import {GlobalStore} from "../../../store";
import {ref} from "vue";
import {themeList, ThemeType} from "../../../config/themeConfig";
import {CartStore} from "../../../store/modules/cart";
import {UserStore} from "../../../store/modules/user";

const store = GlobalStore()
const themeColor = store.theme
const colorModal = ref(false)

const SetColor = (item: ThemeType) => {
  store.theme.color = item.color
  store.theme.name = item.name
  store.theme.title = item.title
  store.theme.tabList = item.tabList
  colorModal.value = false
}
const logout = () => {
  //退出登录
  uni.showModal({
    cancelColor: '#999',
    content: '确认要退出登录吗?',
    confirmColor: themeColor.color,
    success: function (res) {
      if (res.confirm) {
        //清空缓存的数据
        //登录信息
        store.setData('user', {})
        store.login.token=''
        store.login.expiresIn=0
        //购物车
        const cartStore = CartStore()
        cartStore.list = []//购物车清空
        //刷新账号信息
        const userStore= UserStore()
        userStore.updateAccount()
        uni.showToast({title: '退出成功', icon: 'none'});
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/tabbar/index/index'
          });
        }, 500);
      }
    }
  });
}
</script>
<style scoped lang="scss">
$myColor: v-bind('themeColor.color');

.card-menu {
  display: flex;
  justify-content: space-between;
  height: 110rpx;
  background-color: #FFFFFF;
  align-items: center;
  padding: 0 20rpx;

  & > view:nth-child(1) {
    .iconfont {
      font-size: 40rpx;
    }

    width: 400rpx;
    color: $myColor;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .box {
      height: 60rpx;
      width: 60rpx;
      background-color: $myColor;
      border-radius: 10rpx;
      box-shadow: 5rpx 5rpx 10rpx $myColor;
    }
  }

  & > view:nth-child(2) {
    width: 200rpx;
  }
}

:deep(.u-button) {
  height: 60rpx !important;
  box-shadow: 5rpx 5rpx 10rpx $myColor;
}

.colorModalView {
  width: 560rpx;
  display: grid;
  grid-template-columns:  repeat(5,110rpx);
  column-gap: 5rpx;
  row-gap: 10rpx;
  padding: 20rpx;
  margin-bottom: 10rpx;

  & > .item {
    width: 100rpx;
    height: 100rpx;
    color: #FFFFFF;
    font-size: 26rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10rpx;
  }
}

.bg-default {
  background-color: #fa436a;
  color: #fff;
}

.text-default {
  color: #fa436a;
}

.cu-item .title {
  margin-left: 20rpx;
  font-size: 28rpx;
}

.action button {
  width: 200rpx !important;
  font-size: 24rpx;
  color: #fff;
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
<style>
page {
  background-color: #F8F8F8 !important;
}
</style>