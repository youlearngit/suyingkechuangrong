"use strict";
var common_vendor = require("../../../common/vendor.js");
var store_index = require("../../../store/index.js");
if (!Math) {
  (EvaluateInfo + VideoPay)();
}
const EvaluateInfo = () => "./evaluateInfo.js";
const VideoPay = () => "../../order/evaluate/videoPay.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "evaluateList",
  setup(__props, { expose }) {
    const store = store_index.GlobalStore();
    const colors = store.theme.color;
    let goodsId = 0;
    const total = common_vendor.ref(0);
    const goodsEva = common_vendor.ref([]);
    const openView = async (id) => {
      goodsId = id;
      const { data } = await common_vendor.index.$u.http.get("/public/getGoodsEvaluate?pageSize=2&goodsId=" + goodsId);
      goodsEva.value = data.data;
      total.value = data.total;
    };
    const seeAll = () => {
      common_vendor.index.navigateTo({
        url: "/pagesMall/goods/goodsEvaluate?goodsId=" + goodsId
      });
    };
    const refVideoPay = common_vendor.ref();
    const showVideo = (url) => {
      refVideoPay.value.payVideo(url);
    };
    expose({ openView });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: goodsEva.value.length !== 0
      }, goodsEva.value.length !== 0 ? {
        b: common_vendor.t(total.value),
        c: common_vendor.o(seeAll),
        d: common_vendor.f(goodsEva.value, (item, k0, i0) => {
          return {
            a: item.id,
            b: common_vendor.o(showVideo, item.id),
            c: "33255ad2-0-" + i0,
            d: common_vendor.p({
              colors: common_vendor.unref(colors),
              info: item
            })
          };
        }),
        e: common_vendor.sr(refVideoPay, "33255ad2-1", {
          "k": "refVideoPay"
        })
      } : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-33255ad2"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/goods/component/evaluateList.vue"]]);
wx.createComponent(Component);
