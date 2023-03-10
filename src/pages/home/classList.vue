<template>
  <navbar :is-back="true">
    <view class="slot-wrap" :style="{ height: menuInfo.height }">
      <u-input v-model.lazy="queryParams.name" placeholder="搜索商品"
               suffixIcon="search"
               shape="circle"
               confirmType="search"
               fontSize="26rpx"
               @confirm="search"
               :customStyle="{height: '70%'}"
               :suffixIconStyle="{fontSize:'50rpx'}"></u-input>
    </view>
  </navbar>
  <!-- 条件筛选框 -->
  <view class="screen">
    <view class="screen_list xiaoliang" @tap="setSort('')">
      <text class="name" :style="'color:' + (queryParams.sortField==='' ? colors :'')">综合</text>
    </view>
    <view class="screen_list xiaoliang" @tap="setSort('price')">
      <text class="name" :style="'color:' + (queryParams.sortField==='price' ? colors :'')">价格</text>
      <view class="icon">
        <text class="iconfont icon-shangsanjiaoxing"
              :style="'color:' + (isSort('price','ascending') ? colors :'')"></text>
        <text class="iconfont icon-xiasanjiaoxing"
              :style="'color:' + (isSort('price','descending') ? colors :'')"></text>
      </view>
    </view>
    <view class="screen_list xiaoliang" @tap="setSort('sale')">
      <text class="name" :style="'color:' + (queryParams.sortField==='sale' ? colors :'')">销量</text>
    </view>
    <view class="screen_menu">
      <view class="box"></view>
      <view class="screen_list" @click="changeModes">
        <text v-if="modes" class="iconfont icon-chanpinliebiaopubuliumoshi"
              :style="'font-size:40rpx;font-weight: bold;' "></text>
        <text v-else class="iconfont icon-liebiaoxingshi" :style="'font-size:38rpx;font-weight: bold;' "></text>
      </view>
      <view class="screen_list" style="font-weight: bold" @click="popShow=true">
        筛选
      </view>
    </view>
  </view>
  <!-- 分类选择 -->
  <scroll-view scroll-x="true" class="tow_scroll" :scroll-with-animation="true" :scroll-left="scrollLeft">
    <view class="scroll_tags"
          :style="{color:queryParams.categoryId===item.id?'#ffffff':'#202020',background:queryParams.categoryId===item.id?colors:'#F5F5F5'}"
          v-for="(item,index) in classList" :key="index" @click="setTags(item.id,index)">
      {{ item.name }}
    </view>
  </scroll-view>
  <view class="space">
    <!-- 占位 -->
  </view>
  <!-- 商品列表 -->
  <scroll-view :style="{height:scrollHeight}" scroll-y="true" :refresher-enabled="true" :scroll-with-animation="true"
               :lower-threshold="100"
               :refresher-triggered="triggered"
               @scrolltolower="scrollToLower"
               @refresherrefresh="refresherRefresh"
               :scroll-top="scrollTop">
    <recommend :colors="colors" @addCart="addCart" :type="1" :dataList="dataList" :modes="modes"
               :loading="loading"></recommend>
  </scroll-view>
  <!-- 选择规格 -->
  <sku ref="skuRef" :colors="colors" :bottoms="1"></sku>
  <!-- 筛选框 -->
  <u-popup :show="popShow" mode="right" :round="10" :overlay="true" @close="popShow=false">
    <PopupSearch ref="searchRef" @setParams="setParams" :colors="colors"></PopupSearch>
  </u-popup>
</template>

<script setup lang="ts">
import Navbar from "../../components/u-navbar/u-navbar.vue"
import Recommend from '../commponent/home/recommend.vue';
import Sku from '../commponent/public/sku.vue'
import PopupSearch from './component/popupSearch.vue'

import {computed, onMounted, ref} from "vue";
import {HomeStore} from "../../store/modules/home";
import {GoodsParam, QueryGoods} from "../../common/goodsApi";
import {GlobalStore} from "../../store";
import {onLoad} from "@dcloudio/uni-app";

const menuInfo = {height: '50rpx'}
// #ifndef H5
const menu = uni.getMenuButtonBoundingClientRect()
menuInfo.height = menu.height + 'px'
// #endif
//高度
const scrollHeight = ref<string>('500')
onMounted(async () => {
  // 计算content高度
  uni.getSystemInfo({
    success: res => {
      const query = uni.createSelectorQuery()
      query.select('.space').boundingClientRect()
      query.exec(re => {
        scrollHeight.value = res.windowHeight - re[0].top + 'px';
      })
    }
  })
})
//获取颜色
const store = GlobalStore()
const colors = computed(() => {
  return store.theme.color
})

