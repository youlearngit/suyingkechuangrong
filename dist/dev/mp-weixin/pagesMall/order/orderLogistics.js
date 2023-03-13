"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
if (!Math) {
  (UTimeLineItem + UTimeLine)();
}
const UTimeLine = () => "../../components/u-time-line/u-time-line.js";
const UTimeLineItem = () => "../../components/u-time-line-item/u-time-line-item.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderLogistics",
  setup(__props) {
    const store = store_index.GlobalStore();
    const colors = store.theme.color;
    let orderId = 0;
    const list = common_vendor.ref([]);
    const size = common_vendor.ref(0);
    common_vendor.onLoad(async (option) => {
      orderId = Number(option.orderId);
      const { data } = await common_vendor.index.$u.http.get("/wx/getOrderLogistics/" + orderId);
      list.value = data.data;
      size.value = data.data.length;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: common_vendor.t(size.value - index),
            b: common_vendor.t(item.time),
            c: common_vendor.t(item.context),
            d: index,
            e: "65399ed4-1-" + i0 + ",65399ed4-0"
          };
        }),
        b: common_vendor.unref(colors)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-65399ed4"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/order/orderLogistics.vue"]]);
wx.createPage(MiniProgramPage);
