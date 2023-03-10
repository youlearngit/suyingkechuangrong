<template>
	<view class="after_sale_details">
		<!-- 服务单步骤 -->
		<view class="top_step" :style="{background:colors}">
			<view class="mask">
			</view>
			<view class="step_box">
				<p class="status">{{details.order_type}}</p>
				<view class="step_list">
					<view class="top_x">
					</view>
					<view class="setp_all">
						<view class="setp_title" v-for="(item,index) in stepData" :key="index">
							<text class="dian" :style="{color:item.type==1 ||item.isNow==1 ?colors:'#eee'}">✓</text>
							<text class="text" :style="{fontWeight:item.isNow == 1?'bold':'none'}">{{item.name}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 服务介绍 -->
		<view class="service_box" @click="jumpStepDetail">
			<view class="left">
				<p class="left_js">服务已完成,感谢您的支持</p>
				<p class="left_des">问题描述：尊敬的客户您好,您的服务单已为您审核换货成功</p>
			</view>
			<image src="/static/images/home/right.png" mode=""></image>
		</view>
		<!-- 商品信息 -->
		<view class="goods_details">
			<p class="details_title">商品信息</p>
			<view class="goods_box">
				<image :src="details.img" class="cover" mode=""></image>
				<view class="goods_right">
					<p class="goods_name">{{details.title}}</p>
					<view class="sku">规格：{{details.goods_sku_text || '暂无规格'}}</view>
					<view class="price">
						<view class="t1">￥{{details.money}}</view>
						<view class="t3">
							x{{details.number}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 服务单信息 -->
		<view class="service_details">
			<view class="cell_box">
				<text class="cell_text">服务单号</text>
				<text class="cell_content">{{serviceData.service_no}}</text>
				<text class="cell_btn" @click="onCopy(serviceData.service_no)">复制</text>
			</view>
			<view class="cell_box">
				<text class="cell_text">申请时间</text>
				<text class="cell_content">{{serviceData.create_time}}</text>
			</view>
			<view class="cell_box">
				<text class="cell_text">服务类型</text>
				<text class="cell_content">{{serviceData.fw_type}}</text>
			</view>
			<view class="cell_box">
				<text class="cell_text">商品退回</text>
				<text class="cell_content">{{serviceData.th_type}}</text>
			</view>
			<view class="cell_box">
				<text class="cell_text">取件地址</text>
				<text class="cell_content">{{serviceData.qj_address}}</text>
			</view>
			<view class="cell_box">
				<text class="cell_text">收货地址</text>
				<text class="cell_content">{{serviceData.sh_address}}</text>
			</view>
			<view class="cell_box">
				<text class="cell_text">联系人</text>
				<text class="cell_content">{{serviceData.realname}}</text>
			</view>
		</view>
		<view class="del_btn">
			<text @click="delService">删除服务单</text>
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
				colors:'',
				isShow: true,
				details:{},
				stepData:[  //该数据为后台返回 数据格式如此
					/**
					 * isNow：1 代表当前step 走到了这一步
					 * type：1 代表当前该步骤已经完成
					 */
					{step_id: 1, name:'提交申请',isNow:0, type: 1},
					{step_id: 2, name:'商家审核',isNow:0, type: 1},
					{step_id: 3, name:'商家收货',isNow:0,type:1},
					{step_id: 4, name:'换新',isNow:0, type: 1},
					{step_id: 5, name:'完成',isNow:1, type: 1},
				],
				serviceData:{
					service_no:'782260533',
					create_time:'2020-05-09 20:01:48',
					fw_type:'换货', //服务类型
					th_type:'上门取件', //取货类型
					qj_address:'安徽省合肥市包河区望湖街道马鞍山路',//取货地址
					sh_address:'安徽省合肥市包河区望湖街道马鞍山路', //收货地址
					realname:'反转'
				}
			}
		},
		onLoad(options) {
			this.setData({
				colors: app.globalData.newColor,
				details: JSON.parse(options.details) //这里是模拟的数据 正常使用时是调用接口根据服务单Id来获取
			});
			setTimeout(() => {
				this.setData({
					isShow: false
				});
			}, 600);
		},
		methods:{
			delService(){
				uni.showModal({
					title:'确认要删除该服务单吗?',
					confirmColor: this.colors,
					success: (res) => {
						if(res.confirm){
							console.log('删除订单')
						}
					}
				})
			},
			onCopy(value){ //复制内容
				// #ifdef H5
				var input = document.createElement('input'); // 直接构建input
				input.value = value; // 设置内容
				document.body.appendChild(input); // 添加临时实例
				input.select(); // 选择实例内容
				document.execCommand('Copy'); // 执行复制
				document.body.removeChild(input); // 删除临时实例
				uni.showToast({
					title:'复制成功~',
					icon:'none'
				})
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data:value,
					success:function(){
						uni.showToast({
							title:'复制成功~',
							icon:'none'
						})
					}
				})
				// #endif
			},
			jumpStepDetail(){ //进度详情
				uni.navigateTo({
					url:'/pages/views/order/stepDetails'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top_step{
		height: 240rpx;
		background-color: pink;
		position: relative;
		.mask{
			width: 100%;
			height: 100%;
			background: linear-gradient(to right,rgba(255,255,255,.1),rgba(255,255,255,.2));
		}
		.step_box{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			padding: 20rpx 40rpx;
			.status{
				height: 60rpx;
				line-height: 60rpx;
				color: #FFFFFF;
				font-size: 32rpx;
				font-weight: bold;
			}
			.step_list{
				margin-top: 30rpx;
				display: inline-block;
				.top_x{
					height: 4rpx;
					background-color: #FFFFFF;
				}
				.setp_all{
					display: flex;
					align-items: center;
					.setp_title{
						transform: translateY(-18rpx);
						margin-right: 40rpx;
						.dian{
							width: 30rpx;
							height: 30rpx;
							display: block;
							background-color: #FFFFFF;
							border-radius: 50%;
							margin: 0 auto;
							text-align: center;
							line-height: 30rpx;
							font-size: 26rpx;
						}
						.text{
							font-size: 24rpx;
							color: #FFFFFF;
							display: block;
							height: 40rpx;
							line-height: 40rpx;
							margin-top: 10rpx;
						}
						&:first-of-type{
							.dian{
								margin-left: 0;
							}
						}
						&:last-of-type{
							margin-right: 0;
							.dian{
								margin-left: 100%;
								transform: translateX(-100%);
							}
						}
					}
				}
			}
		}
	}
	.service_box{
		padding: 30rpx;
		background-color: #FFFFFF;
		margin: 0 20rpx;
		transform: translateY(-50rpx);
		border-radius: 15rpx;
		display: flex;
		align-items: center;
		.left{
			.left_js{
				height: 60rpx;
				line-height: 60rpx;
				color: #000000;
				font-weight: bold;
			}
			.left_des{
				height: 40rpx;
				width: 90%;
				line-height: 40rpx;
				font-size: 24rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		image{
			width: 40rpx;
			height: 40rpx;
			display: block;
		}
	}
	.goods_details{
		padding: 30rpx;
		background-color: #FFFFFF;
		margin: 0 20rpx;
		transform: translateY(-25rpx);
		border-radius: 15rpx;
		.details_title{
			font-size: 30rpx;
			color: #999999;
			font-weight: bold;
			height: 40rpx;
			line-height: 40rpx;
		}
		.goods_box{
			display: flex;
			align-items: center;
			margin-top: 10rpx;
			.cover{
				height: 140rpx;
				width: 140rpx;
				display: block;
				margin-right: 20rpx;
				border-radius: 8rpx;
			}
			.goods_right{
				flex: 1;
				.goods_name{
					font-size: 24rpx;
					color: #000;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
				.sku {
					height: 40rpx;
					line-height: 40rpx;
					font-size: 24rpx;
					border-radius: 8rpx;
					padding: 0 10rpx;
					color: #A7A7A7;
					margin-top: 5rpx;
					background-color: #F7F7F7;
				}

				.price {
					width: 100%;
					display: flex;
					align-items: center;
					height: 40rpx;
					line-height: 40rpx;
					margin-top: 5rpx;
					position: relative;
					.t1 {
						font-size: 30rpx;
						display: block;
						color: $mycolor;
					}
					.t2 {
						font-size: 24rpx;
						margin-left: 15rpx;
						display: block;
						color: #C5C5C5;
						text-decoration: line-through;
					}

					.t3 {
						float: right;
						font-size: 28rpx;
						color: #999;
						position: absolute;
						right: 0rpx;
						top: 0;
					}
				}

				.goods_other{
					display: flex;
					align-items: center;
					height: 50rpx;
					line-height: 50rpx;
					margin-top: 15rpx;
					font-size: 24rpx;
					color: #000000;
					.goods_price,.number{
						margin-right: 30rpx;
						text{
							font-weight: bold;
							font-size: 30rpx;
						}
					}
				}
			}
		}
	}
	.service_details{
		padding: 30rpx;
		background-color: #FFFFFF;
		margin: 0 20rpx;
		border-radius: 15rpx;
		.cell_box{
			display: flex;
			margin: 30rpx 0;
			.cell_text{
				font-size: 28rpx;
				color: #8d8d8d;
				width: 120rpx;
			}
			.cell_content{
				margin-left: 30rpx;
				font-size: 26rpx;
				color: #000000;
				flex: 1;
				line-height: 36rpx;
			}
			.cell_btn{
				padding: 5rpx 26rpx;
				border: 1rpx solid #ddd;
				margin-left: 30rpx;
				border-radius: 30rpx;
				font-size: 24rpx;
				color: #202020;
				&:active{
					opacity: .8;
				}
			}
		}
	}
	.del_btn{
		font-size: 24rpx;
		color: #8d8d8d;
		height: 160rpx;
		line-height: 100rpx;
		text-align: center;
		padding-top: 20px;
		text{
			padding: 10rpx 20rpx;
			border-radius: 30rpx;
			border: 1rpx solid #ddd;
			&:active{
				opacity: .8;
			}
		}
	}
</style>
<style>
	page{
		background-color: #F8F8F8;
	}
</style>
