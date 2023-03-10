declare namespace Promotion {
  interface Coupon {
    couponId: number //
    couponTitle: string // 优惠劵标题
    couponType: string // 优惠劵类型
    threshold: number // 商品消费门槛
    discount: number // 商品折扣
    startTime: string // 优惠劵有效期开始
    endTime: string // 优惠劵有效期结束
    rangeDayType: string // 时间范围类型
    effectiveDays: number // 有效期
    scopeType: string // 关联范围类型
    scopeCategoryId: string // 分类关联id
    scopeId: string // 范围关联的id
    description: string // 活动描述
    publishNum: number // 发行数量
    usedNum: number // 已被使用的数量
    receivedNum: number // 已被领取的数量
    publishType: string // 派发方式
    scopeNum: number;//限定使用范围的数量
    receive: boolean; //是否领取优惠劵
    canUse: boolean; //是可以使用
    memberCouponStatus:string; //NEW("领取"),INUSE("使用中") , USED("已使用"), CLOSED("作废");
    //
    loading:boolean
  }
}