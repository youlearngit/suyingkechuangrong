<template>
	<view class="home">
		<!-- 顶部 -->
	
		
		<view class="container">
             <view class="list">
				 <view>
					 <view style="font-size: 32rpx;color: #fff;font-weight: 500;">江苏蓝创智能科技股份有限公司</view>
					 
				 </view>
				 
				 <view style="display: flex;align-items: center;margin-top: 15rpx;">
				 	<image src="/src/static/images/sykcr/location-white.png" mode="" style="width: 24rpx;height: 24rpx;"></image>
				 	<view style="font-size: 28rpx;color: #fff;margin-left: 8rpx;opacity: 0.7;">江苏省无锡市</view>
				 
				 </view>
				 
				 <view style="display: flex;align-items: center;margin-top: 15rpx;">
				 	<view style="font-size: 30rpx;color: #fff;margin-left: 8rpx;">￥</view>
				 	<view style="font-size: 40rpx;color: #fff;margin-left: 8rpx;">100000</view>
					<view style="font-size: 28rpx;color: #fff;margin-left: 8rpx;opacity: 0.7;margin-left: 20rpx;">融资规模</view>
				 
				 </view>
				 
				 <u-divider
				         hairline="true"
				         lineColor="#fff"
				 ></u-divider>
				 
				
				 
				
				 <view style="display: flex;align-items: center;">
					 
					<view style="font-size: 28rpx;color: #CBD7F8;">融资成本</view> 
					<view style="font-size: 28rpx;color: #FFFFFF;margin-left: 8rpx;">3%-8%</view>
					<view style="font-size: 35rpx;color: #FFFFFF;margin:0 8rpx 12rpx 8rpx;font-weight: 600;">.</view>
					<view style="font-size: 28rpx;color: #CBD7F8;">融资期限</view> 
					<view style="font-size: 28rpx;color: #FFFFFF;margin-left: 8rpx;">12个月</view>
				 </view>
				 
			 </view>
			</view>


        <view style="display: flex;align-items: center;margin-top: 40rpx;margin-bottom: 10rpx;">
        	<image src="/static/images/sykcr/title-blue.png" mode="" style="width: 10rpx;height: 20px;"></image>
        	<view class="project-list">融资主体</view>
        </view>
		
		<view class="info">
			
			<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 30rpx;">
				<view style="font-size: 28rpx;color: #2C3750;opacity: 0.7;">主题性质</view>
				<view style="font-size: 28rpx;color: #2C3750;">国有企业</view>
			</view>
			
			
			<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 30rpx;">
				<view style="font-size: 28rpx;color: #2C3750;opacity: 0.7;">是否科技型企业</view>
				<view style="font-size: 28rpx;color: #2C3750;">是</view>
			</view>
			
			<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 30rpx;">
				<view style="font-size: 28rpx;color: #2C3750;opacity: 0.7;">是否上市</view>
				<view style="font-size: 28rpx;color: #2C3750;">否</view>
			</view>
			
			<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 30rpx;">
				<view style="font-size: 28rpx;color: #2C3750;opacity: 0.7;">所属行业</view>
				<view style="font-size: 28rpx;color: #2C3750;">金融业</view>
			</view>
			
			<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 30rpx;">
				<view style="font-size: 28rpx;color: #2C3750;opacity: 0.7;">细分领域</view>
				<view style="font-size: 28rpx;color: #2C3750;">贷款方向</view>
			</view>
			
			<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 30rpx;">
				<view style="font-size: 28rpx;color: #2C3750;opacity: 0.7;">发展阶段</view>
				<view style="font-size: 28rpx;color: #2C3750;">第一阶段</view>
			</view>
			
			<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 30rpx;">
				<view style="font-size: 28rpx;color: #2C3750;opacity: 0.7;">联系人</view>
				<view style="font-size: 28rpx;color: #2C3750;">苏小银</view>
			</view>
			
			<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 30rpx;">
				<view style="font-size: 28rpx;color: #2C3750;opacity: 0.7;">联系方式</view>
				<view style="font-size: 28rpx;color: #2C3750;">1388888</view>
			</view>
					
		</view>
		
		<view style="display: flex;align-items: center;margin-top: 40rpx;margin-bottom: 10rpx;">
			<image src="/static/images/sykcr/title-blue.png" mode="" style="width: 10rpx;height: 20px;"></image>
			<view class="project-list">项目介绍</view>
		</view>
		
		<view class="introduce">
			6666
			
		</view>

           

         

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
		background: url('/static/images/sykcr/detail-bg.png') no-repeat;
		background-size: cover;
		height: 100%;
		
	}

	

	.container {
		padding-top: 50rpx;
		margin:0 30rpx;
		
	}

	
	.list {
		padding: 30rpx;
	}
	
	.project-list {
		font-family: SourceHanSansSC-Medium;
		font-size: 34rpx;
		color: #1C294F;
		text-align: justify;
		font-weight: 600;
		margin-left: 20rpx;
	}
	
	.info{
		width: 630rpx;
		height: 550rpx;
		background-image: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
		box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(156,187,255,0.23);
		border-radius: 16rpx;
		margin: 15rpx auto;
		padding: 10rpx 30rpx;
	}
	.introduce{
		width: 630rpx;
		height: 550rpx;
		background-image: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
		box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(156,187,255,0.23);
		border-radius: 16rpx;
		margin: 15rpx auto;
		padding: 30rpx;
		opacity: 0.7;
		color: #2C3750;
		
	}
</style>
