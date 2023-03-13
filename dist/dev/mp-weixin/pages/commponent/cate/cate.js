"use strict";
var common_vendor = require("../../../common/vendor.js");
var store_modules_home = require("../../../store/modules/home.js");
var common_goodsApi = require("../../../common/goodsApi.js");
require("../../../common/simpleHttp.js");
if (!Math) {
  (common_vendor.unref(Recommend) + Sku)();
}
const Recommend = () => "../home/recommend.js";
const Sku = () => "../public/sku.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cate",
  props: {
    colors: { type: String, required: true }
  },
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "65c76ce8-colors": __props.colors
    }));
    const scrollTop = common_vendor.ref(0);
    common_vendor.ref(false);
    const homeStore = store_modules_home.HomeStore();
    const classList = common_vendor.computed$1(() => {
      return homeStore.categoryList;
    });
    const skuRef = common_vendor.ref();
    const addCart = (item) => {
      skuRef.value.open(item);
    };
    const loading = common_vendor.ref(true);
    const dataTotal = common_vendor.ref(0);
    const dataList = common_vendor.ref([]);
    const queryParams = common_vendor.ref({
      pageNum: 1,
      pageSize: 10,
      sortField: "",
      sortOrder: "descending",
      categoryId: classList.value[0].id
    });
    const isSort = (field, sort) => {
      if (queryParams.value.sortField === field && queryParams.value.sortOrder === sort) {
        return true;
      }
      return false;
    };
    common_vendor.onMounted(async () => {
      await loadData();
    });
    const loadData = async () => {
      loading.value = true;
      const { data, total } = await common_goodsApi.QueryGoods(queryParams.value);
      dataList.value = dataList.value.concat(data);
      dataTotal.value = total;
      loading.value = false;
    };
    const triggered = common_vendor.ref(false);
    const scrollToLower = async () => {
      if (dataList.value.length < dataTotal.value) {
        queryParams.value.pageNum++;
        await loadData();
      }
    };
    const refresherRefresh = async () => {
      triggered.value = true;
      queryParams.value.pageNum = 1;
      dataList.value = [];
      await loadData();
      triggered.value = false;
    };
    const scrollTopGoods = common_vendor.ref(0);
    const setSort = (field) => {
      scrollTopGoods.value = scrollTopGoods.value === 0 ? 0.01 : 0;
      queryParams.value.sortField = field;
      if (queryParams.value.sortOrder === "ascending") {
        queryParams.value.sortOrder = "descending";
      } else {
        queryParams.value.sortOrder = "ascending";
      }
      queryParams.value.pageNum = 1;
      dataList.value = [];
      loadData();
    };
    const setCurrent = async (item, index) => {
      scrollTop.value = index * 20;
      if (index <= 2) {
        scrollTop.value = 0;
      }
      queryParams.value.categoryId = item.id;
      queryParams.value.pageNum = 1;
      dataList.value = [];
      scrollTopGoods.value = scrollTopGoods.value === 0 ? 0.01 : 0;
      await loadData();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(classList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: queryParams.value.categoryId === item.id
          }, queryParams.value.categoryId === item.id ? {
            c: common_vendor.s("background-color:" + __props.colors)
          } : {}, {
            d: index,
            e: common_vendor.n("classTitle " + (queryParams.value.categoryId === item.id ? "actives" : "")),
            f: common_vendor.o(($event) => setCurrent(item, index), index),
            g: queryParams.value.categoryId === item.id ? __props.colors : ""
          });
        }),
        b: scrollTop.value,
        c: common_vendor.s("color:" + (queryParams.value.sortField === "price" ? __props.colors : "")),
        d: common_vendor.s("color:" + (isSort("price", "ascending") ? __props.colors : "")),
        e: common_vendor.s("color:" + (isSort("price", "descending") ? __props.colors : "")),
        f: common_vendor.o(($event) => setSort("price")),
        g: common_vendor.s("color:" + (queryParams.value.sortField === "sale" ? __props.colors : "")),
        h: common_vendor.o(($event) => setSort("sale")),
        i: common_vendor.s("color:" + (queryParams.value.sortField === "" ? __props.colors : "")),
        j: common_vendor.o(($event) => setSort("")),
        k: common_vendor.o(addCart),
        l: common_vendor.p({
          type: 1,
          colors: __props.colors,
          modes: false,
          dataList: dataList.value,
          loading: loading.value,
          bottoms: 1
        }),
        m: triggered.value,
        n: scrollTopGoods.value,
        o: common_vendor.o(scrollToLower),
        p: common_vendor.o(refresherRefresh),
        q: common_vendor.sr(skuRef, "65c76ce8-1", {
          "k": "skuRef"
        }),
        r: common_vendor.p({
          colors: __props.colors,
          bottoms: 1
        }),
        s: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-65c76ce8"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/commponent/cate/cate.vue"]]);
wx.createComponent(Component);
