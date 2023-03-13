"use strict";
var common_vendor = require("../common/vendor.js");
var store_index = require("../store/index.js");
var common_login = require("../common/login.js");
var hooks_useAuth = require("../hooks/useAuth.js");
const install = (Vue) => {
  const store = store_index.GlobalStore();
  const auth = hooks_useAuth.useAuth();
  common_vendor.index.$u.http.setConfig((config) => {
    config.baseURL = "http://localhost:7801";
    config.baseURL = "https://mall-api.idb.com.cn";
    config.timeout = 1e4;
    return config;
  });
  let t = -1;
  common_vendor.index.$u.http.interceptors.request.use(async (config) => {
    const now = new Date().getTime() / 1e3 + 60 * 10;
    if (store.login.expiresIn && now > store.login.expiresIn) {
      await common_login.tryWxLogin(store);
    }
    config.data = config.data || {};
    config.header.Authorization = store.login.token;
    if (t > 0) {
      clearTimeout(t);
    }
    if (config.custom && config.custom.noTip) {
      t = 9999;
    } else {
      t = setTimeout(() => {
        t = -1;
        let message = "Loading...";
        if (config.method === "GET") {
          message = "\u52A0\u8F7D\u4E2D...";
        }
        if (config.method === "POST") {
          message = "\u5904\u7406\u4E2D...";
        }
        common_vendor.index.showLoading({
          title: message,
          mask: true
        });
      }, 500);
    }
    return config;
  }, (config) => {
    return Promise.reject(config);
  });
  common_vendor.index.$u.http.interceptors.response.use((response) => {
    finish();
    const data = response.data;
    if (data.code && data.code <= 0) {
      common_vendor.index.showToast({ title: data ? data.msg : "\u5904\u7406\u5F02\u5E38\uFF01\uFF01", icon: "none" });
      return Promise.reject(response);
    }
    if (response.header["New-Token"]) {
      store.login.token = response.header["New-Token"];
      store.login.expiresIn = Number(response.header["New-Expires-At"]);
    }
    return response;
  }, (response) => {
    finish();
    if (response.statusCode === 401) {
      if (auth.isNotAccount()) {
        return Promise.reject(response);
      }
    }
    const data = response.data;
    common_vendor.index.showToast({ title: data ? data.msg : "\u7F51\u7EDC\u9519\u8BEF\uFF01", icon: "none" });
    return Promise.reject(response);
  });
  function finish() {
    if (t > 0) {
      clearTimeout(t);
      t = -1;
    } else {
      common_vendor.index.hideLoading();
    }
  }
};
exports.install = install;
