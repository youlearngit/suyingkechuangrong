<template>
  <view class="cencal_order">
    <view class="remark">
      <textarea maxlength="-1" v-model="reason" placeholder="请在此处输入您的退单理由"
                placeholder-class="textarea_p"></textarea>
    </view>
    <view class="tag_box">
      <view v-for="(item, index) in remarkList" :key="index" class="tag_list" @tap="setCurrent(index)">
        <view
            :style="'color:' + (item.current == true ?'#fff':'') + ';background:' + (item.current == true ? colors:'') + ';border:' + (item.current == true ? 'none':'')">
          {{ item.name }}
        </view>
      </view>
    </view>
    <view class="btns" @click="closeOrder" :style="{background: colors}">
      确认提交
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {GlobalStore} from "../../store";
import {onLoad} from "@dcloudio/uni-app";
import {UserStore} from "../../store/modules/user";

const store = GlobalStore()
const colors = store.theme.color


let orderId = 0
onLoad((option: any) => {
  orderId = Number(option.orderId)
})

const remarkList = ref([{
  name: '图案不好看', current: false,
}, {
  name: '性价比太低', current: false,
}, {
  name: '态度不好', current: false,
}, {
  name: '价格不合理', current: false,
}, {
  name: '做工不行', current: false,
}, {
  name: '物流时间长', current: false,
}, {
  name: '价格优惠低', current: false,
}, {
  name: '其他原因', current: false,
}])

const reason = ref("")

//关闭订单
const closeOrder = async () => {
  if (!remarkList.value.some(p => p.current) && !reason.value) {
    uni.$u.toast('请选择一个理由！')
    return
  }
  let msg = reason.value
  const list = remarkList.value.map(p => p.name)
  if (list.length > 0) {
    if(msg){
      msg += ","
    }
    msg += list.join(",")
  }
  await uni.$u.http.get("/wx/cancelOrder/" + orderId, {data: {msg}})
  uni.$u.toast('订单取消成功')
  const userStore = UserStore()
  await userStore.updateAccount()//更新账户信息
  setTimeout(() => {
    //跳转我的
    uni.switchTab({
      url: '/pages/tabbar/user/user'
    });
  }, 300)
}

const setCurrent = (index: number) => {
  remarkList.value[index].current = !remarkList.value[index].current
}
</script>
<style lang="scss" scoped>
page {
  background-color: #F5F5FA;
}

.cencal_order {
  padding: 20rpx 4%;
  background-color: #fff;
}

.remark {
  background-color: #F5F5F5;
  border-radius: 10rpx;
  height: 60vw;
  padding: 20rpx;
  margin-top: 20rpx;

  textarea {
    font-size: 26rpx;
    color: #797979;
  }
}

.textarea_p {
  font-size: 24rpx;
  color: #797979;
}

.tag_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 40rpx;
}

.tag_box::after {
  content: '';
  width: 30%;
}

.tag_list {
  max-width: 24%;
  min-width: 24%;
  text-align: center;
  margin-bottom: 30rpx;
}

.tag_list view {
  height: 60rpx;
  line-height: 60rpx;
  border-radius: 30rpx;
  border: 1rpx solid #ddd;
  font-size: 22rpx;
  color: #303030;
}

.btns {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 30rpx;
  color: #FFFFFF;
  text-align: center;
  margin-top: 100rpx;
  border-radius: 8rpx;
}
</style>
