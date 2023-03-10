import {onMounted, ref, Ref} from "vue";
import {ResPage} from "../common/interface";
import {onPullDownRefresh, onReachBottom} from "@dcloudio/uni-app";

//TODO 合适页面简单的下拉刷新和触底加载的分页数据
export function usePageData<T>(url: string, params: Ref) {
  const list = ref<T[]>([]) //数据

  //分页数据
  const param = {
    pageNum: 1,
    pageSize: 10
  }
  let total = 0
  const loading = ref(true)

  //加载数据
  const loadData = async () => {
    loading.value = true
    const {data} = await uni.$u.http.get<ResPage<T>>(url, {data: {...param, ...params.value}})
    list.value.push(...data.data as any)
    total = data.total
    loading.value = false
  }

  //页面加载
  onMounted(async () => {
    await loadData()
  })

  //下啦刷新啦
  onPullDownRefresh(async () => {
    param.pageNum = 1
    list.value = []
    await loadData()
    uni.stopPullDownRefresh() //停止
  })

  //触底啦
  onReachBottom(async () => {
    if (list.value.length < total) {
      param.pageNum++
      await loadData()
    }
  })
  return {loading, list}
}