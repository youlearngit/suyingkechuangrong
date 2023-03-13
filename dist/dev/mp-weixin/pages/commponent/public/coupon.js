"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_tag2 = common_vendor.resolveComponent("u-tag");
  (_easycom_u_button2 + _easycom_u_tag2)();
}
const _easycom_u_button = () => "../../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_tag = () => "../../../node-modules/uview-plus/components/u-tag/u-tag.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_tag)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "coupon",
  props: {
    colors: { type: String, required: true },
    type: { type: Boolean, required: false, default: false },
    couponId: { type: Number, required: false, default: 0 },
    couponList: { type: Array, required: false }
  },
  emits: ["onReceive"],
  setup(__props, { emit }) {
    const props = __props;
    common_vendor.useCssVars((_ctx) => ({
      "e337a5ee-colors": __props.colors
    }));
    const onReceive = (item) => {
      if (props.type) {
        if (!item.canUse) {
          common_vendor.index.$u.toast("\u5F53\u524D\u8BA2\u5355\u91D1\u989D\u672A\u6EE1\u4F18\u60E0\u52B5\u4F7F\u7528\u8981\u6C42\uFF01");
          return;
        }
        emit("onReceive", item.couponId);
      }
    };
    const notUser = () => {
      emit("onReceive", 0);
    };
    const getCoupon = async (item) => {
      item.loading = true;
      try {
        await common_vendor.index.$u.http.post("/wx/getCoupon/" + item.couponId);
        item.receive = true;
        common_vendor.index.$u.toast("\u9886\u53D6\u6210\u529F\uFF01");
      } finally {
        item.loading = false;
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.type
      }, __props.type ? {
        b: common_vendor.o(notUser),
        c: common_vendor.s(_ctx.__cssVars())
      } : {}, {
        d: common_vendor.f(__props.couponList, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.couponTitle),
            b: common_vendor.t(item.endTime),
            c: item.couponType === "DISCOUNT"
          }, item.couponType === "DISCOUNT" ? {
            d: common_vendor.t(item.discount)
          } : {}, {
            e: item.couponType === "FULL"
          }, item.couponType === "FULL" ? {
            f: common_vendor.t(item.discount)
          } : {}, {
            g: common_vendor.t(item.threshold),
            h: item.scopeType === "ALL"
          }, item.scopeType === "ALL" ? {} : item.scopeType === "GOODS" && item.scopeNum === 0 ? {} : item.scopeType === "GOODS" && item.scopeNum > 1 ? {} : item.scopeType === "CATEGORY" ? {} : {}, {
            i: item.scopeType === "GOODS" && item.scopeNum === 0,
            j: item.scopeType === "GOODS" && item.scopeNum > 1,
            k: item.scopeType === "CATEGORY"
          }, !__props.type ? {
            l: common_vendor.t(item.receive ? "\u5DF2\u9886\u53D6" : "\u9886\u53D6"),
            m: common_vendor.o(($event) => getCoupon(item)),
            n: "e337a5ee-0-" + i0,
            o: common_vendor.p({
              loading: item.loading,
              shape: "circle",
              disabled: item.receive,
              color: __props.colors,
              customStyle: {
                height: "40rpx",
                fontSize: "25rpx"
              }
            })
          } : common_vendor.e({
            p: !item.canUse
          }, !item.canUse ? {
            q: "e337a5ee-1-" + i0,
            r: common_vendor.p({
              type: "error",
              plain: true,
              size: "mini",
              shape: "circle",
              text: "\u4E0D\u53EF\u7528"
            })
          } : {}, {
            s: item.couponId === __props.couponId
          }, item.couponId === __props.couponId ? {
            t: "e337a5ee-2-" + i0,
            v: common_vendor.p({
              plain: true,
              size: "mini",
              shape: "circle",
              text: "\u5DF2\u9009\u62E9"
            })
          } : {}), {
            w: index,
            x: common_vendor.n(item.receive && !__props.type || __props.type && !item.canUse ? "ylq" : ""),
            y: common_vendor.o(($event) => onReceive(item), index)
          });
        }),
        e: !__props.type,
        f: common_vendor.s("padding-bottom: 30rpx;" + (__props.type ? "padding-top: 50rpx;" : "")),
        g: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e337a5ee"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/commponent/public/coupon.vue"]]);
wx.createComponent(Component);
