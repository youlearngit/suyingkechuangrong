import {onShow} from "@dcloudio/uni-app";
import {GlobalStore} from "../store";
import {CartStore} from "../store/modules/cart";

//TODO 由于一些函数必须这样设置才可以保证成功，所以放到全局监听
export default function useGlobal() {
  const cartStore = CartStore()
  const store = GlobalStore()

  //页面显示监听回调
  onShow(() => {
    //console.log('global -> onShow')
    //1.设置的主题
    if (store.theme.color !== store.historyColor) {
      store.historyColor = store.theme.color //更新
      uni.setTabBarStyle({
        selectedColor: store.theme.color
      });
      let tabList = store.theme.tabList!;
      for (let i = 0; i < tabList.length!; i++) {
        let img = tabList[i];
        uni.setTabBarItem({
          //设置tabBar 首页图标
          index: i,
          selectedIconPath: img
        });
      }
    }

    //购物车刷新
    cartStore.updateBadge()
  })
}