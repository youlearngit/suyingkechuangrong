<template>
  <view class="order">
    <!-- 选择配送方式 -->
    <view class="mode" @tap="selectMode">
      <text class="text1">配送方式</text>
      <text class="text2" v-if="confirmOrder.deliveryMode">
        {{ confirmOrder.deliveryMode === 1 ? '物流寄送' : '到店自提' }}
      </text>
      <text class="text2" v-else>
        请选择配送方式
      </text>
      <image src="/static/images/home/right.png"></image>
    </view>
    <!-- 收货地址 -->
    <view class="order_address" v-if="confirmOrder.deliveryMode === 1">
      <image src="/static/images/home/bottom.png"></image>
      <view class="address_box" @tap="GoToAddress">
        <view class="weizhi_icon">
          <text class="iconfont icon-dizhi" :style="'color:' + colors"></text>
        </view>
        <block v-if="confirmOrder.address">
          <view class="center">
            <view class="name">
              <text class="text1">{{ confirmOrder.consignee }}</text>
              <text class="phones">{{ confirmOrder.shopUserMobile }}</text>
            </view>
            <view class="address_name">{{ confirmOrder.address }}</view>
          </view>
        </block>
        <view class="noaddress" v-else>
          请添加收货地址
        </view>
      </view>
    </view>
    <!-- 商品详情 -->
    <view v-for="(item, index) in goodsList" :key="index" class="goods">
      <view class="goods_data">
        <image :src="item.skuPic" mode="widthFix"></image>
        <view class="goods_title">
          <view class="g_name">
            {{ item.goodsTitle }}
          </view>
          <view class="goods_sku">
            <!-- 判断当前商品是否存在规格 -->
            <text style="margin-right: 10rpx;">{{ item.skuDetails }}</text>
          </view>
          <view class="price">
            <view class="t1" :style="'color:' + colors">￥{{ item.realPrice ? item.realPrice : item.price }}</view>
            <view class="t2">
              <text>￥{{ item.price }}</text>
            </view>
            <view class="t3">
              x{{ item.count }}
            </view>
          </view>
        </view>
      </view>
      <!--优惠券优惠-->
      <view class="morelist" v-if="item.couponDiscountPrice>0" style="border-bottom:none;height: 50rpx;">
        <view class="title">
          <text class="iconfont icon-youhuiquanwenzi hui"></text>
          <text class="promoTip">{{ confirmOrder.couponTitle }}</text>
        </view>
        <view class="right_title" :style="'font-size:24rpx;line-height: 50rpx;color:' + colors ">
          - {{ item.couponDiscountPrice }}元
        </view>
      </view>
      <!--促销优惠-->
      <view class="morelist" v-if="item.fullDiscountPrice>0" style="border-bottom:none;height: 50rpx;">
        <view class="title">
          <text class="iconfont icon-manjianquan hui"></text>
          <text class="promoTip">{{ item.promotionTitle }}</text>
        </view>
        <view class="right_title" :style="'font-size:27rpx;line-height: 50rpx;color:' + colors ">
          - {{ item.fullDiscountPrice }}元
        </view>
      </view>
    </view>
    <!-- 订单详情 -->
    <view class="order_more">
      <view class="morelist">
        <text class="title">商品总价</text>
        <view class="right_title">
          ￥{{ goodsTotal }}
        </view>
      </view>
      <!--优惠卷-->
      <view class="morelist" v-if="confirmOrder.couponList" @click="couponShow=true">
        <view class="title">
          <text class="iconfont icon-youhuiquanwenzi hui" style="margin-right: 10rpx"></text>
          <text>优惠劵</text>
        </view>
        <view class="right_title">
          <text v-if="!confirmOrder.totalCouponDiscountPrice">选择优惠劵</text>
          <template v-else>
            <text class="iconfont icon-jian jian" :style="'color:' + colors"></text>
            ￥
            <text class="jian">{{ confirmOrder.totalCouponDiscountPrice }}</text>
          </template>
        </view>
      </view>
      <!--促销-->
      <view class="morelist" v-if="confirmOrder.totalFullDiscountPrice>0">
        <view class="title">
          <text class="iconfont icon-manjianquan hui" style="margin-right: 10rpx"></text>
          <text>促销满减</text>
        </view>
        <view class="right_title">
          <text class="iconfont icon-jian jian" :style="'color:' + colors"></text>
          ￥
          <text class="jian">{{ confirmOrder.totalFullDiscountPrice }}</text>
        </view>
      </view>
      <!--运费-->
      <view class="morelist">
        <view class="title">
          <text class="iconfont icon-yunfei hui" style="font-size: 35rpx;margin-right: 10rpx"></text>
          <text>运费</text>
        </view>
        <view class="right_title">
          <text v-if="confirmOrder.deliveryPrice===0">免邮</text>
          <text v-else>￥{{ confirmOrder.deliveryPrice }}</text>
        </view>
      </view>
      <view class="morelist">
        <text class="title">商品实付款</text>
        <view class="right_title" :style="'color:' + colors + ';'">
          ￥{{ confirmOrder.totalAmount }}
        </view>
      </view>
      <!-- 支付方式 -->
      <view class="payMethod">
        <u-radio-group v-model="confirmOrder.payMethod" :activeColor="colors" placement="column">
          <view>
            <u-radio :customStyle="{marginBottom: '8px'}" label="微信支付" :name="1"></u-radio>
          </view>
          <view class="item">
            <u-radio :customStyle="{marginBottom: '8px'}" label="余额支付" :name="2"></u-radio>
            <text> ( 账户余额：{{ confirmOrder.balance }}元)</text>
          </view>
        </u-radio-group>
      </view>
      <view class="tips">
        <view class="tips_name">备注信息</view>
        <view class="textarea_box">
          <textarea placeholder="请输入备注信息" placeholder-class="font-size: 24rpx" v-model="confirmOrder.buyerMsg"
                    maxlength="-1"></textarea>
        </view>
      </view>
    </view>
    <view class="bottom_btn">
      <view class="moneys">
        合计:
        <text :style="'color:' + colors + ';'">￥{{
            (confirmOrder.totalAmount || 0) + (confirmOrder.deliveryPrice || 0)
          }}
        </text>
      </view>
      <view class="btns" :style="'background:' + colors + ';'" @tap="$u.throttle(submit, 500)">
        提交订单
      </view>
    </view>
    <!--选择优惠劵--->
    <u-popup :show="couponShow" mode="bottom" length="60%" :closeable="false" @close="couponShow=false"
             :mask-close-able="false">
      <scroll-view class="scrolls" scroll-y>
        <coupon :couponId="confirmOrder.couponId" :colors="colors" :type="true" :couponList="confirmOrder.couponList"
                @onReceive="onReceive"></coupon>
      </scroll-view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import Coupon from "../../pages/commponent/public/coupon";

