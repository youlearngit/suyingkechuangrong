<template>
  <view class="lists">
    <view class="type">
      <text class="order_id">售后编号:{{ info.orderNo + '_' + info.refundId }}</text>
      <text class="order_type" :style="'color:' + colors">
        {{ refundStatus(info.returnStatus) }}
      </text>
    </view>
    <view class="top" @tap="goToDetails">
      <image :src="info.pic" mode="aspectFill"></image>
      <view class="top_right">
        <view class="order_name">{{ info.goodsTitle }}</view>
        <view class="sku">{{ SkuPrint(info.spData) }}</view>
        <view class="price">
          <view class="t1">￥{{ info.price }}</view>
          <view class="t3">
            x{{ info.shopCount }}
          </view>
        </view>
      </view>
    </view>
    <view class="bottom">
    </view>
  </view>
</template>

<script setup lang="ts">
import useRouter from "../../hooks/useRouter";
import {SkuPrint} from "../../common/utils";
import {refundStatus} from "./orderUtils";
interface Props {
  info: Order.Refund,
  colors: string
}

const props = defineProps<Props>()
const router = useRouter()

const emit = defineEmits(['refresh'])

//详情
const goToDetails = () => {
  const data = encodeURIComponent(JSON.stringify(props.info))
  uni.navigateTo({
    url: '/pagesMall/order/afterSale?show=true&type=' + props.info.returnType + "&data=" + data
  })
}

//查看物流
const goToLogistics = () => {
  uni.navigateTo({
    url: '/pagesMall/order/orderLogistics?orderId=' + props.info.orderId
  });
}

</script>

<style scoped lang="scss">

.lists {
  padding: 20rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  margin: 5rpx auto 20rpx;
  box-shadow: 0rpx 0rpx 10rpx #EDEDED;
  box-sizing: border-box;
  width: 98%;
}

.type {
  height: 50rpx;
  font-size: 26rpx;
  font-weight: bold;
  text-align: right;
  display: flex;
  justify-content: space-between;
}

.type .order_id {
  font-weight: 600;
  color: #999;
  font-size: 24rpx;
}

.lists .top {
  display: flex;
  align-content: center;
  margin-bottom: 20rpx;
}

.lists .top image {
  min-width: 180rpx;
  max-width: 180rpx;
  height: 180rpx;
  display: block;
  border-radius: 10rpx;
}

.lists .top .top_right {
  margin-left: 20rpx;
  width: 100%;
}

.lists .top .order_name {
  line-height: 40rpx;
  height: 80rpx;
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.lists .top .sku {
  height: 40rpx;
  line-height: 40rpx;
  font-size: 24rpx;
  border-radius: 8rpx;
  padding: 0 10rpx;
  color: #A7A7A7;
  background-color: #F7F7F7;
}

.lists .top .price {
  width: 100%;
  display: flex;
  align-items: center;
  height: 40rpx;
  line-height: 40rpx;
  margin-top: 20rpx;
  position: relative;
}

.price .t1 {
  font-size: 30rpx;
  // font-weight: bold;
  display: block;
  color: v-bind(colors);
}

.price .t2 {
  font-size: 24rpx;
  margin-left: 15rpx;
  display: block;
  color: #C5C5C5;
  text-decoration: line-through;
}

.price .t3 {
  float: right;
  font-weight: bold;
  font-size: 28rpx;
  color: #999;
  position: absolute;
  right: 0rpx;
  top: 0;
}

.bottom {
  margin-top: 20rpx;
}

.bottom .address {
  font-size: 24rpx;
  color: #696969;
}

.bottom .btns {
  margin-top: 15rpx;
  overflow: hidden;
}

.bottom .btns .pay {
  padding: 8rpx 15rpx;
  border-radius: 8rpx;
  text-align: center;
  font-size: 24rpx;
  float: right;
  margin-left: 20rpx;
  box-sizing: border-box;
  border: 1rpx solid #ddd;
}

.pay:active {
  opacity: .8;
}
</style>
