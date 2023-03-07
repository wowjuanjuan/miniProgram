export const regNameZh = /(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/; // 真实姓名 中文
export const filterName = /[^\a-zA-Z\u4E00-\u9FA5\s]/g; // 过滤姓名正则,只允许输入汉字及英文
export const filterNum = /[^\d]/g; // 只允许输入数字
export const filterPass = /[^\w+$]/g; // 过滤证件号正则,只允许输入数字及英文
export const regPhone = /^1[3456789]\d{9}$/; // 手机号
export const regMob = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/; // 固话
export // const regId           = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;   //身份证
const regId =
  /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/; // 身份证
export const regPassPort1 = /^[a-zA-Z]{5,17}$/; // 护照
export const regPassPort2 = /^[a-zA-Z0-9]{5,17}$/; // 护照
export const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
export const modNum = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/; // 固定电话

// 验证税号是否合法
const regTaxId = function (taxId) {
  const regArr = [
    /^[\da-z]{10,15}$/i,
    /^\d{6}[\da-z]{10,12}$/i,
    /^[a-z]\d{6}[\da-z]{9,11}$/i,
    /^[a-z]{2}\d{6}[\da-z]{8,10}$/i,
    /^\d{14}[\dx][\da-z]{4,5}$/i,
    /^\d{17}[\dx][\da-z]{1,2}$/i,
    /^[a-z]\d{14}[\dx][\da-z]{3,4}$/i,
    /^[a-z]\d{17}[\dx][\da-z]{0,1}$/i,
    /^[\d]{6}[\da-z]{13,14}$/i
  ];
  let i;
  const j = regArr.length;
  for (let i = 0; i < j; i++) {
    if (regArr[i].test(taxId)) {
      return true;
    }
  }
  return false;
};