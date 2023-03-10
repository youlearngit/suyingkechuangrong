<template>
  <!-- 弹出规格选项 -->
  <view class="popup">
    <view class="mask" @touchmove.stop.prevent="()=>{}" v-if="showModal" @tap="showModal=false"></view>
    <view @touchmove.stop.prevent="()=>{}" :class="'sku ' + (showModal===true ? 'shows':'')"
          :style="{bottom: showModal === true ? bottoms+'rpx': ''}">
      <view class="sku_top">
        <image @click="showImage(currentSku.image)" :src="currentSku.image" class="top_img"></image>
        <view class="sku_title">
          {{ currentSku.name }}
        </view>
        <view class="moneys">
          <!-- 这里的价格是选择完规格后计算的价格 -->
          ￥{{ (currentSku.price * number).toFixed(2) }}
        </view>
        <view class="kucun">
          <!-- 这里的价格是选择完规格后计算的库存 -->
          库存: {{ currentSku.stock }}
        </view>
      </view>
      <block v-if="currentSku.sku">
        <view v-for="(item, index) in currentSku.sku" :key="index" class="sku_list">
          <view class="sku_name">
            {{ item.sku_name }}
          </view>
          <view class="sku_tag">
            <button v-for="(row, s) in item.child" :key="row.id" class="tag_s"
                    :class="{'ondisabled': row.disabled === true}" :disabled="row.disabled === true"
                    @tap="setTag(item,index,s,row)"
                    :style="{color:currentArr[item.sku_id] === row.id ? colors :'#333333',background:currentArr[item.sku_id] === row.id ? '#fff' :'',borderColor:currentArr[item.sku_id] === row.id ? colors :''}">
              {{ row.tag_name }}
            </button>
          </view>
        </view>
      </block>
      <view class="number">
        <view class="n_left">购买数量</view>
        <view class="n_right">
          <number-box v-model="number" :color="colors" :min="1" @change="changeNumber" :max="currentSku.stock"
                      :inputWidth="150" :inputHeight="60"
                      :disabled="SkuId===0"></number-box>
        </view>
      </view>
      <view class="btn_box" v-if="SkuType===0">
        <u-button shape="circle" :disabled="SkuId===0" :customStyle="customStyle" :color="colors"
                  @click="onsubmit('add')"
                  text="加入购物车"></u-button>
        <u-button shape="circle" :disabled="SkuId===0" :customStyle="customStyle" :color="colors"
                  @click="onsubmit('pay')"
                  text="立即购买"></u-button>
      </view>
      <template v-if="SkuType===1">
        <u-button shape="circle" :disabled="SkuId===0" :customStyle="{...customStyle,width:'80vw',marginTop:'30rpx'}"
                  :color="colors"
                  @click="confirm"
                  text="确定"></u-button>
      </template>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {CartStore} from "../../../store/modules/cart";
import {GET} from "../../../common/simpleHttp";
import useRouter from "../../../hooks/useRouter";
import NumberBox from "../../../components/u-number-box/u-number-box.vue"

interface Props {
  colors: string;
  bottoms: number;
}

// 接收父组件参数并设置默认值
const props = withDefaults(defineProps<Props>(), {});
//按钮样式
const customStyle = ref({
  color: '#ffffff',
  width: '40vw',
  height: '65rpx'
})

const changeNumber = (num: number) => {
  if (!num) {
    number.value = 1
  }
  if (num > currentSku.value.stock!) {
    number.value = currentSku.value.stock!
  }
}
const SkuType = ref(0)//操作类型
const SkuId = ref(0)//是否选择了商品
const number = ref(1) //购买数量
const currentArr = ref<Array<number>>([])//当前选中的规格数组
const currentSku = ref<Partial<Goods.Goods>>({})//选择后的规格详情

const showModal = ref(false)
let defGoods: Partial<Goods.Goods> = {} //默认值
//sku页面打开
const open = async (goods: Goods.Goods, skuType = 0, param = {arr: [], skuId: 0, count: 1}) => {
  SkuType.value = skuType//操作类型
  number.value = param.count
  currentArr.value = param.arr
  SkuId.value = param.skuId
  if (param.skuId === 0) {
    //加载数据
    const data = await GET<{ sku: Array<Goods.Sku>, skuArr: Array<Goods.SkuArr>, stock: number; }>("/public/getSkuInfo", {goodsId: goods.goodsId})
    defGoods = {price: goods.price, image: goods.image, stock: data.stock}
    currentSku.value = goods
    currentSku.value.sku = data.sku
    currentSku.value.skuArr = data.skuArr
    currentSku.value.stock = data.stock
    changeDisabled()
  }
  showModal.value = true //展示
}

