"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
var store_modules_cart = require("../../store/modules/cart.js");
var store_modules_user = require("../../store/modules/user.js");
require("../../common/utils.js");
require("../../common/userApi.js");
require("../../hooks/useAuth.js");
require("../../common/login.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (UField + _easycom_u_button)();
}
const UField = () => "../../components/u-field/u-field.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myInfo",
  setup(__props) {
    const store = store_index.GlobalStore();
    const userStore = store_modules_user.UserStore();
    const user = common_vendor.ref({ ...store.user });
    common_vendor.onMounted(() => {
      common_vendor.index.$on("uAvatarCropper", (path) => {
        common_vendor.index.$u.http.upload("/static/upload/image", {
          formData: { use: "wechat" },
          name: "file",
          filePath: path
        }).then(({ data }) => {
          user.value.avatarUrl = data.path;
          common_vendor.index.$u.http.post("/wx/userUpdate", user.value).then(() => {
            common_vendor.index.$u.toast("\u5934\u50CF\u66F4\u65B0\u6210\u529F");
          });
          store.user.avatarUrl = data.path;
        });
      });
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("uAvatarCropper");
    });
    const updateInfo = async () => {
      if (!user.value.nickName || !user.value.mobile) {
        common_vendor.index.$u.toast("\u6635\u79F0\u6216\u624B\u673A\u53F7\u7801\u4E0D\u80FD\u4E3A\u7A7A\uFF01");
        return;
      }
      await common_vendor.index.$u.http.post("/wx/userUpdate", user.value);
      common_vendor.index.$u.toast("\u66F4\u65B0\u6210\u529F");
      store.user = Object.assign(store.user, user.value);
    };
    const chooseAvatar = () => {
      common_vendor.index.$u.route({
        url: "pagesMall/user/u-avatar-cropper/u-avatar-cropper",
        params: {
          destWidth: 600,
          rectWidth: 200,
          fileType: "jpg"
        }
      });
    };
    common_vendor.onPullDownRefresh(async () => {
      const { data } = await common_vendor.index.$u.http.get("/wx/getUserInfo");
      user.value = data;
      store.setData("user", data);
      common_vendor.index.stopPullDownRefresh();
    });
    const logout = () => {
      common_vendor.index.showModal({
        cancelColor: "#999",
        content: "\u786E\u8BA4\u8981\u9000\u51FA\u767B\u5F55\u5417?",
        confirmColor: store.theme.color,
        success: function(res) {
          if (res.confirm) {
            store.setData("user", {});
            store.login.token = "";
            store.login.expiresIn = 0;
            const cartStore = store_modules_cart.CartStore();
            cartStore.list = [];
            userStore.updateAccount();
            common_vendor.index.showToast({ title: "\u9000\u51FA\u6210\u529F", icon: "none" });
            setTimeout(() => {
              common_vendor.index.navigateBack({
                delta: 1
              });
            }, 500);
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: user.value.avatarUrl,
        b: common_vendor.o(chooseAvatar),
        c: common_vendor.o(($event) => user.value.username = $event),
        d: common_vendor.p({
          disabled: true,
          label: "\u8D26\u53F7",
          modelValue: user.value.username
        }),
        e: common_vendor.o(($event) => user.value.nickName = $event),
        f: common_vendor.p({
          required: true,
          clearable: false,
          label: "\u6635\u79F0",
          placeholder: "\u8BF7\u8F93\u5165\u6635\u79F0",
          modelValue: user.value.nickName
        }),
        g: common_vendor.o(($event) => user.value.mobile = $event),
        h: common_vendor.p({
          required: true,
          clearable: false,
          label: "\u624B\u673A\u53F7\u7801",
          placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801",
          modelValue: user.value.mobile
        }),
        i: common_vendor.o(($event) => user.value.email = $event),
        j: common_vendor.p({
          clearable: false,
          label: "\u90AE\u7BB1",
          placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
          modelValue: user.value.email
        }),
        k: common_vendor.o(updateInfo),
        l: common_vendor.p({
          shape: "circle",
          customStyle: {
            ..._ctx.customStyle,
            width: "50vw",
            height: "70rpx",
            marginTop: "130rpx"
          },
          color: common_vendor.unref(store).theme.color,
          text: "\u66F4\u65B0"
        }),
        m: common_vendor.unref(store).user.nickName
      }, common_vendor.unref(store).user.nickName ? {
        n: common_vendor.s("color:" + common_vendor.unref(store).theme.color),
        o: common_vendor.o(logout)
      } : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e6f843c4"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pagesMall/user/myInfo.vue"]]);
wx.createPage(MiniProgramPage);
