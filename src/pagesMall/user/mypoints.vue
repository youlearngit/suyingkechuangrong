<template>
<view>
<view class="mypoints">
  <view class="top_box" :style="'background:' + colors">
    <view class="left">
      <view class="p1">总积分</view>
      <view class="p2">1273</view>
    </view>
    <view class="right">
      <view @tap="onexchange">
         兑换礼品
      </view>
    </view>
  </view>
  <view class="jilu">
    <view class="jilu_title">
      <view class="place" :style="'background:' + colors"></view>
      <view class="texts">消费记录</view>
    </view>
    <view class="jilu_box">
      <view v-for="(item, index) in logList" :key="index" class="jilu_list">
        <view class="list_left">
          <text style="color:#333">{{item.name}}</text>
          <text style="color: #999;font-size:24rpx">2020-08-025 19：52</text>
        </view>
        <view class="list_right" style="font-size:30rpx; color: #10D3EA" v-if="item.type == 0">+{{item.number}}</view>
        <view class="list_right" style="font-size:30rpx; color: #EC1818" v-if="item.type == 1">-{{item.number}}</view>
      </view>
      <view class="daodi" v-if="logList.length >= 5">—— 到底啦 ——</view>
      <nodata :colors="colors" title="暂无消费记录" v-if="logList.length == 0"></nodata>
    </view>
  </view>
</view>
<loading v-if="isShow == true"></loading>
</view>
</template>

<script>
var app = getApp();
import loading from "../../commponent/public/loading";
export default {
  data() {
    return {
      logList: [{
        name: '购买商品',
        type: 0,
        number: 18
      }, {
        name: '兑换商品',
        type: 1,
        number: 18
      }, {
        name: '兑换商品',
        type: 1,
        number: 18
      }, {
        name: '兑换商品',
        type: 1,
        number: 18
      }, {
        name: '兑换商品',
        type: 1,
        number: 18
      }, {
        name: '兑换商品',
        type: 1,
        number: 18
      }],
      isShow: true,
      colors: ""
    };
  },

  components: {
    loading
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      colors: app.globalData.newColor
    });
    uni.setNavigationBarColor({
      backgroundColor: app.globalData.newColor,
      frontColor: '#ffffff'
    });
    setTimeout(() => {
      this.setData({
        isShow: false
      });
    }, 600);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    onexchange() {
      uni.navigateTo({
        url: '/pages/views/user/exchange/exchange'
      });
    }

  }
};
</script>
<style lang="scss" scoped>
.mypoints{
  padding-bottom: 20rpx;
}
.top_box{
  width: 100vw;
  height: 28vw;
  display: flex;
  justify-content: space-between;
  padding: 0 4%;
  align-items: center;
}
.top_box .left .p1{
  font-size: 26rpx;
  color: #fff;
  line-height: 60rpx;
}
.top_box .left .p2{
  font-size: 36rpx;
  color: #fff;
  line-height: 80rpx;
}
.top_box .right{
  display: flex;
}
.top_box .right view{
  height: 60rpx;
  line-height: 60rpx;
  padding:0 20rpx;
  color: #fff;
  border: 1rpx solid #fff;
  border-radius: 40rpx;
  margin-top: 60rpx;
}
.jilu{
  margin: 0 4%;
  padding: 20rpx;
  box-shadow: 0rpx 0rpx 10rpx #aaa;
  border-radius: 10rpx;
  margin-top: 20rpx;
}
.jilu_title{
  display: flex;
  height: 80rpx;
  line-height: 80rpx;
  align-items: center;
  border-bottom: 1rpx solid #eee;
}
.jilu_title .place{
  width: 10rpx;
  height: 50rpx;
  background-color: #3E7E8B;
  margin-right: 20rpx;
  border-radius: 15rpx;
}
.jilu_title .texts{
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
}
.jilu_box{
  min-height: 220rpx;
  padding-bottom: 20rpx;

}
.jilu_box .jilu_list{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
}
.jilu_list text{
  display: block;
  height: 50rpx;
  line-height: 50rpx;
}
.daodi{
  text-align: center;
  color: #ccc;
  font-size: 24rpx;
  margin-top: 20rpx;
}
</style>