import {onLoad, onShow} from "@dcloudio/uni-app";
import {computed, ref} from "vue";
import {GlobalStore} from "../../store";
import useRouter from "../../hooks/useRouter";
import {HomeStore} from "../../store/modules/home";
import {UserStore} from "../../store/modules/user";

const {GoToAddress} = useRouter()
const store = GlobalStore()
const colors = computed(() => {
  return store.theme.color
})
const homeStore = HomeStore()
//商品总价
const goodsTotal = computed(() => {
  if (goodsList.value.length > 0) {
    return goodsList.value.map((p) => p.price * p.count).reduce((s, p) => s + p)
  }
  return 0
})
//商品列表
const goodsList = ref<Array<Order.ConfirmItem>>([])
const confirmOrder = ref<Partial<Order.ConfirmOrder>>({couponList: [], payMethod: 2})
const couponShow = ref(false)

//设置优惠劵
const onReceive = (couponId: number) => {
  confirmOrder.value.couponId = couponId
  couponShow.value = false
  loadData()
}

let confirmData: any[] = []
//入口
onLoad(async (option: any) => {
  const item = JSON.parse(decodeURIComponent(option.data)); //下单确认请求
  let list = []
  if (option.type === '1') {
    list = item //数组提交
  } else {
    list.push(item) //对象-单个
  }
  //进入确认订单时候清空地址
  homeStore.receiveAddr = {}
  await loadAddress()
  confirmOrder.value.deliveryMode = 1//默认是快递
  confirmData = list //备用起来
  confirmOrder.value.list = list
  await loadData()
})

