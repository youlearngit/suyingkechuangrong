declare namespace Goods {

  // 分类
  interface Category {
    id: number // 主键
    name: string // 分类名称
    pic: string // 图片
    orderNum: number // 排序
    createdAt: string // 创建时间
    status: number // 状态1启动，2停用
  }

  // 物料商品
  interface Product {
    id: number; //
    categoryId: number; // 产品分类
    name: string; // 商品名称
    image: string; // 图片
    video: string; // 视频
    videoTime: string; // 视频时间
    homeStatus: number; // 上架状态：1->下架；2->上架
    publishStatus: number; // 上架状态：1->下架；2->上架
    freeStatus: number; // 免邮；1->不；2->推荐
    sort: number; // 排序
    sale: number; // 销量
    price: number; // 价格
    originalPrice: number; // 市场价
    unit: string; // 单位
    weight: number; // 商品重量，默认为克
    albumPics: string; // 画册图片，连产品图片限制为5张，以逗号分割
    spData: string; // 规格属性
    createdAt: string; // 创建时间
    updatedAt: string; // 修改时间
    detailHtml: string; // 商品富文本
    favorite: boolean; //收藏
  }

  // 商品sku
  interface SkuStock {
    id: number //
    productId: number // 商品id
    price: number // 价格
    weight: number // 重量
    stock: number // 库存
    spData: string // 规格属性
    spMd5: string // 规格属性md5
    pic: string // 展示图片
    sale: number // 销量
    promotionPrice: number // 单品促销价格
    lockStock: number // 锁定库存
    delete: number // 是否删除，1=默认,2=删除
  }

  // 物料商品
  interface Goods {
    goodsId: number;
    couponStatus: number;
    freeStatus: number;
    image: string;
    name: string;
    originalPrice: number;
    price: number;
    promotionStatus: number;
    sale: number;
    //以下是sku查询数据
    sku: Array<Sku>;
    skuArr: Array<SkuArr>;
    stock: number;
  }

  //商品sku信息
  interface Sku {
    sku_id: number; //临时id
    sku_name: number; //
    child: Array<SkuChild>;
  }

  interface SkuChild {
    id: number;//临时id
    tag_name: string;
    disabled: boolean;
  }

  //规格具体库存数据
  interface SkuArr {
    goods_sku_id: number; //sku唯一标识
    goods_sku_arr: number[];
    image: string;
    price: number;
    stock: number;
  }

  // 购物车
  interface ShopCart {
    cartId: number //
    memberId: number // 购买用户ID
    goodsId: number // 商品ID
    goodsTitle: string // 商品标题
    pic: string // 商品主图
    skuId: number // 规格ID
    stock: number //****库存****
    spData: string // 规格名称
    weight: number // 商品重量
    unit: string // 商品单位
    price: number // 销售价
    shopCount: number // 购买数量
    createdAt: string // 创建时间
    updatedAt: string // 修改时间
    //
    current: boolean
    status: number //0=失效
    publishStatus: number //2=上架
    delete: number //2=下架
  }

}
