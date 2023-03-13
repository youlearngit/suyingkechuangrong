"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
var hooks_useRouter = require("../../hooks/useRouter.js");
var hooks_usePageData = require("../../hooks/usePageData.js");
require("../../hooks/useAuth.js");
require("../../common/login.js");
require("../../store/modules/cart.js");
require("../../store/modules/user.js");
require("../../common/utils.js");
require("../../common/userApi.js");
if (!Math) {
  Nodata();
}
const Nodata = () => "../../pages/commponent/public/nodata.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myFavorite",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "5171700c-colors": common_vendor.unref(colors)
    }));
    const store = store_index.GlobalStore();
    const colors = store.theme.color;
    const params = common_vendor.ref({});
    const { list, loading } = hooks_usePageData.usePageData("/wx/getMyFavorite", params);
    const { GoToDetails } = hooks_useRouter.useRouter();
    const toDetails = (item) => {
      if (item.publishStatus === 1) {
        common_vendor.index.$u.toast("\u5546\u54C1\u5DF2\u4E0B\u67B6\uFF01");
        return;
      }
      GoToDetails(item.goodsId);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (item, index, i0) => {
          return common_vendor.e({
            a: item.pic,
            b: item.publishStatus === 1
          }, item.publishStatus === 1 ? {} : {}, {
            c: common_vendor.t(item.goodsTitle),
            d: common_vendor.t(item.createdAt),
            e: common_vendor.t(item.price),
            f: common_vendor.t(item.originalPrice),
            g: index,
            h: common_vendor.o(($event) => toDetails(item), index)
          });
        }),
        b: common_vendor.p({
          colors: common_vendor.unref(colors),
          loading: common_vendor.unref(loading),
          show: common_vendor.unref(list).length === 0,
          count: common_vendor.unref(list).length,
          title: "\u6536\u85CF"
        }),
        c: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5171700c"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/user/myFavorite.vue"]]);
wx.createPage(MiniProgramPage);
