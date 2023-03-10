// TODO 为了不污染 request.ts 封装的代码单独搞一个网络请求的,其实共用也没问题的
//一些简单无需登录的获取接口信息使用此接口
export const GET = <T>(url: string, data={} as { [key in string]: any }): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    let t = 0
    const task = uni.request({
      url: url.startsWith("http") ? url : uni.$u.http.config.baseURL + url,
      data,
      success: (res: any) => {
        resolve(res.data as T);
      }, fail: () => {
        reject()
      }, complete: () => {
        t && clearTimeout(t)//关闭定时器
      }
    });
    //10s超时无需处理错误
    t = setTimeout(() => {
      task.abort()
    }, 10 * 1000)
  })
}
