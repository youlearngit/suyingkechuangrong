<template>
  <view class="after_type">
    <view class="goods_data">
      <image :src="item.pic" mode=""></image>
      <view class="right">
        <p class="goods_name">{{ item.goodsTitle }}</p>
        <p class="goods_sku">{{ SkuPrint(item.spData) }}</p>
        <p class="goods_price">
          <text :style="{color:colors}">￥{{ item.price }}</text>
          <text style="font-size: 24rpx;color: #333333;">数量 x {{ item.shopCount }}</text>
        </p>
      </view>
    </view>
    <!-- 分割线 -->
    <view class="place"></view>
    <!-- 选择退货类型 -->
    <view class="_type">
      <!-- 仅退款 -->
      <view class="type_list" @click="goTo(0)">
        <view class="type_left">
          <text class="iconfont icon-icon5 font"></text>
          <text class="type_text">仅退款</text>
        </view>
        <view class="type_right">
          <view class="left_p">
            <text style="text-align: right;">直接退款</text>
            <text style="color:#E1251B">支持7天无理由退货</text>
          </view>
          <image src="/static/images/home/right.png" mode=""></image>
        </view>
      </view>
      <!-- 退货 -->
      <view class="type_list" @click="goTo(1)">
        <view class="type_left">
          <image class="type_img" src="/static/images/after/tuihuo.png" mode=""></image>
          <text class="type_text">退货退款</text>
        </view>
        <view class="type_right">
          <view class="left_p">
            <text style="text-align: right;">退回收到的商品</text>
            <text style="color:#E1251B">支持7天无理由退货</text>
            <text style="color:#E1251B">(影响二次销售的不支持)</text>
          </view>
          <image src="/static/images/home/right.png" mode=""></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {SkuPrint} from "../../common/utils";
import {ref} from "vue";
import {GlobalStore} from "../../store";
import {onLoad} from "@dcloudio/uni-app";

const store = GlobalStore()
const colors = store.theme.color

const item = ref<Partial<Order.Item>>({})
onLoad((option: any) => {
  item.value = JSON.parse(decodeURIComponent(option.data)) as Order.Item;
})

const goTo = (type: number) => {
  const data = encodeURIComponent(JSON.stringify(item.value))
  uni.navigateTo({
    url: '/pagesMall/order/afterSale?type=' + type + "&data=" + data
  })
}

</script>

<style lang="scss" scoped>
.after_type {
  padding: 20rpx 0;
  background-color: #fff;
}

.font {
  color: #c92604;
  font-size: 50rpx;
}

.goods_data {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0 4%;

  image {
    width: 140rpx;
    height: 140rpx;
    border-radius: 8rpx;
  }

  .right {
    margin-left: 20rpx;
    width: 80%;

    .goods_name {
      font-size: 26rpx;
      font-weight: bold;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .goods_sku {
      font-size: 24rpx;
      color: #999999;
      margin-top: 5rpx;
    }

    .goods_price {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28rpx;
      color: #999;
      margin-top: 5rpx;
    }
  }
}

.place {
  height: 20rpx;
  width: 100%;
  margin-top: 20rpx;
  border-bottom: 2rpx dashed #EEEEEE;
}

._type {
  border-radius: 20rpx;
  box-shadow: 0rpx 0rpx 10rpx #DDDDDD;
  margin: 30rpx 4% 0;
  box-sizing: border-box;
  padding: 20rpx;

  .type_list {
    height: 152rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1rpx solid #EEEEEE;
    padding: 20rpx 0;

    &:last-of-type {
      border-bottom: none;
    }

    &:active {
      opacity: .8;
    }

    .type_left {
      display: flex;
      align-items: center;
      width: 250rpx;

      .type_img {
        width: 50rpx;
        height: 50rpx;
        display: block;
      }

      .type_text {
        font-size: 30rpx;
        font-weight: bold;
        color: #202020;
        margin-left: 20rpx;
      }
    }

    .type_right {
      display: flex;
      align-items: center;

      .left_p {
        margin-right: 10rpx;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        text {
          height: 30rpx;
          line-height: 30rpx;
          font-size: 24rpx;
          text-align: center;
          color: #999999;
        }
      }

      image {
        width: 40rpx;
        height: 40rpx;
        display: block;
        float: right;
      }
    }
  }
}
</style>
