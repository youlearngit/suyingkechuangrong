<template>
 <view class="notice">
    <view class="left_icon">
      <u-icon size="20" name="volume" :color="colors"></u-icon>
    </view>
    <view class="right_notice">
      <swiper class="notice_swiper" vertical easing-function="easeInOutCubic" autoplay interval="8000">
        <swiper-item v-for="(item,index) in noticeList"  @click="swiperClick(index)"  :key="index" class="sw_item">
          <text class="sw_text">{{ item }}</text>
          <image class="sw_image" src="/static/images/home/right.png"></image>
        </swiper-item>
      </swiper>
    </view>
</view>
</template>

<script setup lang="ts">
import {ref,computed} from "vue";
import {HomeStore} from "../../../store/modules/home";
import useRouter from "../../../hooks/useRouter";

defineProps<{ colors: string }>();
//数据
const homeStore = HomeStore()
//轮播图
const noticeList = computed(() => {
  if (homeStore.advertList) {
    return homeStore.advertList.filter(p => p.advertType === 2).map(p => {
      return p.title
    })
  } else {
    return []
  }
})
const router=useRouter()
//点击跳转
const swiperClick = (e: number) => {
  router.GoToByAdvert(homeStore.advertList.filter(p => p.advertType === 2)[e])
}

</script>
<style lang="scss" scoped>
.notice{
  height: 80rpx;
  line-height: 80rpx;
  margin: 15rpx 3% 0;
  padding: 0 10rpx;
  box-shadow: 0rpx 0rpx 10rpx #eee;
  border-radius: 8rpx;
}
.left_icon{
  height: 100%;
  width: 10%;
  float: left;
  padding-top: 3rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.right_notice{
  float: left;
  width: 90%;
}
.right_notice .notice_swiper{
  height: 80rpx;
}
.notice_swiper .sw_item{
  height: 80rpx;
}
.notice_swiper .sw_item .sw_text{
  font-size: 24rpx;
  color: #333;
  display: inline-block;
}
.notice_swiper .sw_image{
  width: 40rpx;
  height: 40rpx;
  float: right;
  margin-top: 20rpx;
}
</style>
