"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-swiper-indicator",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$22],
  data() {
    return {
      lineWidth: 22
    };
  },
  computed: {
    lineStyle() {
      let style = {};
      style.width = common_vendor.index.$u.addUnit(this.lineWidth);
      style.transform = `translateX(${common_vendor.index.$u.addUnit(this.current * this.lineWidth)})`;
      style.backgroundColor = this.indicatorActiveColor;
      return style;
    },
    dotStyle() {
      return (index) => {
        let style = {};
        style.backgroundColor = index === this.current ? this.indicatorActiveColor : this.indicatorInactiveColor;
        return style;
      };
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.indicatorMode === "line"
  }, _ctx.indicatorMode === "line" ? {
    b: common_vendor.s($options.lineStyle),
    c: common_vendor.n(`u-swiper-indicator__wrapper--${_ctx.indicatorMode}`),
    d: _ctx.$u.addUnit($data.lineWidth * _ctx.length),
    e: _ctx.indicatorInactiveColor
  } : {}, {
    f: _ctx.indicatorMode === "dot"
  }, _ctx.indicatorMode === "dot" ? {
    g: common_vendor.f(_ctx.length, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.n(index === _ctx.current && "u-swiper-indicator__wrapper__dot--active"),
        c: common_vendor.s($options.dotStyle(index))
      };
    })
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-487724be"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/node_modules/uview-plus/components/u-swiper-indicator/u-swiper-indicator.vue"]]);
wx.createComponent(Component);
