<template>
  <view class="home">
    <!-- 顶部 -->
    <header-view :colors="colors"></header-view>
    <!-- 推荐分类菜单 与tab分类中不同 -->
    <classList></classList>
    <!-- 活动专区-->
	
	<view style="display: flex;align-items: center;justify-content: space-between;margin: 0 30rpx;">
		<view style="position: relative;">	
			<view style="font-size: 30rpx;font-weight: 700;color: #515F85;position: absolute;z-index: 99;top: 47rpx;left: 42rpx;">活动专区</view>
			<image src="/src/static/images/sykcr/activityZone.png" mode="" style="width: 335rpx;height: 140rpx;"></image>
		</view>
		
		<view style="position: relative;">
			<view style="font-size: 30rpx;font-weight: 700;color: #515F85;position: absolute;z-index: 99;top: 47rpx;left: 42rpx;">咨讯研报</view>
			<image src="/src/static/images/sykcr/zxyb.png" mode="" style="width: 335rpx;height: 140rpx;"></image>
		</view>
		
	</view>
	
   
    <!-- 推荐商品列表 -->
    <recommend :colors="colors" :modes="true" :dataList="dataList" :loading="loading" :bottoms="skuBottom"></recommend>
    <!-- 右侧悬浮菜单栏 -->
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
  console.log(store.theme.color)
  uni.setNavigationBarColor({ //设置标题栏颜色
    backgroundColor: '#9cc1ff',
    frontColor: '#ffffff'
  });
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
.category {
  height: 60rpx;
  line-height: 60rpx;
}

.navbarBody {
  background: #8f8f94;
}

.slot-wrap {
  display: flex;
  align-items: center;
  flex: 1;
  margin: 0 10rpx;
  background: #fcfcfc;
  border-radius: 20rpx;
  color: #d0a1a1;
  text-indent: 20rpx;
}
</style>
