"use strict";
var common_vendor = require("../../common/vendor.js");
var store_modules_home = require("../../store/modules/home.js");
var common_goodsApi = require("../../common/goodsApi.js");
var store_index = require("../../store/index.js");
require("../../common/simpleHttp.js");
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_input2 + _easycom_u_popup2)();
}
const _easycom_u_input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_popup = () => "../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_input + Navbar + Recommend + Sku + PopupSearch + _easycom_u_popup)();
}
const Navbar = () => "../../components/u-navbar/u-navbar.js";
const Recommend = () => "../commponent/home/recommend.js";
const Sku = () => "../commponent/public/sku.js";
const PopupSearch = () => "./component/popupSearch.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "classList",
  setup(__props) {
    const menuInfo = { height: "50rpx" };
    const menu = common_vendor.index.getMenuButtonBoundingClientRect();
    menuInfo.height = menu.height + "px";
    const scrollHeight = common_vendor.ref("500");
    common_vendor.onMounted(async () => {
      common_vendor.index.getSystemInfo({
        success: (res) => {
          const query = common_vendor.index.createSelectorQuery();
          query.select(".space").boundingClientRect();
          query.exec((re) => {
            scrollHeight.value = res.windowHeight - re[0].top + "px";
          });
        }
      });
    });
    const store = store_index.GlobalStore();
    const colors = common_vendor.computed$1(() => {
      return store.theme.color;
    });
    const homeStore = store_modules_home.HomeStore();
    const classList = common_vendor.computed$1(() => {
      return homeStore.categoryList;
    });
    const popShow = common_vendor.ref(false);
    const modes = common_vendor.ref(false);
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
    const changeModes = async () => {
      await search();
      modes.value = !modes.value;
    };
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
    const setParams = (param) => {
      queryParams.value = Object.assign(queryParams.value, param);
      search();
      popShow.value = false;
    };
    const skuRef = common_vendor.ref();
    const addCart = (item) => {
      skuRef.value.open(item);
    };
    const scrollTop = common_vendor.ref(0);
    const triggered = common_vendor.ref(false);
    const scrollToLower = async () => {
      if (dataList.value.length < dataTotal.value) {
        queryParams.value.pageNum++;
        await loadData();
      }
    };
    const refresherRefresh = async () => {
      triggered.value = true;
      await search();
      triggered.value = false;
    };
    const search = async () => {
      queryParams.value.pageNum = 1;
      dataList.value = [];
      scrollTop.value = scrollTop.value === 0 ? 0.01 : 0;
      await loadData();
    };
    const loadData = async () => {
      loading.value = true;
      const { data, total } = await common_goodsApi.QueryGoods(queryParams.value);
      dataList.value = dataList.value.concat(data);
      dataTotal.value = total;
      loading.value = false;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(search),
        b: common_vendor.o(common_vendor.m(($event) => queryParams.value.name = $event, {
          lazy: true
        }, true)),
        c: common_vendor.p({
          placeholder: "\u641C\u7D22\u5546\u54C1",
          suffixIcon: "search",
          shape: "circle",
          confirmType: "search",
          fontSize: "26rpx",
          customStyle: {
            height: "70%"
          },
          suffixIconStyle: {
            fontSize: "50rpx"
          },
          modelValue: queryParams.value.name
        }),
        d: menuInfo.height,
        e: common_vendor.p({
          ["is-back"]: true
        }),
        f: common_vendor.s("color:" + (queryParams.value.sortField === "" ? common_vendor.unref(colors) : "")),
        g: common_vendor.o(($event) => setSort("")),
        h: common_vendor.s("color:" + (queryParams.value.sortField === "price" ? common_vendor.unref(colors) : "")),
        i: common_vendor.s("color:" + (isSort("price", "ascending") ? common_vendor.unref(colors) : "")),
        j: common_vendor.s("color:" + (isSort("price", "descending") ? common_vendor.unref(colors) : "")),
        k: common_vendor.o(($event) => setSort("price")),
        l: common_vendor.s("color:" + (queryParams.value.sortField === "sale" ? common_vendor.unref(colors) : "")),
        m: common_vendor.o(($event) => setSort("sale")),
        n: modes.value
      }, modes.value ? {
        o: common_vendor.s("font-size:40rpx;font-weight: bold;")
      } : {
        p: common_vendor.s("font-size:38rpx;font-weight: bold;")
      }, {
        q: common_vendor.o(changeModes),
        r: common_vendor.o(($event) => popShow.value = true),
        s: common_vendor.f(common_vendor.unref(classList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: queryParams.value.categoryId === item.id ? "#ffffff" : "#202020",
            c: queryParams.value.categoryId === item.id ? common_vendor.unref(colors) : "#F5F5F5",
            d: index,
            e: common_vendor.o(($event) => setTags(item.id, index), index)
          };
        }),
        t: scrollLeft.value,
        v: common_vendor.o(addCart),
        w: common_vendor.p({
          colors: common_vendor.unref(colors),
          type: 1,
          dataList: dataList.value,
          modes: modes.value,
          loading: loading.value
        }),
        x: scrollHeight.value,
        y: triggered.value,
        z: common_vendor.o(scrollToLower),
        A: common_vendor.o(refresherRefresh),
        B: scrollTop.value,
        C: common_vendor.sr(skuRef, "655e1cec-3", {
          "k": "skuRef"
        }),
        D: common_vendor.p({
          colors: common_vendor.unref(colors),
          bottoms: 1
        }),
        E: common_vendor.sr(searchRef, "655e1cec-5,655e1cec-4", {
          "k": "searchRef"
        }),
        F: common_vendor.o(setParams),
        G: common_vendor.p({
          colors: common_vendor.unref(colors)
        }),
        H: common_vendor.o(($event) => popShow.value = false),
        I: common_vendor.p({
          show: popShow.value,
          mode: "right",
          round: 10,
          overlay: true
        })
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-655e1cec"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/home/classList.vue"]]);
wx.createPage(MiniProgramPage);
