"use strict";
require("../../common/vendor.js");
const refundStatus = (value) => {
  if (value == 0) {
    return "\u5F85\u5BA1\u6838";
  } else if (value == 1) {
    return "\u5DF2\u62D2\u7EDD";
  } else if (value == 2) {
    return "\u5BA1\u6838\u901A\u8FC7";
  } else if (value == 3) {
    return "\u5F85\u53D1\u8D27";
  } else if (value == 4) {
    return "\u9000\u6B3E\u6210\u529F";
  } else if (value == 5) {
    return "\u5F85\u5E73\u53F0\u6536\u8D27";
  }
};
const setStatus = (value) => {
  if (value == 0) {
    return "\u5F85\u4ED8\u6B3E";
  } else if (value == 1) {
    return "\u652F\u4ED8\u4E2D";
  } else if (value == 2) {
    return "\u5F85\u53D1\u8D27";
  } else if (value == 3) {
    return "\u5F85\u6536\u8D27";
  } else if (value == 4) {
    return "\u5F85\u8BC4\u4EF7";
  } else if (value == 5) {
    return "\u5DF2\u5B8C\u6210";
  } else if (value == 6) {
    return "\u5546\u54C1\u5DF2\u9000\u6B3E";
  } else if (value == 7) {
    return "\u5546\u54C1\u9000\u6B3E\u4E2D";
  } else if (value == 8) {
    return "\u9000\u6B3E\u7533\u8BF7\u4E0D\u901A\u8FC7";
  } else if (value == 9) {
    return "\u9000\u6B3E\u6210\u529F";
  }
  if (value == -1) {
    return "\u5DF2\u53D6\u6D88";
  }
};
exports.refundStatus = refundStatus;
exports.setStatus = setStatus;
