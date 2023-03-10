<template>
  <view class="right_popup" catchtouchmove="true">
    <scroll-view :style="{marginTop:menuInfo.bottom,height:'calc(100vh - 150rpx - '+menuInfo.bottom+')'}">
      <view class="top_price">
        <text>价 格 区 间</text>
        <text :style="'color:' + colors">请输入价格区间</text>
      </view>
      <view class="input_box">
        <u-input shape="circle" type="number" v-model="queryParams.priceStart" placeholder="最低价"></u-input>
        <text>-</text>
        <u-input shape="circle" type="number" v-model="queryParams.priceEnd" placeholder="最高价"></u-input>
      </view>
      <view class="allClass">
        <view class="classtext">优惠劵</view>
        <view class="class_box">
          <!-- 选中分类条件 -->
          <view v-for="(row) in couponList" :key="row.id" class="class_tag"
                :style="'color:' + (queryParams.couponId===row.id? '#fff':'#333') + ';background:' + (queryParams.couponId===row.id ? colors:'') + ';border-color:' + (queryParams.couponId===row.id ? colors:'') + ';'"
                @click="setParam('couponId',row)">{{ row.title }}
          </view>
        </view>
      </view>
      <view class="allClass">
        <view class="classtext">促销活动</view>
        <view class="class_box">
          <!-- 选中分类条件 -->
          <view v-for="(row) in promotionList" :key="row.id" class="class_tag"
                :style="'color:' + (queryParams.promotionId===row.id? '#fff':'#333') + ';background:' + (queryParams.promotionId===row.id ? colors:'') + ';border-color:' + (queryParams.promotionId===row.id ? colors:'') + ';'"
                @click="setParam('promotionId',row)">{{ row.title }}
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="bottom_btn">
      <u-button shape="circle" :plain="true" :color="colors" text="重置" @click="onReset"></u-button>
      <u-button shape="circle" :color="colors" text="确定" @click="onEnter"></u-button>
    </view>
  </view>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";

defineProps<{ colors: string }>();
const menuInfo = {bottom: '30rpx'}
// #ifndef H5
const menu = uni.getMenuButtonBoundingClientRect()
menuInfo.bottom = menu.bottom + 'px'

// #endif
interface Item {
  id: number;
  title: string;
}

const couponList = ref<Item[]>([])
const promotionList = ref<Item[]>([])

const baseParams = {
  couponId: 0,
  promotionId: 0,
  priceStart: '',
  priceEnd: '',
}
//请求参数
const queryParams = ref<typeof baseParams>({...baseParams})

onMounted(async () => {
  const {data} = await uni.$u.http.get<{ couponList: Item[], promotionList: Item[] }>('/public/getPromotionList')
  couponList.value = data.couponList
  promotionList.value = data.promotionList
})

//设置参数
const setParam = (param: 'promotionId' | 'couponId', row: Item) => {
  if (queryParams.value[param] === row.id) {
    queryParams.value[param] = 0
  } else {
    queryParams.value[param] = row.id
  }
}

const emit = defineEmits(['setParams'])
const onReset = () => {
  queryParams.value = {...baseParams}
  emit('setParams', baseParams)
}
//确定
const onEnter = () => {
  emit('setParams', {...queryParams.value})
}

//更新参数
const updateParams = (param: string, data: number) => {
  queryParams.value[param] = data
}
defineExpose({updateParams})
</script>

<style lang="scss" scoped>
/* 右侧弹出框 */
.right_popup {
  width: 85%;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  background-color: #fff;
  z-index: 920;
  transition: all 0.3s;
}

.top_price {
  height: 80rpx;
  line-height: 80rpx;
  display: flex;
  padding: 0 20rpx;
}

.top_price text {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.input_box {
  padding: 0 30rpx;
  height: 60rpx;
  line-height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30rpx;
}

.input_box text {
  color: #999;
}

.input_box input {
  flex: 1;
  max-width: 45%;
  height: 100%;
  background-color: #F7F7F7;
  border-radius: 40rpx;
  box-sizing: border-box;
  text-align: center;
  font-size: 24rpx;
}

.allClass {
  margin-top: 50rpx;
  padding: 0 30rpx;
}

.allClass .classtext {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.allClass .class_box {
  margin-top: 30rpx;
  overflow: hidden;
}

.class_box .class_tag {
  height: 60rpx;
  line-height: 60rpx;
  padding: 0 20rpx;
  font-size: 26rpx;
  color: #333;
  border: 1rpx solid #999;
  text-align: center;
  border-radius: 30rpx;
  float: left;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
}

.bottom_btn {
  //height: 150rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;

  // #ifndef H5
  u-button {
    width: 40%;
  }
  // #endif

  // #ifdef H5
  .u-button {
    width: 250rpx;
  }
  // #endif
}

.tow_scroll {
  height: 80rpx;
  line-height: 80rpx;
  padding: 0 10rpx;
  white-space: nowrap;

  .scroll_tags {
    display: inline-block;
    background-color: #FFF8F5;
    color: #202020;
    height: 50rpx;
    line-height: 50rpx;
    padding: 0 25rpx;
    text-align: center;
    font-size: 24rpx;
    border-radius: 30rpx;
    margin: 0 10rpx;
  }
}
</style>
