<template>
  <view>
    <view class="editaddress">
      <view class="content">
        <view class="row">
          <view class="nominal">收件人</view>
          <view class="input">
            <u-input placeholder="请输入收件人姓名" border="none" v-model="info.nickName" type="text"></u-input>
          </view>
        </view>
        <view class="row">
          <view class="nominal">电话号码</view>
          <view class="input">
            <u-input placeholder="请输入收件人电话号码" v-model="info.mobile" border="none" type="number" maxlength="11"></u-input>
          </view>
        </view>
        <view class="row">
          <view class="nominal">所在地区</view>
          <view class="input selectcity" @tap="openArea">
            <u-input placeholder="请选择省市区" disabled border="none" disabledColor="#ffffff" type="text" v-model="info.areas"></u-input>
            <image src="/static/images/home/right.png" class="rights"></image>
          </view>
        </view>
        <view class="row">
          <view class="nominal">详细地址</view>
          <view class="input">
            <u--textarea style="width: 100%" v-model="info.details" placeholder="输入详细地址"></u--textarea>
          </view>
        </view>
        <view class="row">
          <view class="nominal" style="color: #999;margin-top: 10rpx;">设为默认地址</view>
          <view class="input switch">
            <u-switch v-model="info.status" :activeColor="colors" :activeValue="2" :inactiveValue="1"></u-switch>
          </view>
        </view>
      </view>
      <view class="save">
        <view class="btn" :style="'background:' + colors" @click="saveInfo">保存地址</view>
      </view>
      <!-- 省市区选择 -->
      <area-picker ref="areaRef" @change="changeArea"></area-picker>
    </view>
  </view>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {GlobalStore} from "../../../store";
import {computed} from "vue";
import AreaPicker from "./area_picker.vue"
import {onLoad} from "@dcloudio/uni-app";

const store = GlobalStore()
const colors = computed(() => {
  return store.theme.color
})

const info = reactive<Partial<Wechat.ReceiveAddr>>({})
//加载
onLoad(async (option: any) => {
  if (option.item) {
    const item = JSON.parse(decodeURIComponent(option.item)) as Wechat.ReceiveAddr;
    info.id = item.id
    info.nickName = item.nickName
    info.mobile = item.mobile
    info.province = item.province
    info.city = item.city
    info.district = item.district
    info.status = item.status
    info.details = item.details
    info.areas = item.province + item.city + item.district
  }
  if (option.type) {
    uni.setNavigationBarTitle({
      title: "新增收货地址"
    })
  }
})

const areaRef = ref()
const openArea = () => {
  areaRef.value.open(info.province,info.city,info.district)
}
const changeArea = (area: [string, string, string]) => {
  info.province = area[0]
  info.city = area[1]
  info.district = area[2]
  //区域
  info.areas = area[0] + area[1] + area[2]
}
//保持数据
const saveInfo = () => {
  if (!info.areas || !info.nickName || !info.mobile || !info.details) {
    uni.$u.toast('缺少必填字段！')
    return
  }
  const data = {...info}
  delete data.areas
  uni.$u.http.post("/wx/createReceiveAddr", data).then(() => {
    uni.$u.toast('保存成功！')
    uni.navigateBack({delta: -1})
  })
}
</script>
<style lang="scss" scoped>
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

.save .btn .icon {
  height: 80rpx;
  color: #fff;
  font-size: 30rpx;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40rpx;
}

.content view {
  display: flex;
}

.content .row {
  width: 92%;
  margin: 0 4%;
  border-bottom: solid 1rpx #eee;
}

.content .row .nominal {
  width: 30%;
  height: 80rpx;
  font-size: 28rpx;
  font-family: Droid Sans Fallback;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  align-items: center;
}

.content .row .input {
  width: 70%;
  padding: 20rpx 0;
  align-items: center;
  font-size: 28rpx;

}

.content .row .input input {
  font-size: 28rpx;
  color: #333333;
}

.content .row .switch {
  justify-content: flex-end;
}

.content .row .input textarea {
  min-height: 40rpx;
  line-height: 40rpx;
}

.content .del_box {
  width: 100%;
  display: block;
  overflow: hidden;
  margin-right: 30rpx;
}

.content .del {
  width: 240rpx;
  height: 80rpx;
  float: right;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  color: #F23A3A;
  margin: 50rpx auto 0;
  border-radius: 38rpx;
  background-color: rgba(255, 0, 0, 0.05);
  border-bottom: solid 1rpx #eee;
}

.selectcity u-input {
  width: 90%;
}

.selectcity image {
  width: 40rpx;
  height: 40rpx;
  float: right;
}
</style>
