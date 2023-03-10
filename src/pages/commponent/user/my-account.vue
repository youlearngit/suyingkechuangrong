<template>
  <view class="my_money">
    <list-cell icons="icon-zhanghuzichan" :colors="colors" :rightshow="false">我的账户</list-cell>
    <view class="menu_btnbox">
      <view class="menu_btns" @tap="withdrawa">
        <view class="p1">{{ info.balance }}</view>
        <view class="p2">余额</view>
      </view>
      <view class="menu_btns" @tap="mycoupon">
        <view class="p1">{{ info.couponCount }}</view>
        <view class="p2">优惠券</view>
      </view>
      <view class="menu_btns" @tap="mypoints">
        <view class="p1">{{ 0 }}</view>
        <view class="p2">积分</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import ListCell from "./list-cell";
import {AccountInfo} from "../../../common/userApi";

interface Props {
  colors: string,
  info: AccountInfo
}

const props=withDefaults(defineProps<Props>(), {})
const mycoupon = () => {
  uni.navigateTo({
    url: '/pagesMall/user/myCoupon'
  });
}
const mypoints = () => {
  uni.navigateTo({
    url: '/pages/views/user/mypoints'
  });
}
const withdrawa = () => {
  uni.navigateTo({
    url: '/pagesMall/user/myWithdrawal?balance='+props.info.balance
  });
}
</script>
<style lang="scss" scoped>
.my_money {
  background-color: #fff;
  margin-bottom: 20rpx;
}

.menu_btnbox {
  display: flex;
  align-items: center;
}

.menu_btns {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 30rpx 0;
  font-size: 24rpx;
  color: #75787d;
  line-height: 40rpx;
}

.menu_btns .p1 {
  font-size: 30rpx;
  font-weight: bold;
}
</style>