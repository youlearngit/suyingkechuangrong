"use strict";
var common_vendor = require("../../../common/vendor.js");
var store_index = require("../../../store/index.js");
var store_modules_cart = require("../../../store/modules/cart.js");
var hooks_useGlobal = require("../../../hooks/useGlobal.js");
var hooks_useRouter = require("../../../hooks/useRouter.js");
var hooks_useAuth = require("../../../hooks/useAuth.js");
require("../../../common/login.js");
require("../../../store/modules/user.js");
require("../../../common/utils.js");
require("../../../common/userApi.js");
if (!Array) {
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  _easycom_u_empty2();
}
const _easycom_u_empty = () => "../../../node-modules/uview-plus/components/u-empty/u-empty.js";
if (!Math) {
  (NumberBox + _easycom_u_empty)();
}
const NumberBox = () => "../../../components/u-number-box/u-number-box.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cart",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "60c5e47c-colors": common_vendor.unref(colors)
    }));
    hooks_useGlobal.useGlobal();
    const store = store_index.GlobalStore();
    const colors = common_vendor.computed$1(() => {
      return store.theme.color;
    });
    const router = hooks_useRouter.useRouter();
    const current = common_vendor.ref(99999);
    const allCurrent = common_vendor.ref(false);
    const sum = common_vendor.ref(0);
    const SumPrice = common_vendor.ref("");
    const bottomShow = common_vendor.ref("");
    const jumpDetails = (goodsId) => {
      router.GoToDetails(goodsId);
    };
    const cartStore = store_modules_cart.CartStore();
    common_vendor.onPullDownRefresh(async () => {
      await cartStore.updateList();
      await cartStore.updateBadge();
      common_vendor.index.stopPullDownRefresh();
      checkSelectAll();
      getSumPrice();
    });
    const cartList = common_vendor.computed$1(() => {
      return cartStore.list;
    });
    const auth = hooks_useAuth.useAuth();
    const changeNumber = async (item) => {
      if (noChange) {
        const flag = await auth.isLogin();
        if (flag) {
          await cartStore.updateCart(item.cartId, item.shopCount);
          getSumPrice();
        }
        return flag;
      }
    };
    let noChange = false;
    common_vendor.onMounted(() => {
      setTimeout(() => {
        noChange = true;
      }, 800);
    });
    common_vendor.onShow(() => {
      checkSelectAll();
      getSumPrice();
    });
    const deleteCart = async () => {
      common_vendor.index.showModal({
        cancelColor: "#999",
        confirmColor: colors.value,
        title: "\u5220\u9664\u8D2D\u7269\u8F66",
        content: "\u662F\u5426\u6279\u91CF\u5220\u9664\u9009\u62E9\u7684\u5546\u54C1\uFF01",
        success: async (res) => {
          if (res.confirm) {
            const count = [];
            cartList.value.forEach((e) => {
              if (e.current == true) {
                count.push(e.cartId);
              }
            });
            await cartStore.deleteCart(count);
            setCurrent();
          }
        }
      });
    };
    const { GoToConfirmOrder } = hooks_useRouter.useRouter();
    const settlement = () => {
      if (sum.value === 0) {
        common_vendor.index.$u.toast("\u8BF7\u9009\u62E9\u8D2D\u4E70\u7684\u5546\u54C1\uFF01");
        return;
      }
      const list = [];
      cartList.value.forEach((p) => {
        if (p.current == true && p.status !== 0) {
          list.push({
            skuId: p.skuId,
            cartId: p.cartId,
            count: p.shopCount
          });
        }
      });
      GoToConfirmOrder(1, list);
    };
    const setAllCurrent = () => {
      cartList.value.forEach((p) => {
        p.current = !allCurrent.value;
      });
      checkSelectAll();
      setCurrent();
    };
    const setCurrent = (index = -1) => {
      if (index > -1) {
        const current2 = cartList.value[index];
        if (current2.status === 0) {
          common_vendor.index.$u.toast("\u5546\u54C1\u5DF2\u5931\u6548");
          return;
        }
        current2.current = !current2.current;
      }
      let currentAll = false;
      let count = [];
      cartList.value.forEach((e) => {
        if (e.current == true) {
          count.push(e);
        }
      });
      if (count.length == cartList.value.length && count.length > 0) {
        currentAll = true;
      }
      allCurrent.value = currentAll;
      getSumPrice();
    };
    const checkSelectAll = () => {
      let currentAll = false;
      let count = 0;
      cartList.value.forEach((e) => {
        if (e.current == true || e.status === 0 || e.stock === 0) {
          count++;
        }
      });
      if (count >= cartList.value.length && count > 0) {
        currentAll = true;
      }
      allCurrent.value = currentAll;
    };
    const getSumPrice = () => {
      let sumPrice = "";
      let count = [];
      cartList.value.forEach((e) => {
        if (e.current == true) {
          count.push(e);
        }
      });
      let length = count.length;
      for (let i = 0; i < length; i++) {
        const data = count[i];
        sumPrice = (Number(sumPrice) + Number(data.price * data.shopCount)).toFixed(2);
      }
      sum.value = length;
      SumPrice.value = sumPrice;
    };
    const onStroll = () => {
      common_vendor.index.switchTab({
        url: "/pages/tabbar/index/index"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(cartStore).list.length !== 0
      }, common_vendor.unref(cartStore).list.length !== 0 ? common_vendor.e({
        b: common_vendor.f(common_vendor.unref(cartStore).list, (item, index, i0) => {
          return common_vendor.e({
            a: item.status !== 0
          }, item.status !== 0 ? {
            b: common_vendor.n(item.current === true ? "on" : ""),
            c: common_vendor.s("background-color:" + common_vendor.unref(colors)),
            d: common_vendor.s("border-color:" + common_vendor.unref(colors))
          } : {}, {
            e: common_vendor.o(($event) => setCurrent(index)),
            f: item.pic,
            g: item.status === 0
          }, item.status === 0 ? {
            h: common_vendor.t(item.stock === 0 ? "\u6682\u65E0\u5E93\u5B58" : "\u5DF2\u5931\u6548")
          } : {}, {
            i: common_vendor.o(($event) => jumpDetails(item.goodsId)),
            j: common_vendor.t(item.goodsTitle),
            k: common_vendor.o(($event) => jumpDetails(item.goodsId)),
            l: item.spData
          }, item.spData ? {
            m: common_vendor.t(item.spData)
          } : {}, {
            n: common_vendor.t((item.price * item.shopCount).toFixed(2)),
            o: common_vendor.o(($event) => changeNumber(item)),
            p: "60c5e47c-0-" + i0,
            q: common_vendor.o(($event) => item.shopCount = $event),
            r: common_vendor.p({
              color: common_vendor.unref(colors),
              min: 1,
              max: item.stock,
              disabled: item.status === 0,
              modelValue: item.shopCount
            }),
            s: index,
            t: common_vendor.o(($event) => current.value = index, index),
            v: common_vendor.o(
              (...args) => _ctx.ontouchend && _ctx.ontouchend(...args),
              index
            )
          });
        }),
        c: common_vendor.unref(cartList).length >= 5
      }, common_vendor.unref(cartList).length >= 5 ? {} : {}, {
        d: common_vendor.n(allCurrent.value === true ? "on" : ""),
        e: common_vendor.s("background-color:" + common_vendor.unref(colors)),
        f: common_vendor.s("border-color:" + common_vendor.unref(colors)),
        g: common_vendor.o(setAllCurrent),
        h: sum.value > 0
      }, sum.value > 0 ? {
        i: common_vendor.o(deleteCart),
        j: common_vendor.s("border-color:" + common_vendor.unref(colors) + ";color:" + common_vendor.unref(colors))
      } : {}, {
        k: common_vendor.t(SumPrice.value || 0),
        l: common_vendor.t(sum.value),
        m: common_vendor.s("background-color:" + common_vendor.unref(colors)),
        n: common_vendor.o(settlement),
        o: bottomShow.value
      }) : {}, {
        p: common_vendor.unref(cartStore).list.length === 0
      }, common_vendor.unref(cartStore).list.length === 0 ? {
        q: common_vendor.p({
          mode: "car",
          textColor: common_vendor.unref(colors),
          iconColor: common_vendor.unref(colors),
          text: " "
        }),
        r: common_vendor.s("color:" + common_vendor.unref(colors)),
        s: common_vendor.o(onStroll)
      } : {}, {
        t: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-60c5e47c"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/tabbar/cart/cart.vue"]]);
wx.createPage(MiniProgramPage);
