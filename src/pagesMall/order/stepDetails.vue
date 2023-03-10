<template>
	<view class="step">
		<view class="step_box">
			<!-- 左侧进度线 -->
			<view class="step_left">
			</view>
			<view class="step_right">
				<view class="right_content" v-for="(item,index) in stepData" :key="index">
					<!-- 进度名称 -->
					<block v-if="item.isNow == 0">
						<p class="title" :style="{color:item.type == 1? '#202020':'#999'}">{{item.name}}</p>
					</block>
					<block v-if="item.isNow == 1">
						<p class="title" :style="{color:item.type == 1? colors:'#999'}">{{item.name}}</p>
					</block>
					<!-- 进度时间 -->
					<p class="times" v-if="item.type == 1">{{item.time}}</p>
					<!-- 进度详情备注 -->
					<p class="result" v-if="item.desc && item.desc !== ''"><text style="color: #202020;">{{item.desc}}</text></p>
					<!-- 右侧的进度点 -->
					<p class="status" :style="{background: item.isNow === 1?colors:'#ccc',borderColor: item.isNow === 1?colors:'#ccc'}"></p>
				</view>
			</view>
		</view>
		<loading v-if="isShow == true"></loading>
	</view>
</template>

<script>
	var app = getApp();
	import loading from "../../commponent/public/loading";
	export default {
		components:{
			loading
		},
		data(){
			return{
				isShow: true,
				stepData:[  //模拟后台返回的数据
					{name:'提交申请',time:'2020-05-09 20:01:49',isNow:0,type: 1,desc:'不想要了'},
					{name:'等待审核',time:'2020-05-09 20:01:49',isNow:0,type: 1,desc:'您的服务单已申请成功，待售后审核中'},
					{name:'审核意见',time:'2020-05-09 20:13:49',isNow:0,type: 1,desc:'您的售后单已收到，会在24小时与您联系。'},
					{name:'审核上门取件',time:'2020-05-09 20:13:49',isNow:0,type: 1,desc:'您的服务单已预约时间2020-05-10(周日) 15:00-20:00'},
					{name:'取件成功',time:'2020-05-10 18:54:55',isNow:0,type: 1,desc:'您的商品已取件成功'},
					{name:'商家售后已收到',time:'2020-05-12 09:01:49',isNow:0,type: 1,desc:'您的服务单商品已收到'},
					{name:'返修换新订单生产',time:'2020-05-12 13:19:49',isNow:0,type: 1,desc:'您的服务订单已生成新的订单'},
					{name:'返修换新完成',time:'2020-05-13 12:12:49',isNow:1,type: 1,desc:'您的服务单已完成，如有疑问请反馈，谢谢~'},
				]
			}
		},
		onLoad() {
			this.setData({
				colors: app.globalData.newColor,
			});
			setTimeout(() => {
				this.setData({
					isShow: false
				});
			}, 600);
		}
	}
</script>

<style lang="scss" scoped>
	.step{
		padding: 40rpx 20rpx;
		margin-bottom: 20rpx;
	}
	.step_box{
		margin: 0 20rpx;
		margin-left: 20rpx;
		display: flex;
		.step_left{
			width: 2rpx;
			display: block;
			background-color: #DDDDDD;
			overflow: hidden;
		}
		.step_right{
			margin-left: 20rpx;
			margin-top: -10rpx;
			.right_content{
				position: relative;
				margin-bottom: 30rpx;
				.title{
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #333333;
				}
				.times{
					font-size: 22rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #999999;
					line-height: 36rpx;
				}
				.status{
					width: 12rpx;
					height: 12rpx;
					border-radius: 50%;
					border: 2rpx solid #ccc;
					position: absolute;
					top: 10rpx;
					background-color: #ccc;
					left: -28rpx;
				}
				.result{
					padding: 10rpx 15rpx;
					background-color: #F6F6F6;
					font-size: 22rpx;
					margin-top: 10rpx;
					border: 1rpx dashed #ddd;
				}
				&:last-of-type{
					margin-bottom: 0;
					.status{
						top: 14rpx;
					}
					&::before{
						content: '';
						width: 6rpx;
						height: 100%;
						background-color: #FFFFFF;
						position: absolute;
						top: 22rpx;
						left: -24rpx;
					}
				}
			}
		}
	}
</style>
