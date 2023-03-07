import {
  config
} from '../../config/index';
let myData = require("../../utils/myData")

/** 获取收货地址 */
function mockFetchDeliveryAddress(id) {
  const {
    delay
  } = require('../_utils/delay');
  const {
    genAddress
  } = require('../../model/address');

  return delay().then(() => genAddress(id));
}

/** 获取收货地址 */
export function fetchDeliveryAddress(id = 0) {
  if (config.useMock) {
    return mockFetchDeliveryAddress(id);
  }


}

/** 获取收货地址列表 */
function mockFetchDeliveryAddressList(len = 0) {
  const {
    delay
  } = require('../_utils/delay');
  const {
    genAddressList
  } = require('../../model/address');


  return delay().then(() =>
    genAddressList(len).map((address) => {
      return {
        ...address,
        phoneNumber: address.phone,
        address: `${address.provinceName}${address.cityName}${address.districtName}${address.detailAddress}`,
        tag: address.addressTag,
      };
    }),
  );
}

/** 获取收货地址列表 */
export function fetchDeliveryAddressList(len = 10) {
  // if (config.useMock) {
  //   return mockFetchDeliveryAddressList(len);
  // }

  return new Promise(function (resolve, reject) {
    console.log("2");
    wx.request({
      url: 'https://api.starfission.com/Order/MyAddress',
      method: "POST",
      header: {
        debug: '1', // 默认值
        Authorization: wx.getStorageSync(myData.default.VITE_APP_TOKEN_NAME)
      },
      success: (res) => {
        console.log(res);
        resolve(res.data)
        // return res.data.data
      },
    })
  }).then(res => {
    console.log(res);
    return res.data.map(address => {
      return {
        // saasId: '88888888',
        // uid: `8888888820550${id}`,
        // authToken: null,
        // id: `${id}`,
        addressId: address.addressID,
        phone: address.linkPhone,
        name: address.linkMan,
        // countryName: '中国',
        // countryCode: 'chn',
        provinceName: address.province,
        provinceCode: address.provinceID,
        cityName: address.city,
        cityCode: address.cityID,
        districtName: address.area,
        districtCode: address.areaID,
        detailAddress: address.linkAddress,
        isDefault: address.isDefault,
        addressTag: "",
        phoneNumber: address.linkPhone,
        address: `${address.province}${address.city}${address.area}${address.linkAddress}`,
        // tag: address.addressTag,
      }
    })
  })
}

// 新增收货地址
export const AddAddress = (params) => {
  console.log("1");
  return new Promise(function (resolve, reject) {
    console.log("2");
    wx.request({
      url: 'https://api.starfission.com/Order/AddAddress',
      method: "POST",
      data: {
        ...params
      },
      header: {
        debug: '1', // 默认值
        Authorization: wx.getStorageSync(myData.default.VITE_APP_TOKEN_NAME)
      },
      success: (res) => {
        console.log(res);
        resolve(res.data)
        // return res.data.data
      },
    })
  }).then(res => {
    console.log(res);
    return res
  })
}
//编辑收货地址

export const EditAddress = (params) => {

  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://api.starfission.com/Order/EditAddress',
      method: "POST",
      data: {
        ...params
      },
      header: {
        debug: '1', // 默认值
        Authorization: wx.getStorageSync(myData.default.VITE_APP_TOKEN_NAME)
      },
      success: (res) => {
        console.log(res);
        resolve(res.data)
        // return res.data.data
      },
    })
  }).then(res => {
    console.log(res);
    return res
  })
}