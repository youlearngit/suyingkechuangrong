"use strict";
function ColorRgba(str, n) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  const sColor = str.toLowerCase();
  n = n || 1;
  if (sColor && reg.test(sColor)) {
    let sColorChange = getRgbNum(sColor);
    return "rgba(" + sColorChange.join(",") + "," + n + ")";
  } else {
    return sColor;
  }
}
function SkuPrint(spData) {
  if (!spData) {
    return;
  }
  spData = spData.replaceAll("[", "");
  spData = spData.replaceAll("]", "");
  spData = spData.replaceAll("{", "");
  spData = spData.replaceAll("}", "");
  spData = spData.replaceAll('"', "");
  return spData;
}
const formatDate = (strDate, strFormat) => {
  if (!strDate) {
    return;
  }
  if (!strFormat) {
    strFormat = "yyyy-MM-dd";
  }
  switch (typeof strDate) {
    case "string":
      strDate = new Date(strDate.replace(/-/, "/"));
      break;
    case "number":
      strDate = new Date(strDate);
      break;
  }
  if (strDate instanceof Date) {
    const dict = {
      yyyy: strDate.getFullYear(),
      M: strDate.getMonth() + 1,
      d: strDate.getDate(),
      H: strDate.getHours(),
      m: strDate.getMinutes(),
      s: strDate.getSeconds(),
      MM: ("" + (strDate.getMonth() + 101)).substr(1),
      dd: ("" + (strDate.getDate() + 100)).substr(1),
      HH: ("" + (strDate.getHours() + 100)).substr(1),
      mm: ("" + (strDate.getMinutes() + 100)).substr(1),
      ss: ("" + (strDate.getSeconds() + 100)).substr(1)
    };
    return strFormat.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, function() {
      return dict[arguments[0]];
    });
  }
};
function getRgbNum(sColor) {
  let i;
  if (sColor.length === 4) {
    let sColorNew = "#";
    for (i = 1; i < 4; i += 1) {
      sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
    }
    sColor = sColorNew;
  }
  const sColorChange = [];
  for (i = 1; i < 7; i += 2) {
    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
  }
  return sColorChange;
}
exports.ColorRgba = ColorRgba;
exports.SkuPrint = SkuPrint;
exports.formatDate = formatDate;
