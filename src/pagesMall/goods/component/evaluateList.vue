<template>
  <view class="evaluate" v-if="goodsEva.length !== 0">
    <p class="eva_title">
      商品评价
      <text>({{ total }})</text>
      <text class="seeAll" @click="seeAll">查看全部</text>
    </p>
    <view class="evaluate_box">
      <view class="pingjia">
        <evaluate-info :colors="colors" v-for="item in goodsEva" :key="item.id" @showVideo="showVideo" :info="item"></evaluate-info>
      </view>
    </view>
    <!-- 预览视频弹窗APP 小程序 -->
    <video-pay ref="refVideoPay"></video-pay>
  </view>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import EvaluateInfo from "./evaluateInfo.vue";
import VideoPay from "../../order/evaluate/videoPay.vue";
import {GlobalStore} from "../../../store";
const store = GlobalStore()
const colors = store.theme.color;
let goodsId = 0
const total = ref(0)
const goodsEva = ref<Array<Order.Evaluate>>([])
//打开页面
const openView = async (id: number) => {
  goodsId = id
  const {data} = await uni.$u.http.get<App.ResPage<Order.Evaluate>>("/public/getGoodsEvaluate?pageSize=2&goodsId=" + goodsId)
  goodsEva.value = data.data //数据
  total.value = data.total
}
//跳转全部
const seeAll = () => {
  uni.navigateTo({
    url: "/pagesMall/goods/goodsEvaluate?goodsId=" + goodsId
  })
}
//播放视频
const refVideoPay = ref()
const showVideo = (url: string) => {
  refVideoPay.value.payVideo(url)
}

defineExpose({openView})
</script>

<style lang="scss" scoped>
// 商品评论
.evaluate {
  padding: 0 4%;
  border-top: 10rpx solid #ddd;

  .eva_title {
    height: 70rpx;
    margin-top: 10rpx;
    line-height: 70rpx;
    font-size: 30rpx;
    font-weight: bold;
    color: #202020;

    text {
      font-weight: normal;
    }

    .seeAll {
      float: right;
      font-size: 24rpx;
      color: #999999;

      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>
