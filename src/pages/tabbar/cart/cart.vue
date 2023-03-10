<template>
  <view class="cart">
    <template v-if="cartStore.list.length !== 0">
      <view class="cart_box">
        <view v-for="(item, index) in cartStore.list" :key="index" class="cart_list" @longpress.stop="current=index"
              @touchend="ontouchend">
          <view class="checkbox-box" @click="setCurrent(index)">
            <view class="checkbox" :style="'border-color:' + colors" v-if="item.status !== 0 ">
              <view :class="item.current === true ? 'on':''" :style="'background-color:' + colors"></view>
            </view>
            <view class="checkbox" style="border-color:#ccc" v-else>
              <view></view>
            </view>
          </view>
          <view class="cover" @tap="jumpDetails(item.goodsId)">
            <image :src="item.pic" mode="aspectFill"></image>
            <text class="masks"></text>
            <text class="mask" v-if="item.status === 0">
              {{ item.stock === 0 ? '暂无库存' : '已失效' }}
            </text>
          </view>
          <view class="right">
            <view class="goods_name" @tap="jumpDetails(item.goodsId)">
              {{ item.goodsTitle }}
            </view>
            <view class="sku">
              <block v-if="item.spData">
                <text>{{ item.spData }}</text>
              </block>
            </view>
            <view class="numbers">
              <text class="price">
                ￥{{ (item.price * item.shopCount).toFixed(2) }}
              </text>
              <view class="right_btn">
                <number-box v-model="item.shopCount" :color="colors" :min="1" @change="changeNumber(item)"
                            :max="item.stock" :disabled="item.status===0"></number-box>
              </view>
            </view>
          </view>
          <!-- 删除的遮罩层 长按触发
          <view class="del_mask" v-if="current === index" :style="'z-index:' + (current === index ?'99':'-21')" @tap="current=9999">
          </view>
          <view class="dask_del"
                :style="'opacity:' + (current === index ?'1':'0') + ';z-index:' + (current === index ?'100':'-20')+';left:'+(current === index?'0':'-100%')">
            <text class="del" @click.stop="()=>{cartStore.deleteCart([item.cartId]);current=9999;setCurrent()}">删除
            </text>
            <text class="cencal" @tap="current=9999">取消</text>
          </view>
           -->
        </view>
        <view class="daodi" v-if="cartList.length >= 5">—— 到底啦 ——</view>
      </view>
      <!-- 全选 -->
      <view class="bottom_all" :style="{marginBottom: bottomShow}">
        <view class="left">
          <view class="checkbox-box" @tap="setAllCurrent">
            <view class="checkbox" :style="'border-color:' + colors">
              <view :class="allCurrent === true ? 'on':''" :style="'background-color:' + colors"></view>
            </view>
            <view class="text">全选</view>
          </view>
          <view class="delAll" v-if="sum>0" @click="deleteCart" :style="'border-color:' + colors + ';color:' + colors">
            删除
          </view>
        </view>
        <view class="rights">
          <view class="sum">合计：
            <text style="font-size: 30rpx;">￥{{ SumPrice || 0 }}</text>
          </view>
          <view class="jiesuan" :style="'background-color:' + colors" @click="settlement">结算({{ sum }})</view>
        </view>
      </view>
    </template>
    <!-- 如果购物车没有数据 -->
    <view class="nocart" v-if="cartStore.list.length === 0">
      <u-empty mode="car" :textColor="colors" :iconColor="colors" text=" "></u-empty>
      <view>空空如也,
        <text :style="'color:' + colors" @tap="onStroll">随便逛逛 ></text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {GlobalStore} from "../../../store";
import {onPullDownRefresh, onShow} from "@dcloudio/uni-app";
import {CartStore} from "../../../store/modules/cart";
import useGlobal from "../../../hooks/useGlobal";
import useRouter from "../../../hooks/useRouter";
import NumberBox from "../../../components/u-number-box/u-number-box.vue"
import useAuth from "../../../hooks/useAuth";
//全局监听
useGlobal()
const store = GlobalStore()
const colors = computed(() => {
  return store.theme.color
})
const router = useRouter()

const current = ref(99999)
const allCurrent = ref(false)
const sum = ref(0)
const SumPrice = ref('')
const bottomShow = ref('')

const jumpDetails = (goodsId: number) => {
  router.GoToDetails(goodsId)
}

