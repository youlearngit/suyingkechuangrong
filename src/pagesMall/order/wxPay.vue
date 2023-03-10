<template>
  <view class="jieguo" :style="{background: colors}">
    <view class="place">
    </view>
    <view class="jieguo_box">
      <view class="moneys">￥{{ totalAmount }}</view>
      <div style="height: 80%;display: flex;justify-content: center;align-items: center;flex-direction: column">
        <u-loading-icon :size="44" v-if="payFlag===0" color="red"></u-loading-icon>
        <template v-else>
          <view v-if="payFlag===1" class="success">
            <text class="iconfont icon-chenggong"></text>
            <view class="texts">支付成功</view>
          </view>
          <view v-if="payFlag===3" class="error">
            <text class="iconfont icon-shibai"></text>
            <view class="texts">支付失败</view>
          </view>
          <view v-if="payFlag===2" class="cancel">
            <text class="iconfont icon-quxiao"></text>
            <view class="texts">支付取消</view>
          </view>
          <view class="wancheng" @tap="onSuccess" :style="'color:' + colors + ';border-color:' + colors">
            <view v-if="payFlag===1">完成</view>
            <view v-else>重试</view>
          </view>
          <view class="ewm" @tap="jumpMyOrder">跳转我的订单 >>></view>
        </template>
      </div>

    </view>
  </view>
</template>

<script setup lang="ts">

import {GlobalStore} from "../../store";
import {onLoad} from "@dcloudio/uni-app";
import {ref} from "vue";
import {UserStore} from "../../store/modules/user";

const totalAmount = ref(0)
const payFlag = ref(0)
let data: Order.PayContext
onLoad(async (option: any) => {
  //发起支付参数
  data = JSON.parse(decodeURIComponent(option.data)) as Order.PayContext;
  if(!data.totalAmount){
    //不明确的参数直接返回
    jumpMyOrder()
    return
  }
  totalAmount.value = data.totalAmount
  paying()
})

const paying=()=>{
  payFlag.value = 0
  //调起支付
  uni.requestPayment
  (
      {
        "provider": 'wxpay',
        "orderInfo": "订单支付",
        "timeStamp": data.timeStamp,
        "nonceStr": data.nonceStr,
        "package": data.package,
        "signType": data.signType,
        "paySign": data.paySign,
        "success": (res: any) => {
          payFlag.value = 1
          const userStore = UserStore()
          userStore.updateAccount()//更新账户信息
        },
        "fail": (res: any) => {
          payFlag.value = 2
        },
        "complete": (res: any) => {
        }
      }
  )
}
const store = GlobalStore()
const colors = store.theme.color
const onSuccess = () => {
  if (payFlag.value!==1) {
    paying()
  }else {
    jumpMyOrder()
  }
}
const jumpMyOrder = () => {
  //关闭当前页面，跳转到应用内的某个页面
  uni.redirectTo({
    url: '/pagesMall/order/orderList?active=0'
  });
}
</script>
<style lang="scss" scoped>
.jieguo {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  overflow: hidden;
}

.place {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, .3), rgba(255, 255, 255, .5), #ffffff);
  z-index: 10;
}

.jieguo_box {
  width: 88%;
  background-color: #fff;
  height: 90vw;
  border-radius: 10rpx;
  box-shadow: 0rpx 0rpx 10rpx #999;
  z-index: 900;
  position: absolute;
  top: 190rpx;
  left: 50%;
  transform: translateX(-50%);
}

.success {
  text-align: center;
  margin-top: 50rpx;
  color: green;
}

.error {
  text-align: center;
  margin-top: 50rpx;
  color: #b20744;
}

.cancel {
  text-align: center;
  margin-top: 50rpx;
  color: #505050;
}


text {
  font-size: 140rpx;
}

.moneys {
  text-align: center;
  font-size: 72rpx;
  margin-top: 20rpx;
  font-weight: bold;
  color: v-bind(colors);
}

.jieguo .texts {
  margin-top: 20rpx;
}

.wancheng {
  width: 80%;
  height: 80rpx;
  border: 2rpx solid #3E7E8B;
  color: #3E7E8B;
  text-align: center;
  line-height: 80rpx;
  border-radius: 10rpx;
  margin: 110rpx auto 0;
  font-weight: bold;
}

.ewm {
  margin-top: 20rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  font-size: 24rpx;
  color: #999;
}
</style>
