"use strict";
var common_vendor = require("../common/vendor.js");
var hooks_useAuth = require("./useAuth.js");
function useRouter() {
  const auth = hooks_useAuth.useAuth();
  const GoToHome = () => {
    common_vendor.index.switchTab({
      url: "/pages/tabbar/index/index"
    });
  };
  const GoToCart = () => {
    common_vendor.index.switchTab({
      url: "/pages/tabbar/cart/cart"
    });
  };
  const GoToDetails = (goodsId) => {
    common_vendor.index.navigateTo({
      url: "/pagesMall/goods/goodsDetails?goodsId=" + goodsId
    });
  };
  const GoToConfirmOrder = async (type = 0, param) => {
    const flag = await auth.isLogin();
    if (flag) {
      const data = encodeURIComponent(JSON.stringify(param));
      common_vendor.index.navigateTo({
        url: `/pagesMall/order/confirmOrder?type=${type}&data=${data}`
      });
    }
    return Promise.resolve(flag);
  };
  const GoToWechatPay = async (param) => {
    const flag = await auth.isLogin();
    if (flag) {
      const data = encodeURIComponent(JSON.stringify(param));
      common_vendor.index.navigateTo({
        url: `/pagesMall/order/wxPay?data=${data}`
      });
    }
  };
  const GoToAddress = () => {
    common_vendor.index.navigateTo({
      url: "/pagesMall/user/myAddress"
    });
  };
  const GoToByAdvert = (info) => {
    if (info.classify === 1) {
      common_vendor.index.navigateTo({
        url: `/pagesMall/goods/advertDetails?id=${info.id}`
      });
    } else {
      if (info.classify === 2) {
        GoToDetails(info.goodsId);
        return;
      }
      let url = "";
      switch (info.classify) {
        case 3:
          url = `categoryId=${info.categoryId}`;
          break;
        case 4:
          url = `couponId=${info.couponId}`;
          break;
        case 5:
          url = `promotionId=${info.promotionId}`;
          break;
      }
      common_vendor.index.navigateTo({
        url: `/pages/home/classList?${url}`
      });
    }
  };
  return { GoToHome, GoToCart, GoToDetails, GoToConfirmOrder, GoToAddress, GoToWechatPay, GoToByAdvert };
}
exports.useRouter = useRouter;
