"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
if (!Math) {
  (common_vendor.unref(Tabs) + OrderCache + AfterSaleCache)();
}
const Tabs = () => "../../pages/commponent/public/tabs.js";
const OrderCache = () => "./orderCache.js";
const AfterSaleCache = () => "./afterSaleCache.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "afterSaleList",
  setup(__props) {
    const active = common_vendor.ref(0);
    const store = store_index.GlobalStore();
    const colors = store.theme.color;
    common_vendor.onLoad((options) => {
      active.value = Number(options.active);
    });
    const tabList = common_vendor.ref([
      {
        name: "\u552E\u540E\u7533\u8BF7",
        count: 0
      },
      {
        name: "\u5904\u7406\u4E2D",
        count: 0
      },
      {
        name: "\u5F85\u53D1\u8D27",
        count: 0
      },
      {
        name: "\u552E\u540E\u5B8C\u6210",
        count: 0
      }
    ]);
    const setCount = (status, count) => {
      switch (status) {
        case 1:
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
          status: 5
        }),
        e: active.value === 1,
        f: common_vendor.o(setCount),
        g: common_vendor.p({
          colors: common_vendor.unref(colors),
          status: 1
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
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-476ba740"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/order/afterSaleList.vue"]]);
wx.createPage(MiniProgramPage);
