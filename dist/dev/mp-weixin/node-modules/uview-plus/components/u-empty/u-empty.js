"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-empty",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$3],
  data() {
    return {
      icons: {
        car: "\u8D2D\u7269\u8F66\u4E3A\u7A7A",
        page: "\u9875\u9762\u4E0D\u5B58\u5728",
        search: "\u6CA1\u6709\u641C\u7D22\u7ED3\u679C",
        address: "\u6CA1\u6709\u6536\u8D27\u5730\u5740",
        wifi: "\u6CA1\u6709WiFi",
        order: "\u8BA2\u5355\u4E3A\u7A7A",
        coupon: "\u6CA1\u6709\u4F18\u60E0\u5238",
        favor: "\u6682\u65E0\u6536\u85CF",
        permission: "\u65E0\u6743\u9650",
        history: "\u65E0\u5386\u53F2\u8BB0\u5F55",
        news: "\u65E0\u65B0\u95FB\u5217\u8868",
        message: "\u6D88\u606F\u5217\u8868\u4E3A\u7A7A",
        list: "\u5217\u8868\u4E3A\u7A7A",
        data: "\u6570\u636E\u4E3A\u7A7A",
        comment: "\u6682\u65E0\u8BC4\u8BBA"
      }
    };
  },
  computed: {
    emptyStyle() {
      const style = {};
      style.marginTop = common_vendor.index.$u.addUnit(this.marginTop);
      return common_vendor.index.$u.deepMerge(common_vendor.index.$u.addStyle(this.customStyle), style);
    },
    textStyle() {
      const style = {};
      style.color = this.textColor;
      style.fontSize = common_vendor.index.$u.addUnit(this.textSize);
      return style;
    },
    isSrc() {
      return this.icon.indexOf("/") >= 0;
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.show
  }, _ctx.show ? common_vendor.e({
    b: !$options.isSrc
  }, !$options.isSrc ? {
    c: common_vendor.p({
      name: _ctx.mode === "message" ? "chat" : `empty-${_ctx.mode}`,
      size: _ctx.iconSize,
      color: _ctx.iconColor,
      ["margin-top"]: "14"
    })
  } : {
    d: _ctx.$u.addUnit(_ctx.width),
    e: _ctx.$u.addUnit(_ctx.height),
    f: _ctx.icon
  }, {
    g: common_vendor.t(_ctx.text ? _ctx.text : $data.icons[_ctx.mode]),
    h: common_vendor.s($options.textStyle),
    i: _ctx.$slots.default || _ctx.$slots.$default
  }, _ctx.$slots.default || _ctx.$slots.$default ? {} : {}, {
    j: common_vendor.s($options.emptyStyle)
  }) : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5ebae466"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/node_modules/uview-plus/components/u-empty/u-empty.vue"]]);
wx.createComponent(Component);
