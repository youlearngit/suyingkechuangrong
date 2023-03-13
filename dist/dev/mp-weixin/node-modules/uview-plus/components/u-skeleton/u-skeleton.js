"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-skeleton",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$9],
  data() {
    return {
      width: 0
    };
  },
  watch: {
    loading() {
      this.getComponentWidth();
    }
  },
  computed: {
    rowsArray() {
      if (/%$/.test(this.rowsHeight)) {
        common_vendor.index.$u.error("rowsHeight\u53C2\u6570\u4E0D\u652F\u6301\u767E\u5206\u6BD4\u5355\u4F4D");
      }
      const rows = [];
      for (let i = 0; i < this.rows; i++) {
        let item = {}, rowWidth = common_vendor.index.$u.test.array(this.rowsWidth) ? this.rowsWidth[i] || (i === this.rows - 1 ? "70%" : "100%") : i === this.rows - 1 ? "70%" : this.rowsWidth, rowHeight = common_vendor.index.$u.test.array(this.rowsHeight) ? this.rowsHeight[i] || "18px" : this.rowsHeight;
        item.marginTop = !this.title && i === 0 ? 0 : this.title && i === 0 ? "20px" : "12px";
        if (/%$/.test(rowWidth)) {
          item.width = common_vendor.index.$u.addUnit(this.width * parseInt(rowWidth) / 100);
        } else {
          item.width = common_vendor.index.$u.addUnit(rowWidth);
        }
        item.height = common_vendor.index.$u.addUnit(rowHeight);
        rows.push(item);
      }
      return rows;
    },
    uTitleWidth() {
      let tWidth = 0;
      if (/%$/.test(this.titleWidth)) {
        tWidth = common_vendor.index.$u.addUnit(this.width * parseInt(this.titleWidth) / 100);
      } else {
        tWidth = common_vendor.index.$u.addUnit(this.titleWidth);
      }
      return common_vendor.index.$u.addUnit(tWidth);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getComponentWidth();
    },
    async setNvueAnimation() {
    },
    async getComponentWidth() {
      await common_vendor.index.$u.sleep(20);
      this.$uGetRect(".u-skeleton__wrapper__content").then((size) => {
        this.width = size.width;
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.loading
  }, _ctx.loading ? common_vendor.e({
    b: _ctx.avatar
  }, _ctx.avatar ? {
    c: common_vendor.n(`u-skeleton__wrapper__avatar--${_ctx.avatarShape}`),
    d: common_vendor.n(_ctx.animate && "animate"),
    e: _ctx.$u.addUnit(_ctx.avatarSize),
    f: _ctx.$u.addUnit(_ctx.avatarSize)
  } : {}, {
    g: _ctx.title
  }, _ctx.title ? {
    h: $options.uTitleWidth,
    i: _ctx.$u.addUnit(_ctx.titleHeight),
    j: common_vendor.n(_ctx.animate && "animate")
  } : {}, {
    k: common_vendor.f($options.rowsArray, (item, index, i0) => {
      return {
        a: index,
        b: item.width,
        c: item.height,
        d: item.marginTop
      };
    }),
    l: common_vendor.n(_ctx.animate && "animate")
  }) : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-db0f067e"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/node_modules/uview-plus/components/u-skeleton/u-skeleton.vue"]]);
wx.createComponent(Component);
