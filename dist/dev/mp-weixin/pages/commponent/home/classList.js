"use strict";
var common_vendor = require("../../../common/vendor.js");
var store_modules_home = require("../../../store/modules/home.js");
require("../../../common/simpleHttp.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "classList",
  setup(__props) {
    const homeStore = store_modules_home.HomeStore();
    const categoryList = common_vendor.computed$1(() => {
      return [
        { name: "\u627E\u9879\u76EE", pic: "/static/images/sykcr/findProject.png" },
        { name: "\u627E\u6280\u672F", pic: "/static/images/sykcr/findService.png" },
        { name: "\u627E\u670D\u52A1", pic: "/static/images/sykcr/findTechnique.png" }
      ];
    });
    common_vendor.onMounted(() => {
      homeStore.updateCategoryList();
    });
    const jumpList = (item, index) => {
      console.log(index);
      if (index == 0) {
        common_vendor.index.navigateTo({
          url: "/pages/project/index/index"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(categoryList), (item, index, i0) => {
          return {
            a: item.pic,
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => jumpList(item, index), index)
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6613694e"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/commponent/home/classList.vue"]]);
wx.createComponent(Component);
