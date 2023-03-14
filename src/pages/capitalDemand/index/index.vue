<template>
	<view class="home">

		<view class="form">
		
				<view style="display: flex;padding:30rpx 0;border-bottom:1rpx solid  #E3E7F0;">
					<view>需求方名称</view>
					<u--input v-model="model1.demanderName" border="none" placeholder="请填写需求名称"
						placeholder-style="text-align:right" input-align="right"></u--input>
				</view>

				<view style="display: flex;padding:30rpx 0;border-bottom:1rpx solid  #E3E7F0;">
					<view>联系人</view>
					<u--input v-model="model1.contactPerson" border="none" placeholder="请填写联系人姓名"
						placeholder-style="text-align:right" input-align="right"></u--input>
				</view>

				<view style="display: flex;padding:30rpx 0;border-bottom:1rpx solid  #E3E7F0;">
					<view>联系方式</view>
					<u--input v-model="model1.contactInformation" border="none" placeholder="请填写联系方式"
						placeholder-style="text-align:right" input-align="right" type="number" maxlength="11"></u--input>
				</view>
				
				<view style="display: flex;padding:30rpx 0;border-bottom:1rpx solid  #E3E7F0;" @click="showSubjectNature = true">
					<view>主题性质</view>
					<u--input v-model="model1.subjectNature" disabled disabledColor="#ffffff" placeholder="请选择主题性质"
						border="none" placeholder-style="text-align:right" input-align="right"></u--input>
					
						<u-icon name="arrow-right"></u-icon>
				</view>
				
				<view style="display: flex;padding:30rpx 0;border-bottom:1rpx solid  #E3E7F0;" @click="showIndustry = true">
					<view>所属行业</view>
					<u--input v-model="model1.industry" disabled disabledColor="#ffffff" placeholder="请选择所属行业"
						border="none" placeholder-style="text-align:right" input-align="right"></u--input>
				
						<u-icon name="arrow-right"></u-icon>
				</view>
				
				<view style="display: flex;padding:30rpx 0;border-bottom:1rpx solid  #E3E7F0;" @click="showSubdivisionField = true">
					<view>细分领域<text style="font-size:24rpx;color: #2C3750;opacity: 0.4;margin:0 15rpx">|</text><text style="font-size:24rpx;color: #2C3750;opacity: 0.4;">选填</text></view>
					<u--input v-model="model1.subdivisionField" disabled disabledColor="#ffffff" placeholder="请选择"
						border="none" placeholder-style="text-align:right" input-align="right"></u--input>
						<u-icon name="arrow-right"></u-icon>
				</view>
				
				
				
				<view style="display: flex;padding:30rpx 0;" @click="showdevelopmentStage = true">
					<view>发展阶段</view>
					<u--input v-model="model1.developmentStage" disabled disabledColor="#ffffff" placeholder="请选择"
						border="none" placeholder-style="text-align:right" input-align="right"></u--input>
				
						<u-icon name="arrow-right"></u-icon>
				</view>
				
		</view>
		
		
		
		<view class="form" style="margin-top: 20rpx;">
		
				<view style="display: flex;padding:30rpx 0;border-bottom:1rpx solid  #E3E7F0;">
					<view>融资成本</view>
					<u--input v-model="model1.demanderName" border="none" placeholder="请输入融资成本"
						placeholder-style="text-align:right" input-align="right"></u--input>
						<view style="margin-left: 18rpx;">元</view>
				</view>
		
			
				
				
				<view style="display: flex;padding:30rpx 0;border-bottom:1rpx solid  #E3E7F0;" @click="showSubjectNature = true">
					<view>融资期限</view>
					<u--input v-model="model1.subjectNature" disabled disabledColor="#ffffff" placeholder="请选择融资期限"
						border="none" placeholder-style="text-align:right" input-align="right"></u--input>
					
						<u-icon name="arrow-right"></u-icon>
				</view>
				
				<view style="display: flex;padding:30rpx 0;" @click="showIndustry = true">
					<view>融资规模</view>
					<u--input v-model="model1.industry" disabled disabledColor="#ffffff" placeholder="请选择融资规模"
						border="none" placeholder-style="text-align:right" input-align="right"></u--input>
				
						<u-icon name="arrow-right"></u-icon>
				</view>
				
				
				
				
		</view>
		
		
		
		
		
		<view style="display: flex;align-items: center;margin-top: 40rpx;margin-bottom: 10rpx;">
			<image src="/static/images/sykcr/title-blue.png" mode="" style="width: 10rpx;height: 20px;"></image>
			<view class="project-list">项目情况</view>
		</view>
		
		
		<view class="form" style="margin-top: 20rpx;">
		
				<view style="display: flex;padding:30rpx 0;">
					<view>项目名称</view>
					<u--input v-model="model1.demanderName" border="none" placeholder="请输入融资成本"
						placeholder-style="text-align:right" input-align="right"></u--input>
						<view style="margin-left: 18rpx;">元</view>
				</view>
						
		</view>
		
		
		<view class="form" style="margin-top: 20rpx;">
		
				<view style="padding:30rpx 0;">
					<view>项目亮点</view>
					<teXTarea style="border: 0;height: 200rpx;">111</teXTarea>
				</view>
				
				
				
		</view>
		
		
		
		
		
		
		
		<u-action-sheet :show="showSubjectNature" :actions="subjectNature" title="请选择主题性质"
			@close="showSubjectNature = false" @select="subjectNatureSelect">
		</u-action-sheet>
		
		
		<u-action-sheet :show="showIndustry" :actions="industry" title="请选择所属行业"
			@close="showIndustry = false" @select="industrySelect">
		</u-action-sheet>
		
		<u-action-sheet :show="showSubdivisionField" :actions="subdivisionField" title="请选择细分领域"
			@close="showSubdivisionField = false" @select="subdivisionFieldSelect">
		</u-action-sheet>
		
		<u-action-sheet :show="showdevelopmentStage" :actions="developmentStage" title="请选择发展阶段"
			@close="showdevelopmentStage = false" @select="developmentStageSelect">
		</u-action-sheet>

	</view>
