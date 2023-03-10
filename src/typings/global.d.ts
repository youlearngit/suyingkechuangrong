declare namespace App {
    export interface Result {
        code: string;
        msg: string;
    }

	//分页响应参数
    export interface ResPage<T> {
        data: T[];
        total: number;
    }

    // 字典配置
    interface Dict {
        id: number; // 主键
        type: string; // 类型
        code: string; // 类型
        value: string; // 类型
        sort: number; // 排序
        explain: string; //说明
        createdAt: string; // 创建时间
    }

    // 广告
    interface Advert {
        id: number; //
        title: string; // 标题
        image: string; //
        advertType: number; // 广告类型 1-轮播图，2-文本告示
        classify: number; // 分类 1-富文本，2-商品,3-商品分类，4-优惠券，5-促销活动
        goodsId: number; // 商品id
        categoryId: number; // 产品分类id
        couponId: number; // 优惠劵id
        promotionId: number; // 促销活动id
        status: number; // 状态 1-停用，2-启用
        remark: string; // 备注
        html: string; // 富文本
        createdAt: string; // 创建时间
        updatedAt: string; // 修改时间
    }
}
