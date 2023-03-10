<template>
  <view>
    <view class="evaluate">
      <view class="goods_data">
        <image :src="goods.pic" mode=""></image>
        <view class="right">
          <p class="goods_name">{{ goods.goodsTitle }}</p>
          <p class="goods_sku">{{ SkuPrint(goods.spData) }}</p>
          <p class="goods_price">
            <text style="font-size: 24rpx;">数量x{{ goods.shopCount }}</text>
            <text :style="{color:colors}">￥{{ goods.price }}</text>
          </p>
        </view>
      </view>
      <view class="Rate">
        <p>整体评价</p>
        <view>
          <u-rate :count="5" :size="30" v-model="eva.score"></u-rate>
        </view>
      </view>
      <view class="pingjia_box">
        <textarea placeholder="说说您的感受..." maxlength="400" v-model="eva.comment"/>
      </view>
      <p class="youhui" style="border-bottom: none;">
        <text class="text1">上传图片</text>
        <text class="text3">(最多3张)</text>
      </p>
      <view class="img_box">
        <view class="img_list" v-for="(item, index) in imgUrl" :key="index">
          <block v-if="item.type === 1">
            <image :src="item.url" mode="" class="imgs" @click="previewImg(item.url)"></image>
            <image z-index="9999" src="/static/images/search/close.png" mode="" class="close"
                   @tap="delImg(index)"></image>
          </block>
          <block v-if="item.type == 2">
            <video :src="item.url" :controls="false" :show-center-play-btn="false"
                   :show-play-btn="false" :poster="item.poster" :enable-progress-gesture="false">
              <cover-view class="covers"></cover-view>
              <cover-image class="imgs" src="/static/images/search/bofang.png" mode=""
                           @click="showVideo(item.url)"></cover-image>
              <cover-image src="/static/images/search/close.png" mode="" class="video_close"
                           @tap="delImg(index)"></cover-image>
            </video>
          </block>
        </view>
        <view class="addImg" v-if="imgUrl.length < 3" @tap="onChoose">
          <image src="/static/images/shexiang.png" mode=""></image>
          <p>添加图片/视频</p>
        </view>
      </view>
    </view>
    <view class="btns" :style="{background:colors}" @tap="$u.throttle(submit, 1600)">提交评价</view>
    <!-- 预览视频弹窗APP 小程序 -->
    <video-pay ref="refVideoPay"></video-pay>
  </view>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import {GlobalStore} from "../../../store";
import VideoPay from "./videoPay.vue";
import {SkuPrint} from "../../../common/utils";
import {onLoad} from "@dcloudio/uni-app";

const store = GlobalStore()
const colors = store.theme.color //颜色

const goods = ref<Partial<Order.Item>>({})

const eva = reactive<Partial<Order.Evaluate>>({score: 5})

onLoad((option: any) => {
  const item = JSON.parse(decodeURIComponent(option.data)) as Order.Item;
  goods.value = item
  eva.pic = item.pic
  eva.goodsTitle = item.goodsTitle
  eva.goodsId = item.goodsId
  eva.spData = SkuPrint(item.spData)
  eva.itemId = item.itemId
  eva.price = item.price
  eva.shopCount = item.shopCount
  eva.orderId = item.orderId
})

const imgUrl = ref<Array<{ type: number, url: string, poster?: string }>>([])
const delImg = (index: number) => {
  //删除图片
  const data = imgUrl.value.splice(index, 1);
  console.log(data)
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

const onChoose = () => {
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

const submit = async () => {
  if (!eva.comment) {
    uni.$u.toast("请填写商品评价内容！")
    return
  }
  eva.albumPics = JSON.stringify(imgUrl.value)
  await uni.$u.http.post("/wx/orderEvaluate/" + eva.orderId, eva)
  uni.showToast({
    title: '提交成功'
  })
  setTimeout(() => {
    uni.navigateBack({
      delta: 1
    })
  }, 1500)
}

</script>

<style lang="scss" scoped>
@import "./evaluate.scss";
</style>
<style>
page {
  background-color: #F8F8F8;
}
</style>
