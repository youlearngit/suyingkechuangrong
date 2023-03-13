"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "suspension",
  props: {
    scrollShow: { type: Boolean, required: true },
    colors: { type: String, required: true }
  },
  setup(__props) {
    const showSever = common_vendor.ref(false);
    const iconList = [
      {
        icon: "icon-sousuo",
        name: "\u641C\u7D22",
        link: "/pages/views/home/search"
      },
      {
        icon: "icon-kefu1",
        name: "\u5BA2\u670D",
        link: "",
        tel: "123456"
      }
    ];
    const jumpServer = (item) => {
      if (showSever.value == false) {
        return;
      }
      if (item.link !== "") {
        common_vendor.index.navigateTo({
          url: item.link
        });
      } else {
        common_vendor.index.makePhoneCall({
          phoneNumber: item.tel
        });
      }
    };
    const goTop = () => {
      common_vendor.index.pageScrollTo({
        scrollTop: 0
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(iconList, (item, index, i0) => {
          return {
            a: common_vendor.n(item.icon),
            b: index,
            c: common_vendor.o(($event) => jumpServer(item), index)
          };
        }),
        b: common_vendor.n(showSever.value === true ? "topon" : "top"),
        c: common_vendor.s("background-color:" + __props.colors),
        d: common_vendor.o(($event) => showSever.value = !showSever.value),
        e: __props.scrollShow,
        f: common_vendor.o(goTop)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6bd76bca"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/commponent/home/suspension.vue"]]);
wx.createComponent(Component);
