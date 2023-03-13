"use strict";
var common_vendor = require("../common/vendor.js");
function usePageData(url, params) {
  const list = common_vendor.ref([]);
  const param = {
    pageNum: 1,
    pageSize: 10
  };
  let total = 0;
  const loading = common_vendor.ref(true);
  const loadData = async () => {
    loading.value = true;
    const { data } = await common_vendor.index.$u.http.get(url, { data: { ...param, ...params.value } });
    list.value.push(...data.data);
    total = data.total;
    loading.value = false;
  };
  common_vendor.onMounted(async () => {
    await loadData();
  });
  common_vendor.onPullDownRefresh(async () => {
    param.pageNum = 1;
    list.value = [];
    await loadData();
    common_vendor.index.stopPullDownRefresh();
  });
  common_vendor.onReachBottom(async () => {
    if (list.value.length < total) {
      param.pageNum++;
      await loadData();
    }
  });
  return { loading, list };
}
exports.usePageData = usePageData;
