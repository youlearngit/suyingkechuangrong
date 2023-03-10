<template>
  <u-skeleton rows="22" title v-if="loading" :loading="loading" :animate="true"></u-skeleton>
  <view v-show="!loading" class="goodsDetails">
    <!-- 轮播图 -->
    <swiper-view :imageList="goods.albumPics?goods.albumPics?.split(','):[]" :videoTime="goods?.videoTime"
                 :videoUrl="goods.video?goods.video.split(',')[0]:''"></swiper-view>
    <!-- 商品信息 -->
    <view class="goods_info">
      <view class="goods_name">
        {{ goods.name }}
      </view>
      <view class="goods_price">
        <text class="money">￥{{ goods.price }}</text>
        <text class="h_money">￥{{ goods.originalPrice }}</text>
      </view>
      <view class="shoucang" @click="setColl">
        <view class="sc_icons">
          <text :class="['iconfont',goods.favorite === true?'icon-shoucang1':'icon-shoucang'] "
                :style="{color: goods.favorite === true? colors :''}"></text>
        </view>
        <view class="sc_text" :style="{color: goods.favorite === true? colors :''}">收藏</view>
      </view>
    </view>
    <view class="other">
      <p v-if="goods.freeStatus === 2">快递: 包邮</p>
      <p v-else>快递费: 按重量</p>
      <p>销量: {{ goods.sale }}</p>
    </view>
    <!-- 选择规格和优惠券 -->
    <view class="sku_pon">
      <view class="cell" @tap="openSku">
        <text class="text1">商品规格：</text>
        <text class="text2" style="color: #6c6c6c">
          {{ selectSku.skuId ? (selectSku.info + ' X ' + selectSku.count) : '未选择' }}
        </text>
        <image src="/static/images/home/right.png"></image>
      </view>
      <view class="cell" style="border:none" @click="couponShow=true">
        <text class="text1">优 惠 券：</text>
        <scroll-view scroll-x="true" class="text2 tow_scroll" :scroll-with-animation="true">
          <u-tag :key="item.couponId" style="margin-right: 20rpx" v-for="item in couponList" size="mini" @click="couponShow=true" :color="colors"
                 :borderColor="colors"
                 plain shape="circle" :text="getCouponTitle(item)"></u-tag>
        </scroll-view>
        <image src="/static/images/home/right.png"></image>
      </view>
    </view>
    <!-- 商品评价 -->
    <evaluate-list ref="refEvaluate"></evaluate-list>
    <!-- 商品详情 -->
    <view class="details">
      <view class="details_title">
        ——
        <text style="color: #666666;margin-top:20rpx;"> 商品详情</text>
        ——
      </view>
      <view class="details_content">
        <bctos-rich-text :nodes="goods.detailHtml"></bctos-rich-text>
      </view>
    </view>
    <!-- 底部操作栏 -->
    <view class="operation">
      <view class="icon">
        <view class="home" @tap="GoToHome">
          <text class="iconfont icon-shouye"></text>
          <text>首页</text>
        </view>
        <view class="cart" @tap="GoToCart">
          <text class="iconfont icon-gouwuche"></text>
          <text>购物车</text>
          <view v-if="cartCount!==0" class="boxBadge">
            <text>{{ cartCount }}</text>
          </view>
        </view>
      </view>
      <view class="btns">
        <view class="addcart" :style="'border-color:' + colors + ';color:' + colors" @click="confirmSku('add')">
          加入购物车
        </view>
        <view class="dingjin" :style="'background:' + colors" @click="confirmSku('pay')">
          立 即 购 买
        </view>
      </view>
    </view>
    <!-- sku -->
    <sku ref="skuRef" @setSku="setSku" :bottoms="1" :colors="colors"></sku>
    <!-- 选择优惠券弹出层 -->
    <view class="mask" catchtouchmove="preventTouchMove" v-if="couponShow === true" @tap="couponShow=false"></view>
    <view class="coupon" :style="'bottom:' + (couponShow === true ? '0px':'')">
      <scroll-view class="scrolls" scroll-y>
        <coupon :colors="colors" :couponList="couponList"></coupon>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import SwiperView from "./component/swiper.vue"
