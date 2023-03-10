import {defineStore} from "pinia";
import {formatDate} from "../../common/utils";
import {AccountInfo, GetMyAccount} from "../../common/userApi";
import useAuth from "../../hooks/useAuth";

export interface UserType {
  footList: Array<Wechat.GoodsHistory>, //足迹
  account: AccountInfo,//账户信息
}

//首页数据存储 TODO 加快首页展示
export const UserStore = defineStore('user', {
  persist: {
    key: 'user'
  },
  state: (): UserType => ({
    footList: [],
    account: {balance: 0, couponCount: 0}
  }),
  actions: {
    //新增足迹
    addFoot(goods: Goods.Product) {
      const hist: Wechat.GoodsHistory = {
        createdAt: formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'), // 创建时间
        publishStatus: 2,// 上架状态：1->下架；2->上架
        goodsTitle: goods.name, // 商品标题
        goodsId: goods.id,
        pic: goods.image, // 商品主图
        price: goods.price,
        originalPrice: goods.originalPrice
      }
      //判断是否已存在记录
      const index = this.footList.findIndex(p => p.goodsId === hist.goodsId)
      if (index > -1) {
        this.footList.splice(index, 1)
      }
      if (this.footList.length < 5) {
        this.footList.unshift(hist)
      } else {
        this.footList[4] = this.footList[3]
        this.footList[3] = this.footList[2]
        this.footList[2] = this.footList[1]
        this.footList[1] = this.footList[0]
        this.footList[0] = hist
      }
    },
    //更新足迹
    async updateFoot() {
      const {data} = await uni.$u.http.get<Array<Wechat.GoodsHistory>>("/wx/getMyHistory?limit=5")
      this.footList = data
    },
    //更新账户信息
    async updateAccount() {
      //如果没登录就不进行这个刷新
      const auth = useAuth();
      if (!auth.isNotLogin()) {
        this.account = await GetMyAccount()
      } else {
        //如果没登录则清空数据
        this.account = {balance: 0, couponCount: 0}
      }
    }
  }
})
