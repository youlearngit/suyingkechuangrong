<template>
	<view class="home">
		<!-- 顶部 -->
		<!-- <u-navbar bgColor="#bcd4fc"></u-navbar> -->

		<view class="header">
			<view style="padding-top: 150rpx;padding-left: 30rpx;">
				<view style="font-size: 46rpx;color: #1C294F;font-weight: 700;">找项目</view>
			</view>

		</view>

		<view class="container">
			<u-search placeholder="搜索项目" v-model="keyword" bgColor="#edf1ff"></u-search>

			<!-- <view style="display: flex;align-items: center;justify-content:space-between;margin-top: 20rpx;">
			<view style="display: flex;align-items: center;">
			<view style="display: flex;align-items: center;margin-left: 10rpx;">
				<view style="font-size: 24rpx;">规模排序</view>
				 <image src="/src/static/images/sykcr/sort-underselected.png" mode="" style="width: 10rpx;height: 18rpx;margin-left: 10rpx;"></image>
			</view>
			
			<view style="display: flex;align-items: center;margin-left: 60rpx;">
				<view style="font-size: 24rpx;">期限排序</view>
				 <image src="/src/static/images/sykcr/sort-underselected.png" mode="" style="width: 10rpx;height: 18rpx;margin-left: 10rpx;"></image>
			</view>
			
			<view style="display: flex;align-items: center;margin-left: 60rpx;">
				<view style="font-size: 24rpx;">时间排序</view>
				 <image src="/src/static/images/sykcr/sort-underselected.png" mode="" style="width: 10rpx;height: 18rpx;margin-left: 10rpx;"></image>
			</view>
			</view>
			
			<view style="display: flex;align-items: center;">
				<image src="/src/static/images/sykcr/screening.png" mode="" style="width: 24rpx;height: 24rpx;"></image>
				<view style="margin-left: 10rpx;font-size: 36rpz;color: #4266FA;font-weight: 400;">筛选</view>
			</view>
			
		</view> -->


			<!-- 条件筛选框 -->
			<view class="screen">
				<view>
					<view class="screen_list xiaoliang" @tap="setSort('')">
						<text class="name" :style="'color:' + (queryParams.sortField==='' ? colors :'')">规模排序</text>
						<view class="icon">
							<text class="iconfont icon-shangsanjiaoxing"
								:style="'color:' + (isSort('price','ascending') ? colors :'')"></text>
							<text class="iconfont icon-xiasanjiaoxing"
								:style="'color:' + (isSort('price','descending') ? colors :'')"></text>
						</view>
					</view>
					<view class="screen_list xiaoliang" @tap="setSort('price')">
						<text class="name"
							:style="'color:' + (queryParams.sortField==='price' ? colors :'')">期限排序</text>
						<view class="icon">
							<text class="iconfont icon-shangsanjiaoxing"
								:style="'color:' + (isSort('price','ascending') ? colors :'')"></text>
							<text class="iconfont icon-xiasanjiaoxing"
								:style="'color:' + (isSort('price','descending') ? colors :'')"></text>
						</view>
					</view>
					<view class="screen_list xiaoliang" @tap="setSort('sale')">
						<text class="name" :style="'color:' + (queryParams.sortField==='sale' ? colors :'')">时间排序</text>
						<view class="icon">
							<text class="iconfont icon-shangsanjiaoxing"
								:style="'color:' + (isSort('price','ascending') ? colors :'')"></text>
							<text class="iconfont icon-xiasanjiaoxing"
								:style="'color:' + (isSort('price','descending') ? colors :'')"></text>
						</view>
					</view>
				</view>
				<view class="screen_menu">

					<image src="/src/static/images/sykcr/screening.png" mode="" style="width: 24rpx;height: 24rpx;">
					</image>
					<view class="screen_list" style="margin-left: 10rpx;" @click="popShow=true">
						筛选
					</view>
				</view>
			</view>


             <view class="list">
				 <view style="display: flex;justify-content: space-between;">
					 <view style="font-size: 28rpx;color: #1C294F;font-weight: 500;">江苏蓝创智能科技股份有限公司</view>
					 <image src="/src/static/images/sykcr/jump.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
				 </view>
				 
				 <view style="display: flex;align-items: center;margin-top: 15rpx;">
				 	<image src="/src/static/images/sykcr/location.png" mode="" style="width: 28rpx;height: 28rpx;"></image>
				 	<view style="font-size: 24rpx;color: #1F3172;margin-left: 8rpx;">江苏省无锡市</view>
				 	<image src="/src/static/images/sykcr/time.png" mode=""
				 		style="width: 26rpx;height: 26rpx;margin-left: 26rpx;"></image>
				 	<view style="font-size: 24rpx;color: #1F3172;margin-left: 8rpx;">2022-11-11</view>
				 </view>
				 
				 <view
				 	style="width: 560rpx;height: 140rpx;background: rgba(101,128,237,0.05);border-radius: 10px;margin-top: 20rpx;display: flex;align-items: center;justify-content: space-between;padding:0 30rpx;margin-top: 30rpx;">
				 	<view style="display: flex;flex-direction:column;justify-content: center;align-items: center;">
				 		<view style="display: flex;align-items: center;">
				 			<image src="/src/static/images/sykcr/rzgm.png" mode="" style="width: 22rpx;height: 22rpx;">
				 			</image>
				 			<view style="font-size: 24rpx;color: #1F3172;margin-left: 6rpx;">融资规模</view>
				 		</view>
				 		<view style="font-size: 32rpx;font-weight: 500;color: #23305C;">1亿元</view>
				 	</view>
				 
				 	<u-line direction="col" length="50%"></u-line>
				 
				 	<view style="display: flex;flex-direction:column;justify-content: center;align-items: center;">
				 		<view style="display: flex;align-items: center;">
				 			<image src="/src/static/images/sykcr/rzcb.png" mode="" style="width: 22rpx;height: 22rpx;">
				 			</image>
				 			<view style="font-size: 24rpx;color: #1F3172;margin-left: 6rpx;">融资成本</view>
				 		</view>
				 		<view style="font-size: 32rpx;font-weight: 500;color: #23305C;">3%-8%</view>
				 	</view>
				 
				 	<u-line direction="col" length="50%"></u-line>
				 
				 	<view style="display: flex;flex-direction:column;justify-content: center;align-items: center;">
				 		<view style="display: flex;align-items: center;">
				 			<image src="/src/static/images/sykcr/rzqx.png" mode="" style="width: 22rpx;height: 22rpx;">
				 			</image>
				 			<view style="font-size: 24rpx;color: #1F3172;margin-left: 6rpx;">融资期限</view>
				 		</view>
				 		<view style="font-size: 32rpx;font-weight: 500;color: #23305C;">12个月</view>
				 	</view>
				 
				 
				 </view>
				 
				 
				 <view style="display: flex;align-items: center;justify-content: space-between;margin-top: 60rpx;">
				 	
				 	<view>
				 		<image src="/src/static/images/sykcr/gyqy.png" mode="" style="width: 120rpx;height: 40rpx;"></image>
				 		<image src="/src/static/images/sykcr/M-Industry.png" mode="" style="width: 96rpx;height: 40rpx;margin-left: 20rpx;"></image>
				 	</view>
				 	
				 	<view>
				 		<image src="/src/static/images/sykcr/collect.png" mode="" style="width: 50rpx;height: 50rpx;"></image>
				 		<image src="/src/static/images/sykcr/phone.png" mode="" style="width: 50rpx;height: 50rpx;margin-left: 20rpx;"></image>
				 	</view>
				 	
				 	
				 </view>
				 
				 
			 </view>

			




			</view>




            <u-popup :show="true" mode="center"  @close="close" @open="open">
                    <view class="contact">
						<view style="margin-top: 90rpx;font-size: 38rpx;color: #4B6DE6;font-weight: 700;">
							联系方式
						</view>
						
						<view style="margin-top: 50rpx;display: flex;align-items: center;justify-content: space-between;">
							<view class="card-phone">
								<view style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
								<view style="font-size: 30rpx;color: #444A6B;font-weight: 600;">企业</view>
								<view style="font-size: 26rpx;color: #2C3750;margin-top: 20rpx;">025-888888888</view>
								</view>
								
								<view class="callphone">立即拨打</view>
							</view>
							
							<view class="card-phone">
								<view style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
								<view style="font-size: 30rpx;color: #444A6B;font-weight: 600;">企业</view>
								<view style="font-size: 26rpx;color: #2C3750;margin-top: 20rpx;">025-888888888</view>
								</view>
								
								<view class="callphone">立即拨打</view>
							</view>
							
							
						</view>
						
                    </view>
					
           </u-popup>

         

		</view>
