declare namespace Order {
  // 订单确认列表
  interface ConfirmOrder {
    //下面是下单请求参数
    province: string // 省份
    couponId: number // 使用的优惠券
    deliveryMode: number//配送方式:1:快递，2：自提
    payMethod: number   //支付方式，1:微信，2=余额
    balance: number //账户余额
    consignee: string // 收货人姓名
    address: string // 详细的收货地址
    shopUserMobile: string // 买家手机
    buyerMsg: string // 买家留言

    //下面是计算返回结果
    totalAmount: number // 支付价格
    deliveryPrice: number //运费总金额
    totalCouponDiscountPrice: number //总优惠劵金额
    totalFullDiscountPrice: number //总促销满减金额
    couponTitle: string ////使用的优惠券
    couponList: Array<Promotion.Coupon> //可用的优惠juan
    //这个是核心参数-下单请求和返回都需要这个
    list: Array<ConfirmItem>
  }

  interface ConfirmItem {
    cartId: number; //购物车下单必传
    skuId: number; //商品下单必传
    count: number; //商品下单必传

    price: number; //无须传，后端查询数据库返回
    realPrice: number; //优惠后实际单价-如果为0 就是无优惠，取price

    fullDiscountPrice: number;//促销满减金额
    couponDiscountPrice: number; //优惠劵金额
    deliveryAddPrice: number; //续重平摊金额

    promotionId: number; //参与活动的id
    promotionTitle: string;//参与活动的说明

    //以下后端查询数据库返回
    goodsTitle: string //商品标题
    skuDetails: string //sku详情
    skuPic: string //sku图片
  }

  // 订单
  interface Info {
    orderId: number //
    orderNo: string // 订单号
    memberId: number // 购买用户ID
    consignee: string // 收货人姓名
    address: string // 详细的收获地址
    shopUserMobile: string // 买家手机
    logisticsNo: string // 物流号
    logisticsCode: string // 物流公司编号
    logisticsName: string // 物流公司名称
    status: number // 订单状态:-1：取消订单，0：提交订单,1:支付中,2:支付成功,3:已出库待送,4:已签收订单,5:已评价,6:商品已退款,7:商品申请退款中,8:申请退款审核不通过
    finishDate: string // 订单完成时间
    buyerMsg: string // 买家留言
    adminMsg: string // 管理员备注
    closeReason: string // 订单关闭原因
    totalAmount: number // 订单商品总金额
    fullDiscountPrice: number // 促销满减优惠
    couponDiscountPrice: number // 优惠价满减优惠
    deliveryPrice: number // 运费金额
    couponId: number // 优惠劵领取的id
    deliveryMode: number // 配送方式:1:快递，2：自提
    payMethod: number // 支付方式，1:微信，2=余额
    payTime: string // 支付时间
    createdAt: string // 创建时间
    updatedAt: string // 修改时间
    itemList: Item[] //子订单
  }

  //子订单
  interface Item {
    itemId: number; //
    orderId: number; // 订单ID
    orderNo: string; // 订单号
    memberId: number; // 购买用户ID
    goodsId: number; // 商品ID
    goodsTitle: string; // 商品标题
    pic: string; // 商品主图
    skuId: number; // 规格ID
    spData: string; // 规格名称
    weight: number; // 商品重量
    unit: string; // 商品单位
    price: number; // 销售价
    originalPrice: number; // 原始价格
    shopCount: number; // 购买数量
    itemStatus: number; // 订单状态：-1：取消订单，0：提交订单,1:支付中,2:支付成功,3:已出库待送,4:已签收订单,5:已评价,6:商品已退款,7:商品申请退款中,8:申请退款审核不通过,9:退款完成
    deliveryAddPrice: number; // 子订单续重金额
    evaluateStatus: number; // 是否已评价（0：未评价，1：已评价）
    fullDiscountPrice: number; // 促销满减优惠
    couponDiscountPrice: number; // 优惠价满减优惠
    promotionId: number; // 活动id
    promotionTitle: string; // 活动说明
    couponId: number; // 优惠券id
    couponTitle: string; // 优惠券说明
    customWork: string; // 客服备注
    createdAt: string; // 创建时间
    updatedAt: string; // 修改时间
    totalAmount?: string;
  }

  //支付返回结构体
  interface PayContext {
    appId: string;
    nonceStr: string;
    package: string;
    timeStamp: string;
    paySign: string;
    signType: string;
    totalAmount: number;
    msg?: string;//错误信息
  }


// 商品评价
  interface Evaluate {
    id: number //
    itemId: number // 子订单id
    goodsId: number // 商品ID
    memberId: number // 购买用户ID
    price?: number; // 销售价
    shopCount?: number; // 购买数量
    score: number // 分数
    goodsTitle: string // 商品标题
    comment: string // 评价
    pic: string // 商品主图
    albumPics: string // 画册图片，3张
    tags: string // 标注
    reply: string // 商家回复
    spData: string // 规格
    nickName: string // 昵称
    avatarUrl: string // 头像
    createdAt: string // 创建时间
    updatedAt: string // 修改时间
    orderId: number
  }

  interface Logistics {
    message: string;
    un: string;
    com: string;
    status: string;
    data: LogisticsData[];
  }

  interface LogisticsData {
    time: string;
    ftime: string;
    context: string;
  }

  // 订单批量退款
  interface Refund {
    refundId: number; // 退款ID
    orderId: number; // 订单ID
    orderNo: string; // 订单号
    memberId: number; // 购买用户ID
    itemId: number; // 子订单ID
    returnApplyTime: string; // 退货申请时间
    returnAuditTime: string; // 审核时间
    returnReason: string; // 退货原因
    returnVoucher: string; // 退款凭证
    returnPack: number; // 是否收到货，0-未收到货；1-已收到货
    returnType: number; // 退款类型，0-退款；1-退货退款
    returnRejectReason: string; // 退款被拒绝原因
    returnStatus: number; // 退款状态0-申请中；1拒绝，2通过 3，待买家发货 4，退款成功，5，买家已发货待收货
    logisticsNo: string; // 物流号
    logisticsCode: string; // 物流公司编号
    logisticsName: string; // 物流公司名称
    goodsTitle: string; // 商品标题
    pic: string; // 商品主图
    spData: string; // 规格名称
    price: number; // 销售价
    shopCount: number; // 购买数量
    createdAt: string; // 创建时间
    updatedAt: string; // 修改时间
  }
}
