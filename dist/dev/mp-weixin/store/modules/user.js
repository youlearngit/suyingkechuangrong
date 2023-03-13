"use strict";
var common_vendor = require("../../common/vendor.js");
var common_utils = require("../../common/utils.js");
var common_userApi = require("../../common/userApi.js");
var hooks_useAuth = require("../../hooks/useAuth.js");
const UserStore = common_vendor.defineStore("user", {
  persist: {
    key: "user"
  },
  state: () => ({
    footList: [],
    account: { balance: 0, couponCount: 0 }
  }),
  actions: {
    addFoot(goods) {
      const hist = {
        createdAt: common_utils.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss"),
        publishStatus: 2,
        goodsTitle: goods.name,
        goodsId: goods.id,
        pic: goods.image,
        price: goods.price,
        originalPrice: goods.originalPrice
      };
      const index = this.footList.findIndex((p) => p.goodsId === hist.goodsId);
      if (index > -1) {
        this.footList.splice(index, 1);
      }
      if (this.footList.length < 5) {
        this.footList.unshift(hist);
      } else {
        this.footList[4] = this.footList[3];
        this.footList[3] = this.footList[2];
        this.footList[2] = this.footList[1];
        this.footList[1] = this.footList[0];
        this.footList[0] = hist;
      }
    },
    async updateFoot() {
      const { data } = await common_vendor.index.$u.http.get("/wx/getMyHistory?limit=5");
      this.footList = data;
    },
    async updateAccount() {
      const auth = hooks_useAuth.useAuth();
      if (!auth.isNotLogin()) {
        this.account = await common_userApi.GetMyAccount();
      } else {
        this.account = { balance: 0, couponCount: 0 };
      }
    }
  }
});
exports.UserStore = UserStore;
