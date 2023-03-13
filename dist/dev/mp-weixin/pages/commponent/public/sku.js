"use strict";
var common_vendor = require("../../../common/vendor.js");
var store_modules_cart = require("../../../store/modules/cart.js");
var common_simpleHttp = require("../../../common/simpleHttp.js");
var hooks_useRouter = require("../../../hooks/useRouter.js");
require("../../../store/index.js");
require("../../../hooks/useAuth.js");
require("../../../common/login.js");
require("../../../store/modules/user.js");
require("../../../common/utils.js");
require("../../../common/userApi.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (NumberBox + _easycom_u_button)();
}
const NumberBox = () => "../../../components/u-number-box/u-number-box.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "sku",
  props: {
    colors: { type: String, required: true },
    bottoms: { type: Number, required: true }
  },
  emits: ["setSku"],
  setup(__props, { expose, emit }) {
    common_vendor.useCssVars((_ctx) => ({
      "60776fca-colors": __props.colors
    }));
    const customStyle = common_vendor.ref({
      color: "#ffffff",
      width: "40vw",
      height: "65rpx"
    });
    const changeNumber = (num) => {
      if (!num) {
        number.value = 1;
      }
      if (num > currentSku.value.stock) {
        number.value = currentSku.value.stock;
      }
    };
    const SkuType = common_vendor.ref(0);
    const SkuId = common_vendor.ref(0);
    const number = common_vendor.ref(1);
    const currentArr = common_vendor.ref([]);
    const currentSku = common_vendor.ref({});
    const showModal = common_vendor.ref(false);
    let defGoods = {};
    const open = async (goods, skuType = 0, param = { arr: [], skuId: 0, count: 1 }) => {
      SkuType.value = skuType;
      number.value = param.count;
      currentArr.value = param.arr;
      SkuId.value = param.skuId;
      if (param.skuId === 0) {
        const data = await common_simpleHttp.GET("/public/getSkuInfo", { goodsId: goods.goodsId });
        defGoods = { price: goods.price, image: goods.image, stock: data.stock };
        currentSku.value = goods;
        currentSku.value.sku = data.sku;
        currentSku.value.skuArr = data.skuArr;
        currentSku.value.stock = data.stock;
        changeDisabled();
      }
      showModal.value = true;
    };
    const confirm = () => {
      var _a;
      const set = new Set(currentArr.value.values());
      const skuInfo = [];
      (_a = currentSku.value.sku) == null ? void 0 : _a.forEach((p) => {
        p.child.forEach((c) => {
          if (set.has(c.id)) {
            skuInfo.push(p.sku_name + ":" + c.tag_name);
          }
        });
      });
      emit("setSku", {
        count: number.value,
        arr: currentArr.value,
        skuId: SkuId.value,
        price: currentSku.value.price,
        info: skuInfo.join(";")
      });
      showModal.value = false;
    };
    const cartStore = store_modules_cart.CartStore();
    const { GoToConfirmOrder } = hooks_useRouter.useRouter();
    const onsubmit = async (type) => {
      if (type === "add") {
        await cartStore.addCart(SkuId.value, number.value);
        common_vendor.index.$u.toast("\u6DFB\u52A0\u8D2D\u7269\u8F66\u6210\u529F\uFF01");
        showModal.value = false;
      } else {
        const flag = await GoToConfirmOrder(0, { skuId: SkuId.value, count: number.value });
        showModal.value = !flag;
      }
    };
    const setTag = (items, current, index, row) => {
      let pid = items.sku_id;
      let isChecked = true;
      if (currentArr.value[pid] != void 0 && currentArr.value[pid] === row.id) {
        isChecked = false;
        currentArr.value.splice(pid, 1, 0);
      } else {
        currentArr.value[pid] = row.id;
      }
      let chooseSkuId = [];
      currentArr.value.forEach((sku) => {
        if (sku > 0) {
          chooseSkuId.push(sku);
        }
      });
      let newSku = getAllSku();
      if (chooseSkuId.length == currentSku.value.sku.length && newSku.length) {
        currentSku.value.image = newSku[0].image;
        currentSku.value.price = newSku[0].price;
        currentSku.value.stock = newSku[0].stock;
        if (newSku[0].stock < number.value) {
          number.value = newSku[0].stock;
        }
        SkuId.value = newSku[0].goods_sku_id;
      } else {
        SkuId.value = 0;
        currentSku.value.image = defGoods.image;
        currentSku.value.price = defGoods.price;
        currentSku.value.stock = defGoods.stock;
      }
      changeDisabled(isChecked, row.id, pid);
    };
    const changeDisabled = (isChecked = false, skuId = 0, pid = 0) => {
      let newSku = [];
      if (isChecked) {
        for (let key of currentSku.value.skuArr) {
          if (key.stock <= 0) {
            continue;
          }
          if (key.goods_sku_arr.indexOf(skuId) >= 0) {
            newSku.push(key);
          }
        }
      } else {
        newSku = getAllSku();
      }
      let noChooseSkuIds = [];
      for (let price of newSku) {
        noChooseSkuIds = noChooseSkuIds.concat(price.goods_sku_arr);
      }
      noChooseSkuIds = Array.from(new Set(noChooseSkuIds));
      if (isChecked) {
        let index = noChooseSkuIds.indexOf(skuId);
        noChooseSkuIds.splice(index, 1);
      } else {
        currentArr.value.forEach((sku) => {
          if (sku > 0) {
            let index = noChooseSkuIds.indexOf(sku);
            if (index >= 0) {
              noChooseSkuIds.splice(index, 1);
            }
          }
        });
      }
      let chooseSkuKey = [];
      if (!isChecked) {
        currentArr.value.forEach((sku, key) => {
          if (sku > 0) {
            chooseSkuKey.push(key);
          }
        });
      } else {
        chooseSkuKey = [pid];
      }
      const _skuId = currentArr.value[pid];
      for (let i in currentSku.value.sku) {
        for (let x in currentSku.value.sku[Number(i)]["child"]) {
          if (chooseSkuKey.indexOf(currentSku.value.sku[Number(i)]["sku_id"]) >= 0) {
            if (currentSku.value.sku[Number(i)]["child"][x]["id"] === _skuId)
              ;
            else {
              if (!isChecked) {
                currentSku.value.sku[Number(i)]["child"][x]["disabled"] = false;
              }
            }
          } else {
            if (noChooseSkuIds.indexOf(currentSku.value.sku[Number(i)]["child"][x]["id"]) >= 0) {
              currentSku.value.sku[Number(i)]["child"][x]["disabled"] = false;
            } else {
              currentSku.value.sku[Number(i)]["child"][x]["disabled"] = true;
            }
          }
        }
      }
    };
    const getAllSku = () => {
      let newSku = [];
      for (let key of currentSku.value.skuArr) {
        if (key.stock <= 0) {
          continue;
        }
        let isOk = true;
        currentArr.value.forEach((sku) => {
          if (sku > 0 && key.goods_sku_arr.indexOf(sku) < 0) {
            isOk = false;
          }
        });
        if (isOk) {
          newSku.push(key);
        }
      }
      return newSku;
    };
    const showImage = (url) => {
      common_vendor.index.previewImage({
        current: 0,
        urls: [url]
      });
    };
    expose({ open });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showModal.value
      }, showModal.value ? {
        b: common_vendor.o(() => {
        }),
        c: common_vendor.o(($event) => showModal.value = false)
      } : {}, {
        d: common_vendor.o(($event) => showImage(currentSku.value.image)),
        e: currentSku.value.image,
        f: common_vendor.t(currentSku.value.name),
        g: common_vendor.t((currentSku.value.price * number.value).toFixed(2)),
        h: common_vendor.t(currentSku.value.stock),
        i: currentSku.value.sku
      }, currentSku.value.sku ? {
        j: common_vendor.f(currentSku.value.sku, (item, index, i0) => {
          return {
            a: common_vendor.t(item.sku_name),
            b: common_vendor.f(item.child, (row, s, i1) => {
              return {
                a: common_vendor.t(row.tag_name),
                b: row.id,
                c: row.disabled === true ? 1 : "",
                d: row.disabled === true,
                e: common_vendor.o(($event) => setTag(item, index, s, row), row.id),
                f: currentArr.value[item.sku_id] === row.id ? __props.colors : "#333333",
                g: currentArr.value[item.sku_id] === row.id ? "#fff" : "",
                h: currentArr.value[item.sku_id] === row.id ? __props.colors : ""
              };
            }),
            c: index
          };
        })
      } : {}, {
        k: common_vendor.o(changeNumber),
        l: common_vendor.o(($event) => number.value = $event),
        m: common_vendor.p({
          color: __props.colors,
          min: 1,
          max: currentSku.value.stock,
          inputWidth: 150,
          inputHeight: 60,
          disabled: SkuId.value === 0,
          modelValue: number.value
        }),
        n: SkuType.value === 0
      }, SkuType.value === 0 ? {
        o: common_vendor.o(($event) => onsubmit("add")),
        p: common_vendor.p({
          shape: "circle",
          disabled: SkuId.value === 0,
          customStyle: customStyle.value,
          color: __props.colors,
          text: "\u52A0\u5165\u8D2D\u7269\u8F66"
        }),
        q: common_vendor.o(($event) => onsubmit("pay")),
        r: common_vendor.p({
          shape: "circle",
          disabled: SkuId.value === 0,
          customStyle: customStyle.value,
          color: __props.colors,
          text: "\u7ACB\u5373\u8D2D\u4E70"
        })
      } : {}, {
        s: SkuType.value === 1
      }, SkuType.value === 1 ? {
        t: common_vendor.o(confirm),
        v: common_vendor.p({
          shape: "circle",
          disabled: SkuId.value === 0,
          customStyle: {
            ...customStyle.value,
            width: "80vw",
            marginTop: "30rpx"
          },
          color: __props.colors,
          text: "\u786E\u5B9A"
        })
      } : {}, {
        w: common_vendor.o(() => {
        }),
        x: common_vendor.n("sku " + (showModal.value === true ? "shows" : "")),
        y: showModal.value === true ? __props.bottoms + "rpx" : "",
        z: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-60776fca"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/commponent/public/sku.vue"]]);
wx.createComponent(Component);
