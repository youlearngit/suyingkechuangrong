<template>
  <view class="nodata">
    <template v-if="loading === false&&show">
      <text class="iconfont icon-queshengye_zanwushuju" style="font-size: 200rpx" :style="'color:' + colors"></text>
      <view class="texts">
        暂无{{ title }}数据
      </view>
    </template>
    <template v-else>
      <u-loadmore v-if="count===0||count>9" style="margin-bottom: 30rpx" :status="loadingStatus"
                  :loading-text="'加载'+title+'数据'"
                  loadmore-text="到底了"
                  :line="!loading"
                  fontSize="15"
                  color="#999"
                  lineColor="#999"
                  nomore-text="到底了"
      />
    </template>
  </view>
<!--  <loading v-if="loading"></loading>-->
</template>

<script>
import loading from './loading'
export default {
  data() {
    return {};
  },
  components: {loading},
  props: {
    count:{
      type:Number,
      default:0,
    },
    title: {
      type: String,
      default: '数据'
    },
    loading: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    },
    colors: {
      type: String
    }
  },
  computed: {
    loadingStatus() {
      if (this.loading) {
        return "loading"
      }
    }
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.nodata {
  background: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.nodata .iconfont {
  display: inline-block;
  text-align: center;
  font-size: 160rpx;
  color: pink;
  width: 100%;
  margin-top: 50rpx;
}

.texts {
  margin-top: 10rpx;
  padding-bottom: 60rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  color: #9c9c9c;
  font-size: 24rpx;
  letter-spacing: 5rpx;
}
</style>
