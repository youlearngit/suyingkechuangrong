<template>
  <view class="suspension">
    <view :class="showSever === true ? 'topon' : 'top'">
      <view class="serve" v-for="(item,index) in iconList" :key="index" @tap="jumpServer(item)">
        <text :class="['iconfont',item.icon ]"></text>
      </view>
    </view>
    <view class="bottom">
      <view class="serve" :style="'background-color:' + colors" @click="showSever=!showSever">
        <text class="iconfont icon-fuwu"></text>
      </view>
    </view>
  </view>
  <view class="ontop" v-show="scrollShow" @tap="goTop">
    <image src="/static/images/home/TOP.png" class="top_img"></image>
  </view>
</template>

<script setup lang="ts">
// uni.$on('onPageScroll', function(data) {
//   console.log("页面滚动了")
//   console.log(data);
//   that.scrollTop = data;
// });

import {ref} from "vue";

defineProps<{ scrollShow: boolean, colors: string }>();

const showSever = ref(false);
const iconList = [{
  icon: 'icon-sousuo',
  name: '搜索',
  link: '/pages/views/home/search'
},
  {
    icon: 'icon-kefu1',
    name: '客服',
    link: '',
    tel: '123456'
  }
]


const jumpServer = (item:any) => { //跳转
  if (showSever.value == false) {
    return
  }
  if (item.link !== '') {
    uni.navigateTo({
      url: item.link
    })
  } else { //拨打电话
    uni.makePhoneCall({
      phoneNumber: item.tel
    })
  }
}

const goTop = () => { //回到顶部
  uni.pageScrollTo({
    scrollTop: 0
  });
}

</script>
<style scoped lang="scss">
.suspension {
  position: fixed;
  bottom: 12vh;
  right: 3%;
  width: 80rpx;
  z-index: 200;
}

.suspension .top {
  width: 100%;
  padding-bottom: 20rpx;
  transition: all 0.3s;
  transform: scale(0.1) translateY(90%);
  opacity: 0;
  z-index: -100;

  .serve {
    width: 0rpx;
    height: 0rpx;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-radius: 50%;
    margin-bottom: 20rpx;
  }
}


.ontop{
  position: fixed;
  bottom: 100rpx;
  right: 30rpx;
}

.topon {
  width: 100%;
  transition: all 0.3s;
  opacity: 1;
  transform: none;
  z-index: 100;

  .serve {
    width: 70rpx;
    height: 70rpx;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-radius: 50%;
    margin-bottom: 20rpx;
  }
}

.suspension .bottom .serve {
  width: 70rpx;
  height: 70rpx;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 50%;
  margin-bottom: 20rpx;
}

.suspension .serve:active {
  opacity: 0.8;
}

.serve .iconfont {
  font-size: 32rpx;
  display: block;
  text-align: center;
  line-height: 70rpx;
}

.ontop {
  width: 70rpx;
  height: 70rpx;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  transition: all 0.3s;
}

.ontop:active {
  opacity: 0.8;
}

.ontop .top_img {
  width: 45rpx;
  height: 45rpx;
  display: block;
  margin: 0 auto;
  padding-top: 15rpx;
  overflow: hidden;
}
</style>