import EvaluateList from "./component/evaluateList.vue"
import BctosRichText from "./component/bctos-rich-text.vue"
import Sku from '../../pages/commponent/public/sku.vue'
import Coupon from "../../pages/commponent/public/coupon";

//页面入口
import {onLoad, onShow} from "@dcloudio/uni-app";
import {computed, reactive, ref} from "vue";
import {GlobalStore} from "../../store";
import {CartStore} from "../../store/modules/cart";
import useRouter from "../../hooks/useRouter"
import useAuth from "../../hooks/useAuth";
import {UserStore} from "../../store/modules/user";

const {GoToHome, GoToCart, GoToConfirmOrder} = useRouter()
const store = GlobalStore()
const colors = computed(() => {
  return store.theme.color
})
const cartStore = CartStore()
const cartCount = computed(() => {
  return cartStore.list.length
})
//商品信息
const goods = ref<Partial<Goods.Product>>({videoTime: ''})
const skuRef = ref()
const openSku = () => {
  skuRef.value.open({...goods.value, goodsId: goods.value.id}, 1, selectSku)
}
const selectSku = reactive({
  info: "",
  count: 1,
  arr: Array<number>(),
  skuId: 0
})
//设置选择的sku
const setSku = (info: { info: string, skuId: number, price: number, arr: number[], count: number }) => {
  selectSku.skuId = info.skuId;
  selectSku.info = info.info
  selectSku.count = info.count
  selectSku.arr = info.arr
  //更新价格
  goods.value.price = info.price
}
const {isLogin} = useAuth()
//确认购物
const confirmSku = async (type: string) => {
  if (selectSku.skuId > 0) {
    const flag = await isLogin()
    if (!flag) return;
    if (type === 'add') {
      await cartStore.addCart(selectSku.skuId, 1)
      uni.$u.toast("添加购物车成功！")
    } else {
      await GoToConfirmOrder(0, {skuId: selectSku.skuId, count: selectSku.count})
    }
  } else {
    skuRef.value.open({...goods.value, goodsId: goods.value.id}, 0)
  }
}

//收藏
const setColl = async () => {
  await uni.$u.http.post("/wx/addMyFavorite/" + goods.value.id)
  goods.value.favorite = !goods.value.favorite;
  if (goods.value.favorite) {
    uni.$u.toast("收藏成功")
  } else {
    uni.$u.toast("已取消")
  }
}

//优惠劵
const couponShow = ref(false)
const couponList = ref<Array<Promotion.Coupon>>([])
const getCouponTitle = (item: Promotion.Coupon) => {
  if (item.couponType === 'FULL') {
    return `满${item.threshold}元减${item.discount}元`
  } else {
    return `满${item.threshold}打${item.discount}折`
  }
}
const refEvaluate = ref()
const userStore = UserStore()
const loading = ref(true)
let goodsId = 0;
//入口
onLoad(async (option) => {
  if (option.goodsId) {
    goodsId = Number(option.goodsId)
  }
})
//页面展示的时候加载
onShow(async () => {
  if(goodsId===0){
    return
  }
  const {data: info} = await uni.$u.http.get<Goods.Product>('/public/getGoodsInfo?goodsId=' + goodsId)
  if (!info.id || info.publishStatus === 1) {
    uni.$u.toast("商品已失效！")
    setTimeout(()=>{
      uni.switchTab({
        url: '/pages/tabbar/index/index'
      });
    },1500)
    return
  }
  await refEvaluate.value.openView(info.id)
  goods.value = info
  userStore.addFoot(info) //添加足迹
  //查询商品可以领取的优惠劵-(包含用户已领取的优惠劵)
  const {data: list} = await uni.$u.http.get<Array<Promotion.Coupon>>("/public/getCurrentGoodsCanGet", {
    data: {
      goodsId: info.id,
      categoryId: info.categoryId
    }
  })
  couponList.value = list //优惠劵列表
  loading.value = false
})

</script>
<style scoped lang="scss">
$myColor: v-bind(colors);
@import "./goodsDetails.scss";

.tow_scroll {
  height: 80rpx;
  line-height: 80rpx;
  white-space: nowrap;
}

</style>
