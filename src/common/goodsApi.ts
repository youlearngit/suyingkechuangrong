import {ReqPage, ResPage} from "./interface";

export interface GoodsParam extends ReqPage {
    name?: string,
    categoryId?: number,
    couponId?: number,
    promotionId?: number,
    priceStart?: string,
    priceEnd?: string,
}

//查询商品信息
export async function QueryGoods({...param}: GoodsParam) :Promise<ResPage<Goods.Goods>>{
    if (param.sortField==='sale') {
        //销量查询是降序
        param.sortOrder = 'descending'
    }
    //删除不需要查询字段
    if (param.categoryId === 0) delete param.categoryId;
    if (param.couponId === 0) delete param.couponId;
    if (param.promotionId === 0) delete param.promotionId;

    const {data} = await uni.$u.http.get<ResPage<Goods.Goods>>("/public/queryGoods", {data: param})
    return Promise.resolve(data)
}
