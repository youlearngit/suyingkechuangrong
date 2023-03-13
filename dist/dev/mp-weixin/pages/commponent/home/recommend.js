"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_utils = require("../../../common/utils.js");
var hooks_useRouter = require("../../../hooks/useRouter.js");
require("../../../hooks/useAuth.js");
require("../../../store/index.js");
require("../../../common/login.js");
require("../../../store/modules/cart.js");
require("../../../store/modules/user.js");
require("../../../common/userApi.js");
if (!Array) {
  const _easycom_u_line2 = common_vendor.resolveComponent("u-line");
  _easycom_u_line2();
}
const _easycom_u_line = () => "../../../node-modules/uview-plus/components/u-line/u-line.js";
if (!Math) {
  _easycom_u_line();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "recommend",
  props: {
    dataList: { type: Array, required: true },
    colors: { type: String, required: true },
    modes: { type: Boolean, required: false, default: true },
    loading: { type: Boolean, required: false, default: false },
    type: { type: Number, required: false, default: 0 },
    bottoms: { type: Number, required: false, default: 0 }
  },
  emits: ["addCart"],
  setup(__props, { emit }) {
    const props = __props;
    common_vendor.computed$1(() => {
      return common_utils.ColorRgba(props.colors, 0.1);
    });
    const list = common_vendor.ref([]);
    common_vendor.watch(() => props.loading, (flag) => {
      if (!flag) {
        changData();
      }
    });
    common_vendor.watch(() => props.modes, () => {
      changData();
    });
    const changData = () => {
      if (props.modes) {
        const newList1 = [];
        const newList2 = [];
        props.dataList.forEach((value, index) => {
          if (index % 2 === 0) {
            newList1.push(value);
          } else {
            newList2.push(value);
          }
        });
        list.value = newList1.concat(newList2);
      } else {
        list.value = props.dataList;
      }
    };
    common_vendor.ref();
    hooks_useRouter.useRouter();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          direction: "col",
          length: "50%"
        }),
        b: common_vendor.p({
          direction: "col",
          length: "50%"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-12555242"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/commponent/home/recommend.vue"]]);
wx.createComponent(Component);
