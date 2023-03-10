<template>
  <view class="cate">
    <scroll-view :class="['left']" :scroll-y="true" scroll-with-animation :scroll-top="scrollTop">
      <view v-for="(item, index) in classList" :key="index"
            :class="'classTitle ' + (queryParams.categoryId === item.id ? 'actives':'')"
            @click.stop="setCurrent(item,index)" :style="{color:queryParams.categoryId === item.id ?colors:''}">
        <text>{{ item.name }}</text>
        <view class="classactive" v-if="queryParams.categoryId === item.id" :style="'background-color:' + colors">
        </view>
      </view>
    </scroll-view>
    <view :class="['right','right_h5']">
      <view :class="['screen','screen_h5']">
        <view class="xiaoliang" @tap="setSort('price')">
          <text class="name" :style="'color:' + (queryParams.sortField==='price' ? colors :'')">价格</text>
          <view class="icon">
            <text class="iconfont icon-shangsanjiaoxing"
                  :style="'color:' + (isSort('price','ascending') ? colors :'')"></text>
            <text class="iconfont icon-xiasanjiaoxing"
                  :style="'color:' + (isSort('price','descending') ? colors :'')"></text>
          </view>
        </view>
        <view class="xiaoliang" @tap="setSort('sale')">
          <text class="name" :style="'color:' + (queryParams.sortField==='sale' ? colors :'')">销量</text>
        </view>
        <view class="xiaoliang" @tap="setSort('')">
          <text class="name" :style="'color:' + (queryParams.sortField==='' ? colors :'')">综合</text>
        </view>
      </view>
      <scroll-view :scroll-y="true" :refresher-enabled="true" :scroll-with-animation="true" :lower-threshold="100"
                   :refresher-triggered="triggered"
                   :scroll-top="scrollTopGoods"
                   @scrolltolower="scrollToLower"
                   @refresherrefresh="refresherRefresh"
      >
        <!-- 推荐商品列表 -->
        <recommend style="top: 100rpx" @addCart="addCart" :type="1" :colors="colors" :modes="false" :dataList="dataList"
                   :loading="loading" :bottoms="1"></recommend>
      </scroll-view>
    </view>
    <!-- 选择规格 -->
    <sku ref="skuRef" :colors="colors" :bottoms="1"></sku>
  </view>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {HomeStore} from "../../../store/modules/home";
import Recommend from '../../commponent/home/recommend';
import {GoodsParam, QueryGoods} from "../../../common/goodsApi";
import Sku from '../public/sku.vue'

defineProps<{ colors: string }>();

const scrollTop = ref(0)

const showModal = ref(false)

const homeStore = HomeStore()
//分类
const classList = computed<Array<Goods.Category>>(() => {
  return homeStore.categoryList
})

const skuRef = ref()
const addCart = (item: Goods.Goods) => {
  skuRef.value.open(item)
}
const loading = ref(true)
const dataTotal = ref(0)
const dataList = ref<Goods.Goods[]>([])
//请求参数
const queryParams = ref<GoodsParam>({
  pageNum: 1,
  pageSize: 10,
  sortField: "",//orderNum
  sortOrder: 'descending',//descending ascending
  categoryId: classList.value[0].id
})
//是否排序
const isSort = (field: string, sort: string): boolean => {
  if (queryParams.value.sortField === field && queryParams.value.sortOrder === sort) {
    return true
  }
  return false
}

onMounted(async () => {
  await loadData()
})

//加载数据啦
const loadData = async () => {
  loading.value = true
  const {data, total} = await QueryGoods(queryParams.value)
  dataList.value = dataList.value.concat(data);
  dataTotal.value = total
  loading.value = false
}

const triggered = ref(false)//下拉刷新完成的操作
//触底
const scrollToLower = async () => {
  if (dataList.value.length < dataTotal.value) {
    queryParams.value.pageNum++
    await loadData()
  }
}
//下拉刷新
const refresherRefresh = async () => {
  triggered.value = true
  queryParams.value.pageNum = 1
  dataList.value = []
  await loadData()
  triggered.value = false //停止
}
//商品
const scrollTopGoods = ref(0)

//排序触发
const setSort = (field: string) => {
  scrollTopGoods.value = scrollTopGoods.value === 0 ? 0.01 : 0
  queryParams.value.sortField = field
  //切换排序
  if (queryParams.value.sortOrder === "ascending") {
    queryParams.value.sortOrder = "descending"
  } else {
    queryParams.value.sortOrder = "ascending"
  }
  queryParams.value.pageNum = 1
  dataList.value = []
  loadData()
}

//选择分类
const setCurrent = async (item: Goods.Category, index: number) => {
  //设置tab
  scrollTop.value = index * 20;
  if (index <= 2) {
    scrollTop.value = 0;
  }
  queryParams.value.categoryId = item.id
  queryParams.value.pageNum = 1
  dataList.value = []
  scrollTopGoods.value = scrollTopGoods.value === 0 ? 0.01 : 0
  await loadData()
}
</script>
<style scoped lang="scss">
$MyColor: v-bind(colors);
@import "./cate.scss";
.right {
  & > scroll-view {
    margin-top: 70rpx;
    height: calc(100% - 140rpx);
  }
}
</style>
