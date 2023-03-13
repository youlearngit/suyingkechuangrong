"use strict";
var common_vendor = require("../../../common/vendor.js");
var store_modules_home = require("../../../store/modules/home.js");
var common_goodsApi = require("../../../common/goodsApi.js");
var store_index = require("../../../store/index.js");
require("../../../common/simpleHttp.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_line2 = common_vendor.resolveComponent("u-line");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_search2 + _easycom_u_line2 + _easycom_u_popup2)();
}
const _easycom_u_search = () => "../../../node-modules/uview-plus/components/u-search/u-search.js";
const _easycom_u_line = () => "../../../node-modules/uview-plus/components/u-line/u-line.js";
const _easycom_u_popup = () => "../../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_search + _easycom_u_line + _easycom_u_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const menu = common_vendor.index.getMenuButtonBoundingClientRect();
    menu.height + "px";
    common_vendor.ref("500");
    common_vendor.onMounted(async () => {
    });
    store_index.GlobalStore();
    const colors = common_vendor.computed$1(() => {
      return "#4266FA;";
    });
    const homeStore = store_modules_home.HomeStore();
    const classList = common_vendor.computed$1(() => {
      return homeStore.categoryList;
    });
    const popShow = common_vendor.ref(false);
    common_vendor.ref(false);
    const queryParams = common_vendor.ref({
      pageNum: 1,
      pageSize: 10,
      name: "",
      sortField: "",
      sortOrder: "descending",
      categoryId: 0
    });
    const loading = common_vendor.ref(true);
    const dataTotal = common_vendor.ref(0);
    const dataList = common_vendor.ref([]);
    const searchRef = common_vendor.ref();
    common_vendor.onLoad(async (option) => {
      if (option.text) {
        queryParams.value.name = option.text;
      }
      if (option.categoryId) {
        const id = Number(option.categoryId);
        setTags(id, classList.value.findIndex((p) => p.id === id));
        return;
      }
      if (option.couponId) {
        queryParams.value.couponId = Number(option.couponId);
      }
      if (option.promotionId) {
        queryParams.value.promotionId = Number(option.promotionId);
      }
      await loadData();
    });
    common_vendor.onMounted(() => {
      if (queryParams.value.couponId) {
        searchRef.value.updateParams("couponId", queryParams.value.couponId);
      }
      if (queryParams.value.promotionId) {
        searchRef.value.updateParams("promotionId", queryParams.value.promotionId);
      }
    });
    const isSort = (field, sort) => {
      if (queryParams.value.sortField === field && queryParams.value.sortOrder === sort) {
        return true;
      }
      return false;
    };
    const setSort = (field) => {
      queryParams.value.sortField = field;
      if (queryParams.value.sortOrder === "ascending") {
        queryParams.value.sortOrder = "descending";
      } else {
        queryParams.value.sortOrder = "ascending";
      }
      search();
    };
    const scrollLeft = common_vendor.ref(0);
    const setTags = (item, index) => {
      scrollLeft.value = index * 38;
      if (index <= 2) {
        scrollLeft.value = 0;
      }
      if (queryParams.value.categoryId === item) {
        queryParams.value.categoryId = 0;
      } else {
        queryParams.value.categoryId = item;
      }
      search();
    };
    common_vendor.ref();
    const scrollTop = common_vendor.ref(0);
    common_vendor.ref(false);
    const search = async () => {
      queryParams.value.pageNum = 1;
      dataList.value = [];
      scrollTop.value = scrollTop.value === 0 ? 0.01 : 0;
      await loadData();
    };
    const loadData = async () => {
      loading.value = true;
      const {
        data,
        total
      } = await common_goodsApi.QueryGoods(queryParams.value);
      dataList.value = dataList.value.concat(data);
      dataTotal.value = total;
      loading.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.keyword = $event),
        b: common_vendor.p({
          placeholder: "\u641C\u7D22\u9879\u76EE",
          bgColor: "#edf1ff",
          modelValue: _ctx.keyword
        }),
        c: common_vendor.s("color:" + (queryParams.value.sortField === "" ? common_vendor.unref(colors) : "")),
        d: common_vendor.s("color:" + (isSort("price", "ascending") ? common_vendor.unref(colors) : "")),
        e: common_vendor.s("color:" + (isSort("price", "descending") ? common_vendor.unref(colors) : "")),
        f: common_vendor.o(($event) => setSort("")),
        g: common_vendor.s("color:" + (queryParams.value.sortField === "price" ? common_vendor.unref(colors) : "")),
        h: common_vendor.s("color:" + (isSort("price", "ascending") ? common_vendor.unref(colors) : "")),
        i: common_vendor.s("color:" + (isSort("price", "descending") ? common_vendor.unref(colors) : "")),
        j: common_vendor.o(($event) => setSort("price")),
        k: common_vendor.s("color:" + (queryParams.value.sortField === "sale" ? common_vendor.unref(colors) : "")),
        l: common_vendor.s("color:" + (isSort("price", "ascending") ? common_vendor.unref(colors) : "")),
        m: common_vendor.s("color:" + (isSort("price", "descending") ? common_vendor.unref(colors) : "")),
        n: common_vendor.o(($event) => setSort("sale")),
        o: common_vendor.o(($event) => popShow.value = true),
        p: common_vendor.p({
          direction: "col",
          length: "50%"
        }),
        q: common_vendor.p({
          direction: "col",
          length: "50%"
        }),
        r: common_vendor.o(_ctx.close),
        s: common_vendor.o(_ctx.open),
        t: common_vendor.p({
          show: true,
          mode: "center"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5fc0a90b"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/project/index/index.vue"]]);
wx.createPage(MiniProgramPage);
