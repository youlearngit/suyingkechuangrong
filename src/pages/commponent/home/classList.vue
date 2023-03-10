<template>
  <view class="category-list">
    <view v-for="(item, index) in categoryList" :key="index" class="category" @tap="jumpList(item,index)">
      <view class="class_img">
        <image :src="item.pic" class="imgs"></image>
      </view>
      <view class="text">{{ item.name }}</view>
    </view>
  </view>
</template>
<script setup lang="ts">
import {computed, onMounted} from "vue";
import {HomeStore} from "../../../store/modules/home";


const homeStore = HomeStore()
const categoryList = computed<Array<Goods.Category>>(() => {
  // if (homeStore.categoryList) {
  //   if (homeStore.categoryList.length > 10) {
  //     return homeStore.categoryList.slice(0, 10)
  //   }else {
  //     return homeStore.categoryList
  //   }
  // }
  return [
	  {name:'找项目',pic:'/static/images/sykcr/findProject.png'},
	  {name:'找技术',pic:'/static/images/sykcr/findService.png'},
	  {name:'找服务',pic:'/static/images/sykcr/findTechnique.png'},
  ]
})
//刷新分类
onMounted( () => {
  homeStore.updateCategoryList()
})

const jumpList = (item: Goods.Category,index) => {
	console.log(index)
	if(index==0){
		uni.navigateTo({
			url:'/pages/project/index/index'
		})
	}
  // uni.navigateTo({
  //   url: '/pages/home/classList?categoryId=' + item.id
  // });
}
</script>
<style scoped lang="scss">
.category-list {
  width: 100%;
  
  display: flex;
  flex-wrap: wrap;
  border-radius: 10rpx;
  margin: 60rpx 0;
}

.category {
  width: 33%;
  
  display: flex;
  flex-wrap: wrap;
}

.category:active {
  opacity: 0.8;
}

.category .class_img {
  width: 100%;
  display: flex;
  justify-content: center;

  .imgs {
    width: 98rpx;
    height: 98rpx;
  }
}

.text {
  margin-top: 16rpx;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 28rpx;
  color: #3c3c3c;
  font-weight: 500;
}
</style>
