"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-rate",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$13],
  data() {
    return {
      elId: common_vendor.index.$u.guid(),
      elClass: common_vendor.index.$u.guid(),
      rateBoxLeft: 0,
      activeIndex: this.modelValue,
      rateWidth: 0,
      moving: false
    };
  },
  watch: {
    modelValue(val) {
      this.activeIndex = val;
    },
    activeIndex: "emitEvent"
  },
  emits: ["update:modelValue", "change"],
  methods: {
    init() {
      common_vendor.index.$u.sleep().then(() => {
        this.getRateItemRect();
        this.getRateIconWrapRect();
      });
    },
    async getRateItemRect() {
      await common_vendor.index.$u.sleep();
      this.$uGetRect("#" + this.elId).then((res) => {
        this.rateBoxLeft = res.left;
      });
    },
    getRateIconWrapRect() {
      this.$uGetRect("." + this.elClass).then((res) => {
        this.rateWidth = res.width;
      });
    },
    touchMove(e) {
      if (!this.touchable) {
        return;
      }
      this.preventEvent(e);
      const x = e.changedTouches[0].pageX;
      this.getActiveIndex(x);
    },
    touchEnd(e) {
      if (!this.touchable) {
        return;
      }
      this.preventEvent(e);
      const x = e.changedTouches[0].pageX;
      this.getActiveIndex(x);
    },
    clickHandler(e, index) {
      if (common_vendor.index.$u.os() === "ios" && this.moving) {
        return;
      }
      this.preventEvent(e);
      let x = 0;
      x = e.changedTouches[0].pageX;
      this.getActiveIndex(x, true);
    },
    emitEvent() {
      this.$emit("change", this.activeIndex);
      this.$emit("update:modelValue", this.activeIndex);
    },
    getActiveIndex(x, isClick = false) {
      if (this.disabled || this.readonly) {
        return;
      }
      const allRateWidth = this.rateWidth * this.count + this.rateBoxLeft;
      x = common_vendor.index.$u.range(this.rateBoxLeft, allRateWidth, x) - this.rateBoxLeft;
      const distance = x;
      let index;
      if (this.allowHalf) {
        index = Math.floor(distance / this.rateWidth);
        const decimal = distance % this.rateWidth;
        if (decimal <= this.rateWidth / 2 && decimal > 0) {
          index += 0.5;
        } else if (decimal > this.rateWidth / 2) {
          index++;
        }
      } else {
        index = Math.floor(distance / this.rateWidth);
        const decimal = distance % this.rateWidth;
        if (isClick) {
          if (decimal > 0)
            index++;
        } else {
          if (decimal > this.rateWidth / 2)
            index++;
        }
      }
      this.activeIndex = Math.min(index, this.count);
      if (this.activeIndex < this.minCount) {
        this.activeIndex = this.minCount;
      }
      setTimeout(() => {
        this.moving = true;
      }, 10);
      setTimeout(() => {
        this.moving = false;
      }, 10);
    }
  },
  mounted() {
    this.init();
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
    a: common_vendor.f(Number(_ctx.count), (item, index, i0) => {
      return common_vendor.e({
        a: "7b2ed061-0-" + i0,
        b: common_vendor.p({
          name: Math.floor($data.activeIndex) > index ? _ctx.activeIcon : _ctx.inactiveIcon,
          color: _ctx.disabled ? "#c8c9cc" : Math.floor($data.activeIndex) > index ? _ctx.activeColor : _ctx.inactiveColor,
          ["custom-style"]: {
            padding: `0 ${_ctx.$u.addUnit(_ctx.gutter / 2)}`
          },
          size: _ctx.size
        }),
        c: common_vendor.o(($event) => $options.clickHandler($event, index + 1))
      }, _ctx.allowHalf ? {
        d: "7b2ed061-1-" + i0,
        e: common_vendor.p({
          name: Math.ceil($data.activeIndex) > index ? _ctx.activeIcon : _ctx.inactiveIcon,
          color: _ctx.disabled ? "#c8c9cc" : Math.ceil($data.activeIndex) > index ? _ctx.activeColor : _ctx.inactiveColor,
          ["custom-style"]: {
            padding: `0 ${_ctx.$u.addUnit(_ctx.gutter / 2)}`
          },
          size: _ctx.size
        }),
        f: common_vendor.o(($event) => $options.clickHandler($event, index + 1)),
        g: common_vendor.s({
          width: _ctx.$u.addUnit($data.rateWidth / 2)
        })
      } : {}, {
        h: index
      });
    }),
    b: _ctx.allowHalf,
    c: common_vendor.n($data.elClass),
    d: common_vendor.o((...args) => $options.touchMove && $options.touchMove(...args)),
    e: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args)),
    f: $data.elId,
    g: common_vendor.s(_ctx.$u.addStyle(_ctx.customStyle))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7b2ed061"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/node_modules/uview-plus/components/u-rate/u-rate.vue"]]);
wx.createComponent(Component);
