"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
var store_modules_user = require("../../store/modules/user.js");
require("../../common/utils.js");
require("../../common/userApi.js");
require("../../hooks/useAuth.js");
require("../../common/login.js");
require("../../store/modules/cart.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cancelOrder",
  setup(__props) {
    const store = store_index.GlobalStore();
    const colors = store.theme.color;
    let orderId = 0;
    common_vendor.onLoad((option) => {
      orderId = Number(option.orderId);
    });
    const remarkList = common_vendor.ref([{
      name: "\u56FE\u6848\u4E0D\u597D\u770B",
      current: false
    }, {
      name: "\u6027\u4EF7\u6BD4\u592A\u4F4E",
      current: false
    }, {
      name: "\u6001\u5EA6\u4E0D\u597D",
      current: false
    }, {
      name: "\u4EF7\u683C\u4E0D\u5408\u7406",
      current: false
    }, {
      name: "\u505A\u5DE5\u4E0D\u884C",
      current: false
    }, {
      name: "\u7269\u6D41\u65F6\u95F4\u957F",
      current: false
    }, {
      name: "\u4EF7\u683C\u4F18\u60E0\u4F4E",
      current: false
    }, {
      name: "\u5176\u4ED6\u539F\u56E0",
      current: false
    }]);
    const reason = common_vendor.ref("");
    const closeOrder = async () => {
      if (!remarkList.value.some((p) => p.current) && !reason.value) {
        common_vendor.index.$u.toast("\u8BF7\u9009\u62E9\u4E00\u4E2A\u7406\u7531\uFF01");
        return;
      }
      let msg = reason.value;
      const list = remarkList.value.map((p) => p.name);
      if (list.length > 0) {
        if (msg) {
          msg += ",";
        }
        msg += list.join(",");
      }
      await common_vendor.index.$u.http.get("/wx/cancelOrder/" + orderId, { data: { msg } });
      common_vendor.index.$u.toast("\u8BA2\u5355\u53D6\u6D88\u6210\u529F");
      const userStore = store_modules_user.UserStore();
      await userStore.updateAccount();
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/tabbar/user/user"
        });
      }, 300);
    };
    const setCurrent = (index) => {
      remarkList.value[index].current = !remarkList.value[index].current;
    };
    return (_ctx, _cache) => {
      return {
        a: reason.value,
        b: common_vendor.o(($event) => reason.value = $event.detail.value),
        c: common_vendor.f(remarkList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.s("color:" + (item.current == true ? "#fff" : "") + ";background:" + (item.current == true ? common_vendor.unref(colors) : "") + ";border:" + (item.current == true ? "none" : "")),
            c: index,
            d: common_vendor.o(($event) => setCurrent(index), index)
          };
        }),
        d: common_vendor.o(closeOrder),
        e: common_vendor.unref(colors)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c62723da"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/order/cancelOrder.vue"]]);
wx.createPage(MiniProgramPage);
