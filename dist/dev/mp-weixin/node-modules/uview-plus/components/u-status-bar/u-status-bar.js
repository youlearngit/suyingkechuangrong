"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-status-bar",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$18],
  data() {
    return {};
  },
  computed: {
    style() {
      const style = {};
      style.height = common_vendor.index.$u.addUnit(common_vendor.index.$u.sys().statusBarHeight, "px");
      style.backgroundColor = this.bgColor;
      return common_vendor.index.$u.deepMerge(style, common_vendor.index.$u.addStyle(this.customStyle));
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.style)
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-782db321"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/node_modules/uview-plus/components/u-status-bar/u-status-bar.vue"]]);
wx.createComponent(Component);
