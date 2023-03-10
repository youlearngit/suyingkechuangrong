<template>
  <view>
    <view class="order">
      <!-- 收货地址 -->
      <view class="order_address">
        <image src="/static/images/home/bottom.png"></image>
        <view class="address_box">
          <view class="weizhi_icon">
            <text class="iconfont icon-dizhi" :style="'color:' + colors"></text>
          </view>
          <view class="center">
            <view class="name">
              <text class="text1">{{ info.consignee }}</text>
              <text class="phones">{{ info.shopUserMobile }}</text>
            </view>
            <view class="address_name">{{ info.address }}</view>
          </view>
        </view>
      </view>
      <!-- 商品详情 -->
      <view v-for="(item, index) in info.itemList" :key="index" class="goods">
        <view class="goods_data">
          <image :src="item.pic"></image>
          <view class="goods_title">
            <view class="g_name">
              {{ item.goodsTitle }}
            </view>
            <view class="goods_sku">
              {{ SkuPrint(item.spData) }}
            </view>
            <view class="price">
              <view class="t1" >
                <view :style="'color:' + colors">￥{{ item.price }}</view>
                <view class="t2">￥{{ item.originalPrice }}</view>
              </view>

              <view class="t3">
                x{{ item.shopCount }}
              </view>
            </view>
          </view>
        </view>
        <!--优惠券优惠-->
        <view class="morelist" v-if="item.couponDiscountPrice>0" style="border-bottom:none;height: 50rpx;">
          <view class="title">
            <text class="iconfont icon-youhuiquanwenzi hui"></text>
            <text class="promoTip">{{ item.couponTitle }}</text>
          </view>
          <view class="right_title" :style="'font-size:24rpx;line-height: 50rpx;color:' + colors ">
            减 {{ item.couponDiscountPrice }}元
          </view>
        </view>
        <!--促销优惠-->
        <view class="morelist" v-if="item.fullDiscountPrice>0" style="border-bottom:none;height: 50rpx;">
          <view class="title">
            <text class="iconfont icon-manjianquan hui"></text>
            <text class="promoTip">{{ item.promotionTitle }}</text>
          </view>
          <view class="right_title" :style="'font-size:27rpx;line-height: 50rpx;color:' + colors ">
            减 {{ item.fullDiscountPrice }}元
          </view>
        </view>
        <!-- 单商品操作按钮 在订单状态为待评价时才会显示-->
        <view class="goods_btns">
          <view class="status">
            {{ setStatus(item.itemStatus) }}
          </view>
          <view>
            <view class="btns" v-if="item.itemStatus===5||item.itemStatus===4||item.itemStatus===8"
                  @click="afterSale(item)">
              申请售后
            </view>
            <view class="btns" style="color: #212121" v-if="item.itemStatus>5&&item.itemStatus!==8"
                  @click="afterSaleShow(item)">
              查看售后
            </view>
            <view class="btns" v-if="item.itemStatus >= 4&&item.evaluateStatus===0" @click="onEvaluate(item)"
                  :style="{borderColor:colors,color:colors}">
              去评价
            </view>
          </view>
        </view>
      </view>
      <!-- 订单详情 -->
      <view class="order_more">
        <!--优惠卷-->
        <view class="morelist" v-if="info.couponDiscountPrice>0">
          <view class="title">
            <text class="iconfont icon-youhuiquanwenzi hui" style="margin-right: 10rpx"></text>
            <text>优惠劵</text>
          </view>
          <view class="right_title">
            <text class="iconfont icon-jian jian" :style="'color:' + colors"></text>
            ￥
            <text class="jian">{{ info.couponDiscountPrice }}</text>
          </view>
        </view>
        <!--促销-->
        <view class="morelist" v-if="info.fullDiscountPrice>0">
          <view class="title">
            <text class="iconfont icon-manjianquan hui" style="margin-right: 10rpx"></text>
            <text>促销满减</text>
          </view>
          <view class="right_title">
            <text class="iconfont icon-jian jian" :style="'color:' + colors"></text>
            ￥
            <text class="jian">{{ info.fullDiscountPrice }}</text>
          </view>
        </view>
        <view class="morelist">
          <text class="title">商品优惠后总价</text>
          <view class="right_title">
            ￥{{ info.totalAmount }}
          </view>
        </view>
        <view class="morelist">
          <view class="title">
            <text class="iconfont icon-yunfei hui" style="font-size: 35rpx;margin-right: 10rpx"></text>
            <text>运费</text>
          </view>
          <view class="right_title">
            ￥{{ info.deliveryPrice }}
          </view>
        </view>
        <view class="morelist">
          <text class="title">实付款</text>
          <view class="right_title" :style="'color:' + colors + ';'">
            ￥{{ (info.totalAmount || 0) + (info.deliveryPrice || 0) }}
          </view>
        </view>
        <view class="morelist">
          <text class="title">订单编号</text>
          <view class="right_title">
            {{ info.orderNo }}
            <text class="copy" @click="onCopy(info.orderNo)">复制</text>
          </view>
        </view>
        <view class="morelist">
          <text class="title">创建时间</text>
          <view class="right_title">
            {{ info.createdAt }}
          </view>
        </view>
        <view class="morelist">
          <text class="title">支付方式</text>
          <view class="right_title">
            {{ info.payMethod === 1 ? '微信支付' : '余额支付' }}
          </view>
        </view>
        <view class="morelist" v-if="info.logisticsNo">
          <text class="title">物流信息</text>
          <view class="right_title">
            {{ info.logisticsName }} {{ info.logisticsNo }}
            <text class="copy" @click="onCopy(info.logisticsNo)">复制</text>
          </view>
        </view>
        <view class="tips">
          <view class="tips_name">备注信息</view>
          <view class="textarea_box">
            <textarea placeholder="请输入备注信息" disabled="true" placeholder-class="font-size: 24rpx" maxlength="-1"
                      v-model="info.buyerMsg"></textarea>
          </view>
        </view>
      </view>
      <view class="bottom_btn">
        <block v-if="info.status === 0">
          <view class="moneys">
            合计:
            <text :style="'color:' + colors + ';'">￥{{ info.totalAmount }}</text>
          </view>
          <view class="btns" :style="'color:' + colors +';margin-right:20rpx'"
                @tap="cancelOrder">
            取消订单
          </view>
          <view class="btns" @click="goToPay" :style="'background:' + colors + ';'">
            继续支付
          </view>
        </block>
        <block v-if="info.status === 2">
          <view class="btns" :style="'color:' + colors + ';border:1rpx solid ' + colors " @tap="cancelOrder">
            申请退款
          </view>
        </block>
        <block v-if="info.status === 3">
          <view class="btns" :style="'color:' + colors + ';margin-right:20rpx'"
                @tap="goToLogistics">
            查看物流
          </view>
          <view class="btns" @click="orderSign" :style="'background:' + colors + ';'">
            确认收货
          </view>
        </block>
        <block v-if="info.status === 4">
          <!--          <view class="btns shouhou" @click="jumpSale">退款/售后</view>-->
          <view class="btns" :style="'background:' + colors + ';margin-left:20rpx;'">再次购买</view>
        </block>
        <block v-if="info.status === 5">
          <view class="btns shouhou" @click="delOrder">删除订单</view>
        </block>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">

