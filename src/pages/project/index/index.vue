<template>
  <view class="home">
    <!-- 顶部 -->
   <!-- <u-navbar bgColor="#bcd4fc"></u-navbar> -->
   
	<view class="header">
		<view style="padding-top: 150rpx;padding-left: 30rpx;">
			<view style="font-size: 46rpx;color: #1C294F;font-weight: 700;">找项目</view>
		</view>
		
	</view>
	
   
   
    <suspension :scrollShow="scrollShow" :colors="colors"></suspension>
  </view>
</template>

<script lang="ts" setup>
import {onPageScroll, onPullDownRefresh, onReachBottom, onShow} from "@dcloudio/uni-app";
import {computed, onMounted, ref} from "vue";
import HeaderView from '../../commponent/home/header';
import ClassList from '../../commponent/home/classList';
import Notice from '../../commponent/home/notice';
import Suspension from '../../commponent/home/suspension';
import Recommend from '../../commponent/home/recommend';
import {GlobalStore} from "../../../store";
import {QueryGoods} from "../../../common/goodsApi";
import useGlobal from "../../../hooks/useGlobal";

//全局监听
useGlobal()

//获取颜色
const store = GlobalStore()
const colors = computed(() => {
  return store.theme.color
})
onShow(() => {
 
});
const scrollShow = ref(false)
const loading = ref(true)
const dataTotal = ref(0)
const skuBottom = ref(1)
const dataList = ref<Goods.Goods[]>([])
//请求参数
const queryParams = {
  pageNum: 1,
  pageSize: 10
}

onMounted(async () => {
  await loadData()
  // #ifdef H5
  skuBottom.value = 85
  // #endif
})

//加载数据啦
const loadData = async () => {
  loading.value = true
  const {data, total} = await QueryGoods(queryParams)
  dataList.value = dataList.value.concat(data);
  dataTotal.value = total
  loading.value = false
}

//触底啦
onReachBottom(() => {
  if (dataList.value.length < dataTotal.value) {
    queryParams.pageNum++
    loadData()
  }
})

//下啦刷新啦
onPullDownRefresh(async () => {
  queryParams.pageNum = 1
  dataList.value = []
  await loadData()
  uni.stopPullDownRefresh() //停止
})

//页面滚啦
onPageScroll((e) => {
  if (e.scrollTop >= 500) {
    scrollShow.value = true
  } else {
    scrollShow.value = false
  }
})

</script>

<style scoped lang="scss">
//
:deep(view.recommend_goods) {
  padding: 20rpx;
}

.home{
	background: #f8fbff;
	height: 100000rpx;
}

.header{
	background: url('/src/static/images/sykcr/project-bg.png') no-repeat;
	background-size: 750rpx 666rpx;
	height: 450rpx;
}


</style>
