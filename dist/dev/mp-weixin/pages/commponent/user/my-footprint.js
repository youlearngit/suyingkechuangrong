"use strict";
var common_vendor = require("../../../common/vendor.js");
var store_modules_user = require("../../../store/modules/user.js");
var hooks_useRouter = require("../../../hooks/useRouter.js");
require("../../../common/utils.js");
require("../../../common/userApi.js");
require("../../../hooks/useAuth.js");
require("../../../store/index.js");
require("../../../common/login.js");
require("../../../store/modules/cart.js");
if (!Math) {
  common_vendor.unref(ListCell)();
}
const ListCell = () => "./list-cell.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my-footprint",
  props: { colors: String },
  setup(__props) {
    const userStore = store_modules_user.UserStore();
    const logList = common_vendor.computed$1(() => {
      return userStore.footList;
    });
    const router = hooks_useRouter.useRouter();
    const jumpNext = (item) => {
      router.GoToDetails(item.goodsId);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          icons: "icon-liulanjilu-tianchong",
          linkUrl: "/pagesMall/user/myFoot",
          rightshow: true,
          colors: __props.colors
        }),
        b: common_vendor.unref(logList).length === 0
      }, common_vendor.unref(logList).length === 0 ? {
        c: common_vendor.s("color:" + __props.colors)
      } : {}, {
        d: common_vendor.f(common_vendor.unref(logList), (item, index, i0) => {
          return {
            a: item.pic,
            b: common_vendor.t(item.goodsTitle),
            c: index,
            d: common_vendor.o(($event) => jumpNext(item), index)
          };
        })
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2e67f4df"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/commponent/user/my-footprint.vue"]]);
wx.createComponent(Component);