</template>

<script setup lang="ts">
	import {
		computed,
		onMounted,
		ref
	} from "vue";
	import {
		HomeStore
	} from "../../../store/modules/home";
	import {
		GoodsParam,
		QueryGoods
	} from "../../../common/goodsApi";
	import {
		GlobalStore
	} from "../../../store";
	import {
		onLoad
	} from "@dcloudio/uni-app";

	const menuInfo = {
		height: '50rpx'
	}
	// #ifndef H5
	const menu = uni.getMenuButtonBoundingClientRect()
	menuInfo.height = menu.height + 'px'
	// #endif
	//高度
	const scrollHeight = ref < string > ('500')
	onMounted(async () => {
		// 计算content高度
		// uni.getSystemInfo({
		// 	success: res => {
		// 		const query = uni.createSelectorQuery()
		// 		query.select('.space').boundingClientRect()
		// 		query.exec(re => {
		// 			scrollHeight.value = res.windowHeight - re[0].top + 'px';
		// 		})
		// 	}
		// })
	})
	//获取颜色
	const store = GlobalStore()
	const colors = computed(() => {
		return '#4266FA;'
	})

	const homeStore = HomeStore()
	//分类
	const classList = computed < Array < Goods.Category >> (() => {
		return homeStore.categoryList
	})
	const popShow = ref(false) //弹出层
	//列表样式
	const modes = ref(false)
	//请求参数
	const queryParams = ref < GoodsParam > ({
		pageNum: 1,
		pageSize: 10,
		name: "",
		sortField: "", //orderNum
		sortOrder: "descending", //descending ascending
		categoryId: 0,
	})
	const loading = ref(true)
	const dataTotal = ref(0)
	const dataList = ref < Goods.Goods[] > ([]) //商品数据

	const changeModes = async () => {
		await search()
		modes.value = !modes.value
	}

	const searchRef = ref()
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

	onMounted(() => {
		if (queryParams.value.couponId) {
			searchRef.value.updateParams('couponId', queryParams.value.couponId)
		}
		if (queryParams.value.promotionId) {
			searchRef.value.updateParams('promotionId', queryParams.value.promotionId)
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
	const triggered = ref(false) //下拉刷新完成的操作
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
		const {
			data,
			total
		} = await QueryGoods(queryParams.value)
		dataList.value = dataList.value.concat(data);
		dataTotal.value = total
		loading.value = false
	}
</script>

<style scoped lang="scss">
	//

	.home {
		background: #f8fbff;
		height: 100000rpx;
	}

	.header {
		background: url('/static/images/sykcr/project-bg.png') no-repeat;
		background-size: 750rpx 666rpx;
		height: 450rpx;
	}

	.container {
		background: url('/static/images/sykcr/search-bg.png') no-repeat;
		background-size: 750rpx 666rpx;
		height: 100vh;
		padding: 50rpx 30rpx;
	}

	.slot-wrap {
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;

		&>u-input {
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
		z-index: 900;
		position: relative;
	}

	.screen .screen_list {
		flex: 1;
		text-align: center;
		font-size: 26rpx;
		color: #4266FA;
		font-weight: 400;

		.down {
			margin-left: 10rpx;
		}
	}

	.screen_menu {
		display: flex;
		justify-content: space-between;
		align-items: center;
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
		font-size: 24rpx;
		margin-right: 10rpx;
		color: #1C294F;
		font-weight: 400;
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

	.list {
		background: url('/static/images/sykcr/card.png') no-repeat;
		background-size: 715rpx 437rpx;
		padding: 40rpx 45rpx;
		height: 437rpx;
	}
	
	.contact{
		background: url('/static/images/sykcr/contact-bg.png') no-repeat;
		width: 590rpx;
		height: 631rpx;
		background-size: cover;
		padding: 61rpx 35rpx;
	}
	.card-phone{
		background: url('/static/images/sykcr/card-phone.png') no-repeat;
		width: 200rpx;
		height: 348rpx;
		background-size: cover;
		padding: 28rpx 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
	.callphone{
		width: 192rpx;
		height: 68rpx;
		line-height: 68rpx;
		background-image: linear-gradient(100deg, #60A1F7 6%, #3A74EF 80%);
		box-shadow: 0rpx 2rpx 9rpx 0rpx rgba(22,119,255,0.54);
		border-radius: 40rpx;
		text-align: center;
		color: #fff;
	}
</style>
