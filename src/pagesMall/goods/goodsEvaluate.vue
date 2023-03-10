<template>
  <view class="content">
    <!-- 商品评价 -->
    <view class="evaluate">
      <!-- 评价列表 -->
      <view class="my_evaluate">
        <view class="evaluate_box">
          <view class="pingjia">
            <evaluate-info  :colors="colors" v-for="(item, index) in list" @showVideo="showVideo" :key="index"
                           :info="item"></evaluate-info>
            <nodata :colors="colors" :loading="loading" :show="list.length===0" :count="list.length"
                    title="商品评价"></nodata>
          </view>
        </view>
      </view>
      <!-- 预览视频弹窗APP 小程序 -->
      <video-pay ref="refVideoPay"></video-pay>
    </view>
  </view>
</template>

<script setup lang="ts">
import Nodata from "../../pages/commponent/public/nodata.vue"
import {ref} from "vue";
import {usePageData} from "../../hooks/usePageData";
import {onLoad} from "@dcloudio/uni-app";
import EvaluateInfo from "./component/evaluateInfo.vue";
import VideoPay from "../order/evaluate/videoPay.vue";
import {GlobalStore} from "../../store";

const store = GlobalStore()
const colors = store.theme.color;

onLoad((option) => {
  params.value.goodsId = option.goodsId as unknown as number
})
const params = ref({goodsId: 0}) //参数
const {list, loading} = usePageData<Order.Evaluate>("/public/getGoodsEvaluate", params)

//播放视频
const refVideoPay = ref()
const showVideo = (url: string) => {
  refVideoPay.value.payVideo(url)
}
</script>

<style lang="scss" scoped>
view.content {
  padding: 0 4%;
}
</style>
