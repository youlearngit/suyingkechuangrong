"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-tag",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$10],
  data() {
    return {};
  },
  computed: {
    style() {
      const style = {};
      if (this.bgColor) {
        style.backgroundColor = this.bgColor;
      }
      if (this.color) {
        style.color = this.color;
      }
      if (this.borderColor) {
        style.borderColor = this.borderColor;
      }
      return style;
    },
    textColor() {
      const style = {};
      if (this.color) {
        style.color = this.color;
      }
      return style;
    },
    imgStyle() {
      const width = this.size === "large" ? "17px" : this.size === "medium" ? "15px" : "13px";
      return {
        width,
        height: width
      };
    },
    closeSize() {
      const size = this.size === "large" ? 15 : this.size === "medium" ? 13 : 12;
      return size;
    },
    iconSize() {
      const size = this.size === "large" ? 21 : this.size === "medium" ? 19 : 16;
      return size;
    },
    elIconColor() {
      return this.iconColor ? this.iconColor : this.plain ? this.type : "#ffffff";
    }
  },
  methods: {
    closeHandler() {
      this.$emit("close", this.name);
    },
    clickHandler() {
      this.$emit("click", this.name);
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_transition2 = common_vendor.resolveComponent("u-transition");
  (_easycom_u_icon2 + _easycom_u_transition2)();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
const _easycom_u_transition = () => "../u-transition/u-transition.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_transition)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.icon
  }, _ctx.icon ? common_vendor.e({
    b: _ctx.$u.test.image(_ctx.icon)
  }, _ctx.$u.test.image(_ctx.icon) ? {
    c: _ctx.icon,
    d: common_vendor.s($options.imgStyle)
  } : {
    e: common_vendor.p({
      color: $options.elIconColor,
      name: _ctx.icon,
      size: $options.iconSize
    })
  }) : {}, {
    f: common_vendor.t(_ctx.text),
    g: common_vendor.s($options.textColor),
    h: common_vendor.n(`u-tag__text--${_ctx.type}`),
    i: common_vendor.n(_ctx.plain && `u-tag__text--${_ctx.type}--plain`),
    j: common_vendor.n(`u-tag__text--${_ctx.size}`),
    k: common_vendor.n(`u-tag--${_ctx.shape}`),
    l: common_vendor.n(!_ctx.plain && `u-tag--${_ctx.type}`),
    m: common_vendor.n(_ctx.plain && `u-tag--${_ctx.type}--plain`),
    n: common_vendor.n(`u-tag--${_ctx.size}`),
    o: common_vendor.n(_ctx.plain && _ctx.plainFill && `u-tag--${_ctx.type}--plain--fill`),
    p: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args)),
    q: common_vendor.s({
      marginRight: _ctx.closable ? "10px" : 0,
      marginTop: _ctx.closable ? "10px" : 0
    }),
    r: common_vendor.s($options.style),
    s: _ctx.closable
  }, _ctx.closable ? {
    t: common_vendor.p({
      name: "close",
      size: $options.closeSize,
      color: "#ffffff"
    }),
    v: common_vendor.n(`u-tag__close--${_ctx.size}`),
    w: common_vendor.o((...args) => $options.closeHandler && $options.closeHandler(...args)),
    x: _ctx.closeColor
  } : {}, {
    y: common_vendor.p({
      mode: "fade",
      show: _ctx.show
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7d7e2bb2"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/node_modules/uview-plus/components/u-tag/u-tag.vue"]]);
wx.createComponent(Component);
