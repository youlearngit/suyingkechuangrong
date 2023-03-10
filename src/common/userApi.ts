import {ReqPage, ResPage} from "./interface";

//账号信息
export interface AccountInfo{
    balance:number;//账户余额
    couponCount:number;//可用优惠劵数量
    order_0?:number;//待支付
    order_2?:number;//支付成功-待发货
    order_3?:number;//已出库-待收货
    order_4?:number;//已签收-待评价
}

//查询账户基础信息
export async function GetMyAccount() :Promise<AccountInfo>{
    const {data} = await uni.$u.http.get<AccountInfo>("/wx/getMyAccount")
    return Promise.resolve(data)
}
