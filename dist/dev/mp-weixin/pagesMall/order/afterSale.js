"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
var common_utils = require("../../common/utils.js");
var pagesMall_order_orderUtils = require("./orderUtils.js");
if (!Math) {
  UField();
}
const UField = () => "../../components/u-field/u-field.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "afterSale",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "af8ba8bc-colors": common_vendor.unref(colors)
    }));
    const store = store_index.GlobalStore();
    const colors = store.theme.color;
    const refund = common_vendor.reactive({});
    const item = common_vendor.ref({});
    const edit = common_vendor.ref(true);
    common_vendor.onLoad((option) => {
      item.value = JSON.parse(decodeURIComponent(option.data));
      refund.returnType = Number(option.type);
      refund.pic = item.value.pic;
      refund.goodsTitle = item.value.goodsTitle;
      refund.spData = common_utils.SkuPrint(item.value.spData);
      refund.itemId = item.value.itemId;
      refund.price = item.value.price;
      refund.shopCount = item.value.shopCount;
      refund.orderId = item.value.orderId;
      refund.refundId = item.value.refundId;
      refund.logisticsName = "\u4EAC\u4E1C";
      refund.logisticsCode = "jd";
      refund.logisticsNo = "JDV010166368642";
      if (option.show) {
        edit.value = false;
        if (item.value.returnVoucher) {
          imgUrl.value = JSON.parse(item.value.returnVoucher);
        }
        refund.returnReason = item.value.returnReason;
      }
    });
    const imgUrl = common_vendor.ref([]);
    const delImg = (index) => {
      imgUrl.value.splice(index, 1);
    };
    const onChooseLogistics = async () => {
      const { data } = await common_vendor.index.$u.http.get("/public/getDictByType?type=express");
      const list = data.map((p) => p.value);
      common_vendor.index.showActionSheet({
        title: "\u9009\u62E9\u5FEB\u9012\u516C\u53F8",
        itemList: list,
        success: (res) => {
          const val = data[res.tapIndex];
          refund.logisticsName = val.value;
          refund.logisticsCode = val.code;
        }
      });
    };
    const submit = async () => {
      if (!refund.returnReason) {
        common_vendor.index.$u.toast("\u8BF7\u586B\u5199\u552E\u540E\u539F\u56E0\uFF01");
        return;
      }
      if (item.value.returnStatus === 3) {
        if (!refund.logisticsNo) {
          common_vendor.index.$u.toast("\u8BF7\u586B\u5199\u5FEB\u9012\u5355\u53F7\uFF01");
          return;
        }
        await common_vendor.index.$u.http.post("/wx/refundSendLogistics", refund);
        common_vendor.index.showToast({
          title: "\u7269\u6D41\u53D1\u8D27\u6210\u529F"
        });
      } else {
        refund.returnVoucher = JSON.stringify(imgUrl.value);
        await common_vendor.index.$u.http.post("/wx/applyReturnOrder/" + refund.orderId, refund);
        common_vendor.index.showToast({
          title: "\u552E\u540E\u7533\u8BF7\u6210\u529F"
        });
      }
      setTimeout(() => {
        common_vendor.index.navigateBack({
          delta: 2
        });
      }, 1500);
    };
    const refVideoPay = common_vendor.ref();
    const showVideo = (url) => {
      refVideoPay.value.payVideo(url);
    };
    const previewImg = (url) => {
      let arr = [];
      arr[0] = url;
      common_vendor.index.previewImage({
        urls: arr
      });
    };
    const onChoose = async () => {
      common_vendor.index.showActionSheet({
        title: "\u9009\u62E9\u4E0A\u4F20\u7C7B\u578B",
        itemList: ["\u56FE\u7247", "\u89C6\u9891"],
        success: (res) => {
          if (res.tapIndex == 0) {
            chooseImages();
          } else {
            chooseVideo();
          }
        }
      });
    };
    const chooseImages = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        success: async (res) => {
          if (imgUrl.value.length >= 3) {
            common_vendor.index.showToast({
              title: "\u6700\u591A\u4E0A\u4F203\u4E2A",
              icon: "none"
            });
          } else {
            const { data } = await common_vendor.index.$u.http.upload("/static/upload/image", {
              formData: { use: "wechat" },
              name: "file",
              filePath: res.tempFilePaths[0]
            });
            imgUrl.value.push({ url: data.path, type: 1 });
          }
        }
      });
    };
    const chooseVideo = () => {
      common_vendor.index.chooseVideo({
        sourceType: ["camera", "album"],
        success: async (res) => {
          if (imgUrl.value.length >= 3) {
            common_vendor.index.showToast({
              title: "\u6700\u591A\u4E0A\u4F203\u4E2A",
              icon: "none"
            });
          } else {
            const { data } = await common_vendor.index.$u.http.upload("/static/upload/media", {
              formData: { use: "wechat" },
              name: "file",
              filePath: res.tempFilePath
            });
            const video = {
              url: data.path,
              type: 2,
              poster: data.image
            };
            imgUrl.value.push(video);
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: item.value.pic,
        b: common_vendor.t(item.value.goodsTitle),
        c: common_vendor.t(common_vendor.unref(common_utils.SkuPrint)(item.value.spData)),
        d: common_vendor.t(item.value.price),
        e: common_vendor.unref(colors),
        f: common_vendor.t(item.value.shopCount),
        g: !edit.value,
        h: refund.returnReason,
        i: common_vendor.o(($event) => refund.returnReason = $event.detail.value),
        j: edit.value
      }, edit.value ? {} : {}, {
        k: common_vendor.f(imgUrl.value, (item2, index, i0) => {
          return common_vendor.e({
            a: item2.type === 1
          }, item2.type === 1 ? common_vendor.e({
            b: item2.url,
            c: common_vendor.o(($event) => previewImg(item2.url)),
            d: edit.value
          }, edit.value ? {
            e: common_vendor.o(($event) => delImg(index))
          } : {}) : {}, {
            f: item2.type == 2
          }, item2.type == 2 ? common_vendor.e({
            g: common_vendor.o(($event) => showVideo(item2.url)),
            h: edit.value
          }, edit.value ? {
            i: common_vendor.o(($event) => delImg(index))
          } : {}, {
            j: item2.url,
            k: item2.poster
          }) : {}, {
            l: index
          });
        }),
        l: edit.value && imgUrl.value.length < 3
      }, edit.value && imgUrl.value.length < 3 ? {
        m: common_vendor.o(onChoose)
      } : {}, {
        n: refund.returnType === 0
      }, refund.returnType === 0 ? {} : {}, {
        o: refund.returnType === 1
      }, refund.returnType === 1 ? {} : {}, {
        p: !edit.value
      }, !edit.value ? common_vendor.e({
        q: common_vendor.t(item.value.createdAt),
        r: common_vendor.t(common_vendor.unref(pagesMall_order_orderUtils.refundStatus)(item.value.returnStatus)),
        s: item.value.returnRejectReason
      }, item.value.returnRejectReason ? {
        t: common_vendor.t(item.value.returnRejectReason)
      } : {}) : {}, {
        v: !edit.value && item.value.returnStatus === 3
      }, !edit.value && item.value.returnStatus === 3 ? {
        w: common_vendor.t(refund.logisticsName),
        x: common_vendor.o(onChooseLogistics),
        y: common_vendor.o(($event) => refund.logisticsNo = $event),
        z: common_vendor.p({
          labelWidth: 90,
          required: true,
          clearable: false,
          label: "\u5FEB\u9012\u53F7",
          placeholder: "\u8BF7\u8F93\u5165\u5FEB\u9012\u53F7",
          modelValue: refund.logisticsNo
        })
      } : {}, {
        A: edit.value || item.value.returnStatus === 3
      }, edit.value || item.value.returnStatus === 3 ? {} : {}, {
        B: edit.value || item.value.returnStatus === 3
      }, edit.value || item.value.returnStatus === 3 ? {
        C: common_vendor.unref(colors),
        D: common_vendor.o(($event) => _ctx.$u.throttle(submit, 1600))
      } : {}, {
        E: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-af8ba8bc"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/order/afterSale.vue"]]);
wx.createPage(MiniProgramPage);
