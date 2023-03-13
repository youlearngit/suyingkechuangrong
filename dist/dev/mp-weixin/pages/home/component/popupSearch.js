"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_input2 + _easycom_u_button2)();
}
const _easycom_u_input = () => "../../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_button = () => "../../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "popupSearch",
  props: {
    colors: { type: String, required: true }
  },
  emits: ["setParams"],
  setup(__props, { expose, emit }) {
    const menuInfo = { bottom: "30rpx" };
    const menu = common_vendor.index.getMenuButtonBoundingClientRect();
    menuInfo.bottom = menu.bottom + "px";
    const couponList = common_vendor.ref([]);
    const promotionList = common_vendor.ref([]);
    const baseParams = {
      couponId: 0,
      promotionId: 0,
      priceStart: "",
      priceEnd: ""
    };
    const queryParams = common_vendor.ref({ ...baseParams });
    common_vendor.onMounted(async () => {
      const { data } = await common_vendor.index.$u.http.get("/public/getPromotionList");
      couponList.value = data.couponList;
      promotionList.value = data.promotionList;
    });
    const setParam = (param, row) => {
      if (queryParams.value[param] === row.id) {
        queryParams.value[param] = 0;
      } else {
        queryParams.value[param] = row.id;
      }
    };
    const onReset = () => {
      queryParams.value = { ...baseParams };
      emit("setParams", baseParams);
    };
    const onEnter = () => {
      emit("setParams", { ...queryParams.value });
    };
    const updateParams = (param, data) => {
      queryParams.value[param] = data;
    };
    expose({ updateParams });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s("color:" + __props.colors),
        b: common_vendor.o(($event) => queryParams.value.priceStart = $event),
        c: common_vendor.p({
          shape: "circle",
          type: "number",
          placeholder: "\u6700\u4F4E\u4EF7",
          modelValue: queryParams.value.priceStart
        }),
        d: common_vendor.o(($event) => queryParams.value.priceEnd = $event),
        e: common_vendor.p({
          shape: "circle",
          type: "number",
          placeholder: "\u6700\u9AD8\u4EF7",
          modelValue: queryParams.value.priceEnd
        }),
        f: common_vendor.f(couponList.value, (row, k0, i0) => {
          return {
            a: common_vendor.t(row.title),
            b: row.id,
            c: common_vendor.s("color:" + (queryParams.value.couponId === row.id ? "#fff" : "#333") + ";background:" + (queryParams.value.couponId === row.id ? __props.colors : "") + ";border-color:" + (queryParams.value.couponId === row.id ? __props.colors : "") + ";"),
            d: common_vendor.o(($event) => setParam("couponId", row), row.id)
          };
        }),
        g: common_vendor.f(promotionList.value, (row, k0, i0) => {
          return {
            a: common_vendor.t(row.title),
            b: row.id,
            c: common_vendor.s("color:" + (queryParams.value.promotionId === row.id ? "#fff" : "#333") + ";background:" + (queryParams.value.promotionId === row.id ? __props.colors : "") + ";border-color:" + (queryParams.value.promotionId === row.id ? __props.colors : "") + ";"),
            d: common_vendor.o(($event) => setParam("promotionId", row), row.id)
          };
        }),
        h: menuInfo.bottom,
        i: "calc(100vh - 150rpx - " + menuInfo.bottom + ")",
        j: common_vendor.o(onReset),
        k: common_vendor.p({
          shape: "circle",
          plain: true,
          color: __props.colors,
          text: "\u91CD\u7F6E"
        }),
        l: common_vendor.o(onEnter),
        m: common_vendor.p({
          shape: "circle",
          color: __props.colors,
          text: "\u786E\u5B9A"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4ef1e6b6"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/home/component/popupSearch.vue"]]);
wx.createComponent(Component);
