<template>
  <view>
    <view class="myaddress">
      <view v-for="(item, index) in addressList" :key="index" class="order_address">
        <view class="address_box">
          <view class="weizhi_icon">
            <text class="iconfont icon-dizhi" :style="'color:' + colors"></text>
          </view>
          <view @click="setAddress(item)">
            <view class="center">
              <view class="moren" v-if="item.status === 2">
                <text class="iconfont icon-icon-moren" :style="'color:' + colors"></text>
              </view>
              <view class="name">
                <text class="text1">{{ item.nickName }}</text>
                <text class="phones">{{ item.mobile }}</text>
              </view>
              <view class="address_name">{{ item.province + item.city + item.district }}{{ item.details }}</view>
            </view>
          </view>
          <view class="caozuo">
            <view class="del" @tap="delAddress(item)">
              <text class="iconfont icon-shanchu"></text>
              删除
            </view>
            <view class="edit" @tap="editAddress(item)">
              <text class="iconfont icon-bianji"></text>
              编辑
            </view>
          </view>
        </view>
      </view>
      <nodata :colors="colors" :loading="loading" :show="addressList.length===0" :count="addressList.length"
              title="收货地址"></nodata>
    </view>
    <view class="save">
      <view class="btn" :style="'background:' + colors" @tap="addAddress">添加收货地址</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {GlobalStore} from "../../store";
import {computed, onMounted, ref} from "vue";
import Nodata from "../../pages/commponent/public/nodata.vue"
import {onPullDownRefresh, onShow} from "@dcloudio/uni-app";
import {HomeStore} from "../../store/modules/home";


const store = GlobalStore()
const colors = computed(() => {
  return store.theme.color
})
//地址列表
const addressList = ref<Array<Wechat.ReceiveAddr>>([])
onShow(async () => {
  await loadData()
})

//下啦刷新啦
onPullDownRefresh(async () => {
  await loadData()
  uni.stopPullDownRefresh() //停止
})
//加载数据
const loading = ref(true)
const loadData = async () => {
  loading.value = true
  const {data} = await uni.$u.http.get<Array<Wechat.ReceiveAddr>>("/wx/getReceiveAddrList")
  addressList.value = data
  loading.value = false
}


const editAddress = (item: Wechat.ReceiveAddr) => {
  const data = encodeURIComponent(JSON.stringify(item))
  uni.navigateTo({
    url: '/pagesMall/user/address/edit?item='+data
  });
}
const delAddress = (item: Wechat.ReceiveAddr) => {
  uni.showModal({
    cancelColor: '#999',
    confirmColor: colors.value,
    title: '删除收货地址',
    content: '是否删除当前地址！',
    success: async (res) => {
      if (res.confirm) {
        uni.$u.http.delete("/wx/delReceiveAddr/"+item.id).then(()=>{
          loadData()
          uni.$u.toast("删除成功！")
        })
      }
    }
  });
}
const home=HomeStore()
//选择地址
const setAddress = (address:Wechat.ReceiveAddr) => {
  if(home.receiveAddr.id!==address.id){
    home.receiveAddr = address
    //详细地址
    home.receiveAddr.areas = address.province + address.city + address.district + address.details
  }
  uni.navigateBack({delta: -1})
}
//添加收货地址
const addAddress = () => {
  uni.navigateTo({
    url: '/pagesMall/user/address/edit?type=add'
  });
}
</script>
<style lang="scss" scoped>
.myaddress {
  padding: 10rpx 4% 140rpx;
  margin-top: 10rpx;
}

.order_address {
  height: 180rpx;
  width: 100%;
  background-color: #fff;
  border-radius: 10rpx;
  position: relative;
  box-shadow: 0rpx 0rpx 10rpx #ddd;
  margin-bottom: 20rpx;
}

.order_address image {
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}

.address_box {
  width: 100%;
  height: 100%;
  display: block;
  z-index: 10;
  box-sizing: border-box;
  padding: 20rpx;
  display: flex;
  align-items: center;
}

.weizhi_icon text {
  font-size: 40rpx;
  margin-left: 10rpx;
}

.address_box .center {
  margin-left: 20rpx;
}

.address_box .center .name {
  height: 60rpx;
  line-height: 60rpx;
}

.address_box .center .name .text1 {
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
  display: inline-block;
  margin-right: 20rpx;
}

.phones {
  font-size: 24rpx;
  color: #999;
  z-index: 0;
}

.address_box .address_name {
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
}

.noaddress {
  margin-left: 40rpx;
  font-weight: bold;
  color: #333;
  font-size: 26rpx;
}

.caozuo {
  position: absolute;
  right: 20rpx;
  display: flex;
  top: 20rpx;
}

.caozuo view {
  font-size: 24rpx;
  color: #666;
  margin-left: 30rpx;
}

.caozuo view text {
  font-size: 24rpx;
}

.moren {
  position: absolute;
  top: -10rpx;
  left: -10rpx;
}

.moren text {
  font-size: 88rpx;
}

.save {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 120rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.save view {
  display: flex;
}

.save .btn {
  box-shadow: 0rpx 5rpx 10rpx rgba(0, 0, 0, 0.4);
  width: 70%;
  height: 80rpx;
  border-radius: 80rpx;
  background-color: #f23a3a;
  color: #fff;
  justify-content: center;
  align-items: center;
  font-size: 30rpx;
}
</style>