//刷新数据
const loadData = async () => {
  try {
    confirmOrder.value.list = confirmData
    const {data} = await uni.$u.http.post<Order.ConfirmOrder>("/wx/confirmOrderByList", confirmOrder.value)
    goodsList.value = data.list
    confirmOrder.value = data

  } catch (e) {
    setTimeout(() => {
      uni.navigateBack({delta: 1});//返回上页面
    }, 1000)
  }
}

const isGoToPay = ref(false) //是否跳转支付页面了
onShow(() => {
  if (isGoToPay.value) {
    uni.switchTab({
      url: '/pages/tabbar/user/user'
    });
    return
  }
  loadAddress()
})
const loadAddress = async () => {
  //加载收货地址
  const address = await homeStore.getReceiveAddr()
  confirmOrder.value.consignee = address.nickName
  confirmOrder.value.shopUserMobile = address.mobile
  confirmOrder.value.address = address.areas
  if (address.province !== confirmOrder.value.province) {
    //如果数据不一致又调用接口
    confirmOrder.value.province = address.province//发货省
    await loadData()
  }

}
//物流模式
const selectMode = () => {
  uni.showActionSheet({
    itemList: ['物流寄送'],
    success: (res) => {
      confirmOrder.value.deliveryMode = res.tapIndex + 1
      loadData()//刷新一次
    }
  });
}

const router = useRouter()
//提交订单
const submit = async () => {
  if (isGoToPay.value) {
    return
  }
  if (!confirmOrder.value.province) {
    uni.$u.toast('请选择收货地址！')
    return
  }
  confirmOrder.value.list = confirmData
  const {data} = await uni.$u.http.post<Order.PayContext>("/wx/createOrderByList", confirmOrder.value)
  isGoToPay.value = true
  uni.$u.toast('订单创建成功')
  //如果是微信支付
  if (confirmOrder.value.payMethod === 1) {
    //发起微信支付，如果返回信息没错误的话
    if (data.msg) {
      uni.$u.toast(data.msg)
      isGoToPay.value = false
      return
    }
    //跳转微信支付页面
    await router.GoToWechatPay(data)
  } else {
    //余额支付的
    await goToMy()
  }

}

//跳转我的
const goToMy = async () => {
  const userStore = UserStore()
  await userStore.updateAccount()//更新账户信息
  setTimeout(() => {
    uni.switchTab({
      url: '/pages/tabbar/user/user'
    });
  }, 300)
}


</script>
<style lang="scss" scoped>
.hui {
  color: v-bind(colors);
  font-size: 45rpx;
}

.promoTip {
  font-weight: normal;
  font-size: 22rpx;
}

page {
  background-color: #FFFFFF;
}

.order {
  padding: 20rpx 4%;
}

.jian {
  font-size: 40rpx;
  color: v-bind(colors);
  margin-right: 5rpx;
}

.mode {
  height: 80rpx;
  line-height: 80rpx;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 20rpx;
  border-radius: 10rpx;
  align-items: center;
  margin-bottom: 20rpx;
  box-shadow: 0rpx 0rpx 10rpx #ddd;
}

.payMethod {
  height: 140rpx;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 20rpx;
  border-radius: 10rpx;
  align-items: center;
  box-shadow: 0rpx 0rpx 10rpx #ddd;

  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 24rpx;
    color: #999999;
  }
}

.mode:active {
  background-color: #f5f5f5;
}

.mode .text1 {
  color: #999;
  font-size: 24rpx;
}

.mode .text2 {
  font-size: 24rpx;
  color: #333;
  display: block;
  width: 50%;
  font-weight: bold;
}

.mode image {
  width: 40rpx;
  height: 40rpx;
  display: block;
}

.order_address {
  height: 150rpx;
  width: 100%;
  background-color: #fff;
  border-radius: 10rpx;
  overflow: hidden;
  position: relative;
  box-shadow: 0rpx 0rpx 10rpx #ddd;
}

.order_address image {
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}

.address_box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  padding: 20rpx;
  display: flex;
  align-items: center;
}

.weizhi_icon text {
  font-size: 40rpx;
  margin-left: 10rpx;
}

.address_box .center {
  margin-left: 20rpx;
}

.address_box .center .name {
  height: 60rpx;
  line-height: 60rpx;
}

.address_box .center .name .text1 {
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
  display: inline-block;
  margin-right: 20rpx;
}

