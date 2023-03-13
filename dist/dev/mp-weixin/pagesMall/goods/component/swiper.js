"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "swiper",
  props: {
    imageList: { type: Array, required: true },
    videoTime: { type: String, required: true },
    videoUrl: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const showVideo = common_vendor.ref(false);
    const currentIndex = common_vendor.ref(1);
    const swiperChange = (e) => {
      currentIndex.value = e.detail.current + 1;
    };
    const preview = (index) => {
      common_vendor.index.previewImage({
        current: index,
        urls: props.imageList
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(__props.imageList, (item, index, i0) => {
          return {
            a: item,
            b: index,
            c: common_vendor.o(($event) => preview(index), index)
          };
        }),
        b: common_vendor.o(swiperChange),
        c: __props.imageList.length !== 0
      }, __props.imageList.length !== 0 ? {
        d: common_vendor.t(currentIndex.value),
        e: common_vendor.t(__props.imageList.length)
      } : {}, {
        f: __props.videoTime !== ""
      }, __props.videoTime !== "" ? {
        g: common_vendor.t(__props.videoTime),
        h: common_vendor.o(($event) => showVideo.value = true)
      } : {}, {
        i: showVideo.value === true
      }, showVideo.value === true ? {
        j: common_vendor.o(($event) => showVideo.value = false),
        k: common_vendor.o(($event) => showVideo.value = false)
      } : {}, {
        l: showVideo.value === true
      }, showVideo.value === true ? common_vendor.e({
        m: showVideo.value === true
      }, showVideo.value === true ? {
        n: __props.videoUrl,
        o: showVideo.value
      } : {}) : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a5f9d79a"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/goods/component/swiper.vue"]]);
wx.createComponent(Component);
