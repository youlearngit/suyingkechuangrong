<template>
  <view>
    <view v-for="(item, index) in list" :key="index" class="coupon_box">
      <view class="left">
        <view class="left_top">
          <text class="iconfont icon-youhuiquanwenzi" :style="{color:colors,fontSize:'45rpx'}"></text>
          <text class="hui_name">{{ item.couponTitle }}</text>
        </view>
        <view class="left_bottom">
          <text>有效日期：{{ item.endTime }}</text>
        </view>
        <view style="color: #8f8f94;font-size: 24rpx">
          <view v-if="item.scopeType==='ALL'">全场商品可用</view>
          <view v-else-if="item.scopeType==='GOODS'">指定商品可用</view>
          <view v-else-if="item.scopeType==='CATEGORY'">指定分类可用</view>
        </view>
      </view>
      <view class="right" :style="'background:' + (canUse(item) ? colors:'')">
        <view class="money" v-if="item.couponType==='FULL'">￥{{ item.discount }}</view>
        <view v-else class="money">{{ item.discount }}折</view>
        <text>满{{ item.threshold }}可用</text>
        <text class="shiyong" v-if="!expTime(item)">已过期</text>
        <text class="shiyong" :style="{color:colors}" v-else-if="item.memberCouponStatus === 'NEW'" @click="jumpNext(item)">
          去使用
        </text>
        <text class="shiyong" v-else-if="item.memberCouponStatus === 'INUSE'">使用中</text>
        <text class="shiyong" v-else-if="item.memberCouponStatus === 'USED'">已使用</text>
        <text class="shiyong" v-else-if="item.memberCouponStatus === 'CLOSED'">作废</text>
      </view>
    </view>
    <nodata :colors="colors" :loading="loading" :show="list.length===0" :count="list.length" title="优惠劵"></nodata>
  </view>
</template>

<script setup lang="ts">
import Nodata from "../../pages/commponent/public/nodata.vue"
import {ref} from "vue";
import {GlobalStore} from "../../store";
import {usePageData} from "../../hooks/usePageData";

const store = GlobalStore()
const colors = store.theme.color;
const params = ref({}) //格外参数
const {list, loading} = usePageData<Promotion.Coupon>("/wx/queryMyCoupon", params)

//跳转
const jumpNext = (item: Promotion.Coupon) => {
  uni.navigateTo({
    url: '/pages/home/classList?couponId=' + item.couponId
  });
}

const expTime =(item: Promotion.Coupon)=>{
  const date = new Date(item.endTime.replace(/-/g, '/'))
  if (new Date().getTime() > date.getTime()) {
    return false
  }
  return true
}
const canUse = (item: Promotion.Coupon) => {
  const date = new Date(item.endTime.replace(/-/g, '/'))
  if (new Date().getTime() > date.getTime()) {
    return false
  }
  if (item.memberCouponStatus !== 'NEW') {
    return false
  }
  return true
}
</script>
<style lang="scss" scoped>
.coupon_box {
  margin: 20rpx;
  box-shadow: 0rpx 0rpx 10rpx #ddd;
  position: relative;
  border-radius: 10rpx;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.coupon_box .left {
  width: 70%;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
  padding: 20rpx;
}

.coupon_box .left .hui {
  width: 40rpx;
  height: 40rpx;
  font-size: 20rpx;
  color: #fff;
  background-color: #EC1818;
  border-radius: 8rpx;
  line-height: 40rpx;
  text-align: center;
  display: inline-block;
  transform: translateY(-5rpx);
}

.coupon_box .left .left_top {
  width: 60vw;
  font-size: 26rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.left_top .hui_name {
  line-height: 60rpx;
  height: 60rpx;
  margin-left: 20rpx;
  display: inline-block;
}

.left_bottom {
  font-size: 24rpx;
  font-weight: bold;
  color: #333;
  height: 60rpx;
  line-height: 60rpx;
}

.coupon_box .right {
  text-align: center;
  height: 160rpx;
  width: 180rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  background-color: #A8A8A8;
  margin-right: 20rpx;
}

.coupon_box .right .shiyong {
  height: 40rpx;
  line-height: 40rpx;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 0 20rpx;
  color: #A8A8A8;
}

.coupon_box .right .money {
  font-size: 45rpx;
  width: 180rpx;
  color: #fff;
}

.coupon_box .right text {
  font-size: 24rpx;
  color: #fff;
  height: 40rpx;
  line-height: 34rpx;
}

.coupon_box .bottom {
  height: 60rpx;
  line-height: 60rpx;
  display: flex;
  align-content: flex-start;
  font-size: 24rpx;
  margin-top: 10rpx;
}

.coupon_box .bottom view {
  margin-right: 20rpx;
  color: #888;
  font-weight: bold;
}

.ysy {
  width: 80rpx;
  height: 80rpx;
  position: absolute;
  top: 20rpx;
  right: 200rpx;
}
</style>
