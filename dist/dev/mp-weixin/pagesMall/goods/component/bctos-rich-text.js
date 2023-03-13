"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "bctos-rich-text",
  props: { nodes: {}, width: { type: String, default: "100%" } },
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
        });
      }
    },
    parseVideo() {
      if (typeof this.nodes != "string") {
        this.contentArr[0] = this.nodes;
        this.videoArr[0] = null;
        return false;
      }
      let nodes = this.nodes.replace(/\<img/g, '<img style="max-width:100%!important;height:auto;"');
      let arr = nodes.split("</video>");
      let reg = /<video([\s\S]*)/g;
      for (let i in arr) {
        const item = arr[i];
        const urlMatch = item.match(/<video[\s\S]*src=\"(.*?)\"/);
        if (urlMatch && urlMatch.length > 1) {
          this.videoArr[i] = urlMatch[1];
        } else {
          this.videoArr[i] = null;
        }
        this.contentArr[i] = item.replace(reg, "");
      }
      if (this.imageList.length === 0) {
        this.nodes.replace(/]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
          if (capture.indexOf(".mp4") === -1) {
            this.imageList.push(capture);
          }
        });
      }
      this.$forceUpdate();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.contentArr, (content, index, i0) => {
      return common_vendor.e({
        a: content,
        b: $data.videoArr[index] !== null
      }, $data.videoArr[index] !== null ? {
        c: $data.videoArr[index],
        d: $props.width
      } : {}, {
        e: index
      });
    }),
    b: common_vendor.o((...args) => $options.getClickInfo && $options.getClickInfo(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/goods/component/bctos-rich-text.vue"]]);
wx.createComponent(Component);
