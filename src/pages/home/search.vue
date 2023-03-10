<template>
  <view class="content">
    <view class="search-box">
      <view class="input-box">
        <input type="text" adjust-position="true" v-model="keyword" placeholder-class="search_text" @confirm="doSearch"
               data-key="false" confirm-type="search"/>
        <image src="/static/images/search/close.png" mode @tap="clears" v-if="keyword"></image>
      </view>
      <view class="search-btn" @tap="doSearch" data-key="false" :style="'background:' + colors">搜索</view>
    </view>
    <view class="search-keyword">
      <scroll-view class="keyword-box" v-if="hotKeywordList.length>0" scroll-y>
        <view class="keyword-block">
          <view class="keyword-list-header">
            <view>热门搜索</view>
          </view>
          <view class="keyword">
            <view v-for="(item, index) in hotKeywordList" :key="index" @tap="onSearch(item)">{{ item }}</view>
          </view>
        </view>
      </scroll-view>
      <scroll-view class="keyword-box" v-if="oldKeywordList.length>0" scroll-y>
        <view class="keyword-block">
          <view class="keyword-list-header">
            <view>历史搜索</view>
            <view>
              <image @tap="oldDelete" src="/static/images/search/delete.png"></image>
            </view>
          </view>
          <view class="keyword">
            <view v-for="(item, index) in oldKeywordList" :key="index" @tap="onSearch(item)">{{ item }}</view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {HomeStore} from "../../store/modules/home";
import {GlobalStore} from "../../store";
//获取颜色
const store = GlobalStore()
const colors = store.theme.color
//数据
const homeStore = HomeStore()
const oldKeywordList = computed(() => {
  return homeStore.keywordList
})


//热词
const hotKeywordList = computed(() => {
  if (homeStore.dictMap['hot-search']) {
    return homeStore.dictMap['hot-search'].map(p => {
      return p.value
    })
  } else {
    return []
  }
})

//搜索
const keyword = ref("")
const doSearch = () => {
  if (keyword.value) {
    if (homeStore.keywordList.findIndex(p => keyword.value === p) === -1) {
      homeStore.keywordList.unshift(keyword.value)
    }
    onSearch(keyword.value)
  }
}
const clears = () => {
  keyword.value = ""
}

const onSearch = (text: string) => {
  uni.navigateTo({
    url: `/pages/home/classList?text=${text}`
  });
}

const oldDelete = () => {
  uni.showModal({
    cancelColor: '#999',
    confirmColor: colors,
    title: '提示',
    content: '是否清空历史搜索！',
    success: async (res) => {
      if (res.confirm) {
        homeStore.clearsKeywordList()
      }
    }
  });
}
</script>
<style scoped lang="scss">
view {
  display: block;
}

.search-box {
  background-color: rgb(242, 242, 242);
  padding: 15rpx 2.5%;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
}

.search-box .mSearch-input-box {
  width: 100%;
}

.search-box .input-box {
  width: 85%;
  flex-shrink: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-box .search-btn {
  width: 15%;
  margin: 0 0 0 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-size: 24rpx;
  color: #fff;
  background: linear-gradient(to right, #4492EB, #3F92EE);
  border-radius: 60rpx;
}

.search-box .input-box > input {
  width: 95%;
  height: 60rpx;
  font-size: 24rpx;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
  background-color: #ffffff;
}

.placeholder-class {
  color: #9e9e9e;
}

.search-keyword {
  width: 100%;
  background-color: rgb(242, 242, 242);
}

.keyword-box {
  min-height: 100rpx;
  border-radius: 20rpx 20rpx 0 0;
  background-color: #fff;
}

.keyword-box .keyword-block {
  padding: 10rpx 0;
}

.keyword-box .keyword-block .keyword-list-header {
  width: 94%;
  padding: 10rpx 3%;
  font-size: 27rpx;
  color: #333;
  display: flex;
  justify-content: space-between;
}

.keyword-box .keyword-block .keyword-list-header image {
  width: 40rpx;
  height: 40rpx;
}

.keyword-box .keyword-block .keyword {
  width: 94%;
  padding: 3px 3%;
  display: flex;
  flex-flow: wrap;
  justify-content: flex-start;
}

.keyword-box .keyword-block .hide-hot-tis {
  display: flex;
  justify-content: center;
  font-size: 28rpx;
  color: #6b6b6b;
}

.keyword-box .keyword-block .keyword > view {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 38rpx;
  padding: 0 20rpx;
  margin: 10rpx 20rpx 10rpx 0;
  height: 60rpx;
  font-size: 24rpx;
  background-color: rgb(242, 242, 242);
  color: #6b6b6b;
  line-height: 60rpx;
}

.search_text {
  font-size: 24rpx;
  color: #B6B6C6;
}

.input-box {
  position: relative;
  height: 60rpx;
  font-size: 24rpx;
  border: 0;
  border-radius: 60rpx;
  -webkit-appearance: none;
  appearance: none;
  padding: 0 3%;
  margin: 0;
  background-color: #ffffff;
}

.input-box image {
  height: 40rpx;
  width: 40rpx;
  float: right;
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
}
</style>