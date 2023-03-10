<template>
  <!--我的账户-->
  <view class="withdrawal">
    <view class="withdrawl_top">
      <image src="/static/images/user/qb.png"></image>
      <view class="money">{{ balance }}</view>
      <view class="tips">(我的账户余额)</view>
    </view>
    <view class="withdrawalrecord">
      <view v-for="(item, index) in list" :key="index" class="record_list">
        <view class="left">
          <view class="title">{{ item.title }}</view>
          <view class="msg">{{ item.type }}</view>
          <view class="time">{{ item.createdAt }}</view>
        </view>
        <view class="right">
          <text v-if="item.pm===0" class="jian">-{{ item.number }}</text>
          <text v-else class="jia">+{{ item.number }}</text>
          <text class="yuge">账户余额：{{ item.balance }}</text>
        </view>
      </view>
    </view>
    <nodata :colors="colors" :loading="loading" :show="list.length===0" :count="list.length" title="余额"></nodata>
  </view>
</template>

<script setup lang="ts">
import Nodata from "../../pages/commponent/public/nodata.vue"

import {GlobalStore} from "../../store";
import {ref} from "vue";
import {usePageData} from "../../hooks/usePageData";
import {onLoad} from "@dcloudio/uni-app";

const store = GlobalStore()
const colors = store.theme.color;
const params = ref({}) //格外参数
const {list, loading} = usePageData<Wechat.UserBill>("/wx/getMyBill", params)

const balance = ref(0)
onLoad((option: any) => {
  balance.value = Number(option.balance)
})

</script>
<style lang="scss" scoped>
.withdrawl_top {
  height: 300rpx;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  border-bottom: 20rpx #eae6e6 solid;
}

.withdrawl_top image {
  width: 160rpx;
  height: 130rpx;
  display: block;
  margin: 20rpx auto 0;
}

.withdrawl_top .money {
  text-align: center;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 50rpx;
  color: #FF4643;
  margin-top: 20rpx;
}

.withdrawl_top .tips {
  text-align: center;
  font-size: 24rpx;
  color: #7C7C7C;
  line-height: 50rpx;
}

//列表
.withdrawalrecord {

  .left {
    height: 120rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
  }
}

.record_list {
  padding: 10rpx 4%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1rpx solid #eee;
}

.record_list .title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.record_list .msg {
  font-size: 24rpx;
  color: #797676;
  height: 30rpx;
}

.record_list .time {
  font-size: 22rpx;
  color: #626161;
}

.record_list .right {
  font-size: 36rpx;
  font-weight: 500;
  display: flex;
  height: 90rpx;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  text.jia {
    color: #08702c;
  }

  text.jian {
    color: #FF4643;
  }

  text.yuge {
    color: #8f8f94;
    font-size: 26rpx;
  }
}
</style>