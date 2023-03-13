"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-textarea",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$11],
  data() {
    return {
      innerValue: "",
      focused: false,
      firstChange: true,
      changeFromInner: false,
      innerFormatter: (value) => value
    };
  },
  created() {
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newVal, oldVal) {
        this.innerValue = newVal;
        this.firstChange = false;
        this.changeFromInner = false;
      }
    }
  },
  computed: {
    textareaClass() {
      let classes = [], { border, disabled } = this;
      border === "surround" && (classes = classes.concat(["u-border", "u-textarea--radius"]));
      border === "bottom" && (classes = classes.concat([
        "u-border-bottom",
        "u-textarea--no-radius"
      ]));
      disabled && classes.push("u-textarea--disabled");
      return classes.join(" ");
    },
    textareaStyle() {
      const style = {};
      return common_vendor.index.$u.deepMerge(style, common_vendor.index.$u.addStyle(this.customStyle));
    }
  },
  emits: ["update:modelValue", "linechange", "focus", "blur", "change", "confirm", "keyboardheightchange"],
  methods: {
    setFormatter(e) {
      this.innerFormatter = e;
    },
    onFocus(e) {
      this.$emit("focus", e);
    },
    onBlur(e) {
      this.$emit("blur", e);
      common_vendor.index.$u.formValidate(this, "blur");
    },
    onLinechange(e) {
      this.$emit("linechange", e);
    },
    onInput(e) {
      let { value = "" } = e.detail || {};
      const formatter = this.formatter || this.innerFormatter;
      const formatValue = formatter(value);
      this.innerValue = value;
      this.$nextTick(() => {
        this.innerValue = formatValue;
        this.valueChange();
      });
    },
    valueChange() {
      const value = this.innerValue;
      this.$nextTick(() => {
        this.$emit("update:modelValue", value);
        this.changeFromInner = true;
        this.$emit("change", value);
        common_vendor.index.$u.formValidate(this, "change");
      });
    },
    onConfirm(e) {
      this.$emit("confirm", e);
    },
    onKeyboardheightchange(e) {
      this.$emit("keyboardheightchange", e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.innerValue,
    b: _ctx.$u.addUnit(_ctx.height),
    c: _ctx.placeholder,
    d: _ctx.$u.addStyle(_ctx.placeholderStyle, "string"),
    e: _ctx.placeholderClass,
    f: _ctx.disabled,
    g: _ctx.focus,
    h: _ctx.autoHeight,
    i: _ctx.fixed,
    j: _ctx.cursorSpacing,
    k: _ctx.cursor,
    l: _ctx.showConfirmBar,
    m: _ctx.selectionStart,
    n: _ctx.selectionEnd,
    o: _ctx.adjustPosition,
    p: _ctx.disableDefaultPadding,
    q: _ctx.holdKeyboard,
    r: _ctx.maxlength,
    s: _ctx.confirmType,
    t: _ctx.ignoreCompositionEvent,
    v: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args)),
    w: common_vendor.o((...args) => $options.onBlur && $options.onBlur(...args)),
    x: common_vendor.o((...args) => $options.onLinechange && $options.onLinechange(...args)),
    y: common_vendor.o((...args) => $options.onInput && $options.onInput(...args)),
    z: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args)),
    A: common_vendor.o((...args) => $options.onKeyboardheightchange && $options.onKeyboardheightchange(...args)),
    B: _ctx.count
  }, _ctx.count ? {
    C: common_vendor.t($data.innerValue.length),
    D: common_vendor.t(_ctx.maxlength),
    E: _ctx.disabled ? "transparent" : "#fff"
  } : {}, {
    F: common_vendor.n($options.textareaClass),
    G: common_vendor.s($options.textareaStyle)
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8c2832be"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/node_modules/uview-plus/components/u-textarea/u-textarea.vue"]]);
wx.createComponent(Component);
