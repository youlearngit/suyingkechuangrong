import useAuth from "./useAuth";

export default function useRouter() {
  const auth = useAuth()
  const GoToHome = () => {
    uni.switchTab({
      url: '/pages/tabbar/index/index'
    });
  }
  const GoToCart = () => {
    uni.switchTab({
      url: '/pages/tabbar/cart/cart'
    });
  }

  //商品详情
  const GoToDetails = (goodsId: number) => {
    uni.navigateTo({
      url: '/pagesMall/goods/goodsDetails?goodsId=' + goodsId
    })
  }

  /**
   * 订单确认
   * @param type 0=直接下单，1=购物车
   * @param param
   * @constructor
   */
  const GoToConfirmOrder = async (type = 0, param: any): Promise<Boolean> => {
    const flag = await auth.isLogin() //如果没登陆就不进行页面跳转的
    if (flag) {
      const data = encodeURIComponent(JSON.stringify(param))
      uni.navigateTo({
        url: `/pagesMall/order/confirmOrder?type=${type}&data=${data}`
      })
    }
    return Promise.resolve(flag)
  }

  //跳转支付页面
  const GoToWechatPay = async (param: any) => {
    const flag = await auth.isLogin() //如果没登陆就不进行页面跳转的
    if (flag) {
      const data = encodeURIComponent(JSON.stringify(param))
      uni.navigateTo({
        url: `/pagesMall/order/wxPay?data=${data}`
      })
    }
  }

  //跳转我的地址
  const GoToAddress = () => {
    uni.navigateTo({
      url: '/pagesMall/user/myAddress'
    });
  }

  //根据广告跳转页面
  const GoToByAdvert = (info: App.Advert) => {
    // 分类 1-富文本，2-商品,3-商品分类，4-优惠券，5-促销活动
    if (info.classify === 1) {
      //跳转富文本页面
      uni.navigateTo({
        url: `/pagesMall/goods/advertDetails?id=${info.id}`
      });
    } else {
      if (info.classify === 2) {
        //商品详情
        GoToDetails(info.goodsId)
        return
      }
      //跳转搜索页面
      let url = ''
      switch (info.classify) {
        case 3:
          url = `categoryId=${info.categoryId}`
          break
        case 4:
          url = `couponId=${info.couponId}`
          break
        case 5:
          url = `promotionId=${info.promotionId}`
          break
      }
      uni.navigateTo({
        url: `/pages/home/classList?${url}`
      });
    }

  }

  return {GoToHome, GoToCart, GoToDetails, GoToConfirmOrder, GoToAddress, GoToWechatPay, GoToByAdvert}
}
