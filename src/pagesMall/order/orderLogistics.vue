<template>
  <view class="content">
    <u-time-line>
      <u-time-line-item v-for="(item,index) in list" :key="index">
        <!-- 此处自定义了左边内容，用一个图标替代 -->
        <template v-slot:node>
          <view class="u-node" :style="{background:colors}">
            <!-- 此处为uView的icon组件 -->
            <text>{{ size - index }}</text>
          </view>
        </template>
        <template v-slot:content>
          <view>
            <view class="u-order-time">{{ item.time }}</view>
            <view class="u-order-desc">{{ item.context }}</view>
          </view>
        </template>
      </u-time-line-item>
    </u-time-line>
  </view>
</template>

<script setup lang="ts">
import {GlobalStore} from "../../store";
import {onLoad} from "@dcloudio/uni-app";
import UTimeLine from "../../components/u-time-line/u-time-line.vue"
import UTimeLineItem from "../../components/u-time-line-item/u-time-line-item.vue"
import {ref} from "vue";

const store = GlobalStore()
const colors = store.theme.color

let orderId = 0
const list = ref<Order.LogisticsData[]>([])
const size = ref(0)
onLoad(async (option: any) => {
  orderId = Number(option.orderId)
  const {data} = await uni.$u.http.get<Order.Logistics>("/wx/getOrderLogistics/" + orderId)
  list.value = data.data
  size.value = data.data.length
})


</script>
<style lang="scss" scoped>
page {
  background-color: #F5F5FA;
}

.content {
  padding: 0rpx 4%;
  background-color: #fff;
}

.u-node {
  border-radius: 50%;
  width: 30rpx;
  text-align: center;
  padding: 7rpx;
  color: #ffffff;
}

.u-order-time {
  font-size: 26rpx;
  margin-top: 13rpx;
  color: #999999;
}

.u-order-desc {
  font-size: 27rpx;
}

</style>
