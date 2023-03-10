import {defineStore} from "pinia";
import {GlobalStore} from "../index";

export interface CartType {
  list: Array<Goods.ShopCart>,
}

//购物车存储
export const CartStore = defineStore('cart', {
  persist: {
    key: 'cart'
  },
  state: (): CartType => ({
    list: [],
  }),
  actions: {
    async deleteCart(cartIds: number[]) {
      //发送接口
      await uni.$u.http.delete("/wx/delMyCart/" + cartIds.join(","))
      //内部删除
      cartIds.forEach(cartId => {
        const cartIndex = this.list.findIndex((p) => {
          return p.cartId === cartId
        })
        if (cartIndex > -1) {
          this.list.splice(cartIndex, 1)
        }
      })
      this.updateBadge()
    },
    //添加购物车
    async addCart(skuId: number, count: number) {
      //1.先调用接口插入数据
      //添加购物车
      await uni.$u.http.post("/wx/addCart", {skuId: skuId, count: count})
      //判断列表是否存在
      const cart = this.list.find((p) => {
        return p.skuId === skuId
      })
      if (cart) {
        //存在则更新
        cart.shopCount += count
      } else {
        //新增的sku就更新总列表
        await this.updateList()
        //设置角标
        this.updateBadge()
      }
    },
    //更新购买数量
    async updateCart(cartId: number, shopCount: number) {
      await uni.$u.http.post("/wx/updateCart", {cartId, shopCount})
    },
    //更新列表
    async updateList() {
      const store = GlobalStore()
      if (!store.login.token) return
      const {data} = await uni.$u.http.get<Array<Goods.ShopCart>>("wx/getMyCart")
      const currentSet = new Set(this.list.filter(p => p.current).map(p => p.cartId))
      //设置之前选中的值
      data.forEach(p => {
        //购买数量也要满足
        if (p.stock!==0&&p.shopCount > p.stock) {
          p.shopCount = p.stock//直接等于最大值
        }
        if (currentSet.has(p.cartId)) {
          p.current = true
        }
        //转换规格展示
        p.spData = p.spData.replaceAll("[", "")
        p.spData = p.spData.replaceAll("]", "")
        p.spData = p.spData.replaceAll("{", "")
        p.spData = p.spData.replaceAll("}", "")
        p.spData = p.spData.replaceAll("\"", "")
        if (p.publishStatus == 2 && p.delete == 1 && p.stock > 0) {
          p.status = 1
        } else {
          p.status = 0
          p.current = false
        }
      })
      this.list = data
    },
    //重新进入时候设置
    updateBadge() {
      if (this.list.length > 0) {
        //设置角标
        uni.setTabBarBadge({
          //给tabBar添加角标
          index: 2,
          text: String(this.list.length)
        });
      } else {
        uni.removeTabBarBadge({index: 2})
      }
    }
  }
})
