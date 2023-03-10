<template>
  <view>
    <!--自定义地址选择器-->
    <view class="nyz_area_mask" v-if="show"></view>
    <view :class="'nyz_area_view ' + (show ? 'show':'hide')">
      <view class="nyz_area_view_btns">
        <text class="nyz_area_view_btn_cancle" @tap="show=false">取消</text>
        <text class="nyz_area_view_btn_sure" @tap="handleAreaSelect">确定</text>
      </view>
      <picker-view class="nyz_area_pick_view" indicator-style="height: 35px;" @change="handleAreaChange" :value="value">
        <picker-view-column>
          <view v-for="(item, index) in provinces" :key="index" class="nyz_area_colum_view">{{ item }}</view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item, index) in citys" :key="index" class="nyz_area_colum_view">{{ item }}</view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item, index) in areas" :key="index" class="nyz_area_colum_view">{{ item }}</view>
        </picker-view-column>
      </picker-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {GET} from "../../../common/simpleHttp";

const show = ref(false)
const value = ref<[number, number, number]>([0, 0, 0]) //选择的数据

//动态数据
const provinces = ref<Array<string>>([])
const citys = ref<Array<string>>([])
const areas = ref<Array<string>>([])

const handleAreaChange = (e: any) => {
  const data = e.detail.value as [number, number, number]
  //console.log(data)
  if (value.value[0] !== data[0]) {
    getData(2, provinces.value[data[0]])
  }
  if (value.value[1] !== data[1]) {
    getData(3, citys.value[data[1]])
  }
  value.value = data //更新值
}

const emit = defineEmits(['change'])
//选择
const handleAreaSelect = () => {
  emit('change', [provinces.value[value.value[0]], citys.value[value.value[1]], areas.value[value.value[2]]])
  show.value = false
}

//加载数据
const getData = async (level = 1, name?: string) => {
  const data = await GET<Array<string>>('/config/getAreaName', {level, name})
  if (level === 1) {
    provinces.value = data
    await getData(2, data[0])
  }
  if (level === 2) {
    citys.value = data
    await getData(3, data[0])
  }
  if (level === 3) {
    areas.value = data
  }
}

const getDataList = async (level = 1, name?: string) => {
  const data = await GET<Array<string>>('/config/getAreaName', {level, name})
  if (level === 1) {
    provinces.value = data
  }
  if (level === 2) {
    citys.value = data
  }
  if (level === 3) {
    areas.value = data
  }
}

//打开地址选择
const open = async (province: string, city: string, area: string) => {
  if (province && city && area) {
    await getDataList(1)
    await getDataList(2, province)
    await getDataList(3, city)
    value.value = [
      provinces.value.findIndex(p => p === province),
      citys.value.findIndex(p => p === city),
      areas.value.findIndex(p => p === area)
    ]
  } else {
    await getData()
  }
  show.value = true
}

defineExpose({open})
</script>
<style scoped lang="scss">
.nyz_area_view {
  width: 100%;
  position: fixed;
  bottom: -1000px;
  left: 0px;
  background-color: #fff;
  z-index: 21;
  transition: all 0.3s;
}

.nyz_area_pick_view {
  height: 200px;
  width: 100%;

}

.nyz_area_colum_view {
  line-height: 35px;
  text-align: center;
  font-size: 28rpx;
}

.hide {
  bottom: -1000rpx;
  transition: all 0.3s;
}

.show {
  bottom: 0rpx;
  transition: all 0.3s;
}

.nyz_area_view_btns {
  background-color: #fff;
  border-bottom: 1px solid #eeeeee;
  font-size: 30rpx;
  padding: 18rpx 0rpx;
}

.nyz_area_view_btns > text {
  display: inline-block;
  word-spacing: 4rpx;
  letter-spacing: 4rpx;
}

.nyz_area_view_btn_cancle {
  color: #939393;
  padding-right: 20rpx;
  padding-left: 25rpx;
}

.nyz_area_view_btn_sure {
  float: right;
  padding-left: 20rpx;
  padding-right: 25rpx;
}

.nyz_area_mask {
  width: 100%;
  height: 100vh;
  background-color: rgba(8, 8, 8, 0.8);
  position: absolute;
  top: 0rpx;
  left: 0rpx;
  z-index: 20;
}
</style>