</template>

<script setup lang="ts">
	import {
		computed,
		onMounted,
		ref,
		reactive
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

	let showSubjectNature = ref(false)
	
	let showIndustry = ref(false)
	
	let showSubdivisionField=ref(false)
	
	let showdevelopmentStage=ref(false)
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

	let rules = reactive({
		'demanderName': {
			type: 'string',
			required: true,
			message: '请填写需求名称',
			trigger: ['blur', 'change']
		},
		'contactPerson': {
			type: 'string',
			max: 1,
			required: true,
			message: '请填写联系人',
			trigger: ['blur', 'change']
		},
		'contactInformation': {
			type: 'string',
			max: 1,
			required: true,
			message: '请填写联系人',
			trigger: ['blur', 'change']
		},
		'subjectNature': {
			type: 'string',
			max: 1,
			required: true,
			message: '请选择主题性质',
			trigger: ['blur', 'change']
		},
	}, ) //规则

	let model1 = reactive({
		demanderName: '',
		contactPerson: '',
		contactInformation: '',
		subjectNature: '',
		industry:'',
		subdivisionField:'',
		developmentStage:''
	})

	let subjectNature = reactive([{
		name: '自主经营'
	}, {
		name: '自负盈亏'
	}, {
		name: '自我发展'
	}]) //主体性质
	let industry = reactive([{
		name: '国有企业'
	}, {
		name: '制造业'
	}]) //所属行业
	
	let subdivisionField = reactive([{
		name: '领域一'
	}, {
		name: '领域二'
	}]) //细分领域
	
	let developmentStage= reactive([{
		name: '菜鸟'
	}, {
		name: '成熟'
	}]) //发展阶段
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
	

	const subjectNatureSelect = (e: string) => {
		 model1.subjectNature = e.name
	}
	
	const industrySelect= (e: string) => {
		 model1.industry = e.name
	}
	
	
	const subdivisionFieldSelect= (e: string) => {
		 model1.subdivisionField = e.name
	}
	
	const developmentStageSelect= (e: string) => {
		 model1.developmentStage = e.name
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
		padding: 30rpx;
	}

	.form {
		background: #fff;
		padding: 10rpx 30rpx;
		box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(156, 187, 255, 0.23);
		border-radius: 16rpx;
	}
	
	.project-list {
		font-family: SourceHanSansSC-Medium;
		font-size: 34rpx;
		color: #1C294F;
		text-align: justify;
		font-weight: 600;
		margin-left: 20rpx;
	}
</style>
