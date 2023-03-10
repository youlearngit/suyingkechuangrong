<template>
  <view class="cencal_order">
    <view class="goods_data">
      <image :src="item.pic" mode=""></image>
      <view class="right">
        <p class="goods_name">{{ item.goodsTitle }}</p>
        <p class="goods_sku">{{ SkuPrint(item.spData) }}</p>
        <p class="goods_price">
          <text :style="{color:colors}">￥{{ item.price }}</text>
          <text style="font-size: 24rpx;color: #333333;">数量 x {{ item.shopCount }}</text>
        </p>
      </view>
    </view>
    <view class="content">
      <!-- 退货理由 -->
      <view class="pingjia_box">
        <textarea :disabled="!edit" placeholder="请在此处输入您的退单理由..." maxlength="400"
                  v-model="refund.returnReason"/>
      </view>
      <p class="youhui" v-if="edit" style="border-bottom: none;">
        <text class="text1">上传凭证</text>
        <text class="text3">(最多3张)</text>
      </p>
      <view class="img_box">
        <view class="img_list" v-for="(item, index) in imgUrl" :key="index">
          <block v-if="item.type === 1">
            <image :src="item.url" mode="" class="imgs" @click="previewImg(item.url)"></image>
            <image v-if="edit" z-index="9999" src="/static/images/search/close.png" mode="" class="close"
                   @tap="delImg(index)"></image>
          </block>
          <block v-if="item.type == 2">
            <video :src="item.url" :controls="false" :show-center-play-btn="false"
                   :show-play-btn="false" :poster="item.poster" :enable-progress-gesture="false">
              <cover-view class="covers"></cover-view>
              <cover-image class="imgs" src="/static/images/search/bofang.png" mode=""
                           @click="showVideo(item.url)"></cover-image>
              <cover-image v-if="edit" src="/static/images/search/close.png" mode="" class="video_close"
                           @tap="delImg(index)"></cover-image>
            </video>
          </block>
        </view>
        <view class="addImg" v-if="edit&&imgUrl.length < 3" @tap="onChoose">
          <image src="/static/images/shexiang.png" mode=""></image>
          <p>添加图片/视频</p>
        </view>
      </view>
    </view>
    <view class="content">
      <view class="info">退货类型：
        <text v-if="refund.returnType===0">仅退款</text>
        <text v-if="refund.returnType===1">退货退款</text>
      </view>
    </view>
    <template v-if="!edit">
      <view class="content">
        <view class="info">申请时间：
          <text> {{ item.createdAt }}</text>
        </view>
        <view class="info">当前状态：
          <text> {{ refundStatus(item.returnStatus) }}</text>
        </view>
        <view v-if="item.returnRejectReason" class="info">拒绝原因：
          <text> {{ item.returnRejectReason }}</text>
        </view>
      </view>
    </template>
    <template v-if="!edit&&item.returnStatus===3">
      <view class="content">
        <view class="info" @click="onChooseLogistics">快递公司
          <text> {{ refund.logisticsName }}</text>
        </view>
        <u-field :labelWidth="90" v-model="refund.logisticsNo" :required="true" :clearable="false" label="快递号"
                 placeholder="请输入快递号"></u-field>
      </view>
    </template>
    <p class="tips" v-if="edit||item.returnStatus===3">
      提交服务单后，售后专员可能与您电话沟通，请保持手机畅通
    </p>
    <view class="btns" v-if="edit||item.returnStatus===3" :style="{background: colors}" @tap="$u.throttle(submit, 1600)">
      确认提交
    </view>
  </view>
</template>

<!--售后详情/申请-->
<script setup lang="ts">
import {GlobalStore} from "../../store";
import {reactive, ref} from "vue";
import {onLoad} from "@dcloudio/uni-app";
import {SkuPrint} from "../../common/utils";
import {refundStatus} from "./orderUtils";
import UField from "../../components/u-field/u-field.vue";

