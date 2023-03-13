"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-transition",
  data() {
    return {
      inited: false,
      viewStyle: {},
      status: "",
      transitionEnded: false,
      display: false,
      classes: ""
    };
  },
  computed: {
    mergeStyle() {
      const { viewStyle, customStyle } = this;
      return {
        transitionDuration: `${this.duration}ms`,
        transitionTimingFunction: this.timingFunction,
        ...common_vendor.index.$u.addStyle(customStyle),
        ...viewStyle
      };
    }
  },
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.transition, common_vendor.props$20],
  watch: {
    show: {
      handler(newVal) {
        newVal ? this.vueEnter() : this.vueLeave();
      },
      immediate: true
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.inited
  }, $data.inited ? {
    b: common_vendor.o((...args) => _ctx.clickHandler && _ctx.clickHandler(...args)),
    c: common_vendor.n($data.classes),
    d: common_vendor.s($options.mergeStyle),
    e: common_vendor.o((...args) => _ctx.noop && _ctx.noop(...args))
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1eafea41"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/node_modules/uview-plus/components/u-transition/u-transition.vue"]]);
wx.createComponent(Component);
