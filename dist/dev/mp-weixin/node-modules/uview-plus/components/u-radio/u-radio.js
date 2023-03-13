"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-radio",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$7],
  data() {
    return {
      checked: false,
      parentData: {
        iconSize: 12,
        labelDisabled: null,
        disabled: null,
        shape: null,
        activeColor: null,
        inactiveColor: null,
        size: 18,
        value: null,
        modelValue: null,
        iconColor: null,
        placement: "row",
        borderBottom: false,
        iconPlacement: "left"
      }
    };
  },
  computed: {
    elDisabled() {
      return this.disabled !== "" ? this.disabled : this.parentData.disabled !== null ? this.parentData.disabled : false;
    },
    elLabelDisabled() {
      return this.labelDisabled !== "" ? this.labelDisabled : this.parentData.labelDisabled !== null ? this.parentData.labelDisabled : false;
    },
    elSize() {
      return this.size ? this.size : this.parentData.size ? this.parentData.size : 21;
    },
    elIconSize() {
      return this.iconSize ? this.iconSize : this.parentData.iconSize ? this.parentData.iconSize : 12;
    },
    elActiveColor() {
      return this.activeColor ? this.activeColor : this.parentData.activeColor ? this.parentData.activeColor : "#2979ff";
    },
    elInactiveColor() {
      return this.inactiveColor ? this.inactiveColor : this.parentData.inactiveColor ? this.parentData.inactiveColor : "#c8c9cc";
    },
    elLabelColor() {
      return this.labelColor ? this.labelColor : this.parentData.labelColor ? this.parentData.labelColor : "#606266";
    },
    elShape() {
      return this.shape ? this.shape : this.parentData.shape ? this.parentData.shape : "circle";
    },
    elLabelSize() {
      return common_vendor.index.$u.addUnit(this.labelSize ? this.labelSize : this.parentData.labelSize ? this.parentData.labelSize : "15");
    },
    elIconColor() {
      const iconColor = this.iconColor ? this.iconColor : this.parentData.iconColor ? this.parentData.iconColor : "#ffffff";
      if (this.elDisabled) {
        return this.checked ? this.elInactiveColor : "transparent";
      } else {
        return this.checked ? iconColor : "transparent";
      }
    },
    iconClasses() {
      let classes = [];
      classes.push("u-radio__icon-wrap--" + this.elShape);
      if (this.elDisabled) {
        classes.push("u-radio__icon-wrap--disabled");
      }
      if (this.checked && this.elDisabled) {
        classes.push("u-radio__icon-wrap--disabled--checked");
      }
      return classes;
    },
    iconWrapStyle() {
      const style = {};
      style.backgroundColor = this.checked && !this.elDisabled ? this.elActiveColor : "#ffffff";
      style.borderColor = this.checked && !this.elDisabled ? this.elActiveColor : this.elInactiveColor;
      style.width = common_vendor.index.$u.addUnit(this.elSize);
      style.height = common_vendor.index.$u.addUnit(this.elSize);
      if (this.parentData.iconPlacement === "right") {
        style.marginRight = 0;
      }
      return style;
    },
    radioStyle() {
      const style = {};
      if (this.parentData.borderBottom && this.parentData.placement === "row") {
        common_vendor.index.$u.error("\u68C0\u6D4B\u5230\u60A8\u5C06borderBottom\u8BBE\u7F6E\u4E3Atrue\uFF0C\u9700\u8981\u540C\u65F6\u5C06u-radio-group\u7684placement\u8BBE\u7F6E\u4E3Acolumn\u624D\u6709\u6548");
      }
      if (this.parentData.borderBottom && this.parentData.placement === "column") {
        style.paddingBottom = common_vendor.index.$u.os() === "ios" ? "12px" : "8px";
      }
      return common_vendor.index.$u.deepMerge(style, common_vendor.index.$u.addStyle(this.customStyle));
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.updateParentData();
      if (!this.parent) {
        common_vendor.index.$u.error("u-radio\u5FC5\u987B\u642D\u914Du-radio-group\u7EC4\u4EF6\u4F7F\u7528");
      }
      this.checked = this.name === this.parentData.modelValue;
    },
    updateParentData() {
      this.getParentData("u-radio-group");
    },
    iconClickHandler(e) {
      this.preventEvent(e);
      if (!this.elDisabled) {
        this.setRadioCheckedStatus();
      }
    },
    wrapperClickHandler(e) {
      this.parentData.iconPlacement === "right" && this.iconClickHandler(e);
    },
    labelClickHandler(e) {
      this.preventEvent(e);
      if (!this.elLabelDisabled && !this.elDisabled) {
        this.setRadioCheckedStatus();
      }
    },
    emitEvent() {
      if (!this.checked) {
        this.$emit("change", this.name);
        this.$nextTick(() => {
          common_vendor.index.$u.formValidate(this, "change");
        });
      }
    },
    setRadioCheckedStatus() {
      this.emitEvent();
      this.checked = true;
      typeof this.parent.unCheckedOther === "function" && this.parent.unCheckedOther(this);
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
  return {
    a: common_vendor.p({
      name: "checkbox-mark",
      size: $options.elIconSize,
      color: $options.elIconColor
    }),
    b: common_vendor.o((...args) => $options.iconClickHandler && $options.iconClickHandler(...args)),
    c: common_vendor.n($options.iconClasses),
    d: common_vendor.s($options.iconWrapStyle),
    e: common_vendor.t(_ctx.label),
    f: common_vendor.o((...args) => $options.labelClickHandler && $options.labelClickHandler(...args)),
    g: $options.elDisabled ? $options.elInactiveColor : $options.elLabelColor,
    h: $options.elLabelSize,
    i: $options.elLabelSize,
    j: common_vendor.o((...args) => $options.wrapperClickHandler && $options.wrapperClickHandler(...args)),
    k: common_vendor.s($options.radioStyle),
    l: common_vendor.n(`u-radio-label--${$data.parentData.iconPlacement}`),
    m: common_vendor.n($data.parentData.borderBottom && $data.parentData.placement === "column" && "u-border-bottom")
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-354c0f29"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/node_modules/uview-plus/components/u-radio/u-radio.vue"]]);
wx.createComponent(Component);
