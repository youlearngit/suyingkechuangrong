"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
var common_utils = require("../../common/utils.js");
var hooks_useRouter = require("../../hooks/useRouter.js");
var store_modules_user = require("../../store/modules/user.js");
var pagesMall_order_orderUtils = require("./orderUtils.js");
require("../../hooks/useAuth.js");
require("../../common/login.js");
require("../../store/modules/cart.js");
require("../../common/userApi.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderDetails",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "71ebf805-colors": common_vendor.unref(colors)
    }));
    const store = store_index.GlobalStore();
    const colors = store.theme.color;
    const info = common_vendor.ref({});
    let orderId = 0;
    common_vendor.onLoad((options) => {
      orderId = options.orderId;
    });
    common_vendor.onShow(async () => {
      const { data } = await common_vendor.index.$u.http.get("/wx/getOrderInfo/" + orderId);
      info.value = data;
    });
    const cancelOrder = () => {
      common_vendor.index.navigateTo({
        url: "/pagesMall/order/cancelOrder?orderId=" + info.value.orderId
      });
    };
    const onCopy = (value) => {
      common_vendor.index.setClipboardData({
        data: value,
        success: function() {
          common_vendor.index.showToast({
            title: "\u590D\u5236\u6210\u529F",
            icon: "none"
          });
        }
      });
    };
    const onEvaluate = (item) => {
      const data = encodeURIComponent(JSON.stringify(item));
      common_vendor.index.navigateTo({
        url: `/pagesMall/order/evaluate/evaluate?data=${data}`
      });
    };
    const afterSale = (item) => {
      const data = encodeURIComponent(JSON.stringify(item));
      common_vendor.index.navigateTo({
        url: `/pagesMall/order/afterType?data=${data}`
      });
    };
    const afterSaleShow = async (item) => {
      const { data } = await common_vendor.index.$u.http.get("/wx/getReturnOrder/" + item.itemId);
      const info2 = encodeURIComponent(JSON.stringify(data));
      common_vendor.index.navigateTo({
        url: "/pagesMall/order/afterSale?show=true&type=" + data.returnType + "&data=" + info2
      });
    };
    const goToLogistics = () => {
      common_vendor.index.navigateTo({
        url: "/pagesMall/order/orderLogistics?orderId=" + info.value.orderId
      });
    };
    const orderSign = () => {
      common_vendor.index.showModal({
        cancelColor: "#999",
        confirmColor: colors,
        title: "\u7B7E\u6536\u786E\u8BA4",
        content: "\u5F53\u524D\u5546\u54C1\u662F\u5426\u5DF2\u6536\u5230\uFF01",
        success: async (res) => {
          if (res.confirm) {
            await common_vendor.index.$u.http.post("/wx/orderSign/" + info.value.orderId);
            common_vendor.index.$u.toast("\u7B7E\u6536\u6210\u529F");
            const userStore = store_modules_user.UserStore();
            await userStore.updateAccount();
            setTimeout(() => {
              common_vendor.index.switchTab({
                url: "/pages/tabbar/user/user"
              });
            }, 300);
          }
        }
      });
    };
    const router = hooks_useRouter.useRouter();
    const goToPay = async () => {
      common_vendor.index.showModal({
        cancelColor: "#999",
        confirmColor: colors,
        title: "\u4ED8\u6B3E\u786E\u8BA4",
        content: "\u662F\u5426\u652F\u4ED8\u5F53\u524D\u8BA2\u5355\uFF01",
        success: async (res) => {
          if (res.confirm) {
            const { data } = await common_vendor.index.$u.http.post("/wx/payOrder/" + info.value.orderId);
            if (info.value.payMethod === 1) {
              await router.GoToWechatPay(data);
            } else {
              common_vendor.index.$u.toast("\u652F\u4ED8\u6210\u529F");
              common_vendor.index.navigateTo({
                url: "/pagesMall/order/orderList?active=1"
              });
            }
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s("color:" + common_vendor.unref(colors)),
        b: common_vendor.t(info.value.consignee),
        c: common_vendor.t(info.value.shopUserMobile),
        d: common_vendor.t(info.value.address),
        e: common_vendor.f(info.value.itemList, (item, index, i0) => {
          return common_vendor.e({
            a: item.pic,
            b: common_vendor.t(item.goodsTitle),
            c: common_vendor.t(common_vendor.unref(common_utils.SkuPrint)(item.spData)),
            d: common_vendor.t(item.price),
            e: common_vendor.t(item.originalPrice),
            f: common_vendor.t(item.shopCount),
            g: item.couponDiscountPrice > 0
          }, item.couponDiscountPrice > 0 ? {
            h: common_vendor.t(item.couponTitle),
            i: common_vendor.t(item.couponDiscountPrice),
            j: common_vendor.s("font-size:24rpx;line-height: 50rpx;color:" + common_vendor.unref(colors))
          } : {}, {
            k: item.fullDiscountPrice > 0
          }, item.fullDiscountPrice > 0 ? {
            l: common_vendor.t(item.promotionTitle),
            m: common_vendor.t(item.fullDiscountPrice),
            n: common_vendor.s("font-size:27rpx;line-height: 50rpx;color:" + common_vendor.unref(colors))
          } : {}, {
            o: common_vendor.t(common_vendor.unref(pagesMall_order_orderUtils.setStatus)(item.itemStatus)),
            p: item.itemStatus === 5 || item.itemStatus === 4 || item.itemStatus === 8
          }, item.itemStatus === 5 || item.itemStatus === 4 || item.itemStatus === 8 ? {
            q: common_vendor.o(($event) => afterSale(item))
          } : {}, {
            r: item.itemStatus > 5 && item.itemStatus !== 8
          }, item.itemStatus > 5 && item.itemStatus !== 8 ? {
            s: common_vendor.o(($event) => afterSaleShow(item))
          } : {}, {
            t: item.itemStatus >= 4 && item.evaluateStatus === 0
          }, item.itemStatus >= 4 && item.evaluateStatus === 0 ? {
            v: common_vendor.o(($event) => onEvaluate(item)),
            w: common_vendor.unref(colors),
            x: common_vendor.unref(colors)
          } : {}, {
            y: index
          });
        }),
        f: common_vendor.s("color:" + common_vendor.unref(colors)),
        g: info.value.couponDiscountPrice > 0
      }, info.value.couponDiscountPrice > 0 ? {
        h: common_vendor.s("color:" + common_vendor.unref(colors)),
        i: common_vendor.t(info.value.couponDiscountPrice)
      } : {}, {
        j: info.value.fullDiscountPrice > 0
      }, info.value.fullDiscountPrice > 0 ? {
        k: common_vendor.s("color:" + common_vendor.unref(colors)),
        l: common_vendor.t(info.value.fullDiscountPrice)
      } : {}, {
        m: common_vendor.t(info.value.totalAmount),
        n: common_vendor.t(info.value.deliveryPrice),
        o: common_vendor.t((info.value.totalAmount || 0) + (info.value.deliveryPrice || 0)),
        p: common_vendor.s("color:" + common_vendor.unref(colors) + ";"),
        q: common_vendor.t(info.value.orderNo),
        r: common_vendor.o(($event) => onCopy(info.value.orderNo)),
        s: common_vendor.t(info.value.createdAt),
        t: common_vendor.t(info.value.payMethod === 1 ? "\u5FAE\u4FE1\u652F\u4ED8" : "\u4F59\u989D\u652F\u4ED8"),
        v: info.value.logisticsNo
      }, info.value.logisticsNo ? {
        w: common_vendor.t(info.value.logisticsName),
        x: common_vendor.t(info.value.logisticsNo),
        y: common_vendor.o(($event) => onCopy(info.value.logisticsNo))
      } : {}, {
        z: info.value.buyerMsg,
        A: common_vendor.o(($event) => info.value.buyerMsg = $event.detail.value),
        B: info.value.status === 0
      }, info.value.status === 0 ? {
        C: common_vendor.t(info.value.totalAmount),
        D: common_vendor.s("color:" + common_vendor.unref(colors) + ";"),
        E: common_vendor.s("color:" + common_vendor.unref(colors) + ";margin-right:20rpx"),
        F: common_vendor.o(cancelOrder),
        G: common_vendor.o(goToPay),
        H: common_vendor.s("background:" + common_vendor.unref(colors) + ";")
      } : {}, {
        I: info.value.status === 2
      }, info.value.status === 2 ? {
        J: common_vendor.s("color:" + common_vendor.unref(colors) + ";border:1rpx solid " + common_vendor.unref(colors)),
        K: common_vendor.o(cancelOrder)
      } : {}, {
        L: info.value.status === 3
      }, info.value.status === 3 ? {
        M: common_vendor.s("color:" + common_vendor.unref(colors) + ";margin-right:20rpx"),
        N: common_vendor.o(goToLogistics),
        O: common_vendor.o(orderSign),
        P: common_vendor.s("background:" + common_vendor.unref(colors) + ";")
      } : {}, {
        Q: info.value.status === 4
      }, info.value.status === 4 ? {
        R: common_vendor.s("background:" + common_vendor.unref(colors) + ";margin-left:20rpx;")
      } : {}, {
        S: info.value.status === 5
      }, info.value.status === 5 ? {
        T: common_vendor.o(
          (...args) => _ctx.delOrder && _ctx.delOrder(...args)
        )
      } : {}, {
        U: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-71ebf805"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/order/orderDetails.vue"]]);
wx.createPage(MiniProgramPage);
