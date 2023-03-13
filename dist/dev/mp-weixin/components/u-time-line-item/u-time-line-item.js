"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "u-time-line-item",
  props: {
    bgColor: {
      type: String,
      default: "#ffffff"
    },
    nodeTop: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    nodeStyle() {
      let style = {
        backgroundColor: this.bgColor
      };
      if (this.nodeTop != "")
        style.top = this.nodeTop + "rpx";
      return style;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.nodeStyle)
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9bc0c162"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/components/u-time-line-item/u-time-line-item.vue"]]);
wx.createComponent(Component);