const emit = defineEmits(['setSku'])
//点击确定
const confirm = () => {
  const set = new Set(currentArr.value.values())
  const skuInfo: string[] = []
  currentSku.value.sku?.forEach(p => {
    p.child.forEach(c => {
      if (set.has(c.id)) {
        skuInfo.push(p.sku_name + ":" + c.tag_name);
      }
    })
  })
  //设置sku选择的信息
  emit('setSku', {
    count: number.value,
    arr: currentArr.value,
    skuId: SkuId.value,
    price: currentSku.value.price,
    info: skuInfo.join(";")
  })
  showModal.value = false //
}


//库存修改
const onAdd = (num: number) => {
  if (num < 0 && number.value === 1) {
    return
  }
  number.value += num
}

const cartStore = CartStore()
const {GoToConfirmOrder} = useRouter()
//提交
const onsubmit = async (type: string) => {
  if (type === 'add') {
    await cartStore.addCart(SkuId.value, number.value)
    uni.$u.toast("添加购物车成功！")
    showModal.value = false //
  } else {
    //TODO 如果没登录则不隐藏sku弹窗
    const flag = await GoToConfirmOrder(0, {skuId: SkuId.value, count: number.value})
    showModal.value = !flag
  }
}

const setTag = (items: Goods.Sku, current: number, index: number, row: Goods.SkuChild) => {
  //选择规格
  let pid = items.sku_id
  let isChecked = true; // 选中 or 取消选中吧
  if (currentArr.value[pid] != undefined && currentArr.value[pid] === row.id) {
    // 点击已被选中的，删除并填充 ''
    isChecked = false;
    currentArr.value.splice(pid, 1, 0);
  } else {
    // 选中
    currentArr.value[pid] = row.id
  }
  let chooseSkuId = []; // 选中的规格大类
  currentArr.value.forEach(sku => {
    if (sku > 0) {
      // sku 为空是反选 填充的
      chooseSkuId.push(sku);
    }
  });

  let newSku = getAllSku() //获取符合条件的规格数据
  if (chooseSkuId.length == currentSku.value.sku!.length && newSku.length) {
    //如果所有的规格类都被选中了 设置当前选中项商品的信息
    currentSku.value.image = newSku[0].image
    currentSku.value.price = newSku[0].price
    currentSku.value.stock = newSku[0].stock
    if (newSku[0].stock < number.value) {
      number.value = newSku[0].stock //强制设置库存
    }
    SkuId.value = newSku[0].goods_sku_id //设定当前商品为规格商品 用于加入购物车时判断
  } else {
    SkuId.value = 0
    //重置默认值
    currentSku.value.image = defGoods.image
    currentSku.value.price = defGoods.price
    currentSku.value.stock = defGoods.stock
  }
  // 每次点击选择或者取消之后都要刷新下选择状态 判断其他规格不符合条件的是否被选中
  changeDisabled(isChecked, row.id, pid)
}

const changeDisabled = (isChecked = false, skuId = 0, pid = 0) => { //改变禁用状态
  let newSku = []
  if (isChecked) {
    for (let key of currentSku.value.skuArr!) { //遍历可用规格数组
      if (key.stock <= 0) { //如果规格现有的库存小于等于0
        continue
      }
      if (key.goods_sku_arr.indexOf(skuId) >= 0) { //如果当前选中的类中存在对应的规格
        newSku.push(key)
      }
    }
  } else {
    newSku = getAllSku()
  }
  // 所有存在并且有库存未选择的规格项 的 子项 id
  let noChooseSkuIds: Array<number> = [];
  for (let price of newSku) {
    noChooseSkuIds = noChooseSkuIds.concat(price.goods_sku_arr);
  }
  // 去重
  noChooseSkuIds = Array.from(new Set(noChooseSkuIds));

  if (isChecked) {
    // 去除当前选中的规格项
    let index = noChooseSkuIds.indexOf(skuId);
    noChooseSkuIds.splice(index, 1);
  } else {
    // 循环去除当前已选择的规格项
    currentArr.value.forEach(sku => {
      if (sku > 0) {
        // sku 为空是反选 填充的
        let index = noChooseSkuIds.indexOf(sku);
        if (index >= 0) {
          // sku 存在于 noChooseSkuIds
          noChooseSkuIds.splice(index, 1);
        }
      }
    });
  }

  // 当前已选择的规格大类
  let chooseSkuKey: Array<number> = [];
  if (!isChecked) {
    // 当前已选择的规格大类
    currentArr.value.forEach((sku, key) => {
      if (sku > 0) {
        // sku 为空是反选 填充的
        chooseSkuKey.push(key);
      }
    });
  } else {
    // 当前点击选择的规格大类
    chooseSkuKey = [pid];
  }
  const _skuId = currentArr.value[pid]
  for (let i in currentSku.value.sku) {
    // 当前点击的规格，或者取消选择时候 已选中的规格 不进行处理
    for (let x in currentSku.value.sku[Number(i)]['child']) {
      // 如果当前规格项 id 不存在于有库存的规格项中，则禁用
      if (chooseSkuKey.indexOf(currentSku.value.sku[Number(i)]['sku_id']) >= 0) {
        if (currentSku.value.sku[Number(i)]['child'][x]['id'] === _skuId) {

        } else {
          if (!isChecked) {
            currentSku.value.sku[Number(i)]['child'][x]['disabled'] = false;
          }
        }
      } else {
        if (noChooseSkuIds.indexOf(currentSku.value.sku[Number(i)]['child'][x]['id']) >= 0) {
          currentSku.value.sku[Number(i)]['child'][x]['disabled'] = false;
        } else {
          currentSku.value.sku[Number(i)]['child'][x]['disabled'] = true;
        }
      }
    }
  }
}

