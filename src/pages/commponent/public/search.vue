<template>
  <view class="search">
    <view class="input-box" @tap="jumpSearch">
      <view class="inputs" style="color:#c0c0c0;font-size:24rpx;">搜索关键词</view>
      <view class="icon search">
        <image src="/static/images/home/search.png" class="search_img"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: {},
  methods: {
    jumpSearch() {
      uni.navigateTo({
        url: `/pages/home/search`
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.search {
  z-index: 900;
}

.input-box {
  width: 100%;
  height: 60rpx;
  background-color: #f5f5f5;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 30rpx;
  z-index: 900;
}

.input-box .icon {
  display: flex;
  align-items: center;
  position: absolute;
  top: 10rpx;
  right: 20rpx;
  width: 40rpx;
  height: 40rpx;
  font-size: 32rpx;
  color: #c0c0c0;
}

.search .search_img {
  width: 40rpx;
  height: 40rpx;
  display: block;
}

.input-box .inputs {
  padding-left: 28rpx;
  line-height: 28rpx;
  font-size: 28rpx;
}
</style>
