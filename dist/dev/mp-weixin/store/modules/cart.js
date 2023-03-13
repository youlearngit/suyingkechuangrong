"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../index.js");
const CartStore = common_vendor.defineStore("cart", {
  persist: {
    key: "cart"
  },
  state: () => ({
    list: []
  }),
  actions: {
    async deleteCart(cartIds) {
      await common_vendor.index.$u.http.delete("/wx/delMyCart/" + cartIds.join(","));
      cartIds.forEach((cartId) => {
        const cartIndex = this.list.findIndex((p) => {
          return p.cartId === cartId;
        });
        if (cartIndex > -1) {
          this.list.splice(cartIndex, 1);
        }
      });
      this.updateBadge();
    },
    async addCart(skuId, count) {
      await common_vendor.index.$u.http.post("/wx/addCart", { skuId, count });
      const cart = this.list.find((p) => {
        return p.skuId === skuId;
      });
      if (cart) {
        cart.shopCount += count;
      } else {
        await this.updateList();
        this.updateBadge();
      }
    },
    async updateCart(cartId, shopCount) {
      await common_vendor.index.$u.http.post("/wx/updateCart", { cartId, shopCount });
    },
    async updateList() {
      const store = store_index.GlobalStore();
      if (!store.login.token)
        return;
      const { data } = await common_vendor.index.$u.http.get("wx/getMyCart");
      const currentSet = new Set(this.list.filter((p) => p.current).map((p) => p.cartId));
      data.forEach((p) => {
        if (p.stock !== 0 && p.shopCount > p.stock) {
          p.shopCount = p.stock;
        }
        if (currentSet.has(p.cartId)) {
          p.current = true;
        }
        p.spData = p.spData.replaceAll("[", "");
        p.spData = p.spData.replaceAll("]", "");
        p.spData = p.spData.replaceAll("{", "");
        p.spData = p.spData.replaceAll("}", "");
        p.spData = p.spData.replaceAll('"', "");
        if (p.publishStatus == 2 && p.delete == 1 && p.stock > 0) {
          p.status = 1;
        } else {
          p.status = 0;
          p.current = false;
        }
      });
      this.list = data;
    },
    updateBadge() {
      if (this.list.length > 0) {
        common_vendor.index.setTabBarBadge({
          index: 2,
          text: String(this.list.length)
        });
      } else {
        common_vendor.index.removeTabBarBadge({ index: 2 });
      }
    }
  }
});
exports.CartStore = CartStore;
