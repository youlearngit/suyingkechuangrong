"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  (AfterSaleItem + Nodata)();
}
const Nodata = () => "../../pages/commponent/public/nodata.js";
const AfterSaleItem = () => "./afterSaleItem.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "afterSaleCache",
  props: { colors: String, status: Number },
  emits: ["setCount"],
  setup(__props, { emit }) {
    const props = __props;
    const orderList = common_vendor.ref([]);
    const loading = common_vendor.ref(true);
    const params = {
      pageNum: 1,
      pageSize: 10
    };
    let dataTotal = 0;
    const scrollTop = common_vendor.ref(0);
    const triggered = common_vendor.ref(false);
    const scrollToLower = async () => {
      if (orderList.value.length < dataTotal) {
        params.pageNum++;
        await loadData();
      }
    };
    const refresherRefresh = async () => {
      triggered.value = true;
      params.pageNum = 1;
      orderList.value = [];
      await loadData();
      triggered.value = false;
    };
    common_vendor.onMounted(async () => {
      await loadData();
    });
    const loadData = async () => {
      loading.value = true;
      const { data } = await common_vendor.index.$u.http.get("/wx/queryRefundByList", {
        data: {
          ...params,
          status: props.status
        }
      });
      if (data.data) {
        orderList.value.push(...data.data);
      }
      dataTotal = data.total;
      if (props.status !== -1) {
        emit("setCount", props.status, data.total);
      }
      loading.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(orderList.value, (item, k0, i0) => {
          return {
            a: "50dae3a0-0-" + i0,
            b: common_vendor.p({
              info: item,
              colors: __props.colors
            }),
            c: item.orderNo
          };
        }),
        b: common_vendor.o(refresherRefresh),
        c: common_vendor.p({
          colors: __props.colors,
          loading: loading.value,
          show: orderList.value.length === 0,
          count: orderList.value.length,
          title: "\u552E\u540E"
        }),
        d: triggered.value,
        e: scrollTop.value,
        f: common_vendor.o(scrollToLower),
        g: common_vendor.o(refresherRefresh)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-50dae3a0"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/order/afterSaleCache.vue"]]);
wx.createComponent(Component);
