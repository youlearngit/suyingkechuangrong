"use strict";
var common_vendor = require("../common/vendor.js");
const GlobalStore = common_vendor.defineStore("global", {
  persist: {
    key: "pinia",
    paths: ["user", "login", "theme"]
  },
  state: () => ({
    theme: {
      title: "\u5B98\u65B9",
      name: "default",
      color: "#9cc1ff",
      tabList: ["/static/images/tabBar/home-default.png", "/static/images/tabBar/class-default.png", "/static/images/tabBar/cart-default.png", "/static/images/tabBar/user-default.png"]
    },
    historyColor: "#9cc1ff",
    user: {},
    login: { username: "test", password: "123" }
  }),
  actions: {
    setData(key, value) {
      this[key] = value;
    }
  }
});
const pinia = common_vendor.createPinia().use(
  common_vendor.createPersistedState({
    storage: {
      getItem(key) {
        return common_vendor.index.getStorageSync(key);
      },
      setItem(key, value) {
        common_vendor.index.setStorageSync(key, value);
      }
    }
  })
);
exports.GlobalStore = GlobalStore;
exports.pinia = pinia;
