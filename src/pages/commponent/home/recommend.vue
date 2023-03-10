<template>
	<view>
		<!-- 宫格类样式 -->
		<view style="display: flex;align-items: center;margin-top: 40rpx;margin-bottom: 10rpx;">
			<image src="/src/static/images/sykcr/title-blue.png" mode="" style="width: 10rpx;height: 20px;"></image>
			<view class="project-list">项目列表</view>
		</view>

		<view class="list">
			<view style="font-size: 28rpx;color: #1C294F;font-weight: 500;">江苏蓝创智能科技股份有限公司</view>

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
</template>

<script setup lang="ts">
	import {
		computed,
		ref,
		watch
	} from "vue";
	import Nodata from "../public/nodata.vue"
	import Sku from '../public/sku.vue'
	import {
		ColorRgba
	} from "../../../common/utils";
	import useRouter from "../../../hooks/useRouter";

	interface Props {
		dataList: Array < Goods.Goods > ;
		colors: string;
		modes ? : boolean;
		loading ? : boolean;
		type ? : number; //类型默认=0 ，1=外部定义sku
		bottoms ? : number;
	}

	// 接收父组件参数并设置默认值
	const props = withDefaults(defineProps < Props > (), {
		modes: true,
		loading: false,
		bottoms: 0,
		type: 0
	});

	//增加透明的颜色
	const bgColor = computed(() => {
		return ColorRgba(props.colors, 0.1)
	})

	const list = ref < Array < Goods.Goods >> ([])
	watch(() => props.loading, (flag) => {
		if (!flag) {
			changData()
		}
	})
	watch(() => props.modes, () => {
		changData()
	})

	//数据改变
	const changData = () => {
		if (props.modes) {
			const newList1: Goods.Goods[] = [];
			const newList2: Goods.Goods[] = [];
			props.dataList.forEach((value: Goods.Goods, index: number) => {
				if (index % 2 === 0) {
					newList1.push(value)
				} else {
					newList2.push(value)
				}
			})
			list.value = newList1.concat(newList2)
		} else {
			list.value = props.dataList
		}
	}

	const emit = defineEmits(['addCart'])
	const skuRef = ref()
	const addCart = ({
		...item
	}: Goods.Goods) => {
		if (props.type === 0) {
			skuRef.value.open(item)
		} else {
			//外部发送命令
			emit('addCart', item)
		}
	}

	const router = useRouter();
	const jumpDetails = (item: Goods.Goods) => {
		router.GoToDetails(item.goodsId)
	}
</script>
<style scoped lang="scss">
	.project-list {
		font-family: SourceHanSansSC-Medium;
		font-size: 34rpx;
		color: #1C294F;
		text-align: justify;
		font-weight: 500;
		margin-left: 20rpx;
	}

	.list {
		background: url('/src/static/images/sykcr/card.png') no-repeat;
		background-size: 715rpx 437rpx;
		margin: 0 18rpx;
		padding: 40rpx 45rpx;
		height: 437rpx;
	}
</style>
