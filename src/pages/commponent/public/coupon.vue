<template>
  <view class="bushiyon" @click="notUser" v-if="type">
    <text>不使用优惠劵</text>
  </view>
  <view :style="'padding-bottom: 30rpx;'+(type?'padding-top: 50rpx;':'')">
    <view v-for="(item, index) in couponList" :key="index" :class="(item.receive&&!type)||(type&&!item.canUse)?'ylq':''"
          class="coupon_box"
          @tap="onReceive(item)">
      <view class="left">
        <view class="left_top">
          <text class="iconfont icon-youhuiquanwenzi hui"></text>
          <text class="hui_name">{{ item.couponTitle }}</text>
        </view>
        <view class="left_bottom">
          <text>有效日期：{{ item.endTime }}</text>
        </view>
      </view>
      <view class="right">
        <view class="money">
          <template v-if="item.couponType==='DISCOUNT'">
            {{ item.discount }}折
          </template>
          <template v-if="item.couponType==='FULL'">
            {{ item.discount }}元
          </template>
        </view>
        <text>满{{ item.threshold }}可用</text>
      </view>
      <view class="bottom">
        <view v-if="item.scopeType==='ALL'">全场商品可用</view>
        <view v-else-if="item.scopeType==='GOODS'&&item.scopeNum===0">单品劵</view>
        <view v-else-if="item.scopeType==='GOODS'&&item.scopeNum>1">指定商品可用</view>
        <view v-else-if="item.scopeType==='CATEGORY'">指定分类可用</view>
        <view style="flex-shrink: 0" v-if="!type">
          <u-button :loading="item.loading" shape="circle" :disabled="item.receive" :color="colors"
                    :customStyle="{height:'40rpx',fontSize:'25rpx'}" @click="getCoupon(item)">
            {{ item.receive ? '已领取' : '领取' }}
          </u-button>
        </view>
        <view v-else>
          <u-tag v-if="!item.canUse" style="margin-right: 20rpx" type="error" plain size="mini" shape="circle"
                 text="不可用"></u-tag>
          <u-tag v-if="item.couponId===couponId" style="margin-right: 20rpx" plain size="mini" shape="circle"
                 text="已选择"></u-tag>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">

interface Props {
  colors: string;
  type?: boolean; //默认false
  couponId?: number;
  couponList?: Array<Promotion.Coupon>;
}


// 接收父组件参数并设置默认值
const props = withDefaults(defineProps<Props>(), {type: false, couponId: 0});


const emit = defineEmits(['onReceive'])
//领取-或者确定
const onReceive = (item: Promotion.Coupon) => {
  if (props.type) {
    if (!item.canUse) {
      uni.$u.toast('当前订单金额未满优惠劵使用要求！')
      return

    }
    emit('onReceive', item.couponId)
  }
}

const notUser = () => {
  emit('onReceive', 0)
}


//领取
const getCoupon = async (item: Promotion.Coupon) => {
  item.loading = true
  try {
    await uni.$u.http.post("/wx/getCoupon/" + item.couponId)
    item.receive = true
    uni.$u.toast('领取成功！')
  } finally {
    item.loading = false
  }
}

</script>
<style lang="scss" scoped>

.ylq {
  background: #e5e3e3;
}

.bushiyon {
  position: fixed;
  height: 60rpx;
  line-height: 65rpx;
  width: 100%;
  text-align: right;
  font-size: 30rpx;
  color: #999999;
  z-index: 33;
  background: #ffffff;

  text {
    margin-right: 30rpx;
  }
}

.coupon_box {
  margin: 20rpx;
  box-shadow: 0rpx 0rpx 10rpx #ddd;
  position: relative;
  border-radius: 10rpx;
  padding: 20rpx 20rpx 10rpx;
  overflow: hidden;
}

.coupon_box .left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  border-bottom: 1rpx solid #eee;
  padding-bottom: 20rpx;
  position: relative;
}

.coupon_box .left .hui {
  color: v-bind(colors);
  border-radius: 8rpx;
  font-size: 50rpx;
  text-align: center;
  display: inline-block;
  //transform: translateY(-5rpx);
}

.coupon_box .left .left_top {
  width: 80vw;
  font-size: 26rpx;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.left_top .hui_name {
  line-height: 60rpx;
  height: 60rpx;
  margin-left: 20rpx;
  display: inline-block;
  font-size: 28rpx;
}

.left_bottom {
  font-size: 24rpx;
  font-weight: 500;
  color: #333;
  height: 60rpx;
  line-height: 60rpx;
}

.coupon_box .right {
  position: absolute;
  right: 20rpx;
  top: 25rpx;
  text-align: center;
}

.coupon_box .right .money {
  font-size: 45rpx;
  margin-bottom: 10rpx;
}

.coupon_box .right text {
  font-size: 24rpx;
  color: #999;
}

.coupon_box .bottom {
  height: 60rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
  margin-top: 10rpx;
}

.coupon_box .bottom view {
  &:nth-child(1) {
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>