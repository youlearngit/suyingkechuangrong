<template>
	<navbar :background="{backgroundColor:colors}" :is-back="false">
		<view class="slot-wrap" :style="{ height: menuInfo.height }">
			<view class="u-nav-slot">
				苏银科创融
			</view>

		</view>
	</navbar>
	<view class="header">

		<u-swiper :height="swiperHeight" @click="swiperClick" :list="imagesList" indicator indicatorMode="dot" circular>
		</u-swiper>
	</view>

</template>

<script setup lang="ts">
	import Navbar from "../../../components/u-navbar/u-navbar.vue"
	import {
		computed,
		onMounted,
		ref
	} from "vue";
	import {
		HomeStore
	} from "../../../store/modules/home";
	import useRouter from "../../../hooks/useRouter";

	defineProps < {
		colors: string
	} > ();
	const menuInfo = {
		height: '50rpx'
	}
	// #ifndef H5
	const menu = uni.getMenuButtonBoundingClientRect()
	menuInfo.height = menu.height + 'px'
	// #endif

	//数据
	const homeStore = HomeStore()
	//热词
	const noticeList = computed(() => {

		if (homeStore.dictMap['hot-search']) {
			return homeStore.dictMap['hot-search'].map(p => {
				return p.value
			})
		} else {
			return []
		}
	})
	//轮播图
	const imagesList = computed(() => {
		if (homeStore.advertList) {
			return homeStore.advertList.filter(p => p.advertType === 1).map(p => {
				return p.image
			})
		} else {
			return []
		}
	})

	//搜索页面
	const search = (text: string) => {
		uni.navigateTo({
			url: `/pages/home/search?text=${text}`
		});
	}

	const router = useRouter()
	//点击跳转
	const swiperClick = (e: number) => {
		router.GoToByAdvert(homeStore.advertList.filter(p => p.advertType === 1)[e])
	}

	onMounted(async () => {
		await homeStore.updateDict("hot-search")
		await homeStore.updateAdvertList()
	})
	//轮播高度
	const swiperHeight = ref(uni.upx2px(249))
</script>
<style scoped lang="scss">
	.notice_swiper {
		height: 80rpx;
		width: 100%;

		.sw_item {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
	}

	.header {
		overflow: hidden;
		color: #fff;
		position: relative;
		background: url('/static/images/sykcr/gradientBg.png') no-repeat;
		padding: 0px 20rpx;
		background-size: 100% 300rpx;
	}



	.slot-wrap {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.u-nav-slot {
		font-weight: bold;
		text-align: center;
	}

	.search {
		background: #FFFFFF;
		border-radius: 100rpx;
		flex: 1;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-right: 20rpx;

		text {
			margin-left: 25rpx;
			color: #757373;
			font-size: 27rpx;
		}

		.search_img {
			margin-left: 15rpx;
			width: 35rpx;
			height: 35rpx;
			display: block;
		}

	}
</style>
