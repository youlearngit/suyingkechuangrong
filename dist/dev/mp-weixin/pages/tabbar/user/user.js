"use strict";
var common_vendor = require("../../../common/vendor.js");
var hooks_useGlobal = require("../../../hooks/useGlobal.js");
var store_index = require("../../../store/index.js");
var pages_tabbar_user_useTouchMove = require("./useTouchMove.js");
var store_modules_user = require("../../../store/modules/user.js");
require("../../../store/modules/cart.js");
require("../../../common/utils.js");
require("../../../common/userApi.js");
require("../../../hooks/useAuth.js");
require("../../../common/login.js");
if (!Math) {
  (common_vendor.unref(MyAccount) + common_vendor.unref(MyOrder) + common_vendor.unref(MyFootprint) + common_vendor.unref(MyServer))();
}
const MyAccount = () => "../../commponent/user/my-account.js";
const MyOrder = () => "../../commponent/user/my-order.js";
const MyFootprint = () => "../../commponent/user/my-footprint.js";
const MyServer = () => "../../commponent/user/my-server.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "user",
  setup(__props) {
    common_vendor.onShow(() => {
      common_vendor.index.setNavigationBarColor({
        backgroundColor: store.theme.color,
        frontColor: "#ffffff"
      });
    });
    hooks_useGlobal.useGlobal();
    const store = store_index.GlobalStore();
    const colors = common_vendor.computed$1(() => {
      return store.theme.color;
    });
    const userInfo = common_vendor.computed$1(() => {
      return store.user;
    });
    const userStore = store_modules_user.UserStore();
    const accountInfo = common_vendor.computed$1(() => {
      return userStore.account;
    });
    const { coverTransform, coverTransition, coverTouchStart, coverTouchMove, coverTouchEnd } = pages_tabbar_user_useTouchMove.useTouchMove(async () => {
      common_vendor.index.showLoading({
        title: "Loading..."
      });
      await userStore.updateAccount();
      common_vendor.index.hideLoading();
    });
    const serverList = [{
      name: "\u6211\u7684\u6536\u85CF",
      icon: "icon-shoucang",
      url: "/pagesMall/user/myFavorite",
      id: 1,
      elseUrl: ""
    }, {
      name: "\u5730\u5740\u7BA1\u7406",
      icon: "icon-dizhi",
      url: "/pagesMall/user/myAddress",
      id: 2,
      elseUrl: ""
    }, {
      name: "\u5206\u9500\u4E2D\u5FC3",
      icon: "icon-fenxiaojiesuan2",
      url: "/pages/views/user/mydistribution",
      id: 6,
      elseUrl: ""
    }, {
      name: "\u8BBE\u7F6E",
      icon: "icon-icon_shezhi",
      url: "/pages/tabbar/user/setting",
      id: 9,
      elseUrl: ""
    }];
    const onLogin = () => {
      if (userInfo.value.avatarUrl) {
        common_vendor.index.navigateTo({
          url: "/pagesMall/user/myInfo"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(userInfo).avatarUrl
      }, common_vendor.unref(userInfo).avatarUrl ? {
        b: common_vendor.unref(userInfo).avatarUrl
      } : {}, {
        c: common_vendor.t(common_vendor.unref(userInfo).nickName || "\u767B\u5F55"),
        d: common_vendor.o(onLogin),
        e: common_vendor.unref(colors),
        f: common_vendor.p({
          info: common_vendor.unref(accountInfo),
          colors: common_vendor.unref(colors)
        }),
        g: common_vendor.p({
          info: common_vendor.unref(accountInfo),
          colors: common_vendor.unref(colors)
        }),
        h: common_vendor.p({
          colors: common_vendor.unref(colors)
        }),
        i: common_vendor.p({
          serverList,
          colors: common_vendor.unref(colors)
        }),
        j: common_vendor.o(
          (...args) => common_vendor.unref(coverTouchStart) && common_vendor.unref(coverTouchStart)(...args)
        ),
        k: common_vendor.o(
          (...args) => common_vendor.unref(coverTouchMove) && common_vendor.unref(coverTouchMove)(...args)
        ),
        l: common_vendor.o(
          (...args) => common_vendor.unref(coverTouchEnd) && common_vendor.unref(coverTouchEnd)(...args)
        ),
        m: common_vendor.s("transform:" + common_vendor.unref(coverTransform) + ";transition:" + common_vendor.unref(coverTransition))
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d2495ebc"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/tabbar/user/user.vue"]]);
wx.createPage(MiniProgramPage);
