<template>
  <view>
    <view class="order_list">
      <view class="top_nav">
        <!-- 顶部tab -->
        <view class="nav_top" style="border-bottom: 1rpx solid #F8F8F8;">
          <tabs :colors="colors" :tabList="tabList" :active="active" @setTabs="changTabs"></tabs>
        </view>
      </view>
      <order-cache v-show="active===0" :colors="colors" :status="5"></order-cache>
      <after-sale-cache v-show="active===1" :colors="colors" @setCount="setCount" :status="1"></after-sale-cache>
      <after-sale-cache v-show="active===2" :colors="colors" @setCount="setCount" :status="2"></after-sale-cache>
      <after-sale-cache v-show="active===3" :colors="colors" @setCount="setCount" :status="3"></after-sale-cache>
    </view>
  </view>
</template>

<script setup lang="ts">
import Tabs from "../../pages/commponent/public/tabs";
import OrderCache from "./orderCache.vue"
import AfterSaleCache from "./afterSaleCache.vue"
import {ref} from "vue";
import {GlobalStore} from "../../store";
import {onLoad} from "@dcloudio/uni-app";

const active = ref(0)
const store = GlobalStore()
const colors = store.theme.color;
onLoad((options: any) => {
  active.value = Number(options.active)
})

const tabList = ref([
  {
    name: '售后申请',
    count: 0
  }, {
    name: '处理中',
    count: 0
  }, {
    name: '待发货',
    count: 0
  }, {
    name: '售后完成',
    count: 0
  }])

//设置count
const setCount = (status: number, count: number) => {
  switch (status) {
    case 1: {
      tabList.value[1].count = count
    }
      break;
    case 2: {
      tabList.value[2].count = count
    }
      break;
    case 3: {
      tabList.value[3].count = count
    }
      break;
  }
}

const changTabs = async (_: any, index: number) => {
  active.value = index
}

</script>
<style>
page {
  background-color: #F8F8F8;
}
</style>
<style scoped lang="scss">
:deep(.nodata) {
  background: #F8F8F8 !important;
}

.order_list {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.top_nav {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
}


</style>
