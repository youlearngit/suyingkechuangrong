"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-switch",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$12],
  watch: {
    modelValue: {
      immediate: true,
      handler(n) {
        if (n !== this.inactiveValue && n !== this.activeValue) {
          common_vendor.index.$u.error("v-model\u7ED1\u5B9A\u7684\u503C\u5FC5\u987B\u4E3AinactiveValue\u3001activeValue\u4E8C\u8005\u4E4B\u4E00");
        }
      }
    }
  },
  data() {
    return {
      bgColor: "#ffffff"
    };
  },
  computed: {
    isActive() {
      return this.modelValue === this.activeValue;
    },
    switchStyle() {
      let style = {};
      style.width = common_vendor.index.$u.addUnit(this.size * 2 + 2);
      style.height = common_vendor.index.$u.addUnit(Number(this.size) + 2);
      if (this.customInactiveColor) {
        style.borderColor = "rgba(0, 0, 0, 0)";
      }
      style.backgroundColor = this.isActive ? this.activeColor : this.inactiveColor;
      return style;
    },
    nodeStyle() {
      let style = {};
      style.width = common_vendor.index.$u.addUnit(this.size - this.space);
      style.height = common_vendor.index.$u.addUnit(this.size - this.space);
      const translateX = this.isActive ? common_vendor.index.$u.addUnit(this.space) : common_vendor.index.$u.addUnit(this.size);
      style.transform = `translateX(-${translateX})`;
      return style;
    },
    bgStyle() {
      let style = {};
      style.width = common_vendor.index.$u.addUnit(Number(this.size) * 2 - this.size / 2);
      style.height = common_vendor.index.$u.addUnit(this.size);
      style.backgroundColor = this.inactiveColor;
      style.transform = `scale(${this.isActive ? 0 : 1})`;
      return style;
    },
    customInactiveColor() {
      return this.inactiveColor !== "#fff" && this.inactiveColor !== "#ffffff";
    }
  },
  emits: ["update:modelValue", "change"],
  methods: {
    clickHandler() {
      if (!this.disabled && !this.loading) {
        const oldValue = this.isActive ? this.inactiveValue : this.activeValue;
        if (!this.asyncChange) {
          this.$emit("update:modelValue", oldValue);
        }
        this.$nextTick(() => {
          this.$emit("change", oldValue);
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  _easycom_u_loading_icon2();
}
const _easycom_u_loading_icon = () => "../u-loading-icon/u-loading-icon.js";
if (!Math) {
  _easycom_u_loading_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.bgStyle),
    b: common_vendor.p({
      show: _ctx.loading,
      mode: "circle",
      timingFunction: "linear",
      color: _ctx.modelValue ? _ctx.activeColor : "#AAABAD",
      size: _ctx.size * 0.6
    }),
    c: common_vendor.n(_ctx.modelValue && "u-switch__node--on"),
    d: common_vendor.s($options.nodeStyle),
    e: common_vendor.n(_ctx.disabled && "u-switch--disabled"),
    f: common_vendor.s($options.switchStyle),
    g: common_vendor.s(_ctx.$u.addStyle(_ctx.customStyle)),
    h: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7e2f0021"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/node_modules/uview-plus/components/u-switch/u-switch.vue"]]);
wx.createComponent(Component);
