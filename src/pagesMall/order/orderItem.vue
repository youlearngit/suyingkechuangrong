<template>
  <view class="lists">
    <view class="type">
      <text class="order_id">订单编号:{{ info.orderNo }}</text>
      <text class="order_type" :style="'color:' + colors">
        {{ setStatus(info.status) }}
      </text>
    </view>
    <view v-for="(row, index2) in info.itemList" :key="index2" class="top" @tap="goToDetails">
      <image :src="row.pic" mode="aspectFill"></image>
      <view class="top_right">
        <view class="order_name">{{ row.goodsTitle }}</view>
        <view class="sku">{{ SkuPrint(row.spData) }}</view>
        <view class="price">
          <view class="t1">￥{{ row.price }}</view>
          <view class="t3">
            x{{ row.shopCount }}
          </view>
        </view>
      </view>
    </view>
    <view class="bottom">
      <view class="address">收货地址：{{ info.address }}</view>
      <view class="btns">
        <template v-if="info.itemList[0].itemStatus === -1">
          <view class="pay shouhou" @click="delOrder">删除订单</view>
        </template>
        <template v-if="info.itemList[0].itemStatus === 0">
          <view class="pay" :style="'color:#fff;background:' + colors+ ';border-color:' + colors"
                @tap="goToPay">去付款
          </view>
          <view class="pay shouhou" :style="'color:' + colors + ';border-color:' + colors"
                @tap="cancelOrder">取消订单
          </view>
        </template>
        <template v-if="info.itemList[0].itemStatus === 2">
          <view class="pay shouhou" :style="'color:' + colors + ';border-color:' + colors" @tap="cancelOrder">取消订单
          </view>
        </template>
        <template v-if="info.itemList[0].itemStatus === 3">
          <view @click="orderSign" class="pay" :style="'color:#fff;background:' + colors+ ';border-color:' + colors">
            确认收货
          </view>
          <view class="pay shouhou" :style="'color:' + colors + ';border-color:' + colors" @tap="goToLogistics">查看物流
          </view>
        </template>
        <template v-if="info.itemList[0].itemStatus === 4">
          <view class="pay shouhou" :style="'color:' + colors + ';border-color:' + colors"
                @tap="goToDetails">订单评价
          </view>
          <view class="pay shouhou" @tap="goToDetails">申请售后</view>
        </template>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {SkuPrint} from "../../common/utils";
import useRouter from "../../hooks/useRouter";
import {setStatus} from "./orderUtils"

interface Props {
  info: Order.Info,
  colors: string
}

const props = defineProps<Props>()
const router = useRouter()

const emit = defineEmits(['refresh'])
//去支付
const goToPay = async () => {
  uni.showModal({
    cancelColor: '#999',
    confirmColor: props.colors,
    title: '付款确认',
    content: '是否支付当前订单！',
    success: async (res) => {
      if (res.confirm) {
        const {data} = await uni.$u.http.post<Order.PayContext>("/wx/payOrder/" + props.info.orderId)
        if (props.info.payMethod === 1) {
          await router.GoToWechatPay(data)
        } else {
          uni.$u.toast("支付成功")
          setTimeout(() => {
            emit('refresh')
          }, 200)
        }
      }
    }
  });
}
//取消订单
const cancelOrder = () => {
  uni.navigateTo({
    url: '/pagesMall/order/cancelOrder?orderId=' + props.info.orderId
  });
}
//订单详情
const goToDetails = () => {
  uni.navigateTo({
    url: '/pagesMall/order/orderDetails?orderId=' + props.info.orderId
  });
}

//查看物流
const goToLogistics = () => {
  uni.navigateTo({
    url: '/pagesMall/order/orderLogistics?orderId=' + props.info.orderId
  });
}

//删除订单
const delOrder = () => {
  uni.showModal({
    cancelColor: '#999',
    confirmColor: props.colors,
    title: '订单操作',
    content: '是否删除当前订单！',
    success: async (res) => {
      if (res.confirm) {
        await uni.$u.http.post<Order.PayContext>("/wx/orderDelete/" + props.info.orderId)
        uni.$u.toast("删除成功！")
        setTimeout(() => {
          emit('refresh')
        }, 200)
      }
    }
  });
}

//签收
const orderSign = () => {
  uni.showModal({
    cancelColor: '#999',
    confirmColor: props.colors,
    title: '签收确认',
    content: '当前商品是否已收到！',
    success: async (res) => {
      if (res.confirm) {
        await uni.$u.http.post("/wx/orderSign/" + props.info.orderId)
        uni.$u.toast("签收成功")
        setTimeout(() => {
          emit('refresh')
        }, 200)
      }
    }
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
