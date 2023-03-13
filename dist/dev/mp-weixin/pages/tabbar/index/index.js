"use strict";
var common_vendor = require("../../../common/vendor.js");
var store_index = require("../../../store/index.js");
var common_goodsApi = require("../../../common/goodsApi.js");
var hooks_useGlobal = require("../../../hooks/useGlobal.js");
require("../../../store/modules/cart.js");
if (!Math) {
  (common_vendor.unref(HeaderView) + common_vendor.unref(ClassList) + common_vendor.unref(Recommend) + common_vendor.unref(Suspension))();
}
const HeaderView = () => "../../commponent/home/header.js";
const ClassList = () => "../../commponent/home/classList.js";
const Suspension = () => "../../commponent/home/suspension.js";
const Recommend = () => "../../commponent/home/recommend.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    hooks_useGlobal.useGlobal();
    const store = store_index.GlobalStore();
    const colors = common_vendor.computed$1(() => {
      return store.theme.color;
    });
    common_vendor.onShow(() => {
      console.log(store.theme.color);
      common_vendor.index.setNavigationBarColor({
        backgroundColor: "#9cc1ff",
        frontColor: "#ffffff"
      });
    });
    const scrollShow = common_vendor.ref(false);
    const loading = common_vendor.ref(true);
    const dataTotal = common_vendor.ref(0);
    const skuBottom = common_vendor.ref(1);
    const dataList = common_vendor.ref([]);
    const queryParams = {
      pageNum: 1,
      pageSize: 10
    };
    common_vendor.onMounted(async () => {
      await loadData();
    });
    const loadData = async () => {
      loading.value = true;
      const { data, total } = await common_goodsApi.QueryGoods(queryParams);
      dataList.value = dataList.value.concat(data);
      dataTotal.value = total;
      loading.value = false;
    };
    common_vendor.onReachBottom(() => {
      if (dataList.value.length < dataTotal.value) {
        queryParams.pageNum++;
        loadData();
      }
    });
    common_vendor.onPullDownRefresh(async () => {
      queryParams.pageNum = 1;
      dataList.value = [];
      await loadData();
      common_vendor.index.stopPullDownRefresh();
    });
    common_vendor.onPageScroll((e) => {
      if (e.scrollTop >= 500) {
        scrollShow.value = true;
      } else {
        scrollShow.value = false;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          colors: common_vendor.unref(colors)
        }),
        b: common_vendor.p({
          colors: common_vendor.unref(colors),
          modes: true,
          dataList: dataList.value,
          loading: loading.value,
          bottoms: skuBottom.value
        }),
        c: common_vendor.p({
          scrollShow: scrollShow.value,
          colors: common_vendor.unref(colors)
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-59c324a8"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/tabbar/index/index.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