import {onLoad, onShow} from "@dcloudio/uni-app";
import {GlobalStore} from "../../store";
import {ref} from "vue";
import {SkuPrint} from "../../common/utils"
import useRouter from "../../hooks/useRouter";
import {UserStore} from "../../store/modules/user";
import {setStatus} from "./orderUtils"

const store = GlobalStore()
const colors = store.theme.color//颜色
const info = ref<Partial<Order.Info>>({})
let orderId = 0;
onLoad((options: any) => {
  orderId = options.orderId
})
//展示页面的时候就刷新
onShow(async () => {
  //查询订单数据
  const {data} = await uni.$u.http.get<Order.Info>("/wx/getOrderInfo/" + orderId)
  info.value = data
})

//取消订单
const cancelOrder = () => {
  uni.navigateTo({
    url: '/pagesMall/order/cancelOrder?orderId=' + info.value.orderId
  });
}

//申请售后
const onAfterSale = () => {

}

//复制
const onCopy = (value: string) => {
  uni.setClipboardData({
    data: value,
    success: function () {
      uni.showToast({
        title: '复制成功',
        icon: 'none'
      })
    }
  })
}

//去评价
const onEvaluate = (item: Order.Item) => {
  const data = encodeURIComponent(JSON.stringify(item))
  uni.navigateTo({
    url: `/pagesMall/order/evaluate/evaluate?data=${data}`
  })
}

//申请售后
const afterSale = (item: Order.Item) => {
  const data = encodeURIComponent(JSON.stringify(item))
  uni.navigateTo({
    url: `/pagesMall/order/afterType?data=${data}`
  })
}
//查看售后记录
const afterSaleShow = async (item: Order.Item) => {
  const {data} = await uni.$u.http.get<Order.Refund>("/wx/getReturnOrder/" + item.itemId)
  const info = encodeURIComponent(JSON.stringify(data))
  uni.navigateTo({
    url: '/pagesMall/order/afterSale?show=true&type=' + data.returnType + "&data=" + info
  })
}

//查看物流
const goToLogistics = () => {
  uni.navigateTo({
    url: '/pagesMall/order/orderLogistics?orderId=' + info.value.orderId
  });
}