const store = GlobalStore()
const colors = store.theme.color
const refund = reactive<Partial<Order.Refund>>({})
const item = ref<Partial<Order.Item & Order.Refund>>({})
const edit = ref(true)
onLoad((option: any) => {
  item.value = JSON.parse(decodeURIComponent(option.data)) as Order.Item & Order.Refund;
  refund.returnType = Number(option.type)
  refund.pic = item.value.pic
  refund.goodsTitle = item.value.goodsTitle
  refund.spData = SkuPrint(item.value.spData!)
  refund.itemId = item.value.itemId
  refund.price = item.value.price
  refund.shopCount = item.value.shopCount
  refund.orderId = item.value.orderId
  refund.refundId = item.value.refundId
  refund.logisticsName = "京东"
  refund.logisticsCode = "jd"
  refund.logisticsNo = "JDV010166368642"
  if (option.show) {
    edit.value = false
    //设置数据
    if (item.value.returnVoucher) {
      imgUrl.value = JSON.parse(item.value.returnVoucher)
    }
    refund.returnReason = item.value.returnReason
  }
})

const imgUrl = ref<Array<{ type: number, url: string, poster?: string }>>([])
const delImg = (index: number) => {
  //删除图片
  imgUrl.value.splice(index, 1);
}

//选择快递公司
const onChooseLogistics = async () => {
  const {data} = await uni.$u.http.get<Array<App.Dict>>("/public/getDictByType?type=express")
  const list = data.map(p => p.value)
  uni.showActionSheet({
    title: "选择快递公司",
    itemList: list,
    success: (res) => {
      const val = data[res.tapIndex]
      refund.logisticsName = val.value
      refund.logisticsCode = val.code
    }
  })
}

const submit = async () => {
  if (!refund.returnReason) {
    uni.$u.toast("请填写售后原因！")
    return
  }
  if (item.value.returnStatus === 3) {
    if (!refund.logisticsNo) {
      uni.$u.toast("请填写快递单号！")
      return
    }
    //物流发货
    await uni.$u.http.post("/wx/refundSendLogistics", refund)
    uni.showToast({
      title: '物流发货成功'
    })
  } else {
    refund.returnVoucher = JSON.stringify(imgUrl.value) //凭证
    await uni.$u.http.post("/wx/applyReturnOrder/" + refund.orderId, refund)
    uni.showToast({
      title: '售后申请成功'
    })
  }
  setTimeout(() => {
    uni.navigateBack({
      delta: 2
    })
  }, 1500)
}

//播放视频
const refVideoPay = ref()
const showVideo = (url: string) => {
  refVideoPay.value.payVideo(url)
}

const previewImg = (url: string) => { //预览图片
  let arr = []
  arr[0] = url
  uni.previewImage({
    urls: arr
  })
}

const onChoose = async () => {
  uni.showActionSheet({
    title: "选择上传类型",
    itemList: ['图片', '视频'],
    success: (res) => {
      if (res.tapIndex == 0) {
        chooseImages()
      } else {
        chooseVideo()
      }
    }
  })
}

const chooseImages = () => { //上传图片
  uni.chooseImage({
    //该方法是调出选择图片的方法
    count: 1, //数量限制
    sizeType: ['original', 'compressed'], //可选 原图 或缩略图
    success: async (res) => {
      //返回的值为本地的图片的链接
      if (imgUrl.value.length >= 3) { //最多上传3张 超出了提醒
        uni.showToast({
          title: '最多上传3个',
          icon: 'none'
        })
      } else {
        const {data} = await uni.$u.http.upload<{ path: string }>("/static/upload/image", {
          formData: {use: "wechat"},
          name: 'file',
          filePath: res.tempFilePaths[0]
        })
        imgUrl.value.push({url: data.path, type: 1})
      }
    }
  });
}

const chooseVideo = () => { //上传视频
  let that = this;
  uni.chooseVideo({
    sourceType: ['camera', 'album'],
    success: async (res: UniApp.ChooseVideoSuccess) => {
      if (imgUrl.value.length >= 3) { //最多上传3张 超出了提醒
        uni.showToast({
          title: '最多上传3个',
          icon: 'none'
        })
      } else { //上传视频
        const {data} = await uni.$u.http.upload<{ path: string, image: string }>("/static/upload/media", {
          formData: {use: "wechat"},
          name: 'file',
          filePath: res.tempFilePath
        })
        const video = {
          url: data.path,
          type: 2,
          poster: data.image
        }
        imgUrl.value.push(video)
      }
    }
  });
}


