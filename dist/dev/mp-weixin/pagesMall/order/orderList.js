"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
if (!Math) {
  (common_vendor.unref(Tabs) + OrderCache)();
}
const Tabs = () => "../../pages/commponent/public/tabs.js";
const OrderCache = () => "./orderCache.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderList",
  setup(__props) {
    const active = common_vendor.ref(0);
    const store = store_index.GlobalStore();
    const colors = store.theme.color;
    common_vendor.onLoad((options) => {
      active.value = Number(options.active);
    });
    const tabList = common_vendor.ref([
      {
        name: "\u5168\u90E8",
        count: 0
      },
      {
        name: "\u5F85\u4ED8\u6B3E",
        count: 0
      },
      {
        name: "\u5F85\u53D1\u8D27",
        count: 0
      },
      {
        name: "\u5F85\u6536\u8D27",
        count: 0
      },
      {
        name: "\u5F85\u8BC4\u4EF7",
        count: 0
      }
    ]);
    const setCount = (status, count) => {
      switch (status) {
        case 0:
          {
            tabList.value[1].count = count;
          }
          break;
        case 2:
          {
            tabList.value[2].count = count;
          }
          break;
        case 3:
          {
            tabList.value[3].count = count;
          }
          break;
        case 4:
          {
            tabList.value[4].count = count;
          }
          break;
      }
    };
    const changTabs = async (_, index) => {
      active.value = index;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(changTabs),
        b: common_vendor.p({
          colors: common_vendor.unref(colors),
          tabList: tabList.value,
          active: active.value
        }),
        c: active.value === 0,
        d: common_vendor.p({
          colors: common_vendor.unref(colors),
          status: -1
        }),
        e: active.value === 1,
        f: common_vendor.o(setCount),
        g: common_vendor.p({
          colors: common_vendor.unref(colors),
          status: 0
        }),
        h: active.value === 2,
        i: common_vendor.o(setCount),
        j: common_vendor.p({
          colors: common_vendor.unref(colors),
          status: 2
        }),
        k: active.value === 3,
        l: common_vendor.o(setCount),
        m: common_vendor.p({
          colors: common_vendor.unref(colors),
          status: 3
        }),
        n: active.value === 4,
        o: common_vendor.o(setCount),
        p: common_vendor.p({
          colors: common_vendor.unref(colors),
          status: 4
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c387f02a"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/order/orderList.vue"]]);
wx.createPage(MiniProgramPage);
