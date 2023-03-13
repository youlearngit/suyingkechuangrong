"use strict";
var common_vendor = require("../../../common/vendor.js");
var hooks_useAuth = require("../../../hooks/useAuth.js");
require("../../../store/index.js");
require("../../../common/login.js");
require("../../../store/modules/cart.js");
require("../../../store/modules/user.js");
require("../../../common/utils.js");
require("../../../common/userApi.js");
if (!Array) {
  const _easycom_u_badge2 = common_vendor.resolveComponent("u-badge");
  _easycom_u_badge2();
}
const _easycom_u_badge = () => "../../../node-modules/uview-plus/components/u-badge/u-badge.js";
if (!Math) {
  (common_vendor.unref(ListCell) + _easycom_u_badge)();
}
const ListCell = () => "./list-cell.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my-order",
  props: {
    colors: { type: String, required: true },
    info: { type: null, required: true }
  },
  setup(__props) {
    const auth = hooks_useAuth.useAuth();
    const jumpOrder = async (item, index) => {
      const flag = await auth.isLogin();
      if (!flag)
        return;
      if (index < 4) {
        common_vendor.index.navigateTo({
          url: "/pagesMall/order/orderList?active=" + (index + 1)
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pagesMall/order/afterSaleList?active=1"
        });
      }
    };
    const orderText = [{
      name: "\u5F85\u4ED8\u6B3E",
      icon: "icon-daifukuan",
      url: "",
      status: 0
    }, {
      name: "\u5F85\u53D1\u8D27",
      icon: "icon-31daifahuo",
      url: "",
      status: 2
    }, {
      name: "\u5F85\u6536\u8D27",
      icon: "icon-daishouhuo",
      url: "",
      status: 3
    }, {
      name: "\u5F85\u8BC4\u4EF7",
      icon: "icon-daipingjia",
      url: "",
      status: 4
    }, {
      name: "\u552E\u540E",
      icon: "icon-shouhou",
      url: "/pages/views/order/afterSaleList",
      status: 100
    }];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          icons: "icon-order01",
          linkUrl: "/pagesMall/order/orderList?active=0",
          colors: __props.colors
        }),
        b: common_vendor.f(orderText, (item, index, i0) => {
          return {
            a: "8c21b4a4-1-" + i0,
            b: common_vendor.p({
              absolute: true,
              bgColor: __props.colors,
              shape: "horn",
              color: "#fff",
              offset: [-10, -18],
              max: "99",
              value: __props.info["order_" + item.status]
            }),
            c: common_vendor.n("iconfont " + item.icon),
            d: common_vendor.t(item.name),
            e: index,
            f: common_vendor.o(($event) => jumpOrder(item, index), index)
          };
        }),
        c: common_vendor.s("color:" + __props.colors)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8c21b4a4"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/commponent/user/my-order.vue"]]);
wx.createComponent(Component);
