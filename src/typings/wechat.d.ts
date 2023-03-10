declare namespace Wechat {

  interface ReceiveAddr {
    id: number //
    memberId: number // 会员id
    nickName: string // 收件人
    mobile: string // 手机
    province: string // 省
    city: string // 市
    district: string // 区
    areas: string//动态拼接
    details: string // 详细
    status: number // 状态 1-非默认，2-默认
    createdAt: string // 创建时间
    updatedAt: string // 修改时间
  }

  //足迹
  interface GoodsHistory {
    id?: number //
    memberId?: number // 会员id
    goodsId: number // 商品id
    createdAt: string // 创建时间
    publishStatus: number; // 上架状态：1->下架；2->上架
    goodsTitle: string // 商品标题
    pic: string // 商品主图
    price: number;
    originalPrice: number
  }

  // 会员账单
  interface UserBill {
    id: number // id
    memberId: number // 用户uid
    linkId: string // 关联id
    pm: number // 0 = 支出 1 = 获得
    title: string // 账单标题
    category: string // 明细种类
    type: string // 明细类型
    number: number // 明细数字
    balance: number // 剩余
    mark: string // 备注
    createdAt: string // 添加时间
  }

}
