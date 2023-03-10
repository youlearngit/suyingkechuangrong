<template>
  <view class="pingjia_box">
    <view class="box_top">
      <image :src="info.avatarUrl" mode="" class="head"></image>
      <view class="right">
        <p class="name">{{ info.nickName }}</p>
        <p class="p2">
          <text class="text1">{{ info.createdAt }}</text>
          <text class="text2">{{ info.spData }}</text>
        </p>
        <p class="p3">
          <u-rate readonly :activeColor="colors" v-model="info.score"></u-rate>
        </p>
      </view>
    </view>
    <view class="ping_neirong">{{ info.comment }}</view>
    <view class="img_box">
      <view class="img_list" v-for="(item, index) in images" :key="index">
        <block v-if="item.type === 1">
          <image :src="item.url" class="imgs" @click="previewImg(item.url)"></image>
        </block>
        <block v-if="item.type === 2">
          <video :src="item.url" :controls="false" :poster="item.poster" :show-center-play-btn="false"
                 :show-play-btn="false"
                 :enable-progress-gesture="false">
            <cover-view class="covers"></cover-view>
            <cover-image class="imgs" src="/static/images/search/bofang.png" @click="showVideo(item.url)"></cover-image>
          </video>
        </block>
      </view>
    </view>
    <!-- 回复 -->
    <view class="huifu" v-if="info.reply">商家回复：{{ info.reply }}</view>
  </view>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps<{ info: Order.Evaluate ,colors:string }>()
const images = ref<Array<{ type: number, url: string, poster?: string }>>()
const info = computed(() => {
  if (props.info) {
    images.value = JSON.parse(props.info.albumPics)
    return props.info
  }
})

//播放视频
const emit = defineEmits(["showVideo"])
const showVideo = (url: string) => {
  emit("showVideo", url)
}

const previewImg = (url: string) => { //预览图片
  let arr = []
  arr[0] = url
  uni.previewImage({
    urls: arr
  })
}
</script>

<style lang="scss" scoped>
.pingjia_box {
  overflow: hidden;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
  border-bottom: 1rpx solid #eeeded;

  .box_top {
    display: flex;

    .head {
      height: 80rpx;
      max-width: 80rpx;
      min-width: 80rpx;
      flex: 1;
      border-radius: 50%;
      float: left;
    }

    .right {
      flex: 1;
      margin-left: 20rpx;
      position: relative;

      .name {
        font-size: 26rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }

      .p2 {
        margin-top: 20rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: rgba(156, 156, 156, 1);
        display: flex;
        justify-content: space-between;
        align-items: center;

        .text2 {
        }
      }

      .p3 {
        height: 35rpx;
        position: absolute;
        right: 0;
        top: 0rpx;

        image {
          width: 35rpx;
          height: 35rpx;
          float: left;
          margin-left: 5rpx;
        }
      }
    }
  }

  .tag_box {
    margin-top: 20rpx;
    overflow: hidden;

    .tags {
      font-size: 22rpx;
      font-family: Source Han Sans CN;
      font-weight: 400;
      background-color: #FAEFF7;
      color: #FF546E;
      float: left;
      height: 50rpx;
      line-height: 50rpx;
      padding: 0 15rpx;
      border-radius: 25rpx;
      text-align: center;
      margin-right: 20rpx;
    }
  }

  .ping_neirong {
    font-size: 26rpx;
    margin-top: 5rpx;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    line-height: 50rpx;
  }

  .ping_img {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: space-between;
    margin-top: 10rpx;

    &::after {
      content: '';
      max-width: 29vw;
      min-width: 29vw;
    }

    image {
      max-width: 29vw;
      min-width: 29vw;
      height: 29vw;
      border-radius: 10rpx;
      margin-bottom: 20rpx;
    }
  }

  .huifu {
    padding: 20rpx;
    background-color: #f3f3f3;
    border-radius: 10rpx;
    margin-bottom: 10rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(77, 77, 77, 1);
  }
}

.img_box {
  overflow: hidden;

  .addImg {
    width: 184rpx;
    height: 184rpx;
    background: #f2f2f2;
    // background-color: pink;
    border-radius: 20rpx;
    overflow: hidden;
    transition: all 0.3s;

    image {
      width: 51rpx;
      height: 42rpx;
      display: block;
      margin: 45rpx auto 0;
    }

    view {
      font-size: 24rpx;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 94, 102, 1);
      text-align: center;
      margin-top: 20rpx;
    }

    &:active {
      transform: scaleX(0.96);
    }
  }
}

.img_list {
  width: 184rpx;
  height: 184rpx;
  float: left;
  margin-right: 20rpx;
  position: relative;
  overflow: hidden;
  margin-bottom: 20rpx;

  image, video {
    width: 100%;
    height: 100%;
    display: block;
  }

  video {
    position: relative;
    border-radius: 5rpx;
    overflow: hidden;

    .covers { //遮挡层
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 81;
    }

    .imgs {
      width: 72rpx;
      height: 72rpx;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 81;
      transform: translate(-50%, -50%);
    }

    .video_close {
      width: 40rpx;
      height: 40rpx;
      position: absolute;
      display: block;
      top: 6rpx;
      left: 6rpx;
      border-radius: 50%;
      z-index: 81;
    }
  }

  .close {
    width: 40rpx;
    height: 40rpx;
    position: absolute;
    box-sizing: border-box;
    top: 6rpx;
    left: 6rpx;
    border-radius: 50%;
  }
}

</style>
