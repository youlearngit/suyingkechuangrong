"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
var common_login = require("../../common/login.js");
var hooks_useAuth = require("../../hooks/useAuth.js");
require("../../store/modules/cart.js");
require("../../store/modules/user.js");
require("../../common/utils.js");
require("../../common/userApi.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  (_easycom_u_button2 + _easycom_u_loadmore2)();
}
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_loadmore = () => "../../node-modules/uview-plus/components/u-loadmore/u-loadmore.js";
if (!Math) {
  (Field + _easycom_u_button + _easycom_u_loadmore)();
}
const Field = () => "../../components/u-field/u-field.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const store = store_index.GlobalStore();
    const colors = common_vendor.computed$1(() => {
      return store.theme.color;
    });
    const loginType = common_vendor.ref(1);
    common_vendor.onMounted(async () => {
      if (store.user.roleType === "wechat" && store.user.avatarUrl && !store.user.mobile) {
        loginType.value = 2;
      }
    });
    const authorization = async () => {
      common_vendor.index.showLoading({
        title: "\u767B\u5F55\u4E2D...",
        mask: true
      });
      const flag = await common_login.tryWxLogin(store, 1);
      common_vendor.index.hideLoading();
      if (flag == 0) {
        return;
      }
      if (store.user.mobile != "" && store.user.nickName) {
        common_vendor.index.navigateBack({
          delta: 1
        });
        setTimeout(() => {
          common_vendor.index.$u.toast("\u5FAE\u4FE1\u6388\u6743\u767B\u5F55\u6210\u529F");
        }, 200);
        return;
      }
      common_vendor.index.showModal({
        title: "\u6E29\u99A8\u63D0\u793A",
        content: "\u4F60\u597D\uFF0C\u6388\u6743\u540E\u624D\u80FD\u6B63\u5E38\u4F7F\u7528\u5C0F\u7A0B\u5E8F\u529F\u80FD",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.getUserProfile({
              lang: "zh_CN",
              provider: "weixin",
              desc: "\u83B7\u53D6\u7528\u6237\u4E2A\u4EBA\u4FE1\u606F",
              success: async (detail) => {
                await common_vendor.index.$u.http.post("/wx/userUpdate", detail.userInfo);
                if (!store.user.mobile) {
                  common_vendor.index.$u.toast("\u8BF7\u518D\u6388\u6743\u83B7\u53D6\u624B\u673A\u53F7\u7801\uFF01");
                  loginType.value = 2;
                } else {
                  common_vendor.index.navigateBack({
                    delta: 1
                  });
                }
              },
              fail: (msg) => {
                console.log(msg);
              }
            });
          }
        }
      });
    };
    const decryptPhoneNumber = async (e) => {
      const { data } = await common_vendor.index.$u.http.post("/wx/updateMobile", e.detail);
      if (data.data) {
        await common_login.tryWxLogin(store, 1);
        common_vendor.index.navigateBack({
          delta: 1
        });
      }
    };
    const user = common_vendor.reactive({ username: store.login.username, password: store.login.password });
    const submit = async () => {
      common_vendor.index.showLoading({
        title: "\u767B\u5F55\u4E2D...",
        mask: true
      });
      const { data } = await common_vendor.index.$u.http.post("/wx/userLogin", user);
      const auth = hooks_useAuth.useAuth();
      auth.loginSuccess(data).then(() => {
        store.login.username = user.username;
        store.login.password = user.password;
        common_vendor.index.navigateBack({
          delta: 1
        });
        setTimeout(() => {
          common_vendor.index.$u.toast("\u8D26\u53F7\u767B\u5F55\u6210\u529F");
        }, 300);
      });
    };
    const register = async () => {
      await common_vendor.index.$u.http.post("/wx/userRegister", user);
      common_vendor.index.$u.toast("\u8D26\u53F7\u6CE8\u518C\u6210\u529F\uFF0C\u8BF7\u70B9\u51FB\u767B\u9646");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => user.username = $event),
        b: common_vendor.p({
          clearable: false,
          label: "\u8D26\u53F7",
          placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7",
          modelValue: user.username
        }),
        c: common_vendor.o(($event) => user.password = $event),
        d: common_vendor.p({
          label: "\u5BC6\u7801",
          clearable: false,
          password: true,
          placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
          modelValue: user.password
        }),
        e: common_vendor.o(register),
        f: common_vendor.p({
          shape: "circle"
        }),
        g: common_vendor.o(submit),
        h: common_vendor.p({
          color: common_vendor.unref(colors),
          shape: "circle"
        }),
        i: common_vendor.p({
          status: "nomore",
          line: true,
          height: "30",
          ["nomore-text"]: "\u6388\u6743\u767B\u5F55"
        }),
        j: loginType.value === 1
      }, loginType.value === 1 ? {
        k: common_vendor.o(authorization)
      } : {}, {
        l: loginType.value === 2
      }, loginType.value === 2 ? {
        m: common_vendor.o(decryptPhoneNumber),
        n: common_vendor.p({
          type: "primary",
          plain: true,
          hairline: true,
          color: common_vendor.unref(colors),
          ["open-type"]: "getPhoneNumber"
        })
      } : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-23b3be22"], ["__file", "C:/Users/jsyh/Documents/HBuilderProjects/suyingkechuangrong/src/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
