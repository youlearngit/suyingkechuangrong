"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
var store_modules_home = require("../../store/modules/home.js");
require("../../common/simpleHttp.js");
if (!Math) {
  Nodata();
}
const Nodata = () => "../../pages/commponent/public/nodata.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myAddress",
  setup(__props) {
    const store = store_index.GlobalStore();
    const colors = common_vendor.computed$1(() => {
      return store.theme.color;
    });
    const addressList = common_vendor.ref([]);
    common_vendor.onShow(async () => {
      await loadData();
    });
    common_vendor.onPullDownRefresh(async () => {
      await loadData();
      common_vendor.index.stopPullDownRefresh();
    });
    const loading = common_vendor.ref(true);
    const loadData = async () => {
      loading.value = true;
      const { data } = await common_vendor.index.$u.http.get("/wx/getReceiveAddrList");
      addressList.value = data;
      loading.value = false;
    };
    const editAddress = (item) => {
      const data = encodeURIComponent(JSON.stringify(item));
      common_vendor.index.navigateTo({
        url: "/pagesMall/user/address/edit?item=" + data
      });
    };
    const delAddress = (item) => {
      common_vendor.index.showModal({
        cancelColor: "#999",
        confirmColor: colors.value,
        title: "\u5220\u9664\u6536\u8D27\u5730\u5740",
        content: "\u662F\u5426\u5220\u9664\u5F53\u524D\u5730\u5740\uFF01",
        success: async (res) => {
          if (res.confirm) {
            common_vendor.index.$u.http.delete("/wx/delReceiveAddr/" + item.id).then(() => {
              loadData();
              common_vendor.index.$u.toast("\u5220\u9664\u6210\u529F\uFF01");
            });
          }
        }
      });
    };
    const home = store_modules_home.HomeStore();
    const setAddress = (address) => {
      if (home.receiveAddr.id !== address.id) {
        home.receiveAddr = address;
        home.receiveAddr.areas = address.province + address.city + address.district + address.details;
      }
      common_vendor.index.navigateBack({ delta: -1 });
    };
    const addAddress = () => {
      common_vendor.index.navigateTo({
        url: "/pagesMall/user/address/edit?type=add"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(addressList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.status === 2
          }, item.status === 2 ? {
            b: common_vendor.s("color:" + common_vendor.unref(colors))
          } : {}, {
            c: common_vendor.t(item.nickName),
            d: common_vendor.t(item.mobile),
            e: common_vendor.t(item.province + item.city + item.district),
            f: common_vendor.t(item.details),
            g: common_vendor.o(($event) => setAddress(item)),
            h: common_vendor.o(($event) => delAddress(item)),
            i: common_vendor.o(($event) => editAddress(item)),
            j: index
          });
        }),
        b: common_vendor.s("color:" + common_vendor.unref(colors)),
        c: common_vendor.p({
          colors: common_vendor.unref(colors),
          loading: loading.value,
          show: addressList.value.length === 0,
          count: addressList.value.length,
          title: "\u6536\u8D27\u5730\u5740"
        }),
        d: common_vendor.s("background:" + common_vendor.unref(colors)),
        e: common_vendor.o(addAddress)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1ad077b4"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/user/myAddress.vue"]]);
wx.createPage(MiniProgramPage);
