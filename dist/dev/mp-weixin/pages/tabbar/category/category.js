"use strict";
var common_vendor = require("../../../common/vendor.js");
var hooks_useGlobal = require("../../../hooks/useGlobal.js");
var store_index = require("../../../store/index.js");
require("../../../store/modules/cart.js");
if (!Math) {
  (common_vendor.unref(SearchView) + common_vendor.unref(Cate))();
}
const SearchView = () => "../../commponent/public/search.js";
const Cate = () => "../../commponent/cate/cate.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "category",
  setup(__props) {
    hooks_useGlobal.useGlobal();
    const store = store_index.GlobalStore();
    const colors = common_vendor.computed$1(() => {
      return store.theme.color;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          colors: common_vendor.unref(colors)
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-58b4c5fc"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/tabbar/category/category.vue"]]);
wx.createPage(MiniProgramPage);
