"use strict";
var common_vendor = require("../../../common/vendor.js");
const listCell = () => "./list-cell.js";
const _sfc_main = {
  data() {
    return {};
  },
  components: {
    listCell
  },
  props: {
    serverList: {
      type: Array
    },
    colors: {
      type: String
    },
    titles: {
      type: String,
      default: "\u6211\u7684\u670D\u52A1"
    },
    icons: {
      type: String,
      default: "icon-fuwu"
    }
  },
  methods: {
    jumpLink(row) {
      if (row.url == "") {
        return;
      } else {
        common_vendor.index.navigateTo({
          url: row.url
        });
      }
    }
  }
};
if (!Array) {
  const _component_list_cell = common_vendor.resolveComponent("list-cell");
  _component_list_cell();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.titles),
    b: common_vendor.p({
      icons: "iconfont " + $props.icons,
      colors: $props.colors,
      rightshow: false
    }),
    c: common_vendor.f($props.serverList, (item, index, i0) => {
      return {
        a: common_vendor.n("iconfont " + item.icon),
        b: common_vendor.t(item.name),
        c: index,
        d: common_vendor.o(($event) => $options.jumpLink(item), index)
      };
    }),
    d: common_vendor.s("color:" + $props.colors)
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-26aac2da"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/commponent/user/my-server.vue"]]);
wx.createComponent(Component);
