"use strict";
var common_vendor = require("../common/vendor.js");
var store_index = require("../store/index.js");
var common_login = require("../common/login.js");
var store_modules_cart = require("../store/modules/cart.js");
var store_modules_user = require("../store/modules/user.js");
function useAuth() {
  const store = store_index.GlobalStore();
  const isLogin = async () => {
    await common_login.tryWxLogin(store);
    let flag = true;
    if (store.user) {
      if (store.user.roleType === "wechat" && !store.user.mobile) {
        common_vendor.index.$u.toast("\u8BF7\u7ED1\u5B9A\u624B\u673A\u53F7\u7801");
      } else {
        if (store.login.expiresIn) {
          const now = new Date().getTime() / 1e3 + 60 * 10;
          if (now > store.login.expiresIn) {
            showToast("\u8BF7\u91CD\u65B0\u767B\u5F55");
          } else {
            flag = false;
          }
        } else {
          showToast("\u8BF7\u5148\u767B\u9646");
        }
      }
    } else {
      showToast("\u8BF7\u5148\u767B\u9646");
    }
    if (flag) {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
      return false;
    } else {
      return true;
    }
  };
  const showToast = (title) => {
    setTimeout(() => {
      common_vendor.index.$u.toast(title);
    }, 300);
  };
  const loginSuccess = async (data) => {
    store.setData("user", data.userInfo);
    store.login.token = data.token;
    store.login.expiresIn = data.expiresIn;
    const cartStore = store_modules_cart.CartStore();
    await cartStore.updateList();
    const userStore = store_modules_user.UserStore();
    await userStore.updateAccount();
  };
  const isNotAccount = () => {
    const now = new Date().getTime() / 1e3 + 60 * 10;
    if (store.login.token && store.login.expiresIn && now < store.login.expiresIn) {
      return false;
    } else {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
      common_vendor.index.$u.toast("\u8BF7\u5148\u767B\u5F55\uFF01");
      return true;
    }
  };
  const isNotLogin = () => {
    const now = new Date().getTime() / 1e3 + 60 * 10;
    if (store.login.token && store.login.expiresIn && now < store.login.expiresIn) {
      return false;
    } else {
      return true;
    }
  };
  return { isLogin, loginSuccess, isNotAccount, isNotLogin };
}
exports.useAuth = useAuth;
