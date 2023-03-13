"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
var hooks_usePageData = require("../../hooks/usePageData.js");
if (!Math) {
  Nodata();
}
const Nodata = () => "../../pages/commponent/public/nodata.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myWithdrawal",
  setup(__props) {
    const store = store_index.GlobalStore();
    const colors = store.theme.color;
    const params = common_vendor.ref({});
    const { list, loading } = hooks_usePageData.usePageData("/wx/getMyBill", params);
    const balance = common_vendor.ref(0);
    common_vendor.onLoad((option) => {
      balance.value = Number(option.balance);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(balance.value),
        b: common_vendor.f(common_vendor.unref(list), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.type),
            c: common_vendor.t(item.createdAt),
            d: item.pm === 0
          }, item.pm === 0 ? {
            e: common_vendor.t(item.number)
          } : {
            f: common_vendor.t(item.number)
          }, {
            g: common_vendor.t(item.balance),
            h: index
          });
        }),
        c: common_vendor.p({
          colors: common_vendor.unref(colors),
          loading: common_vendor.unref(loading),
          show: common_vendor.unref(list).length === 0,
          count: common_vendor.unref(list).length,
          title: "\u4F59\u989D"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-403bd8a5"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/user/myWithdrawal.vue"]]);
wx.createPage(MiniProgramPage);
