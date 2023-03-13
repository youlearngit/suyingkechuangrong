"use strict";
var common_vendor = require("../../common/vendor.js");
var hooks_usePageData = require("../../hooks/usePageData.js");
var store_index = require("../../store/index.js");
if (!Math) {
  (EvaluateInfo + Nodata + VideoPay)();
}
const Nodata = () => "../../pages/commponent/public/nodata.js";
const EvaluateInfo = () => "./component/evaluateInfo.js";
const VideoPay = () => "../order/evaluate/videoPay.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "goodsEvaluate",
  setup(__props) {
    const store = store_index.GlobalStore();
    const colors = store.theme.color;
    common_vendor.onLoad((option) => {
      params.value.goodsId = option.goodsId;
    });
    const params = common_vendor.ref({ goodsId: 0 });
    const { list, loading } = hooks_usePageData.usePageData("/public/getGoodsEvaluate", params);
    const refVideoPay = common_vendor.ref();
    const showVideo = (url) => {
      refVideoPay.value.payVideo(url);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (item, index, i0) => {
          return {
            a: common_vendor.o(showVideo, index),
            b: index,
            c: "487be414-0-" + i0,
            d: common_vendor.p({
              colors: common_vendor.unref(colors),
              info: item
            })
          };
        }),
        b: common_vendor.p({
          colors: common_vendor.unref(colors),
          loading: common_vendor.unref(loading),
          show: common_vendor.unref(list).length === 0,
          count: common_vendor.unref(list).length,
          title: "\u5546\u54C1\u8BC4\u4EF7"
        }),
        c: common_vendor.sr(refVideoPay, "487be414-2", {
          "k": "refVideoPay"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-487be414"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/goods/goodsEvaluate.vue"]]);
wx.createPage(MiniProgramPage);
