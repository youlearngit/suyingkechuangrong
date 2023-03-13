"use strict";
var common_vendor = require("./vendor.js");
var hooks_useAuth = require("../hooks/useAuth.js");
function tryWxLogin(store, flag = 0) {
  if (flag == 0 && (!store.login.expiresIn || store.user.roleType !== "wechat")) {
    return Promise.resolve(0);
  }
  const now = new Date().getTime() / 1e3 + 60 * 10;
  if (flag == 0 && store.login.expiresIn && now < store.login.expiresIn) {
    return Promise.resolve(1);
  }
  return new Promise((resolve, reject) => {
    common_vendor.index.login({
      fail: () => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({
          title: "\u767B\u5F55\u5931\u8D25",
          content: "\u83B7\u53D6\u6388\u6743\u4FE1\u606F\u5931\u8D25\uFF01"
        });
      },
      success: (logins) => {
        const info = common_vendor.index.getSystemInfoSync();
        common_vendor.index.request({
          url: common_vendor.index.$u.http.config.baseURL + "/wx/login",
          data: {
            code: logins.code,
            brand: info.brand,
            model: info.model,
            version: info.version,
            system: info.system,
            platform: info.platform
          },
          method: "POST",
          success: (resp) => {
            const data = resp.data;
            if (data.code == -1) {
              common_vendor.index.showModal({
                title: "\u767B\u5F55\u5931\u8D25",
                content: data.msg,
                success: function(res) {
                  if (res.confirm) {
                    console.log("\u7528\u6237\u70B9\u51FB\u786E\u5B9A");
                  } else if (res.cancel) {
                    console.log("\u7528\u6237\u70B9\u51FB\u53D6\u6D88");
                  }
                }
              });
              resolve(0);
            } else {
              const auth = hooks_useAuth.useAuth();
              auth.loginSuccess(data).then(() => {
                resolve(1);
              });
            }
          },
          fail: (resp) => {
            resolve(0);
          },
          complete: () => {
            common_vendor.index.hideLoading();
          }
        });
      }
    });
  });
}
exports.tryWxLogin = tryWxLogin;
