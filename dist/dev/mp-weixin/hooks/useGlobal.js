"use strict";
var common_vendor = require("../common/vendor.js");
var store_index = require("../store/index.js");
var store_modules_cart = require("../store/modules/cart.js");
function useGlobal() {
  const cartStore = store_modules_cart.CartStore();
  const store = store_index.GlobalStore();
  common_vendor.onShow(() => {
    if (store.theme.color !== store.historyColor) {
      store.historyColor = store.theme.color;
      common_vendor.index.setTabBarStyle({
        selectedColor: store.theme.color
      });
      let tabList = store.theme.tabList;
      for (let i = 0; i < tabList.length; i++) {
        let img = tabList[i];
        common_vendor.index.setTabBarItem({
          index: i,
          selectedIconPath: img
        });
      }
    }
    cartStore.updateBadge();
  });
}
exports.useGlobal = useGlobal;