//购物车数据源
const cartStore = CartStore()

//下啦刷新啦
onPullDownRefresh(async () => {
  await cartStore.updateList()
  await cartStore.updateBadge()
  uni.stopPullDownRefresh() //停止
  checkSelectAll()
  getSumPrice()
})

//购物车列表
const cartList = computed(() => {
  return cartStore.list
})

const auth = useAuth()
//数量改变监听
const changeNumber = async (item: Goods.ShopCart) => {
  if (noChange) {
    const flag = await auth.isLogin()
    if (flag) {
      await cartStore.updateCart(item.cartId, item.shopCount)
      getSumPrice()
    }
    return flag
  }
}

let noChange = false //是否可用改变
onMounted(() => {
  setTimeout(() => {
    noChange = true
  }, 800)
})
onShow(() => {
  checkSelectAll()
  getSumPrice()
})

//删除购物车
const deleteCart = async () => {
  uni.showModal({
    cancelColor: '#999',
    confirmColor: colors.value,
    title: '删除购物车',
    content: '是否批量删除选择的商品！',
    success: async (res) => {
      if (res.confirm) {
        const count: number[] = []
        cartList.value.forEach(e => {
          if (e.current == true) {
            count.push(e.cartId);
          }
        });
        await cartStore.deleteCart(count)
        setCurrent()
      }
    }
  });
}

const {GoToConfirmOrder} = useRouter();
//结算
const settlement = () => {
  if (sum.value === 0) {
    uni.$u.toast("请选择购买的商品！");
    return
  }
  const list: { cartId: number; skuId: number; count: number; }[] = []
  cartList.value.forEach((p) => {
    if (p.current == true && p.status !== 0) {
      list.push({
        skuId: p.skuId,
        cartId: p.cartId,
        count: p.shopCount
      })
    }
  })
  GoToConfirmOrder(1, list)
}
//全选/反选
const setAllCurrent = () => {
  cartList.value.forEach((p) => {
    p.current = !allCurrent.value
  })
  checkSelectAll()
  setCurrent()
}
const setCurrent = (index = -1) => {
  //单选
  if (index > -1) {
    const current = cartList.value[index];
    if (current.status === 0) {
      uni.$u.toast('商品已失效')
      return
    }
    current.current = !current.current;
  }
  let currentAll = false;
  let count = [];
  cartList.value.forEach(e => {
    if (e.current == true) {
      count.push(e);
    }
  });
  if (count.length == cartList.value.length && count.length > 0) { //判断是否全选
    currentAll = true;
  }
  allCurrent.value = currentAll
  getSumPrice()
}

const checkSelectAll = () => {
  let currentAll = false;
  let count = 0;
  cartList.value.forEach(e => {
    if (e.current == true || e.status === 0 || e.stock === 0) {
      count++
    }
  });
  if (count >= cartList.value.length && count > 0) { //判断是否全选
    currentAll = true;
  }
  allCurrent.value = currentAll
}
//计算总价
const getSumPrice = () => {
  let sumPrice = '';
  let count: Goods.ShopCart[] = []
  cartList.value.forEach(e => {
    if (e.current == true) {
      count.push(e);
    }
  });
  let length = count.length;
  for (let i = 0; i < length; i++) { //计算总价
    const data = count[i];
    sumPrice = (Number(sumPrice) + Number(data.price * data.shopCount)).toFixed(2)
  }
  sum.value = length
  SumPrice.value = sumPrice
}

const onStroll = () => {
  uni.switchTab({
    url: '/pages/tabbar/index/index'
  });
}

/*const pay = () => {
  uni.requestPayment
  (
      {
        "provider": 'wxpay',
        "orderInfo": "Test",
        "timeStamp": "1665136963",
        "nonceStr": "kg1ofqFsEFU7J1gi",
        "package": "prepay_id=wx0718024311774793fd7149fb033c4a0000",
        "signType": "HMAC-SHA256",
        "paySign": "5F918F7E36244B55D6F668BE3859B8D01EC461435A1A28309482AF0721838733",
        "success": function (res: any) {
          console.log(res)
        },
        "fail": function (res: any) {
        },
        "complete": function (res: any) {
        }
      }
  )
}*/
</script>

<style lang="scss" scoped>
$mycolor: v-bind(colors);
@import "./cart";

u-input {
  & > view {
    padding: 0 !important;
  }
}
</style>
