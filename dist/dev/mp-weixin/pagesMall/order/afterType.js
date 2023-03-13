"use strict";
var common_vendor = require("../../common/vendor.js");
var common_utils = require("../../common/utils.js");
var store_index = require("../../store/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "afterType",
  setup(__props) {
    const store = store_index.GlobalStore();
    const colors = store.theme.color;
    const item = common_vendor.ref({});
    common_vendor.onLoad((option) => {
      item.value = JSON.parse(decodeURIComponent(option.data));
    });
    const goTo = (type) => {
      const data = encodeURIComponent(JSON.stringify(item.value));
      common_vendor.index.navigateTo({
        url: "/pagesMall/order/afterSale?type=" + type + "&data=" + data
      });
    };
    return (_ctx, _cache) => {
      return {
        a: item.value.pic,
        b: common_vendor.t(item.value.goodsTitle),
        c: common_vendor.t(common_vendor.unref(common_utils.SkuPrint)(item.value.spData)),
        d: common_vendor.t(item.value.price),
        e: common_vendor.unref(colors),
        f: common_vendor.t(item.value.shopCount),
        g: common_vendor.o(($event) => goTo(0)),
        h: common_vendor.o(($event) => goTo(1))
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0c844915"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/order/afterType.vue"]]);
wx.createPage(MiniProgramPage);
