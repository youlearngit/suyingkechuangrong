"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  components: {},
  props: {
    colors: {
      type: String
    },
    tabList: {
      type: Array
    },
    active: {
      type: Number,
      default: 0
    }
  },
  methods: {
    setTabs(item, index) {
      this.$emit("setTabs", item, index);
    }
  }
};
if (!Array) {
  const _easycom_u_badge2 = common_vendor.resolveComponent("u-badge");
  _easycom_u_badge2();
}
const _easycom_u_badge = () => "../../../node-modules/uview-plus/components/u-badge/u-badge.js";
if (!Math) {
  _easycom_u_badge();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.tabList, (item, index, i0) => {
      return common_vendor.e({
        a: "2ece19be-0-" + i0,
        b: common_vendor.p({
          absolute: true,
          bgColor: $props.colors,
          shape: "horn",
          color: "#fff",
          offset: [0, 1],
          max: "99",
          value: item.count
        }),
        c: common_vendor.t(item.name),
        d: $props.active === index
      }, $props.active === index ? {
        e: common_vendor.s("background:" + $props.colors)
      } : {}, {
        f: index,
        g: common_vendor.o(($event) => $options.setTabs(item, index), index),
        h: common_vendor.s("color:" + ($props.active === index ? $props.colors : "") + ";font-weight:" + ($props.active === index ? "bold" : "500"))
      });
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2ece19be"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/commponent/public/tabs.vue"]]);
wx.createComponent(Component);
