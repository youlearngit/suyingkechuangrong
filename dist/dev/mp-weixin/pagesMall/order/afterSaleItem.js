"use strict";
var common_vendor = require("../../common/vendor.js");
var hooks_useRouter = require("../../hooks/useRouter.js");
var common_utils = require("../../common/utils.js");
var pagesMall_order_orderUtils = require("./orderUtils.js");
require("../../hooks/useAuth.js");
require("../../store/index.js");
require("../../common/login.js");
require("../../store/modules/cart.js");
require("../../store/modules/user.js");
require("../../common/userApi.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "afterSaleItem",
  props: {
    info: { type: null, required: true },
    colors: { type: String, required: true }
  },
  emits: ["refresh"],
  setup(__props, { emit }) {
    const props = __props;
    common_vendor.useCssVars((_ctx) => ({
      "5b769756-colors": __props.colors
    }));
    hooks_useRouter.useRouter();
    const goToDetails = () => {
      const data = encodeURIComponent(JSON.stringify(props.info));
      common_vendor.index.navigateTo({
        url: "/pagesMall/order/afterSale?show=true&type=" + props.info.returnType + "&data=" + data
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.info.orderNo + "_" + __props.info.refundId),
        b: common_vendor.t(common_vendor.unref(pagesMall_order_orderUtils.refundStatus)(__props.info.returnStatus)),
        c: common_vendor.s("color:" + __props.colors),
        d: __props.info.pic,
        e: common_vendor.t(__props.info.goodsTitle),
        f: common_vendor.t(common_vendor.unref(common_utils.SkuPrint)(__props.info.spData)),
        g: common_vendor.t(__props.info.price),
        h: common_vendor.t(__props.info.shopCount),
        i: common_vendor.o(goToDetails),
        j: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5b769756"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/order/afterSaleItem.vue"]]);
wx.createComponent(Component);
