"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_rate2 = common_vendor.resolveComponent("u-rate");
  _easycom_u_rate2();
}
const _easycom_u_rate = () => "../../../node-modules/uview-plus/components/u-rate/u-rate.js";
if (!Math) {
  _easycom_u_rate();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "evaluateInfo",
  props: {
    info: { type: null, required: true },
    colors: { type: String, required: true }
  },
  emits: ["showVideo"],
  setup(__props, { emit }) {
    const props = __props;
    const images = common_vendor.ref();
    const info = common_vendor.computed$1(() => {
      if (props.info) {
        images.value = JSON.parse(props.info.albumPics);
        return props.info;
      }
    });
    const showVideo = (url) => {
      emit("showVideo", url);
    };
    const previewImg = (url) => {
      let arr = [];
      arr[0] = url;
      common_vendor.index.previewImage({
        urls: arr
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(info).avatarUrl,
        b: common_vendor.t(common_vendor.unref(info).nickName),
        c: common_vendor.t(common_vendor.unref(info).createdAt),
        d: common_vendor.t(common_vendor.unref(info).spData),
        e: common_vendor.o(($event) => common_vendor.unref(info).score = $event),
        f: common_vendor.p({
          readonly: true,
          activeColor: __props.colors,
          modelValue: common_vendor.unref(info).score
        }),
        g: common_vendor.t(common_vendor.unref(info).comment),
        h: common_vendor.f(images.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.type === 1
          }, item.type === 1 ? {
            b: item.url,
            c: common_vendor.o(($event) => previewImg(item.url))
          } : {}, {
            d: item.type === 2
          }, item.type === 2 ? {
            e: common_vendor.o(($event) => showVideo(item.url)),
            f: item.url,
            g: item.poster
          } : {}, {
            h: index
          });
        }),
        i: common_vendor.unref(info).reply
      }, common_vendor.unref(info).reply ? {
        j: common_vendor.t(common_vendor.unref(info).reply)
      } : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-24e8f23c"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/goods/component/evaluateInfo.vue"]]);
wx.createComponent(Component);
