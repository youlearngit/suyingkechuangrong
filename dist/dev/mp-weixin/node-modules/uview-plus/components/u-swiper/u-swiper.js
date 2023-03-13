"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-swiper",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$15],
  data() {
    return {
      currentIndex: 0
    };
  },
  watch: {
    current(val, preVal) {
      if (val === preVal)
        return;
      this.currentIndex = val;
    }
  },
  computed: {
    itemStyle() {
      return (index) => {
        const style = {};
        if (this.nextMargin && this.previousMargin) {
          style.borderRadius = common_vendor.index.$u.addUnit(this.radius);
          if (index !== this.currentIndex)
            style.transform = "scale(0.92)";
        }
        return style;
      };
    }
  },
  methods: {
    getItemType(item) {
      if (typeof item === "string")
        return common_vendor.index.$u.test.video(this.getSource(item)) ? "video" : "image";
      if (typeof item === "object" && this.keyName) {
        if (!item.type)
          return common_vendor.index.$u.test.video(this.getSource(item)) ? "video" : "image";
        if (item.type === "image")
          return "image";
        if (item.type === "video")
          return "video";
        return "image";
      }
    },
    getSource(item) {
      if (typeof item === "string")
        return item;
      if (typeof item === "object" && this.keyName)
        return item[this.keyName];
      else
        common_vendor.index.$u.error("\u8BF7\u6309\u683C\u5F0F\u4F20\u9012\u5217\u8868\u53C2\u6570");
      return "";
    },
    change(e) {
      const {
        current
      } = e.detail;
      this.pauseVideo(this.currentIndex);
      this.currentIndex = current;
      this.$emit("change", e.detail);
    },
    pauseVideo(index) {
      const lastItem = this.getSource(this.list[index]);
      if (common_vendor.index.$u.test.video(lastItem)) {
        const video = common_vendor.index.createVideoContext(`video-${index}`, this);
        video.pause();
      }
    },
    getPoster(item) {
      return typeof item === "object" && item.poster ? item.poster : "";
    },
    clickHandler(index) {
      this.$emit("click", index);
    }
  }
};
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_swiper_indicator2 = common_vendor.resolveComponent("u-swiper-indicator");
  (_easycom_u_loading_icon2 + _easycom_u_swiper_indicator2)();
}
const _easycom_u_loading_icon = () => "../u-loading-icon/u-loading-icon.js";
const _easycom_u_swiper_indicator = () => "../u-swiper-indicator/u-swiper-indicator.js";
if (!Math) {
  (_easycom_u_loading_icon + _easycom_u_swiper_indicator)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.loading
  }, _ctx.loading ? {
    b: common_vendor.p({
      mode: "circle"
    })
  } : {
    c: common_vendor.f(_ctx.list, (item, index, i0) => {
      return common_vendor.e({
        a: $options.getItemType(item) === "image"
      }, $options.getItemType(item) === "image" ? {
        b: $options.getSource(item),
        c: _ctx.imgMode,
        d: common_vendor.o(($event) => $options.clickHandler(index)),
        e: _ctx.$u.addUnit(_ctx.height),
        f: _ctx.$u.addUnit(_ctx.radius)
      } : {}, {
        g: $options.getItemType(item) === "video"
      }, $options.getItemType(item) === "video" ? {
        h: `video-${index}`,
        i: $options.getSource(item),
        j: $options.getPoster(item),
        k: _ctx.showTitle && _ctx.$u.test.object(item) && item.title ? item.title : "",
        l: _ctx.$u.addUnit(_ctx.height),
        m: common_vendor.o(($event) => $options.clickHandler(index))
      } : {}, {
        n: _ctx.showTitle && _ctx.$u.test.object(item) && item.title && _ctx.$u.test.image($options.getSource(item))
      }, _ctx.showTitle && _ctx.$u.test.object(item) && item.title && _ctx.$u.test.image($options.getSource(item)) ? {
        o: common_vendor.t(item.title)
      } : {}, {
        p: common_vendor.s($options.itemStyle(index)),
        q: index
      });
    }),
    d: _ctx.$u.addUnit(_ctx.height),
    e: common_vendor.o((...args) => $options.change && $options.change(...args)),
    f: _ctx.circular,
    g: _ctx.interval,
    h: _ctx.duration,
    i: _ctx.autoplay,
    j: _ctx.current,
    k: _ctx.currentItemId,
    l: _ctx.$u.addUnit(_ctx.previousMargin),
    m: _ctx.$u.addUnit(_ctx.nextMargin),
    n: _ctx.acceleration,
    o: _ctx.displayMultipleItems,
    p: _ctx.easingFunction
  }, {
    q: !_ctx.loading && _ctx.indicator && !_ctx.showTitle
  }, !_ctx.loading && _ctx.indicator && !_ctx.showTitle ? {
    r: common_vendor.p({
      indicatorActiveColor: _ctx.indicatorActiveColor,
      indicatorInactiveColor: _ctx.indicatorInactiveColor,
      length: _ctx.list.length,
      current: $data.currentIndex,
      indicatorMode: _ctx.indicatorMode
    })
  } : {}, {
    s: common_vendor.s(_ctx.$u.addStyle(_ctx.indicatorStyle)),
    t: _ctx.bgColor,
    v: _ctx.$u.addUnit(_ctx.height),
    w: _ctx.$u.addUnit(_ctx.radius)
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a2b426be"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/node_modules/uview-plus/components/u-swiper/u-swiper.vue"]]);
wx.createComponent(Component);
