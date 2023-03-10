//颜色转换为RGBA颜色- 增加透明度
export function ColorRgba(str: string, n: number) {
  //十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  const sColor = str.toLowerCase();
  n = n || 1;
  //十六进制颜色转换为RGB格式
  if (sColor && reg.test(sColor)) {
    let sColorChange = getRgbNum(sColor);
    return "rgba(" + sColorChange.join(",") + "," + n + ")";
  } else {
    return sColor;
  }
}

//转换规格展示
export function SkuPrint(spData: string) {
  if (!spData){
    return
  }
  spData = spData.replaceAll("[", "")
  spData = spData.replaceAll("]", "")
  spData = spData.replaceAll("{", "")
  spData = spData.replaceAll("}", "")
  spData = spData.replaceAll("\"", "")
  return spData
}

/**
 * 格式化时间
 * 调用formatDate(strDate, 'yyyy-MM-dd');
 * @param strDate（中国标准时间、时间戳等）
 * @param strFormat（返回格式）
 */
export const formatDate = (strDate: any, strFormat?: any) => {
  if (!strDate) {
    return;
  }
  if (!strFormat) {
    strFormat = 'yyyy-MM-dd';
  }
  switch (typeof strDate) {
    case 'string':
      strDate = new Date(strDate.replace(/-/, '/'));
      break;
    case 'number':
      strDate = new Date(strDate);
      break;
  }
  if (strDate instanceof Date) {
    const dict: any = {
      yyyy: strDate.getFullYear(),
      M: strDate.getMonth() + 1,
      d: strDate.getDate(),
      H: strDate.getHours(),
      m: strDate.getMinutes(),
      s: strDate.getSeconds(),
      MM: ('' + (strDate.getMonth() + 101)).substr(1),
      dd: ('' + (strDate.getDate() + 100)).substr(1),
      HH: ('' + (strDate.getHours() + 100)).substr(1),
      mm: ('' + (strDate.getMinutes() + 100)).substr(1),
      ss: ('' + (strDate.getSeconds() + 100)).substr(1),
    };
    return strFormat.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, function () {
      return dict[arguments[0]];
    });
  }
}

//--------------------------------------------------------------------//
function getRgbNum(sColor: string) {
  let i;
  if (sColor.length === 4) {
    let sColorNew = "#";
    for (i = 1; i < 4; i += 1) {  //补全颜色值 例如：#eee,#fff等
      sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
    }
    sColor = sColorNew;
  }
  //处理六位颜色值
  const sColorChange = [];
  for (i = 1; i < 7; i += 2) {
    //核心代码，通过parseInt将十六进制转为十进制，parseInt只有一个参数时是默认转为十进制的，第二个参数则是指定转为对应进制
    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
  }
  return sColorChange;
}
