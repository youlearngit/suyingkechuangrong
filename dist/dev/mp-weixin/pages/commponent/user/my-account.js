"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Math) {
  common_vendor.unref(ListCell)();
}
const ListCell = () => "./list-cell.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my-account",
  props: {
    colors: { type: String, required: true },
    info: { type: null, required: true }
  },
  setup(__props) {
    const props = __props;
    const mycoupon = () => {
      common_vendor.index.navigateTo({
        url: "/pagesMall/user/myCoupon"
      });
    };
    const mypoints = () => {
      common_vendor.index.navigateTo({
        url: "/pages/views/user/mypoints"
      });
    };
    const withdrawa = () => {
      common_vendor.index.navigateTo({
        url: "/pagesMall/user/myWithdrawal?balance=" + props.info.balance
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          icons: "icon-zhanghuzichan",
          colors: __props.colors,
          rightshow: false
        }),
        b: common_vendor.t(__props.info.balance),
        c: common_vendor.o(withdrawa),
        d: common_vendor.t(__props.info.couponCount),
        e: common_vendor.o(mycoupon),
        f: common_vendor.t(0),
        g: common_vendor.o(mypoints)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0c210f0d"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/commponent/user/my-account.vue"]]);
wx.createComponent(Component);
