"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
var hooks_usePageData = require("../../hooks/usePageData.js");
if (!Math) {
  Nodata();
}
const Nodata = () => "../../pages/commponent/public/nodata.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myCoupon",
  setup(__props) {
    const store = store_index.GlobalStore();
    const colors = store.theme.color;
    const params = common_vendor.ref({});
    const { list, loading } = hooks_usePageData.usePageData("/wx/queryMyCoupon", params);
    const jumpNext = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/home/classList?couponId=" + item.couponId
      });
    };
    const expTime = (item) => {
      const date = new Date(item.endTime.replace(/-/g, "/"));
      if (new Date().getTime() > date.getTime()) {
        return false;
      }
      return true;
    };
    const canUse = (item) => {
      const date = new Date(item.endTime.replace(/-/g, "/"));
      if (new Date().getTime() > date.getTime()) {
        return false;
      }
      if (item.memberCouponStatus !== "NEW") {
        return false;
      }
      return true;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.couponTitle),
            b: common_vendor.t(item.endTime),
            c: item.scopeType === "ALL"
          }, item.scopeType === "ALL" ? {} : item.scopeType === "GOODS" ? {} : item.scopeType === "CATEGORY" ? {} : {}, {
            d: item.scopeType === "GOODS",
            e: item.scopeType === "CATEGORY",
            f: item.couponType === "FULL"
          }, item.couponType === "FULL" ? {
            g: common_vendor.t(item.discount)
          } : {
            h: common_vendor.t(item.discount)
          }, {
            i: common_vendor.t(item.threshold),
            j: !expTime(item)
          }, !expTime(item) ? {} : item.memberCouponStatus === "NEW" ? {
            l: common_vendor.unref(colors),
            m: common_vendor.o(($event) => jumpNext(item))
          } : item.memberCouponStatus === "INUSE" ? {} : item.memberCouponStatus === "USED" ? {} : item.memberCouponStatus === "CLOSED" ? {} : {}, {
            k: item.memberCouponStatus === "NEW",
            n: item.memberCouponStatus === "INUSE",
            o: item.memberCouponStatus === "USED",
            p: item.memberCouponStatus === "CLOSED",
            q: common_vendor.s("background:" + (canUse(item) ? common_vendor.unref(colors) : "")),
            r: index
          });
        }),
        b: common_vendor.unref(colors),
        c: common_vendor.p({
          colors: common_vendor.unref(colors),
          loading: common_vendor.unref(loading),
          show: common_vendor.unref(list).length === 0,
          count: common_vendor.unref(list).length,
          title: "\u4F18\u60E0\u52B5"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f02bf96"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/user/myCoupon.vue"]]);
wx.createPage(MiniProgramPage);
