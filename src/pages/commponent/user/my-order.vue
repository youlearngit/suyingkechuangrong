<template>
  <view class="my_order">
    <list-cell icons="icon-order01" linkUrl="/pagesMall/order/orderList?active=0" :colors="colors">全部订单
    </list-cell>
    <view class="order_btnbox">
      <view v-for="(item, index) in orderText" :key="index" class="order_btns" @tap="jumpOrder(item,index)">
        <view style="position: relative">
          <u-badge :absolute="true" :bgColor="colors" shape="horn" color="#fff" :offset="[-10,-18]" max="99"
                   :value="info['order_'+item.status]"></u-badge>
          <text :class="'iconfont ' + item.icon" :style="'color:' + colors"></text>
        </view>
        <view style="color:#666">{{ item.name }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import ListCell from "./list-cell";
import {AccountInfo} from "../../../common/userApi";
import useAuth from "../../../hooks/useAuth";

interface Props {
  colors: string,
  info: AccountInfo
}

const props = withDefaults(defineProps<Props>(), {})

const auth = useAuth();
const jumpOrder = async (item: any, index: number) => {
  const flag = await auth.isLogin() //如果没登陆就不进行页面跳转的
  //如果不满足登陆就不执行页面跳转
  if (!flag) return
  if (index < 4) {
    uni.navigateTo({
      url: '/pagesMall/order/orderList?active=' + (index + 1)
    });
  }else {
    uni.navigateTo({
      url: '/pagesMall/order/afterSaleList?active=1'
    });
  }
}

const orderText = [{
  name: '待付款',
  icon: 'icon-daifukuan',
  url: '',
  status: 0
}, {
  name: '待发货',
  icon: 'icon-31daifahuo',
  url: '',
  status: 2
}, {
  name: '待收货',
  icon: 'icon-daishouhuo',
  url: '',
  status: 3
}, {
  name: '待评价',
  icon: 'icon-daipingjia',
  url: '',
  status: 4
}, {
  name: '售后',
  icon: 'icon-shouhou',
  url: '/pages/views/order/afterSaleList',
  status: 100
}]

</script>
<style lang="scss" scoped>
.my_order {
  background-color: #fff;
  margin-bottom: 20rpx;
}

.order_btnbox {
  display: flex;
  align-items: center;
}

.order_btns {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 10rpx 0 20rpx;
  padding: 20rpx 0 10rpx;
  font-size: 24rpx;
  color: #75787d;
  line-height: 40rpx;
}

</style>
