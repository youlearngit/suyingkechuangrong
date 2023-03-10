<template>
  <view class="category">
    <view class="search">
      <search-view class="search_box"></search-view>
    </view>
    <Cate :colors="colors"></Cate>
  </view>
</template>

<script setup lang="ts">
import SearchView from "../../commponent/public/search";
import Cate from "../../commponent/cate/cate";
import useGlobal from "../../../hooks/useGlobal";
import {GlobalStore} from "../../../store";
import {computed} from "vue";
//全局监听
useGlobal()
const store = GlobalStore()
const colors = computed(() => {
  return store.theme.color
})

</script>
<style scoped lang="scss">
.category {
  background-color: #ffffff;
  position: fixed;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  top: 0;
  bottom: 0;
  z-index: 10;
}

.search {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15rpx;
}

.search_box {
  width: 94vw;
  padding: 0 3vw;
}

</style>