</script>
<style lang="scss" scoped>
page {
  background-color: #FFFFFF;
}

.cencal_order {
  padding: 20rpx 4%;
  background-color: #fff;
}

.content {
  border: 1rpx #ece8e8 solid;
  margin: 20rpx 0rpx 0rpx;
  box-shadow: 0rpx 0rpx 10rpx #ddd;
  padding: 10rpx 20rpx;
  border-radius: 20rpx;

  .info {
    font-size: 26rpx;
    padding: 10rpx;

    text {
      color: v-bind(colors);
    }
  }
}

.goods_data {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  background-color: #FFFFFF;

  image {
    width: 140rpx;
    height: 140rpx;
    border-radius: 8rpx;
  }

  .right {
    margin-left: 20rpx;
    width: 80%;

    .goods_name {
      font-size: 26rpx;
      overflow: hidden;
      font-weight: bold;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .goods_sku {
      font-size: 24rpx;
      color: #999999;
      margin-top: 5rpx;
    }

    .goods_price {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28rpx;
      text-align: right;
      color: #999;
      margin-top: 5rpx;
    }
  }
}

.pingjia_box {
  min-height: 300rpx;
  box-sizing: border-box;
  padding: 10rpx 10rpx;
  border-bottom: 1rpx solid #eee;
  background-color: #F5F5F5;
  border-radius: 10rpx;

  p {
    font-size: 28rpx;
    color: #999;
    margin-bottom: 20rpx;
  }

  textarea {
    min-height: 200rpx;
    width: 100%;
    border-radius: 8rpx;
    overflow: hidden;
    box-sizing: border-box;
    font-size: 26rpx;
  }
}

.youhui {
  height: 40rpx;
  line-height: 40rpx;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #f2f2f2;
  box-sizing: content-box;

  .text1 {
    font-size: 28rpx;
    color: #333333;
  }

  .text2 {
    float: right;
    color: #999999;
    font-size: 28rpx;
    margin-right: 5rpx;
    margin-top: 2rpx;
  }

  .text3 {
    font-size: 24rpx;
    color: #999999;
    margin-left: 10rpx;
  }

  image {
    float: right;
    width: 12rpx;
    height: 22rpx;
    margin-top: 12rpx;
    margin-left: 10rpx;
  }
}

.img_box {
  overflow: hidden;

  .addImg {
    width: 184rpx;
    height: 184rpx;
    background: #f2f2f2;
    // background-color: pink;
    border-radius: 20rpx;
    overflow: hidden;
    transition: all 0.3s;
    margin-top: 20rpx;
    
    image {
      width: 51rpx;
      height: 42rpx;
      display: block;
      margin: 45rpx auto 0;
    }

    view {
      font-size: 24rpx;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 94, 102, 1);
      text-align: center;
      margin-top: 20rpx;
    }

    &:active {
      transform: scaleX(0.96);
    }
  }
}

.img_list {
  width: 184rpx;
  height: 184rpx;
  float: left;
  margin-right: 20rpx;
  position: relative;
  overflow: hidden;
  margin-bottom: 20rpx;
  margin-top: 20rpx;
  image, video {
    width: 100%;
    height: 100%;
    display: block;
  }

  video {
    position: relative;
    border-radius: 5rpx;
    overflow: hidden;

    .covers { //遮挡层
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 91;
    }

    .imgs {
      width: 72rpx;
      height: 72rpx;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 91;
      transform: translate(-50%, -50%);
    }

    .video_close {
      width: 40rpx;
      height: 40rpx;
      position: absolute;
      display: block;
      top: 6rpx;
      left: 6rpx;
      border-radius: 50%;
      z-index: 91;
    }
  }

  .close {
    width: 40rpx;
    height: 40rpx;
    position: absolute;
    box-sizing: border-box;
    top: 6rpx;
    left: 6rpx;
    border-radius: 50%;
  }
}

.tips {
  font-size: 24rpx;
  color: #999999;
  height: 40rpx;
  line-height: 40rpx;
  margin-top: 100rpx;
  text-align: center;
}

.btns {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 30rpx;
  color: #FFFFFF;
  text-align: center;
  margin: 20rpx 0;
  border-radius: 8rpx;

  &:active {
    opacity: .8;
  }
}
</style>
