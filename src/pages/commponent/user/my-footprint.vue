<template>
  <view class="footprint">
    <list-cell icons="icon-liulanjilu-tianchong" linkUrl="/pagesMall/user/myFoot" :rightshow="true"
               :colors="colors">我的足迹
    </list-cell>
    <view class="footprint_box">
      <view class="nodata" v-if="logList.length === 0">
        <view>
          <text class="iconfont icon-zanwu1" :style="'color:' + colors"></text>
        </view>
        <view class="tips">先去浏览一些吧</view>
      </view>
      <scroll-view scroll-x class="footprint_scroll">
        <view v-for="(item, index) in logList" :key="index" @click="jumpNext(item)" class="scroll_box">
          <image :src="item.pic" mode="aspectFill"></image>
          <view>{{ item.goodsTitle }}</view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import ListCell from "./list-cell";
import {UserStore} from "../../../store/modules/user";
import {computed} from "vue";
import useRouter from "../../../hooks/useRouter";

defineProps({colors: String})

//足迹
const userStore = UserStore()
const logList = computed(() => {
  return userStore.footList
})

const router = useRouter()
const jumpNext = (item: Wechat.GoodsHistory) => {
  router.GoToDetails(item.goodsId)
}

</script>
<style lang="scss" scoped>
/*我的足迹*/
.footprint {
  background-color: #fff;
  margin-bottom: 20rpx;
}

.footprint .nodata {
  padding: 48rpx 0;
  text-align: center;
}

.footprint .nodata text {
  font-size: 40rpx;
}

.footprint .nodata .tips {
  font-size: 24rpx;
  color: #999;
  padding-top: 20rpx;
}

.footprint_scroll {
  width: auto;
  overflow-x: scroll;
  white-space: nowrap;
}

.scroll_box {
  width: 152rpx;
  background-color: #fff;
  margin-top: 10rpx;
  margin-left: 10rpx;
  border-radius: 8rpx;
  overflow: hidden;
  display: inline-block;

  &:last-child {
    margin-right: 10rpx;
  }
}

.scroll_box:active {
  opacity: 0.8;
}

.scroll_box image {
  width: 152rpx;
  height: 152rpx;
  display: block;
}

.scroll_box view {
  font-size: 24rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 40rpx;
  padding: 10rpx 5rpx;
  background: #f1f0f0;
}
</style>
