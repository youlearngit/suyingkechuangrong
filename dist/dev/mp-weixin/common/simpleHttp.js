"use strict";
var common_vendor = require("./vendor.js");
const GET = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    let t = 0;
    const task = common_vendor.index.request({
      url: url.startsWith("http") ? url : common_vendor.index.$u.http.config.baseURL + url,
      data,
      success: (res) => {
        resolve(res.data);
      },
      fail: () => {
        reject();
      },
      complete: () => {
        t && clearTimeout(t);
      }
    });
    t = setTimeout(() => {
      task.abort();
    }, 10 * 1e3);
  });
};
exports.GET = GET;
