"use strict";
var common_vendor = require("../../common/vendor.js");
var common_utils = require("../../common/utils.js");
var hooks_useRouter = require("../../hooks/useRouter.js");
var pagesMall_order_orderUtils = require("./orderUtils.js");
require("../../hooks/useAuth.js");
require("../../store/index.js");
require("../../common/login.js");
require("../../store/modules/cart.js");
require("../../store/modules/user.js");
require("../../common/userApi.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderItem",
  props: {
    info: { type: null, required: true },
    colors: { type: String, required: true }
  },
  emits: ["refresh"],
  setup(__props, { emit }) {
    const props = __props;
    common_vendor.useCssVars((_ctx) => ({
      "d792e040-colors": __props.colors
    }));
    const router = hooks_useRouter.useRouter();
    const goToPay = async () => {
      common_vendor.index.showModal({
        cancelColor: "#999",
        confirmColor: props.colors,
        title: "\u4ED8\u6B3E\u786E\u8BA4",
        content: "\u662F\u5426\u652F\u4ED8\u5F53\u524D\u8BA2\u5355\uFF01",
        success: async (res) => {
          if (res.confirm) {
            const { data } = await common_vendor.index.$u.http.post("/wx/payOrder/" + props.info.orderId);
            if (props.info.payMethod === 1) {
              await router.GoToWechatPay(data);
            } else {
              common_vendor.index.$u.toast("\u652F\u4ED8\u6210\u529F");
              setTimeout(() => {
                emit("refresh");
              }, 200);
            }
          }
        }
      });
    };
    const cancelOrder = () => {
      common_vendor.index.navigateTo({
        url: "/pagesMall/order/cancelOrder?orderId=" + props.info.orderId
      });
    };
    const goToDetails = () => {
      common_vendor.index.navigateTo({
        url: "/pagesMall/order/orderDetails?orderId=" + props.info.orderId
      });
    };
    const goToLogistics = () => {
      common_vendor.index.navigateTo({
        url: "/pagesMall/order/orderLogistics?orderId=" + props.info.orderId
      });
    };
    const delOrder = () => {
      common_vendor.index.showModal({
        cancelColor: "#999",
        confirmColor: props.colors,
        title: "\u8BA2\u5355\u64CD\u4F5C",
        content: "\u662F\u5426\u5220\u9664\u5F53\u524D\u8BA2\u5355\uFF01",
        success: async (res) => {
          if (res.confirm) {
            await common_vendor.index.$u.http.post("/wx/orderDelete/" + props.info.orderId);
            common_vendor.index.$u.toast("\u5220\u9664\u6210\u529F\uFF01");
            setTimeout(() => {
              emit("refresh");
            }, 200);
          }
        }
      });
    };
    const orderSign = () => {
      common_vendor.index.showModal({
        cancelColor: "#999",
        confirmColor: props.colors,
        title: "\u7B7E\u6536\u786E\u8BA4",
        content: "\u5F53\u524D\u5546\u54C1\u662F\u5426\u5DF2\u6536\u5230\uFF01",
        success: async (res) => {
          if (res.confirm) {
            await common_vendor.index.$u.http.post("/wx/orderSign/" + props.info.orderId);
            common_vendor.index.$u.toast("\u7B7E\u6536\u6210\u529F");
            setTimeout(() => {
              emit("refresh");
            }, 200);
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(__props.info.orderNo),
        b: common_vendor.t(common_vendor.unref(pagesMall_order_orderUtils.setStatus)(__props.info.status)),
        c: common_vendor.s("color:" + __props.colors),
        d: common_vendor.f(__props.info.itemList, (row, index2, i0) => {
          return {
            a: row.pic,
            b: common_vendor.t(row.goodsTitle),
            c: common_vendor.t(common_vendor.unref(common_utils.SkuPrint)(row.spData)),
            d: common_vendor.t(row.price),
            e: common_vendor.t(row.shopCount),
            f: index2,
            g: common_vendor.o(goToDetails, index2)
          };
        }),
        e: common_vendor.t(__props.info.address),
        f: __props.info.itemList[0].itemStatus === -1
      }, __props.info.itemList[0].itemStatus === -1 ? {
        g: common_vendor.o(delOrder)
      } : {}, {
        h: __props.info.itemList[0].itemStatus === 0
      }, __props.info.itemList[0].itemStatus === 0 ? {
        i: common_vendor.s("color:#fff;background:" + __props.colors + ";border-color:" + __props.colors),
        j: common_vendor.o(goToPay),
        k: common_vendor.s("color:" + __props.colors + ";border-color:" + __props.colors),
        l: common_vendor.o(cancelOrder)
      } : {}, {
        m: __props.info.itemList[0].itemStatus === 2
      }, __props.info.itemList[0].itemStatus === 2 ? {
        n: common_vendor.s("color:" + __props.colors + ";border-color:" + __props.colors),
        o: common_vendor.o(cancelOrder)
      } : {}, {
        p: __props.info.itemList[0].itemStatus === 3
      }, __props.info.itemList[0].itemStatus === 3 ? {
        q: common_vendor.o(orderSign),
        r: common_vendor.s("color:#fff;background:" + __props.colors + ";border-color:" + __props.colors),
        s: common_vendor.s("color:" + __props.colors + ";border-color:" + __props.colors),
        t: common_vendor.o(goToLogistics)
      } : {}, {
        v: __props.info.itemList[0].itemStatus === 4
      }, __props.info.itemList[0].itemStatus === 4 ? {
        w: common_vendor.s("color:" + __props.colors + ";border-color:" + __props.colors),
        x: common_vendor.o(goToDetails),
        y: common_vendor.o(goToDetails)
      } : {}, {
        z: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d792e040"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/order/orderItem.vue"]]);
wx.createComponent(Component);
