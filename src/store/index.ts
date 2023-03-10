// useStore.ts
import {createPinia, defineStore} from 'pinia'
import {createPersistedState} from 'pinia-plugin-persistedstate'
import {Login, User} from "./interface/user";
import {ThemeType} from "../config/themeConfig";


export interface StateType {
  user: Partial<User>,
  login: Partial<Login>,
  theme: Partial<ThemeType>,
  historyColor: string | any,
}

export const GlobalStore = defineStore('global', {
  persist: {
    key: 'pinia',
    paths: ['user', 'login', 'theme']
  },
  state: (): StateType => ({
    theme: {
      title: '官方',
      name: 'default',
      color: '#9cc1ff',
      tabList: ["/static/images/tabBar/home-default.png", "/static/images/tabBar/class-default.png", "/static/images/tabBar/cart-default.png", "/static/images/tabBar/user-default.png"]
    },
    historyColor: '#9cc1ff',
    user: {},
    login: {username:'test',password:'123'},
  }),
  actions: {
    setData<T extends keyof StateType>(key: T, value: StateType[T]) {
      this[key] = value
    }
  }
})

export const pinia = createPinia().use(
  createPersistedState({
    storage: {
      getItem(key: string): string | null {
        return uni.getStorageSync(key)
      },
      setItem(key: string, value: string) {
        uni.setStorageSync(key, value)
      }
    }
  })
)
