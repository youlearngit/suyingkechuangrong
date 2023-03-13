"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var common_vendor = require("./common/vendor.js");
var store_index = require("./store/index.js");
var config_request = require("./config/request.js");
require("./common/login.js");
require("./hooks/useAuth.js");
require("./store/modules/cart.js");
require("./store/modules/user.js");
require("./common/utils.js");
require("./common/userApi.js");
if (!Math) {
  "./pages/tabbar/index/index.js";
  "./pages/project/index/index.js";
  "./pages/tabbar/category/category.js";
  "./pages/tabbar/cart/cart.js";
  "./pages/tabbar/user/user.js";
  "./pages/tabbar/user/setting.js";
  "./pages/login/login.js";
  "./pages/home/classList.js";
  "./pages/home/search.js";
  "./pagesMall/user/myInfo.js";
  "./pagesMall/order/confirmOrder.js";
  "./pagesMall/goods/goodsDetails.js";
  "./pagesMall/goods/advertDetails.js";
  "./pagesMall/goods/goodsEvaluate.js";
  "./pagesMall/user/myAddress.js";
  "./pagesMall/user/myFoot.js";
  "./pagesMall/user/myFavorite.js";
  "./pagesMall/user/myCoupon.js";
  "./pagesMall/user/myWithdrawal.js";
  "./pagesMall/user/address/edit.js";
  "./pagesMall/order/orderList.js";
  "./pagesMall/order/orderDetails.js";
  "./pagesMall/order/cancelOrder.js";
  "./pagesMall/order/orderLogistics.js";
  "./pagesMall/order/evaluate/evaluate.js";
  "./pagesMall/order/wxPay.js";
  "./pagesMall/order/afterSaleList.js";
  "./pagesMall/order/afterType.js";
  "./pagesMall/order/afterSale.js";
  "./pagesMall/user/u-avatar-cropper/u-avatar-cropper.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.pinia).use(common_vendor.viewPlus).use(config_request.install);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
