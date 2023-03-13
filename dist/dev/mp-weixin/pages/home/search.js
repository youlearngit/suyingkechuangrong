"use strict";
var common_vendor = require("../../common/vendor.js");
var store_modules_home = require("../../store/modules/home.js");
var store_index = require("../../store/index.js");
require("../../common/simpleHttp.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "search",
  setup(__props) {
    const store = store_index.GlobalStore();
    const colors = store.theme.color;
    const homeStore = store_modules_home.HomeStore();
    const oldKeywordList = common_vendor.computed$1(() => {
      return homeStore.keywordList;
    });
    const hotKeywordList = common_vendor.computed$1(() => {
      if (homeStore.dictMap["hot-search"]) {
        return homeStore.dictMap["hot-search"].map((p) => {
          return p.value;
        });
      } else {
        return [];
      }
    });
    const keyword = common_vendor.ref("");
    const doSearch = () => {
      if (keyword.value) {
        if (homeStore.keywordList.findIndex((p) => keyword.value === p) === -1) {
          homeStore.keywordList.unshift(keyword.value);
        }
        onSearch(keyword.value);
      }
    };
    const clears = () => {
      keyword.value = "";
    };
    const onSearch = (text) => {
      common_vendor.index.navigateTo({
        url: `/pages/home/classList?text=${text}`
      });
    };
    const oldDelete = () => {
      common_vendor.index.showModal({
        cancelColor: "#999",
        confirmColor: colors,
        title: "\u63D0\u793A",
        content: "\u662F\u5426\u6E05\u7A7A\u5386\u53F2\u641C\u7D22\uFF01",
        success: async (res) => {
          if (res.confirm) {
            homeStore.clearsKeywordList();
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(doSearch),
        b: keyword.value,
        c: common_vendor.o(($event) => keyword.value = $event.detail.value),
        d: keyword.value
      }, keyword.value ? {
        e: common_vendor.o(clears)
      } : {}, {
        f: common_vendor.o(doSearch),
        g: common_vendor.s("background:" + common_vendor.unref(colors)),
        h: common_vendor.unref(hotKeywordList).length > 0
      }, common_vendor.unref(hotKeywordList).length > 0 ? {
        i: common_vendor.f(common_vendor.unref(hotKeywordList), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => onSearch(item), index)
          };
        })
      } : {}, {
        j: common_vendor.unref(oldKeywordList).length > 0
      }, common_vendor.unref(oldKeywordList).length > 0 ? {
        k: common_vendor.o(oldDelete),
        l: common_vendor.f(common_vendor.unref(oldKeywordList), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => onSearch(item), index)
          };
        })
      } : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-853cf3f8"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/home/search.vue"]]);
wx.createPage(MiniProgramPage);
