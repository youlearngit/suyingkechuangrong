"use strict";
var common_vendor = require("../../../common/vendor.js");
var store_index = require("../../../store/index.js");
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u__textarea2 = common_vendor.resolveComponent("u--textarea");
  const _easycom_u_switch2 = common_vendor.resolveComponent("u-switch");
  (_easycom_u_input2 + _easycom_u__textarea2 + _easycom_u_switch2)();
}
const _easycom_u_input = () => "../../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_u__textarea = () => "../../../node-modules/uview-plus/components/u--textarea/u--textarea.js";
const _easycom_u_switch = () => "../../../node-modules/uview-plus/components/u-switch/u-switch.js";
if (!Math) {
  (_easycom_u_input + _easycom_u__textarea + _easycom_u_switch + AreaPicker)();
}
const AreaPicker = () => "./area_picker.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "edit",
  setup(__props) {
    const store = store_index.GlobalStore();
    const colors = common_vendor.computed$1(() => {
      return store.theme.color;
    });
    const info = common_vendor.reactive({});
    common_vendor.onLoad(async (option) => {
      if (option.item) {
        const item = JSON.parse(decodeURIComponent(option.item));
        info.id = item.id;
        info.nickName = item.nickName;
        info.mobile = item.mobile;
        info.province = item.province;
        info.city = item.city;
        info.district = item.district;
        info.status = item.status;
        info.details = item.details;
        info.areas = item.province + item.city + item.district;
      }
      if (option.type) {
        common_vendor.index.setNavigationBarTitle({
          title: "\u65B0\u589E\u6536\u8D27\u5730\u5740"
        });
      }
    });
    const areaRef = common_vendor.ref();
    const openArea = () => {
      areaRef.value.open(info.province, info.city, info.district);
    };
    const changeArea = (area) => {
      info.province = area[0];
      info.city = area[1];
      info.district = area[2];
      info.areas = area[0] + area[1] + area[2];
    };
    const saveInfo = () => {
      if (!info.areas || !info.nickName || !info.mobile || !info.details) {
        common_vendor.index.$u.toast("\u7F3A\u5C11\u5FC5\u586B\u5B57\u6BB5\uFF01");
        return;
      }
      const data = { ...info };
      delete data.areas;
      common_vendor.index.$u.http.post("/wx/createReceiveAddr", data).then(() => {
        common_vendor.index.$u.toast("\u4FDD\u5B58\u6210\u529F\uFF01");
        common_vendor.index.navigateBack({ delta: -1 });
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => info.nickName = $event),
        b: common_vendor.p({
          placeholder: "\u8BF7\u8F93\u5165\u6536\u4EF6\u4EBA\u59D3\u540D",
          border: "none",
          type: "text",
          modelValue: info.nickName
        }),
        c: common_vendor.o(($event) => info.mobile = $event),
        d: common_vendor.p({
          placeholder: "\u8BF7\u8F93\u5165\u6536\u4EF6\u4EBA\u7535\u8BDD\u53F7\u7801",
          border: "none",
          type: "number",
          maxlength: "11",
          modelValue: info.mobile
        }),
        e: common_vendor.o(($event) => info.areas = $event),
        f: common_vendor.p({
          placeholder: "\u8BF7\u9009\u62E9\u7701\u5E02\u533A",
          disabled: true,
          border: "none",
          disabledColor: "#ffffff",
          type: "text",
          modelValue: info.areas
        }),
        g: common_vendor.o(openArea),
        h: common_vendor.o(($event) => info.details = $event),
        i: common_vendor.p({
          placeholder: "\u8F93\u5165\u8BE6\u7EC6\u5730\u5740",
          modelValue: info.details
        }),
        j: common_vendor.o(($event) => info.status = $event),
        k: common_vendor.p({
          activeColor: common_vendor.unref(colors),
          activeValue: 2,
          inactiveValue: 1,
          modelValue: info.status
        }),
        l: common_vendor.s("background:" + common_vendor.unref(colors)),
        m: common_vendor.o(saveInfo),
        n: common_vendor.sr(areaRef, "5e999269-5", {
          "k": "areaRef"
        }),
        o: common_vendor.o(changeArea)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5e999269"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/user/address/edit.vue"]]);
wx.createPage(MiniProgramPage);
