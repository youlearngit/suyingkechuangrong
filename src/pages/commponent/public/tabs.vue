<template>
<view class="tabs">
    <view v-for="(item, index) in tabList" :key="index" class="tabs_list" @tap="setTabs(item,index)" :style="'color:' + (active === index ?colors :'') + ';font-weight:' + (active === index ?'bold' : '500')">
      <u-badge :absolute="true" :bgColor="colors" shape="horn" color="#fff" :offset="[0,1]" max="99" :value="item.count"></u-badge>
      {{item.name}}
      <view class="active" :style="'background:' + colors" v-if="active === index"></view>
    </view>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },
  components: {},
  props: {
    colors: {
      type: String
    },
    tabList: {
      type: Array
    },
    active: {
      type: Number,
      default: 0
    }
  },
  methods: {
    setTabs(item,index) {
      this.$emit('setTabs',item,index);
    }
  }
};
</script>
<style scoped lang="scss">
.tabs{
  height: 80rpx;
  line-height: 80rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
}
.tabs_list{
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  position: relative;
  color: #333;

  &:last-child{
    margin-right: 15rpx;
  }
}
.active{
  font-weight: bold;
  color: #DD4F42;
  width: 50rpx;
  height: 5rpx;
  border-radius: 20rpx;
  background-color: #DD4F42;
  position: absolute;
  bottom: 10rpx;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s;
}
</style>
