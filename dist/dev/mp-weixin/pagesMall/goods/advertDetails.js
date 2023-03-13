"use strict";
var common_vendor = require("../../common/vendor.js");
var common_simpleHttp = require("../../common/simpleHttp.js");
if (!Math) {
  BctosRichText();
}
const BctosRichText = () => "./component/bctos-rich-text.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "advertDetails",
  setup(__props) {
    const detailHtml = common_vendor.ref("");
    common_vendor.onLoad(async (option) => {
      if (option.id) {
        const data = await common_simpleHttp.GET("/public/getAdvertById/" + option.id);
        detailHtml.value = data.html;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          nodes: detailHtml.value
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-185cef96"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/goods/advertDetails.vue"]]);
wx.createPage(MiniProgramPage);
