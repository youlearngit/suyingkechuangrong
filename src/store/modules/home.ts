import {defineStore} from "pinia";
import {GET} from "../../common/simpleHttp";

export interface HomeType {
  categoryList: Array<Goods.Category> //分类缓存
  receiveAddr: Partial<Wechat.ReceiveAddr> //收货地址
  advertList: Array<App.Advert> //广告列表
  dictMap: { [key in string]: Array<App.Dict> } //数据字典
  keywordList: Array<string> //商品搜索
}

//首页数据存储 TODO 加快首页展示
export const HomeStore = defineStore('home', {
  persist: {
    key: 'home'
  },
  state: (): HomeType => ({
    dictMap: {},
    categoryList: [],
    advertList: [],
    keywordList: [],
    receiveAddr: {}
  }),
  actions: {
    //更新数据字典缓存
    async updateDict(type: string) {
      const data = await GET<Array<App.Dict>>('/public/getDictByType', {type})
      this.dictMap[type] = data
    },
    //更新分类信息
    async updateCategoryList() {
      const data = await GET<Array<Goods.Category>>('/public/queryCategory', {limit: 100})
      if (data) {
        this.categoryList = data
      }
    },
    //更新广告信息
    async updateAdvertList() {
      const data = await GET<Array<App.Advert>>('/public/getAdvert')
      if (data) {
        this.advertList = data
      }
    },
    //获取收货地址
    async getReceiveAddr() {
      if (!this.receiveAddr.id) {
        const {data: addr} = await uni.$u.http.get<Array<Wechat.ReceiveAddr>>("/wx/getReceiveAddrList?limit=1")
        if (addr.length > 0) {
          //如果存在则更新缓存信息
          const address = addr[0]
          this.receiveAddr = address
          //详细地址
          this.receiveAddr.areas = address.province + address.city + address.district + address.details
        }
      }
      return this.receiveAddr
    },
    clearsKeywordList() {
      this.keywordList = []
    }
  }
})
