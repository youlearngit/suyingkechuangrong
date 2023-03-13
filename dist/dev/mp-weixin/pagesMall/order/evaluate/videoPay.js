"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "videoPay",
  setup(__props, { expose }) {
    const videoUrl = common_vendor.ref("");
    const showVideo = common_vendor.ref(false);
    const payVideo = (url) => {
      videoUrl.value = url;
      showVideo.value = true;
    };
    expose({ payVideo });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showVideo.value === true
      }, showVideo.value === true ? {
        b: common_vendor.o(($event) => showVideo.value = false),
        c: common_vendor.o(($event) => showVideo.value = false)
      } : {}, {
        d: showVideo.value === true
      }, showVideo.value === true ? common_vendor.e({
        e: showVideo.value === true
      }, showVideo.value === true ? {
        f: videoUrl.value,
        g: showVideo.value
      } : {}) : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0031d17c"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/order/evaluate/videoPay.vue"]]);
wx.createComponent(Component);
