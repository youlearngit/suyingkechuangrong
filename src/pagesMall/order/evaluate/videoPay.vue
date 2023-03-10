<template>
  <!-- 预览视频弹窗 -->
  <view class="mask" v-if="showVideo === true" @touchmove.stop.prevent="showVideo=false" @click="showVideo=false">
    <view class="close">
      <image src="/static/images/home/close.png"></image>
    </view>
  </view>
  <view class="previewvideo" v-if="showVideo === true">
    <view class="videos">
      <video class="nowvideos" id="nowVideo" v-if="showVideo === true" :src="videoUrl" :autoplay="showVideo" :show-center-play-btn="true" :show-mute-btn="true" :show-fullscreen-btn="false"></video>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";

const videoUrl = ref("")
const showVideo = ref(false)

//播放视频
const payVideo = (url: string) => {
  videoUrl.value = url
  showVideo.value = true
}
defineExpose({payVideo})
</script>

<style lang="scss" scoped>

/* 预览视频弹窗 */
.mask {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .8);
  z-index: 890;
}

.previewvideo {
  width: 100vw;
  height: 100vw;
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  background-color: #000;
  z-index: 900;
  opacity: 1;
}

.close {
  display: flex;
  align-content: center;
  align-items: flex-end;
  position: absolute;
  top: 140rpx;
  right: 20rpx;
  z-index: 900;

  image {
    width: 30rpx;
    height: 30rpx;
    display: block;
    justify-content: center;
    margin-left: 30rpx;
    margin-bottom: 20rpx;
    border-radius: 50%;
    padding: 30rpx;
    background-color: rgba(0, 0, 0, 0.2);
  }
}

.videos {
  height: 100vw;
  width: 100vw;
  z-index: 13000;
  position: relative;

  video {
    width: 100%;
    height: 100%;
  }
}

.nowvideos {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

</style>
