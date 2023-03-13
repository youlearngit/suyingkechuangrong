"use strict";
var common_vendor = require("../../../common/vendor.js");
const loading = () => "./loading.js";
const _sfc_main = {
  data() {
    return {};
  },
  components: { loading },
  props: {
    count: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: "\u6570\u636E"
    },
    loading: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    },
    colors: {
      type: String
    }
  },
  computed: {
    loadingStatus() {
      if (this.loading) {
        return "loading";
      }
    }
  },
  methods: {}
};
if (!Array) {
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  _easycom_u_loadmore2();
}
const _easycom_u_loadmore = () => "../../../node-modules/uview-plus/components/u-loadmore/u-loadmore.js";
if (!Math) {
  _easycom_u_loadmore();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.loading === false && $props.show
  }, $props.loading === false && $props.show ? {
    b: common_vendor.s("color:" + $props.colors),
    c: common_vendor.t($props.title)
  } : common_vendor.e({
    d: $props.count === 0 || $props.count > 9
  }, $props.count === 0 || $props.count > 9 ? {
    e: common_vendor.p({
      status: $options.loadingStatus,
      ["loading-text"]: "\u52A0\u8F7D" + $props.title + "\u6570\u636E",
      ["loadmore-text"]: "\u5230\u5E95\u4E86",
      line: !$props.loading,
      fontSize: "15",
      color: "#999",
      lineColor: "#999",
      ["nomore-text"]: "\u5230\u5E95\u4E86"
    })
  } : {}));
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-15eb9f4e"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/commponent/public/nodata.vue"]]);
wx.createComponent(Component);
