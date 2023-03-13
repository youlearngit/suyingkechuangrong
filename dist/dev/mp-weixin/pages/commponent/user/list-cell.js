"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  components: {},
  props: {
    icons: {
      type: String
    },
    linkUrl: {
      type: String
    },
    colors: {
      type: String
    },
    rightshow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    jumpNext() {
      console.log(this.linkUrl);
      if (this.linkUrl && this.linkUrl !== "") {
        common_vendor.index.navigateTo({
          url: this.linkUrl
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n("iconfont " + $props.icons + " icon"),
    b: common_vendor.s("color:" + $props.colors),
    c: $props.rightshow == true
  }, $props.rightshow == true ? {} : {}, {
    d: common_vendor.o((...args) => $options.jumpNext && $options.jumpNext(...args))
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-31091ac0"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/commponent/user/list-cell.vue"]]);
wx.createComponent(Component);
