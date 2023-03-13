"use strict";
var common_vendor = require("../../common/vendor.js");
var common_simpleHttp = require("../../common/simpleHttp.js");
const HomeStore = common_vendor.defineStore("home", {
  persist: {
    key: "home"
  },
  state: () => ({
    dictMap: {},
    categoryList: [],
    advertList: [],
    keywordList: [],
    receiveAddr: {}
  }),
  actions: {
    async updateDict(type) {
      const data = await common_simpleHttp.GET("/public/getDictByType", { type });
      this.dictMap[type] = data;
    },
    async updateCategoryList() {
      const data = await common_simpleHttp.GET("/public/queryCategory", { limit: 100 });
      if (data) {
        this.categoryList = data;
      }
    },
    async updateAdvertList() {
      const data = await common_simpleHttp.GET("/public/getAdvert");
      if (data) {
        this.advertList = data;
      }
    },
    async getReceiveAddr() {
      if (!this.receiveAddr.id) {
        const { data: addr } = await common_vendor.index.$u.http.get("/wx/getReceiveAddrList?limit=1");
        if (addr.length > 0) {
          const address = addr[0];
          this.receiveAddr = address;
          this.receiveAddr.areas = address.province + address.city + address.district + address.details;
        }
      }
      return this.receiveAddr;
    },
    clearsKeywordList() {
      this.keywordList = [];
    }
  }
});
exports.HomeStore = HomeStore;
