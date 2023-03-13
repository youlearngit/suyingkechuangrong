"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_simpleHttp = require("../../../common/simpleHttp.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "area_picker",
  emits: ["change"],
  setup(__props, { expose, emit }) {
    const show = common_vendor.ref(false);
    const value = common_vendor.ref([0, 0, 0]);
    const provinces = common_vendor.ref([]);
    const citys = common_vendor.ref([]);
    const areas = common_vendor.ref([]);
    const handleAreaChange = (e) => {
      const data = e.detail.value;
      if (value.value[0] !== data[0]) {
        getData(2, provinces.value[data[0]]);
      }
      if (value.value[1] !== data[1]) {
        getData(3, citys.value[data[1]]);
      }
      value.value = data;
    };
    const handleAreaSelect = () => {
      emit("change", [provinces.value[value.value[0]], citys.value[value.value[1]], areas.value[value.value[2]]]);
      show.value = false;
    };
    const getData = async (level = 1, name) => {
      const data = await common_simpleHttp.GET("/config/getAreaName", { level, name });
      if (level === 1) {
        provinces.value = data;
        await getData(2, data[0]);
      }
      if (level === 2) {
        citys.value = data;
        await getData(3, data[0]);
      }
      if (level === 3) {
        areas.value = data;
      }
    };
    const getDataList = async (level = 1, name) => {
      const data = await common_simpleHttp.GET("/config/getAreaName", { level, name });
      if (level === 1) {
        provinces.value = data;
      }
      if (level === 2) {
        citys.value = data;
      }
      if (level === 3) {
        areas.value = data;
      }
    };
    const open = async (province, city, area) => {
      if (province && city && area) {
        await getDataList(1);
        await getDataList(2, province);
        await getDataList(3, city);
        value.value = [
          provinces.value.findIndex((p) => p === province),
          citys.value.findIndex((p) => p === city),
          areas.value.findIndex((p) => p === area)
        ];
      } else {
        await getData();
      }
      show.value = true;
    };
    expose({ open });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: show.value
      }, show.value ? {} : {}, {
        b: common_vendor.o(($event) => show.value = false),
        c: common_vendor.o(handleAreaSelect),
        d: common_vendor.f(provinces.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        e: common_vendor.f(citys.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        f: common_vendor.f(areas.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        g: common_vendor.o(handleAreaChange),
        h: value.value,
        i: common_vendor.n("nyz_area_view " + (show.value ? "show" : "hide"))
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-32b8fa71"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/user/address/area_picker.vue"]]);
wx.createComponent(Component);
