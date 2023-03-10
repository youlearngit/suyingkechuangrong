<template>
  <view class="content">
    <bctos-rich-text :nodes="detailHtml"></bctos-rich-text>
  </view>
</template>

<!--广告富文本展示-->
<script setup lang="ts" name="advertDetails">
import BctosRichText from "./component/bctos-rich-text.vue"

import {onLoad} from "@dcloudio/uni-app";
import {GET} from "../../common/simpleHttp";
import {ref} from "vue";

const detailHtml = ref("")
//入口
onLoad(async (option) => {
  if (option.id) {
    const data = await GET<App.Advert>("/public/getAdvertById/" + option.id)
    detailHtml.value = data.html
  }
})
</script>

<style lang="scss" scoped>
.content{
  padding: 20rpx 4%;
}
</style>