//签收
const orderSign = () => {
  uni.showModal({
    cancelColor: '#999',
    confirmColor: colors,
    title: '签收确认',
    content: '当前商品是否已收到！',
    success: async (res) => {
      if (res.confirm) {
        const {data} = await uni.$u.http.post("/wx/orderSign/" + info.value.orderId)
        uni.$u.toast("签收成功")
        const userStore = UserStore()
        await userStore.updateAccount()//更新账户信息
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/tabbar/user/user'
          });
        }, 300)
      }
    }
  });
}

const router = useRouter()
//去支付
const goToPay = async () => {
  uni.showModal({
    cancelColor: '#999',
    confirmColor: colors,
    title: '付款确认',
    content: '是否支付当前订单！',
    success: async (res) => {
      if (res.confirm) {
        const {data} = await uni.$u.http.post("/wx/payOrder/" + info.value.orderId)
        if (info.value.payMethod === 1) {
          await router.GoToWechatPay(data)
        } else {
          uni.$u.toast("支付成功")
          uni.navigateTo({
            url: '/pagesMall/order/orderList?active=1'
          });
        }
      }
    }
  });
}
</script>
<style lang="scss" scoped>
page {
  background-color: #F9F9F9;
}

.hui {
  color: v-bind(colors);
  font-size: 45rpx;
}

.promoTip {
  font-weight: normal;
  font-size: 22rpx;
}

.order {
  padding: 20rpx 4%;
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
  padding: 20rpx 20rpx 10rpx;
}

.goods_data {
  width: 100%;
  display: flex;
}

.goods_data image {
  width: 170rpx;
  height: 170rpx;
  display: block;
  flex-shrink: 0;
  border-radius: 10rpx;
}

.goods_title {
  margin-left: 20rpx;
  height: 170rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
}

.goods_title .price {
  width: 100%;
  display: flex;
  align-items: center;
  height: 40rpx;
  position: relative;
}

.goods_title .price .t1 {
  font-size: 32rpx;
  width: 200rpx;
  display: flex;
}

.goods_title .price .t2 {
  font-size: 24rpx;
  margin-left: 15rpx;
  line-height: 45rpx;
  display: block;
  text-decoration:line-through;
  color: #999;
}

.goods_title .price .t3 {
  float: right;
  font-size: 26rpx;
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
  font-size: 24rpx;
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

.order_more {
  padding: 0 2%;
  margin-top: 20rpx;
  background-color: #fff;
  box-shadow: 0rpx 0rpx 10rpx #ddd;
  border-radius: 10rpx;
}

.morelist {
  height: 70rpx;
  line-height: 70rpx;
  display: flex;
  align-items: center;
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
}

.morelist .right_title {
  color: #999;
  font-size: 26rpx;
}

.morelist .copy {
  font-size: 22rpx;
  color: #888;
  background-color: #eee;
  height: 50rpx;
  line-height: 50rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  margin-left: 20rpx;
  display: inline-block;
}

.goods_btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5rpx;
  margin-bottom: 5rpx;

  & > view {
    display: flex;
    justify-content: space-around;
  }

  .status {
    font-size: 25rpx;
    font-weight: bold;
    color: v-bind(colors);
    margin-top: 5rpx;
  }

  .btns {
    font-size: 24rpx;
    text-align: center;
    color: #999999;
    padding: 5rpx 15rpx;
    border-radius: 8rpx;
    box-sizing: border-box;
    border: 1px silver solid;
    margin-left: 20rpx;
  }
}

.tips {
  margin-bottom: 110rpx;
  padding: 10rpx 0 20rpx;
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
  height: 110rpx;
  width: calc(100vw - 60rpx);
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  padding: 0 30rpx;
  z-index: 100;
}

.bottom_btn .moneys {
  font-size: 32rpx;
  line-height: 100rpx;
  margin-right: 100rpx;
}

.bottom_btn .btns {
  font-size: 26rpx;
  height: 50rpx;
  line-height: 50rpx;
  padding: 0 20rpx;
  text-align: center;
  border-radius: 8rpx;
  margin-top: 20rpx;
  color: #FFFFFF;
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

.shop {
  padding: 20rpx;
  display: flex;
  justify-content: flex-start;
  position: relative;
  background-color: #fff;
  box-shadow: 0rpx 0rpx 10rpx #ddd;
  border-radius: 10rpx;
}

.shop .shop_img {
  width: 120rpx;
  height: 120rpx;
  display: block;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 8rpx;
}

.shop_center {
  overflow: hidden;
  margin-left: 20rpx;
}

.shop_center .shop_name {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
}

.shop_center .shop_address {
  font-size: 24rpx;
  color: #333;
  margin-top: 40rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.shoucang {
  width: 80rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 20rpx;
  top: 50%;
  transform: translateY(-50%);
}

.shoucang .sc_icons text {
  font-size: 45rpx;
  color: #999;
}

.shoucang .sc_text {
  font-size: 22rpx;
  color: #333;
  font-weight: bold;
}

.shouhou {
  border: 1rpx solid #ddd;
  color: #999 !important;
  font-weight: normal !important;
}
</style>
