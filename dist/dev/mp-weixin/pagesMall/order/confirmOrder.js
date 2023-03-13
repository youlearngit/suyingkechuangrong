"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
var hooks_useRouter = require("../../hooks/useRouter.js");
var store_modules_home = require("../../store/modules/home.js");
var store_modules_user = require("../../store/modules/user.js");
require("../../hooks/useAuth.js");
require("../../common/login.js");
require("../../store/modules/cart.js");
require("../../common/simpleHttp.js");
require("../../common/utils.js");
require("../../common/userApi.js");
if (!Array) {
  const _easycom_u_radio2 = common_vendor.resolveComponent("u-radio");
  const _easycom_u_radio_group2 = common_vendor.resolveComponent("u-radio-group");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_radio2 + _easycom_u_radio_group2 + _easycom_u_popup2)();
}
const _easycom_u_radio = () => "../../node-modules/uview-plus/components/u-radio/u-radio.js";
const _easycom_u_radio_group = () => "../../node-modules/uview-plus/components/u-radio-group/u-radio-group.js";
const _easycom_u_popup = () => "../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_radio + _easycom_u_radio_group + common_vendor.unref(Coupon) + _easycom_u_popup)();
}
const Coupon = () => "../../pages/commponent/public/coupon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "confirmOrder",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "1465d45f-colors": common_vendor.unref(colors)
    }));
    const { GoToAddress } = hooks_useRouter.useRouter();
    const store = store_index.GlobalStore();
    const colors = common_vendor.computed$1(() => {
      return store.theme.color;
    });
    const homeStore = store_modules_home.HomeStore();
    const goodsTotal = common_vendor.computed$1(() => {
      if (goodsList.value.length > 0) {
        return goodsList.value.map((p) => p.price * p.count).reduce((s, p) => s + p);
      }
      return 0;
    });
    const goodsList = common_vendor.ref([]);
    const confirmOrder = common_vendor.ref({ couponList: [], payMethod: 2 });
    const couponShow = common_vendor.ref(false);
    const onReceive = (couponId) => {
      confirmOrder.value.couponId = couponId;
      couponShow.value = false;
      loadData();
    };
    let confirmData = [];
    common_vendor.onLoad(async (option) => {
      const item = JSON.parse(decodeURIComponent(option.data));
      let list = [];
      if (option.type === "1") {
        list = item;
      } else {
        list.push(item);
      }
      homeStore.receiveAddr = {};
      await loadAddress();
      confirmOrder.value.deliveryMode = 1;
      confirmData = list;
      confirmOrder.value.list = list;
      await loadData();
    });
    const loadData = async () => {
      try {
        confirmOrder.value.list = confirmData;
        const { data } = await common_vendor.index.$u.http.post("/wx/confirmOrderByList", confirmOrder.value);
        goodsList.value = data.list;
        confirmOrder.value = data;
      } catch (e) {
        setTimeout(() => {
          common_vendor.index.navigateBack({ delta: 1 });
        }, 1e3);
      }
    };
    const isGoToPay = common_vendor.ref(false);
    common_vendor.onShow(() => {
      if (isGoToPay.value) {
        common_vendor.index.switchTab({
          url: "/pages/tabbar/user/user"
        });
        return;
      }
      loadAddress();
    });
    const loadAddress = async () => {
      const address = await homeStore.getReceiveAddr();
      confirmOrder.value.consignee = address.nickName;
      confirmOrder.value.shopUserMobile = address.mobile;
      confirmOrder.value.address = address.areas;
      if (address.province !== confirmOrder.value.province) {
        confirmOrder.value.province = address.province;
        await loadData();
      }
    };
    const selectMode = () => {
      common_vendor.index.showActionSheet({
        itemList: ["\u7269\u6D41\u5BC4\u9001"],
        success: (res) => {
          confirmOrder.value.deliveryMode = res.tapIndex + 1;
          loadData();
        }
      });
    };
    const router = hooks_useRouter.useRouter();
    const submit = async () => {
      if (isGoToPay.value) {
        return;
      }
      if (!confirmOrder.value.province) {
        common_vendor.index.$u.toast("\u8BF7\u9009\u62E9\u6536\u8D27\u5730\u5740\uFF01");
        return;
      }
      confirmOrder.value.list = confirmData;
      const { data } = await common_vendor.index.$u.http.post("/wx/createOrderByList", confirmOrder.value);
      isGoToPay.value = true;
      common_vendor.index.$u.toast("\u8BA2\u5355\u521B\u5EFA\u6210\u529F");
      if (confirmOrder.value.payMethod === 1) {
        if (data.msg) {
          common_vendor.index.$u.toast(data.msg);
          isGoToPay.value = false;
          return;
        }
        await router.GoToWechatPay(data);
      } else {
        await goToMy();
      }
    };
    const goToMy = async () => {
      const userStore = store_modules_user.UserStore();
      await userStore.updateAccount();
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/tabbar/user/user"
        });
      }, 300);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: confirmOrder.value.deliveryMode
      }, confirmOrder.value.deliveryMode ? {
        b: common_vendor.t(confirmOrder.value.deliveryMode === 1 ? "\u7269\u6D41\u5BC4\u9001" : "\u5230\u5E97\u81EA\u63D0")
      } : {}, {
        c: common_vendor.o(selectMode),
        d: confirmOrder.value.deliveryMode === 1
      }, confirmOrder.value.deliveryMode === 1 ? common_vendor.e({
        e: common_vendor.s("color:" + common_vendor.unref(colors)),
        f: confirmOrder.value.address
      }, confirmOrder.value.address ? {
        g: common_vendor.t(confirmOrder.value.consignee),
        h: common_vendor.t(confirmOrder.value.shopUserMobile),
        i: common_vendor.t(confirmOrder.value.address)
      } : {}, {
        j: common_vendor.o(
          (...args) => common_vendor.unref(GoToAddress) && common_vendor.unref(GoToAddress)(...args)
        )
      }) : {}, {
        k: common_vendor.f(goodsList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.skuPic,
            b: common_vendor.t(item.goodsTitle),
            c: common_vendor.t(item.skuDetails),
            d: common_vendor.t(item.realPrice ? item.realPrice : item.price),
            e: common_vendor.t(item.price),
            f: common_vendor.t(item.count),
            g: item.couponDiscountPrice > 0
          }, item.couponDiscountPrice > 0 ? {
            h: common_vendor.t(confirmOrder.value.couponTitle),
            i: common_vendor.t(item.couponDiscountPrice),
            j: common_vendor.s("font-size:24rpx;line-height: 50rpx;color:" + common_vendor.unref(colors))
          } : {}, {
            k: item.fullDiscountPrice > 0
          }, item.fullDiscountPrice > 0 ? {
            l: common_vendor.t(item.promotionTitle),
            m: common_vendor.t(item.fullDiscountPrice),
            n: common_vendor.s("font-size:27rpx;line-height: 50rpx;color:" + common_vendor.unref(colors))
          } : {}, {
            o: index
          });
        }),
        l: common_vendor.s("color:" + common_vendor.unref(colors)),
        m: common_vendor.t(common_vendor.unref(goodsTotal)),
        n: confirmOrder.value.couponList
      }, confirmOrder.value.couponList ? common_vendor.e({
        o: !confirmOrder.value.totalCouponDiscountPrice
      }, !confirmOrder.value.totalCouponDiscountPrice ? {} : {
        p: common_vendor.s("color:" + common_vendor.unref(colors)),
        q: common_vendor.t(confirmOrder.value.totalCouponDiscountPrice)
      }, {
        r: common_vendor.o(($event) => couponShow.value = true)
      }) : {}, {
        s: confirmOrder.value.totalFullDiscountPrice > 0
      }, confirmOrder.value.totalFullDiscountPrice > 0 ? {
        t: common_vendor.s("color:" + common_vendor.unref(colors)),
        v: common_vendor.t(confirmOrder.value.totalFullDiscountPrice)
      } : {}, {
        w: confirmOrder.value.deliveryPrice === 0
      }, confirmOrder.value.deliveryPrice === 0 ? {} : {
        x: common_vendor.t(confirmOrder.value.deliveryPrice)
      }, {
        y: common_vendor.t(confirmOrder.value.totalAmount),
        z: common_vendor.s("color:" + common_vendor.unref(colors) + ";"),
        A: common_vendor.p({
          customStyle: {
            marginBottom: "8px"
          },
          label: "\u5FAE\u4FE1\u652F\u4ED8",
          name: 1
        }),
        B: common_vendor.p({
          customStyle: {
            marginBottom: "8px"
          },
          label: "\u4F59\u989D\u652F\u4ED8",
          name: 2
        }),
        C: common_vendor.t(confirmOrder.value.balance),
        D: common_vendor.o(($event) => confirmOrder.value.payMethod = $event),
        E: common_vendor.p({
          activeColor: common_vendor.unref(colors),
          placement: "column",
          modelValue: confirmOrder.value.payMethod
        }),
        F: confirmOrder.value.buyerMsg,
        G: common_vendor.o(($event) => confirmOrder.value.buyerMsg = $event.detail.value),
        H: common_vendor.t((confirmOrder.value.totalAmount || 0) + (confirmOrder.value.deliveryPrice || 0)),
        I: common_vendor.s("color:" + common_vendor.unref(colors) + ";"),
        J: common_vendor.s("background:" + common_vendor.unref(colors) + ";"),
        K: common_vendor.o(($event) => _ctx.$u.throttle(submit, 500)),
        L: common_vendor.o(onReceive),
        M: common_vendor.p({
          couponId: confirmOrder.value.couponId,
          colors: common_vendor.unref(colors),
          type: true,
          couponList: confirmOrder.value.couponList
        }),
        N: common_vendor.o(($event) => couponShow.value = false),
        O: common_vendor.p({
          show: couponShow.value,
          mode: "bottom",
          length: "60%",
          closeable: false,
          ["mask-close-able"]: false
        }),
        P: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1465d45f"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/order/confirmOrder.vue"]]);
wx.createPage(MiniProgramPage);
