"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "u-numberbox",
  emits: ["update:modelValue", "input", "change", "blur", "plus", "minus"],
  props: {
    value: {
      type: Number,
      default: 1
    },
    modelValue: {
      type: Number,
      default: 1
    },
    bgColor: {
      type: String,
      default: "#F2F3F5"
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 99999
    },
    step: {
      type: Number,
      default: 1
    },
    stepFirst: {
      type: Number,
      default: 0
    },
    stepStrictly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: [Number, String],
      default: 26
    },
    color: {
      type: String,
      default: "#323233"
    },
    inputWidth: {
      type: [Number, String],
      default: 80
    },
    inputHeight: {
      type: [Number, String],
      default: 50
    },
    index: {
      type: [Number, String],
      default: ""
    },
    disabledInput: {
      type: Boolean,
      default: false
    },
    cursorSpacing: {
      type: [Number, String],
      default: 100
    },
    longPress: {
      type: Boolean,
      default: true
    },
    pressTime: {
      type: [Number, String],
      default: 250
    },
    positiveInteger: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    valueCom(v1, v2) {
      if (!this.changeFromInner) {
        this.inputVal = v1;
        this.$nextTick(function() {
          this.changeFromInner = false;
        });
      }
    },
    inputVal(v1, v2) {
      if (v1 == "")
        return;
      let value = 0;
      let tmp = this.isNumber(v1);
      if (tmp && v1 >= this.min && v1 <= this.max)
        value = v1;
      else
        value = v2;
      if (this.positiveInteger) {
        if (v1 < 0 || String(v1).indexOf(".") !== -1) {
          value = v2;
          this.$nextTick(() => {
            this.inputVal = v2;
          });
        }
      }
      this.handleChange(value, "change");
    },
    min(v1) {
      if (v1 !== void 0 && v1 != "" && this.valueCom < v1) {
        this.$emit("input", v1);
      }
    },
    max(v1) {
      if (v1 !== void 0 && v1 != "" && this.valueCom > v1) {
        this.$emit("input", v1);
      }
    }
  },
  data() {
    return {
      inputVal: 1,
      timer: null,
      changeFromInner: false,
      innerChangeTimer: null
    };
  },
  created() {
    this.inputVal = Number(this.valueCom);
  },
  mounted() {
  },
  computed: {
    getCursorSpacing() {
      return Number(common_vendor.index.upx2px(this.cursorSpacing));
    },
    valueCom() {
      return this.modelValue;
    }
  },
  methods: {
    btnTouchStart(callback) {
      this[callback]();
      if (!this.longPress)
        return;
      clearInterval(this.timer);
      this.timer = null;
      this.timer = setInterval(() => {
        this[callback]();
      }, this.pressTime);
    },
    clearTimer() {
      this.$nextTick(() => {
        clearInterval(this.timer);
        this.timer = null;
      });
    },
    minus() {
      this.computeVal("minus");
    },
    plus() {
      this.computeVal("plus");
    },
    calcPlus(num1, num2) {
      let baseNum, baseNum1, baseNum2;
      try {
        baseNum1 = num1.toString().split(".")[1].length;
      } catch (e) {
        baseNum1 = 0;
      }
      try {
        baseNum2 = num2.toString().split(".")[1].length;
      } catch (e) {
        baseNum2 = 0;
      }
      baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
      let precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2;
      return ((num1 * baseNum + num2 * baseNum) / baseNum).toFixed(precision);
    },
    calcMinus(num1, num2) {
      let baseNum, baseNum1, baseNum2;
      try {
        baseNum1 = num1.toString().split(".")[1].length;
      } catch (e) {
        baseNum1 = 0;
      }
      try {
        baseNum2 = num2.toString().split(".")[1].length;
      } catch (e) {
        baseNum2 = 0;
      }
      baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
      let precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2;
      return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
    },
    computeVal(type) {
      common_vendor.index.hideKeyboard();
      if (this.disabled)
        return;
      let value = 0;
      if (type === "minus") {
        if (this.stepFirst > 0 && this.inputVal === this.stepFirst) {
          value = this.min;
        } else {
          value = this.calcMinus(this.inputVal, this.step);
        }
      } else if (type === "plus") {
        if (this.stepFirst > 0 && this.inputVal < this.stepFirst) {
          value = this.stepFirst;
        } else {
          value = this.calcPlus(this.inputVal, this.step);
        }
      }
      if (this.stepStrictly) {
        let strictly = value % this.step;
        if (strictly > 0) {
          value -= strictly;
        }
        if (this.stepFirst > 0 && value > 0 && value < this.stepFirst) {
          if (type === "minus") {
            value = 0;
          } else if (type === "plus") {
            value = this.stepFirst + (this.step - this.stepFirst % this.step);
          }
        }
      }
      if (value > this.max) {
        value = this.max;
      } else if (value < this.min) {
        value = this.min;
      }
      this.inputVal = value;
      this.handleChange(value, type);
    },
    onBlur(event) {
      let val = 0;
      let value = event.detail.value;
      if (!/(^\d+$)/.test(value) || value[0] == 0)
        val = this.min;
      val = +value;
      if (this.stepFirst > 0 && this.inputVal < this.stepFirst && this.inputVal > 0) {
        val = this.stepFirst;
      }
      if (this.stepStrictly) {
        let strictly = val % this.step;
        if (strictly > 0) {
          val -= strictly;
        }
        if (this.stepFirst > 0 && val > 0 && val < this.stepFirst) {
          val = this.stepFirst + (this.step - this.stepFirst % this.step);
        }
      }
      if (val > this.max) {
        val = this.max;
      } else if (val < this.min) {
        val = this.min;
      }
      this.$nextTick(() => {
        this.inputVal = val;
      });
      this.handleChange(val, "blur");
    },
    handleChange(value, type) {
      if (this.disabled)
        return;
      if (this.innerChangeTimer) {
        clearTimeout(this.innerChangeTimer);
        this.innerChangeTimer = null;
      }
      this.changeFromInner = true;
      this.innerChangeTimer = setTimeout(() => {
        this.changeFromInner = false;
      }, 150);
      this.$emit("input", Number(value));
      this.$emit("update:modelValue", Number(value));
      this.$emit(type, {
        value: Number(value),
        index: this.index
      });
    },
    isNumber(value) {
      return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s("font-size:" + (Number($props.size) + 10) + "rpx"),
    b: common_vendor.o(($event) => $options.btnTouchStart("minus")),
    c: common_vendor.o((...args) => $options.clearTimer && $options.clearTimer(...args)),
    d: $props.disabled || $data.inputVal <= $props.min ? 1 : "",
    e: $props.bgColor,
    f: $props.inputHeight + "rpx",
    g: $props.color,
    h: $props.size + "rpx",
    i: $props.disabledInput || $props.disabled,
    j: $options.getCursorSpacing,
    k: $props.disabled ? 1 : "",
    l: common_vendor.o((...args) => $options.onBlur && $options.onBlur(...args)),
    m: $props.color,
    n: $props.size + "rpx",
    o: $props.bgColor,
    p: $props.inputHeight + "rpx",
    q: $props.inputWidth + "rpx",
    r: $data.inputVal,
    s: common_vendor.o(($event) => $data.inputVal = $event.detail.value),
    t: common_vendor.s("font-size:" + (Number($props.size) + 10) + "rpx"),
    v: common_vendor.o(($event) => $options.btnTouchStart("plus")),
    w: common_vendor.o((...args) => $options.clearTimer && $options.clearTimer(...args)),
    x: $props.disabled || $data.inputVal >= $props.max ? 1 : "",
    y: $props.bgColor,
    z: $props.inputHeight + "rpx",
    A: $props.color,
    B: $props.size + "rpx"
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0805b6a2"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/components/u-number-box/u-number-box.vue"]]);
wx.createComponent(Component);