.phones {
  font-size: 24rpx;
  color: #999;
  z-index: 0;
}

.address_box .address_name {
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
}

.noaddress {
  margin-left: 40rpx;
  font-weight: bold;
  color: #333;
  font-size: 26rpx;
}

.goods {
  background-color: #fff;
  margin-top: 20rpx;
  box-shadow: 0rpx 0rpx 10rpx #ddd;
  border-radius: 10rpx;
  padding: 20rpx;
  padding-bottom: 10rpx;
}

.goods_data {
  width: 100%;
  display: flex;
  margin-bottom: 15rpx;
}

.goods_data image {
  min-width: 150rpx;
  max-width: 150rpx;
  height: 150rpx;
  display: block;
  border-radius: 10rpx;
}

.goods_title {
  margin-left: 20rpx;
  line-height: 40rpx;
  width: 100%;
}

.goods_title .price {
  width: 100%;
  display: flex;
  height: 35rpx;
  margin-top: 1rpx;
  position: relative;
}

.goods_title .price .t1 {
  font-size: 30rpx;
  font-weight: bold;
  display: block;
}

.goods_title .price .t2 {
  font-size: 24rpx;
  margin-left: 15rpx;
  display: block;
  color: #999;
  text-decoration: line-through;
}

.goods_title .price .t3 {
  float: right;
  font-weight: bold;
  font-size: 28rpx;
  color: #999;
  position: absolute;
  right: 0rpx;
  top: 0;
}

.goods_title .g_name {
  font-size: 26rpx;
  font-weight: bold;
  max-height: 80rpx;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.goods_title .goods_sku {
  color: #999;
  /* margin-top: 20rpx; */
  font-size: 25rpx;
}

.numbers {
  /* text-align: right; */
}

.shop {
  margin-top: 20rpx;
  font-size: 24rpx;
  color: #333;
  display: flex;
  align-content: center;
}

.shop .iconfont {
  margin-right: 20rpx;
}

.order_more {
  padding: 0 2%;
  margin-top: 20rpx;
}

.morelist {
  height: 80rpx;
  display: flex;
  justify-content: space-between;
  border-bottom: 1rpx dashed #eee;
}

.morelist .title {
  color: #333;
  font-size: 26rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.morelist .title .quan {
  font-size: 20rpx;
  width: 35rpx;
  height: 35rpx;
  line-height: 36rpx;
  text-align: center;
  border-radius: 8rpx;
  margin-right: 10rpx;
  align-items: center;
  color: #fff;
  flex-shrink: 0;
}

.morelist .right_title {
  color: #999;
  flex-shrink: 0;
  min-width: 50rpx;
  line-height: 80rpx;
}

.tips {
  padding: 10rpx 0;
  margin-bottom: 120rpx;
}

.tips .tips_name {
  font-size: 26rpx;
  font-weight: bold;
  line-height: 60rpx;
}

.textarea_box {
  min-height: 100rpx;
  border: 1rpx solid #eee;
  border-radius: 10rpx;
  padding: 20rpx;
}

.textarea_box textarea {
  font-size: 24rpx;
  height: 150rpx;
}

.bottom_btn {
  height: 100rpx;
  width: calc(100vw - 60rpx);
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  line-height: 100rpx;
  display: flex;
  justify-content: flex-end;
  padding: 0 30rpx;
  z-index: 100;
  font-weight: bold;
}

.bottom_btn .moneys {
  font-size: 38rpx;
  font-weight: bold;
  margin-right: 100rpx;
}

.bottom_btn .btns {
  font-size: 28rpx;
  color: #fff;
  height: 60rpx;
  line-height: 60rpx;
  padding: 0 25rpx;
  text-align: center;
  border-radius: 40rpx;
  margin-top: 20rpx;
  font-weight: bold;
}

/* 优惠券 */
.coupon {
  background-color: #fff;
  border-radius: 10rpx 10rpx 0 0;
  position: fixed;
  left: 0;
  bottom: -1000rpx;
  z-index: 150;
  transition: all 0.3s;
}

.coupon .buyong {
  line-height: 80rpx;
  padding: 0 4%;
  text-align: right;
  color: #999;
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  z-index: 10;
  opacity: 0.7;
}

.scrolls {
  width: 100vw;
  height: 55vh;
  z-index: 500;
}
</style>
