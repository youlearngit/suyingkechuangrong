"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
var store_modules_user = require("../../store/modules/user.js");
require("../../common/utils.js");
require("../../common/userApi.js");
require("../../hooks/useAuth.js");
require("../../common/login.js");
require("../../store/modules/cart.js");
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  _easycom_u_loading_icon2();
}
const _easycom_u_loading_icon = () => "../../node-modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
if (!Math) {
  _easycom_u_loading_icon();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "wxPay",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "8c3aaa34-colors": common_vendor.unref(colors)
    }));
    const totalAmount = common_vendor.ref(0);
    const payFlag = common_vendor.ref(0);
    let data;
    common_vendor.onLoad(async (option) => {
      data = JSON.parse(decodeURIComponent(option.data));
      if (!data.totalAmount) {
        jumpMyOrder();
        return;
      }
      totalAmount.value = data.totalAmount;
      paying();
    });
    const paying = () => {
      payFlag.value = 0;
      common_vendor.index.requestPayment(
        {
          "provider": "wxpay",
          "orderInfo": "\u8BA2\u5355\u652F\u4ED8",
          "timeStamp": data.timeStamp,
          "nonceStr": data.nonceStr,
          "package": data.package,
          "signType": data.signType,
          "paySign": data.paySign,
          "success": (res) => {
            payFlag.value = 1;
            const userStore = store_modules_user.UserStore();
            userStore.updateAccount();
          },
          "fail": (res) => {
            payFlag.value = 2;
          },
          "complete": (res) => {
          }
        }
      );
    };
    const store = store_index.GlobalStore();
    const colors = store.theme.color;
    const onSuccess = () => {
      if (payFlag.value !== 1) {
        paying();
      } else {
        jumpMyOrder();
      }
    };
    const jumpMyOrder = () => {
      common_vendor.index.redirectTo({
        url: "/pagesMall/order/orderList?active=0"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(totalAmount.value),
        b: payFlag.value === 0
      }, payFlag.value === 0 ? {
        c: common_vendor.p({
          size: 44,
          color: "red"
        })
      } : common_vendor.e({
        d: payFlag.value === 1
      }, payFlag.value === 1 ? {} : {}, {
        e: payFlag.value === 3
      }, payFlag.value === 3 ? {} : {}, {
        f: payFlag.value === 2
      }, payFlag.value === 2 ? {} : {}, {
        g: payFlag.value === 1
      }, payFlag.value === 1 ? {} : {}, {
        h: common_vendor.o(onSuccess),
        i: common_vendor.s("color:" + common_vendor.unref(colors) + ";border-color:" + common_vendor.unref(colors)),
        j: common_vendor.o(jumpMyOrder)
      }), {
        k: common_vendor.s({
          background: common_vendor.unref(colors)
        }),
        l: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8c3aaa34"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/order/wxPay.vue"]]);
wx.createPage(MiniProgramPage);
