<template>
  <view>
    <view v-for="(content, index) in contentArr" :key="index">
      <rich-text :nodes="content" @click="getClickInfo"></rich-text>
      <video v-if="videoArr[index] !== null" :src="videoArr[index]" controls :style="{ width }"></video>
    </view>
  </view>
</template>

<script>
export default {
  name: 'bctos-rich-text',
  props: {nodes: {}, width: {type: String, default: '100%'}},
  data() {
    return {
      contentArr: [],
      imageList: [],
      videoArr: []
    };
  },
  watch: {
    nodes(val) {
      if (val) {
        this.parseVideo();
      }
    }
  },
  mounted() {
    this.parseVideo();
  },
  methods: {
    getClickInfo() {
      if (this.imageList.length > 0) {
        wx.previewImage({
          urls: this.imageList
        })
      }
    },
    parseVideo() {
      if (typeof this.nodes != 'string') {
        //不是HTML字符串格式的暂不处理
        this.contentArr[0] = this.nodes;
        this.videoArr[0] = null;
        return false;
      }
      //同步解决如果图片太大超出手机显示界面的问题

      let nodes = this.nodes.replace(/\<img/g, '<img style="max-width:100%!important;height:auto;"');
      let arr = nodes.split('</video>');
      let reg = /<video([\s\S]*)/g;
      for (let i in arr) {
        const item = arr[i];
        const urlMatch = item.match(/<video[\s\S]*src=\"(.*?)\"/);
        if (urlMatch && urlMatch.length > 1) {
          this.videoArr[i] = urlMatch[1];
        } else {
          this.videoArr[i] = null;
        }
        this.contentArr[i] = item.replace(reg, '');
      }
      //图片
      if (this.imageList.length === 0) {
        this.nodes.replace(/]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
          if (capture.indexOf('.mp4') === -1) {
            this.imageList.push(capture)
          }
        })
      }


      this.$forceUpdate()
    }
  }
};
</script>

<style></style>
