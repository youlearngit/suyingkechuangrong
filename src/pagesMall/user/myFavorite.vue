<template>
  <!-- 我的足迹 -->
  <view>
    <view class="mycollection">
      <view class="cart_box">
        <view v-for="(item, index) in list" :key="index" class="cart_list" @tap="toDetails(item)">
          <view class="cover">
            <image :src="item.pic" mode="aspectFill"></image>
            <text class="mask" v-if="item.publishStatus === 1">已失效</text>
          </view>
          <view class="right">
            <view class="goods_name">
              {{ item.goodsTitle }}
            </view>
            <view class="sku">
              收藏时间：{{ item.createdAt }}
            </view>
            <view class="numbers">
              <text class="price">
                ￥{{ item.price }}
              </text>
              <text class="browse">
                ￥{{item.originalPrice}}
              </text>
            </view>
          </view>
        </view>
        <nodata :colors="colors" :loading="loading" :show="list.length===0" :count="list.length" title="收藏"></nodata>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Nodata from "../../pages/commponent/public/nodata.vue"
import { ref} from "vue";
import {GlobalStore} from "../../store";
import useRouter from "../../hooks/useRouter";
import {usePageData} from "../../hooks/usePageData";

const store = GlobalStore()
const colors = store.theme.color;
const params=ref({}) //格外参数
const {list, loading} = usePageData<Wechat.GoodsHistory>("/wx/getMyFavorite",params)
const {GoToDetails} = useRouter()

const toDetails=(item:Wechat.GoodsHistory)=>{
  if(item.publishStatus===1){
    uni.$u.toast('商品已下架！')
    return
  }
  GoToDetails(item.goodsId)
}
</script>
<style scoped lang="scss">
.mycollection {
  padding: 10rpx 4%;
}

.cart_box {
  margin-top: 20rpx;
  padding-bottom: 100rpx;
}

.cart_list {
  width: 92vw;
  height: calc(22vw + 34rpx);
  border-radius: 12rpx;
  box-shadow: 0px 4rpx 16rpx rgba(0, 0, 0, .1);
  z-index: 4;
  overflow: hidden;
  border: 0;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 20rpx;
}

.cart_list .checkbox-box {
  padding-left: 16rpx;
  flex-shrink: 0;
  height: 22vw;
  margin-right: 16rpx;
  align-items: center;
  position: relative;
  width: 50rpx;
}

.cart_list .checkbox-box .checkbox {
  width: 28rpx;
  height: 28rpx;
  border-radius: 100%;
  border: solid 1rpx;
  position: absolute;
  top: 50%;
  left: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
}

.cart_list .checkbox-box .checkbox .on {
  width: 20rpx;
  height: 20rpx;
  border-radius: 100%;
  align-items: center;
}

.cart_list .cover {
  width: 22vw;
  height: 22vw;
  flex-shrink: 0;
  margin-left: 10rpx;
  border-radius: 8rpx;
  overflow: hidden;
  margin-right: 20rpx;
  position: relative;
  .mask{
    position: absolute;
    background: rgba(0,0,0,0.6);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26rpx;
    color: #faf9f9;
  }
}

.cart_list .cover image {
  width: 100%;
  height: 100%;
  display: block;
}

.daodi {
  text-align: center;
  font-size: 24rpx;
  color: #ccc;
  margin-top: 30rpx;
}

.right {
  height: 22vw;
  width: 100%;
  /* overflow: hidden; */
  display: flex;
  flex-wrap: wrap;
  padding-right: 15rpx;
  position: relative;
}

.right .goods_name {
  width: 100%;
  font-size: 24rpx;
  line-height: 34rpx;
  max-height: 68rpx;
  color: #333;
  overflow: hidden;
  font-weight: bold;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.sku {
  font-size: 24rpx;
  height: 50rpx;
  line-height: 50rpx;
  color: #a7a7a7;
  margin-bottom: 40rpx;
}

.numbers {
  position: absolute;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50rpx;
  bottom: -5rpx;

  .browse {
    font-size: 22rpx;
    color: #999;
    margin-right: 20rpx;
    margin-left: 20rpx;
    text-decoration: line-through;
  }
}

.numbers .price {
  font-size: 30rpx;
  line-height: 50rpx;
  color: v-bind(colors);
}

.numbers .right_btn {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-right: 20rpx;
}

.right_btn .sub {
  width: 40rpx;
  height: 40rpx;
  font-size: 40rpx;
  background-color: #f3f3f3;
  border-radius: 4rpx;
  text-align: center;
  line-height: 40rpx;
}

.right_btn .sub:active {
  background-color: #f8f8f8;
}

.right_btn .input {
  width: 50rpx;
  height: 50rpx;
  margin: 0 8rpx;
  background-color: #f3f3f3;
}

.right_btn .input input {
  width: 50rpx;
  height: 50rpx;
  display: flex;
  font-size: 22rpx;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.right_btn .add {
  width: 40rpx;
  height: 40rpx;
  font-size: 40rpx;
  background-color: #f3f3f3;
  border-radius: 4rpx;
  text-align: center;
  line-height: 40rpx;
}

.right_btn .add:active {
  background-color: #f8f8f8;
}

.del_mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -21;
}

.dask_del {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  z-index: -20;
  display: flex;
  align-items: center;
  opacity: 0;
  transition: all 0.3s;
}

.dask_del .del,
.cencal {
  width: 100rpx;
  height: 100rpx;
  display: flex;
  justify-content: center;
  line-height: 100rpx;
  border-radius: 100%;
  text-align: center;
  font-size: 24rpx;
  background: linear-gradient(#FF5D39, #FFAF48);
  color: #ffffff;
  font-weight: 500;
  margin: 0 auto;
}

.dask_del text:active {
  opacity: 0.9;
}

.cencal {
  background: linear-gradient(#FFE846, #FFCD43);
}
</style>
