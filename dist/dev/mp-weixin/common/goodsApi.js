"use strict";
var common_vendor = require("./vendor.js");
async function QueryGoods({ ...param }) {
  if (param.sortField === "sale") {
    param.sortOrder = "descending";
  }
  if (param.categoryId === 0)
    delete param.categoryId;
  if (param.couponId === 0)
    delete param.couponId;
  if (param.promotionId === 0)
    delete param.promotionId;
  const { data } = await common_vendor.index.$u.http.get("/public/queryGoods", { data: param });
  return Promise.resolve(data);
}
exports.QueryGoods = QueryGoods;
