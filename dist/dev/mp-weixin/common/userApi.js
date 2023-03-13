"use strict";
var common_vendor = require("./vendor.js");
async function GetMyAccount() {
  const { data } = await common_vendor.index.$u.http.get("/wx/getMyAccount");
  return Promise.resolve(data);
}
exports.GetMyAccount = GetMyAccount;
