"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
var store_modules_cart = require("../../store/modules/cart.js");
var hooks_useRouter = require("../../hooks/useRouter.js");
var hooks_useAuth = require("../../hooks/useAuth.js");
var store_modules_user = require("../../store/modules/user.js");
require("../../common/login.js");
require("../../common/utils.js");
require("../../common/userApi.js");
if (!Array) {
  const _easycom_u_skeleton2 = common_vendor.resolveComponent("u-skeleton");
  const _easycom_u_tag2 = common_vendor.resolveComponent("u-tag");
  (_easycom_u_skeleton2 + _easycom_u_tag2)();
}
const _easycom_u_skeleton = () => "../../node-modules/uview-plus/components/u-skeleton/u-skeleton.js";
const _easycom_u_tag = () => "../../node-modules/uview-plus/components/u-tag/u-tag.js";
if (!Math) {
  (_easycom_u_skeleton + SwiperView + _easycom_u_tag + EvaluateList + BctosRichText + Sku + common_vendor.unref(Coupon))();
}
const SwiperView = () => "./component/swiper.js";
const EvaluateList = () => "./component/evaluateList.js";
const BctosRichText = () => "./component/bctos-rich-text.js";
const Sku = () => "../../pages/commponent/public/sku.js";
const Coupon = () => "../../pages/commponent/public/coupon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "goodsDetails",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "9337d816-colors": common_vendor.unref(colors)
    }));
    const { GoToHome, GoToCart, GoToConfirmOrder } = hooks_useRouter.useRouter();
    const store = store_index.GlobalStore();
    const colors = common_vendor.computed$1(() => {
      return store.theme.color;
    });
    const cartStore = store_modules_cart.CartStore();
    const cartCount = common_vendor.computed$1(() => {
      return cartStore.list.length;
    });
    const goods = common_vendor.ref({ videoTime: "" });
    const skuRef = common_vendor.ref();
    const openSku = () => {
      skuRef.value.open({ ...goods.value, goodsId: goods.value.id }, 1, selectSku);
    };
    const selectSku = common_vendor.reactive({
      info: "",
      count: 1,
      arr: Array(),
      skuId: 0
    });
    const setSku = (info) => {
      selectSku.skuId = info.skuId;
      selectSku.info = info.info;
      selectSku.count = info.count;
      selectSku.arr = info.arr;
      goods.value.price = info.price;
    };
    const { isLogin } = hooks_useAuth.useAuth();
    const confirmSku = async (type) => {
      if (selectSku.skuId > 0) {
        const flag = await isLogin();
        if (!flag)
          return;
        if (type === "add") {
          await cartStore.addCart(selectSku.skuId, 1);
          common_vendor.index.$u.toast("\u6DFB\u52A0\u8D2D\u7269\u8F66\u6210\u529F\uFF01");
        } else {
          await GoToConfirmOrder(0, { skuId: selectSku.skuId, count: selectSku.count });
        }
      } else {
        skuRef.value.open({ ...goods.value, goodsId: goods.value.id }, 0);
      }
    };
    const setColl = async () => {
      await common_vendor.index.$u.http.post("/wx/addMyFavorite/" + goods.value.id);
      goods.value.favorite = !goods.value.favorite;
      if (goods.value.favorite) {
        common_vendor.index.$u.toast("\u6536\u85CF\u6210\u529F");
      } else {
        common_vendor.index.$u.toast("\u5DF2\u53D6\u6D88");
      }
    };
    const couponShow = common_vendor.ref(false);
    const couponList = common_vendor.ref([]);
    const getCouponTitle = (item) => {
      if (item.couponType === "FULL") {
        return `\u6EE1${item.threshold}\u5143\u51CF${item.discount}\u5143`;
      } else {
        return `\u6EE1${item.threshold}\u6253${item.discount}\u6298`;
      }
    };
    const refEvaluate = common_vendor.ref();
    const userStore = store_modules_user.UserStore();
    const loading = common_vendor.ref(true);
    let goodsId = 0;
    common_vendor.onLoad(async (option) => {
      if (option.goodsId) {
        goodsId = Number(option.goodsId);
      }
    });
    common_vendor.onShow(async () => {
      if (goodsId === 0) {
        return;
      }
      const { data: info } = await common_vendor.index.$u.http.get("/public/getGoodsInfo?goodsId=" + goodsId);
      if (!info.id || info.publishStatus === 1) {
        common_vendor.index.$u.toast("\u5546\u54C1\u5DF2\u5931\u6548\uFF01");
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/tabbar/index/index"
          });
        }, 1500);
        return;
      }
      await refEvaluate.value.openView(info.id);
      goods.value = info;
      userStore.addFoot(info);
      const { data: list } = await common_vendor.index.$u.http.get("/public/getCurrentGoodsCanGet", {
        data: {
          goodsId: info.id,
          categoryId: info.categoryId
        }
      });
      couponList.value = list;
      loading.value = false;
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {
        b: common_vendor.s(_ctx.__cssVars()),
        c: common_vendor.p({
          rows: "22",
          title: true,
          loading: loading.value,
          animate: true
        })
      } : {}, {
        d: common_vendor.p({
          imageList: goods.value.albumPics ? (_a = goods.value.albumPics) == null ? void 0 : _a.split(",") : [],
          videoTime: (_b = goods.value) == null ? void 0 : _b.videoTime,
          videoUrl: goods.value.video ? goods.value.video.split(",")[0] : ""
        }),
        e: common_vendor.t(goods.value.name),
        f: common_vendor.t(goods.value.price),
        g: common_vendor.t(goods.value.originalPrice),
        h: common_vendor.n(goods.value.favorite === true ? "icon-shoucang1" : "icon-shoucang"),
        i: goods.value.favorite === true ? common_vendor.unref(colors) : "",
        j: goods.value.favorite === true ? common_vendor.unref(colors) : "",
        k: common_vendor.o(setColl),
        l: goods.value.freeStatus === 2
      }, goods.value.freeStatus === 2 ? {} : {}, {
        m: common_vendor.t(goods.value.sale),
        n: common_vendor.t(selectSku.skuId ? selectSku.info + " X " + selectSku.count : "\u672A\u9009\u62E9"),
        o: common_vendor.o(openSku),
        p: common_vendor.f(couponList.value, (item, k0, i0) => {
          return {
            a: item.couponId,
            b: common_vendor.o(($event) => couponShow.value = true, item.couponId),
            c: "9337d816-2-" + i0,
            d: common_vendor.p({
              size: "mini",
              color: common_vendor.unref(colors),
              borderColor: common_vendor.unref(colors),
              plain: true,
              shape: "circle",
              text: getCouponTitle(item)
            })
          };
        }),
        q: common_vendor.o(($event) => couponShow.value = true),
        r: common_vendor.sr(refEvaluate, "9337d816-3", {
          "k": "refEvaluate"
        }),
        s: common_vendor.p({
          nodes: goods.value.detailHtml
        }),
        t: common_vendor.o(
          (...args) => common_vendor.unref(GoToHome) && common_vendor.unref(GoToHome)(...args)
        ),
        v: common_vendor.unref(cartCount) !== 0
      }, common_vendor.unref(cartCount) !== 0 ? {
        w: common_vendor.t(common_vendor.unref(cartCount))
      } : {}, {
        x: common_vendor.o(
          (...args) => common_vendor.unref(GoToCart) && common_vendor.unref(GoToCart)(...args)
        ),
        y: common_vendor.s("border-color:" + common_vendor.unref(colors) + ";color:" + common_vendor.unref(colors)),
        z: common_vendor.o(($event) => confirmSku("add")),
        A: common_vendor.s("background:" + common_vendor.unref(colors)),
        B: common_vendor.o(($event) => confirmSku("pay")),
        C: common_vendor.sr(skuRef, "9337d816-5", {
          "k": "skuRef"
        }),
        D: common_vendor.o(setSku),
        E: common_vendor.p({
          bottoms: 1,
          colors: common_vendor.unref(colors)
        }),
        F: couponShow.value === true
      }, couponShow.value === true ? {
        G: common_vendor.o(($event) => couponShow.value = false)
      } : {}, {
        H: common_vendor.p({
          colors: common_vendor.unref(colors),
          couponList: couponList.value
        }),
        I: common_vendor.s("bottom:" + (couponShow.value === true ? "0px" : "")),
        J: !loading.value,
        K: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9337d816"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/goods/goodsDetails.vue"]]);
wx.createPage(MiniProgramPage);
