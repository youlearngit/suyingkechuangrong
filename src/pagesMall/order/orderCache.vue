<!--订单缓存页面-->
<template>
  <view class="list_box">
    <scroll-view :scroll-y="true" :refresher-enabled="true" :scroll-with-animation="true" :lower-threshold="100"
                 :refresher-triggered="triggered"
                 :scroll-top="scrollTop"
                 @scrolltolower="scrollToLower"
                 @refresherrefresh="refresherRefresh"
    >
      <view v-for="(item) in orderList" :key="item.orderNo" class="lists">
        <order-item @refresh="refresherRefresh" :info="item" :colors="colors"></order-item>
      </view>
      <nodata :colors="colors" :loading="loading" :show="orderList.length===0" :count="orderList.length"
              title="订单"></nodata>
    </scroll-view>
  </view>
</template>

<script setup lang="ts" name="orderCache">
import Nodata from "../../pages/commponent/public/nodata.vue"
import OrderItem from "./orderItem.vue"

import {onMounted, ref} from "vue";
import {ResPage} from "../../common/interface";
import {onShow} from "@dcloudio/uni-app";

const props = defineProps({colors: String, status: Number})

const orderList = ref<Array<Order.Info>>([])

const loading = ref(true)
const params = {
  pageNum: 1,
  pageSize: 10
}
let dataTotal = 0//总页数

const scrollTop = ref(0)
const triggered = ref(false)//下拉刷新完成的操作
//触底
const scrollToLower = async () => {
  if (orderList.value.length < dataTotal) {
    params.pageNum++
    await loadData()
  }
}
//下拉刷新
const refresherRefresh = async () => {
  triggered.value = true
  params.pageNum = 1
  orderList.value = []
  await loadData()
  triggered.value = false //停止
}

//TODO 放onShow是为了刷新，其实放onMounted 更好，不然每次都刷新5个接口
onMounted(async () => {
  await loadData()
})
// onShow(async () => {
//   await loadData()
// })

const emit = defineEmits(['setCount'])
//加载数据
const loadData = async () => {
  loading.value = true
  const {data} = await uni.$u.http.get<ResPage<Order.Info>>("/wx/queryOrderByList", {
    data: {
      ...params,
      itemStatus: props.status! !== -1 ? props.status : '' //订单状态
    }
  })
  if (data.data) {
    orderList.value.push(...data.data)
  }
  dataTotal = data.total
  if (props.status! !== -1) {
    emit('setCount', props.status, data.total)
  }
  loading.value = false
}
</script>

<style lang="scss" scoped>

.list_box {
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  padding: 20rpx 3% 50rpx;
  margin-top: 80rpx;
  height: calc(100vh - 80rpx);

  scroll-view {
    height: 100%;
  }
}
</style>
