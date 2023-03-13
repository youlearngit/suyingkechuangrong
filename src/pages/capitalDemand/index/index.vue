<template>
	<view class="home">
	
		
		
		
         

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

	
</style>
