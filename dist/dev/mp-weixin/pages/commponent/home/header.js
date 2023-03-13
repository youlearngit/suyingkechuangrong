"use strict";
var common_vendor = require("../../../common/vendor.js");
var store_modules_home = require("../../../store/modules/home.js");
var hooks_useRouter = require("../../../hooks/useRouter.js");
require("../../../common/simpleHttp.js");
require("../../../hooks/useAuth.js");
require("../../../store/index.js");
require("../../../common/login.js");
require("../../../store/modules/cart.js");
require("../../../store/modules/user.js");
require("../../../common/utils.js");
require("../../../common/userApi.js");
if (!Array) {
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  _easycom_u_swiper2();
}
const _easycom_u_swiper = () => "../../../node-modules/uview-plus/components/u-swiper/u-swiper.js";
if (!Math) {
  (Navbar + _easycom_u_swiper)();
}
const Navbar = () => "../../../components/u-navbar/u-navbar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "header",
  props: {
    colors: { type: String, required: true }
  },
  setup(__props) {
    const menuInfo = {
      height: "50rpx"
    };
    const menu = common_vendor.index.getMenuButtonBoundingClientRect();
    menuInfo.height = menu.height + "px";
    const homeStore = store_modules_home.HomeStore();
    common_vendor.computed$1(() => {
      if (homeStore.dictMap["hot-search"]) {
        return homeStore.dictMap["hot-search"].map((p) => {
          return p.value;
        });
      } else {
        return [];
      }
    });
    const imagesList = common_vendor.computed$1(() => {
      if (homeStore.advertList) {
        return homeStore.advertList.filter((p) => p.advertType === 1).map((p) => {
          return p.image;
        });
      } else {
        return [];
      }
    });
    const router = hooks_useRouter.useRouter();
    const swiperClick = (e) => {
      router.GoToByAdvert(homeStore.advertList.filter((p) => p.advertType === 1)[e]);
    };
    common_vendor.onMounted(async () => {
      await homeStore.updateDict("hot-search");
      await homeStore.updateAdvertList();
    });
    const swiperHeight = common_vendor.ref(common_vendor.index.upx2px(249));
    return (_ctx, _cache) => {
      return {
        a: menuInfo.height,
        b: common_vendor.p({
          background: {
            backgroundColor: __props.colors
          },
          ["is-back"]: false
        }),
        c: common_vendor.o(swiperClick),
        d: common_vendor.p({
          height: swiperHeight.value,
          list: common_vendor.unref(imagesList),
          indicator: true,
          indicatorMode: "dot",
          circular: true
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-166b98fa"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/commponent/home/header.vue"]]);
wx.createComponent(Component);
