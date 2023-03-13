"use strict";
var common_vendor = require("../../../common/vendor.js");
var store_index = require("../../../store/index.js");
var common_utils = require("../../../common/utils.js");
if (!Array) {
  const _easycom_u_rate2 = common_vendor.resolveComponent("u-rate");
  _easycom_u_rate2();
}
const _easycom_u_rate = () => "../../../node-modules/uview-plus/components/u-rate/u-rate.js";
if (!Math) {
  (_easycom_u_rate + VideoPay)();
}
const VideoPay = () => "./videoPay.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "evaluate",
  setup(__props) {
    const store = store_index.GlobalStore();
    const colors = store.theme.color;
    const goods = common_vendor.ref({});
    const eva = common_vendor.reactive({ score: 5 });
    common_vendor.onLoad((option) => {
      const item = JSON.parse(decodeURIComponent(option.data));
      goods.value = item;
      eva.pic = item.pic;
      eva.goodsTitle = item.goodsTitle;
      eva.goodsId = item.goodsId;
      eva.spData = common_utils.SkuPrint(item.spData);
      eva.itemId = item.itemId;
      eva.price = item.price;
      eva.shopCount = item.shopCount;
      eva.orderId = item.orderId;
    });
    const imgUrl = common_vendor.ref([]);
    const delImg = (index) => {
      const data = imgUrl.value.splice(index, 1);
      console.log(data);
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
    const onChoose = () => {
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
    const submit = async () => {
      if (!eva.comment) {
        common_vendor.index.$u.toast("\u8BF7\u586B\u5199\u5546\u54C1\u8BC4\u4EF7\u5185\u5BB9\uFF01");
        return;
      }
      eva.albumPics = JSON.stringify(imgUrl.value);
      await common_vendor.index.$u.http.post("/wx/orderEvaluate/" + eva.orderId, eva);
      common_vendor.index.showToast({
        title: "\u63D0\u4EA4\u6210\u529F"
      });
      setTimeout(() => {
        common_vendor.index.navigateBack({
          delta: 1
        });
      }, 1500);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: goods.value.pic,
        b: common_vendor.t(goods.value.goodsTitle),
        c: common_vendor.t(common_vendor.unref(common_utils.SkuPrint)(goods.value.spData)),
        d: common_vendor.t(goods.value.shopCount),
        e: common_vendor.t(goods.value.price),
        f: common_vendor.unref(colors),
        g: common_vendor.o(($event) => eva.score = $event),
        h: common_vendor.p({
          count: 5,
          size: 30,
          modelValue: eva.score
        }),
        i: eva.comment,
        j: common_vendor.o(($event) => eva.comment = $event.detail.value),
        k: common_vendor.f(imgUrl.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.type === 1
          }, item.type === 1 ? {
            b: item.url,
            c: common_vendor.o(($event) => previewImg(item.url)),
            d: common_vendor.o(($event) => delImg(index))
          } : {}, {
            e: item.type == 2
          }, item.type == 2 ? {
            f: common_vendor.o(($event) => showVideo(item.url)),
            g: common_vendor.o(($event) => delImg(index)),
            h: item.url,
            i: item.poster
          } : {}, {
            j: index
          });
        }),
        l: imgUrl.value.length < 3
      }, imgUrl.value.length < 3 ? {
        m: common_vendor.o(onChoose)
      } : {}, {
        n: common_vendor.unref(colors),
        o: common_vendor.o(($event) => _ctx.$u.throttle(submit, 1600)),
        p: common_vendor.sr(refVideoPay, "4f9e1fae-1", {
          "k": "refVideoPay"
        })
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4f9e1fae"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/order/evaluate/evaluate.vue"]]);
wx.createPage(MiniProgramPage);
