"use strict";
var common_vendor = require("../../../common/vendor.js");
var store_index = require("../../../store/index.js");
var config_themeConfig = require("../../../config/themeConfig.js");
var store_modules_cart = require("../../../store/modules/cart.js");
var store_modules_user = require("../../../store/modules/user.js");
require("../../../common/utils.js");
require("../../../common/userApi.js");
require("../../../hooks/useAuth.js");
require("../../../common/login.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_button2 + _easycom_u_popup2)();
}
const _easycom_u_button = () => "../../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_popup = () => "../../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (common_vendor.unref(ItemCell) + _easycom_u_button + _easycom_u_popup)();
}
const ItemCell = () => "../../commponent/setting/item-cell.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "setting",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "786ffcc9-themeColor_color": common_vendor.unref(themeColor).color
    }));
    const store = store_index.GlobalStore();
    const themeColor = store.theme;
    const colorModal = common_vendor.ref(false);
    const SetColor = (item) => {
      store.theme.color = item.color;
      store.theme.name = item.name;
      store.theme.title = item.title;
      store.theme.tabList = item.tabList;
      colorModal.value = false;
    };
    const logout = () => {
      common_vendor.index.showModal({
        cancelColor: "#999",
        content: "\u786E\u8BA4\u8981\u9000\u51FA\u767B\u5F55\u5417?",
        confirmColor: themeColor.color,
        success: function(res) {
          if (res.confirm) {
            store.setData("user", {});
            store.login.token = "";
            store.login.expiresIn = 0;
            const cartStore = store_modules_cart.CartStore();
            cartStore.list = [];
            const userStore = store_modules_user.UserStore();
            userStore.updateAccount();
            common_vendor.index.showToast({ title: "\u9000\u51FA\u6210\u529F", icon: "none" });
            setTimeout(() => {
              common_vendor.index.switchTab({
                url: "/pages/tabbar/index/index"
              });
            }, 500);
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          cellname: "\u5173\u4E8E\u5546\u57CE"
        }),
        b: common_vendor.p({
          cellname: "\u7AD9\u70B9\u5E2E\u52A9"
        }),
        c: common_vendor.p({
          cellname: "\u610F\u89C1\u53CD\u9988"
        }),
        d: common_vendor.n("iconfont icon-zhuti_tiaosepan icon"),
        e: common_vendor.t(common_vendor.unref(themeColor).title),
        f: common_vendor.o(($event) => colorModal.value = true),
        g: common_vendor.p({
          height: "30",
          shape: "circle",
          color: common_vendor.unref(themeColor).color
        }),
        h: common_vendor.f(common_vendor.unref(config_themeConfig.themeList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: index,
            c: item.color,
            d: common_vendor.o(($event) => SetColor(item), index)
          };
        }),
        i: common_vendor.o(($event) => colorModal.value = false),
        j: common_vendor.p({
          show: colorModal.value,
          mode: "center",
          closeable: true
        }),
        k: common_vendor.unref(store).user.nickName
      }, common_vendor.unref(store).user.nickName ? {
        l: common_vendor.s("color:" + common_vendor.unref(themeColor).color),
        m: common_vendor.o(logout)
      } : {}, {
        n: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-786ffcc9"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/tabbar/user/setting.vue"]]);
wx.createPage(MiniProgramPage);
