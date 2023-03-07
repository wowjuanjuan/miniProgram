import {
  config
} from '../../config/index';

/** 获取个人中心信息 */
function mockFetchPerson() {
  const {
    delay
  } = require('../_utils/delay');
  const {
    genSimpleUserInfo
  } = require('../../model/usercenter');
  const {
    genAddress
  } = require('../../model/address');
  const address = genAddress();
  return delay().then(() => ({
    ...genSimpleUserInfo(),
    address: {
      provinceName: address.provinceName,
      provinceCode: address.provinceCode,
      cityName: address.cityName,
      cityCode: address.cityCode,
    },
  }));
}

/** 获取个人中心信息 */
export function fetchPerson() {
  // if (config.useMock) {
  //   return mockFetchPerson();
  // }
  // return new Promise((resolve) => {
  //   resolve('real api');
  // });
  // console.log(wx.getStorageSync('userData'));
  return wx.getStorageSync('userData')
  //放地址可能要放在这里面
  // let promise = new Promise(function (resolve, reject) {


  // })
  // return promise.then(res => {
  //   console.log("????", res.data);
  //   return res.data
  // })
}