const homeStore = HomeStore()
//分类
const classList = computed<Array<Goods.Category>>(() => {
  return homeStore.categoryList
})
const popShow = ref(false) //弹出层
//列表样式
const modes = ref(false)
//请求参数
const queryParams = ref<GoodsParam>({
  pageNum: 1,
  pageSize: 10,
  name: "",
  sortField: "",//orderNum
  sortOrder: "descending",//descending ascending
  categoryId: 0,
})
const loading = ref(true)
const dataTotal = ref(0)
const dataList = ref<Goods.Goods[]>([]) //商品数据

const changeModes = async () => {
  await search()
  modes.value = !modes.value
}

const searchRef=ref()
//页面入口
onLoad(async (option) => {
  if (option.text) {
    //文本搜索
    queryParams.value.name = option.text
  }
  if (option.categoryId) {
    //分类
    const id = Number(option.categoryId)
    setTags(id, classList.value.findIndex(p => p.id === id))
    return
  }
  if (option.couponId) {
    //优惠券id
    queryParams.value.couponId = Number(option.couponId)
  }
  if (option.promotionId) {
    //促销活动id
    queryParams.value.promotionId = Number(option.promotionId)
  }
  await loadData();
})

onMounted(()=>{
  if(queryParams.value.couponId){
    searchRef.value.updateParams('couponId',queryParams.value.couponId)
  }
  if(queryParams.value.promotionId){
    searchRef.value.updateParams('promotionId',queryParams.value.promotionId)
  }
})

//是否排序
const isSort = (field: string, sort: string): boolean => {
  if (queryParams.value.sortField === field && queryParams.value.sortOrder === sort) {
    return true
  }
  return false
}

//排序触发
const setSort = (field: string) => {
  queryParams.value.sortField = field
  //切换排序
  if (queryParams.value.sortOrder === "ascending") {
    queryParams.value.sortOrder = "descending"
  } else {
    queryParams.value.sortOrder = "ascending"
  }
  search()
}
//分类切换
const scrollLeft = ref(0)
const setTags = (item: number, index: number) => {
  scrollLeft.value = index * 38;
  if (index <= 2) {
    scrollLeft.value = 0;
  }
  if (queryParams.value.categoryId === item) {
    queryParams.value.categoryId = 0
  } else {
    queryParams.value.categoryId = item
  }
  search()
}

//设置参数搜索
const setParams = (param: GoodsParam) => {
  queryParams.value = Object.assign(queryParams.value, param)
  search()
  popShow.value = false
}

//触发sku选择
const skuRef = ref()
const addCart = (item: Goods.Goods) => {
  skuRef.value.open(item)
}
const scrollTop = ref(0)
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
  await search()
  triggered.value = false //停止
}

//刷新数据
const search = async () => {
  queryParams.value.pageNum = 1
  dataList.value = []
  scrollTop.value = scrollTop.value === 0 ? 0.01 : 0
  await loadData() //刷新数据
}

//加载数据啦
const loadData = async () => {
  loading.value = true
  const {data, total} = await QueryGoods(queryParams.value)
  dataList.value = dataList.value.concat(data);
  dataTotal.value = total
  loading.value = false
}

</script>


<style scoped lang="scss">

.slot-wrap {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;

  & > u-input {
    flex: 1;
    margin-right: 20rpx;
    height: 90%;
    margin-bottom: 7rpx;
  }
}

.search {
  background: #FFFFFF;
  border-radius: 100rpx;
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.screen {
  height: 80rpx;
  line-height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20rpx;
  z-index: 900;
  position: relative;
  background-color: #fff;
}

.screen .screen_list {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  color: #333;
  font-weight: 500;

  .down {
    margin-left: 10rpx;
  }
}

.screen_menu {
  display: flex;
  width: 200rpx;
  justify-content: space-between;
  align-items: center;

  .box{
    width:4rpx;
    height: 45rpx;
    background: #9b9b9b;
  }
}

.screen_list text {
  font-size: 24rpx;
  font-weight: normal;
}

.xiaoliang {
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  margin-left: 20rpx;
}

.xiaoliang .name {
  font-size: 28rpx;
  margin-right: 10rpx;
  color: #999999;
  font-weight: bold;
}

.xiaoliang .icon {
  width: 40rpx;
  line-height: 15rpx;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: #999999;
}

.xiaoliang .icon text {
  font-size: 22rpx;
}


.tow_scroll {
  height: 80rpx;
  line-height: 80rpx;
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