const getAllSku = () => {
  let newSku = []
  for (let key of currentSku.value.skuArr!) { //遍历可用规格数组
    if (key.stock <= 0) { //如果规格现有的库存小于等于0
      continue
    }
    let isOk = true
    currentArr.value.forEach((sku) => {
      // sku 不为空，并且，这个 条 skuPrice 没有被选中,则排除
      if (sku > 0 && key.goods_sku_arr.indexOf(sku) < 0) {
        isOk = false
      }
    })
    if (isOk) {
      newSku.push(key)
    }
  }
  return newSku
}

const showImage = (url: string) => {
  uni.previewImage({
    current: 0, //预览图片的下标
    urls: [url] //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
  })
}

defineExpose({open})

</script>
<style scoped lang="scss">
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  z-index: 900;
  opacity: 0.7;
}

.sku {
  width: 92%;
  min-height: 30vh;
  position: fixed;
  bottom: -100%;
  z-index: 910;
  left: 0;
  background-color: #ffffff;
  padding: 20rpx 4%;
  border-top-left-radius: 10rpx;
  border-top-right-radius: 10rpx;
  border-bottom: 1rpx solid #eee;
  transition: all 0.3s;
}

.shows {
  bottom: 0;
  transition: all 0.3s;
}

.sku_top {
  overflow: hidden;
}

.sku_top .top_img {
  height: 170rpx;
  width: 170rpx;
  float: left;
  margin-right: 15rpx;
  border-radius: 8rpx;
}

.sku_top .sku_title {
  font-size: 30rpx;
  line-height: 35rpx;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.sku_top .moneys {
  font-size: 30rpx;
  line-height: 40rpx;
  overflow: hidden;
  margin-top: 20rpx;
  font-weight: bold;
  color: v-bind(colors);
}

.sku_top .kucun {
  font-size: 24rpx;
  color: #999;
  overflow: hidden;
}

.sku_list {
  margin-top: 20rpx;
  overflow: hidden;
  margin-bottom: 40rpx;
}

.sku_name {
  font-size: 24rpx;
  color: #666;
  overflow: hidden;
}

.sku_tag {
  overflow: hidden;
  margin-top: 20rpx;
}

.sku_tag .tag_s {
  //height: 60rpx;
  //line-height: 60rpx;
  align-items: center;
  padding: 0 20rpx;
  text-align: center;
  font-size: 26rpx;
  color: #202020;
  background-color: #F5F5F5;
  border: 1rpx solid #F5F5F5;
  float: left;
  border-radius: 40rpx;
  margin-right: 20rpx;
  transition: all 0.2s;
  margin-bottom: 20rpx;
  font-weight: 500;

  &::after {
    border: none;
  }
}

.number {
  margin-top: 10rpx;
  border-top: 1rpx solid #ccc;
  width: 100%;
  height: 80rpx;
  padding-top: 10rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.number .n_left {
  font-size: 28rpx;
  color: #333;
}

.number .n_right {
  height: 60rpx;
  width: 310rpx;
  margin-top: 10rpx;
  border-radius: 5rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn_box {
  display: flex;
  justify-content: space-around;
  margin-top: 40rpx;
  margin-bottom: 20rpx;
}

.ondisabled {
  background-color: #F9F9F9;
  opacity: 0.5;
}
</style>
