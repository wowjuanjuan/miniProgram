// import myData from 'utils/myData';
import {
  config
} from '../../config/index';
import {
  mockIp,
  mockReqId
} from '../../utils/mock';
const myData = require("../../utils/myData");

/** 获取结算mock数据 */
function mockFetchSettleDetail(params) {
  const {
    delay
  } = require('../_utils/delay');
  const {
    genSettleDetail
  } = require('../../model/order/orderConfirm');
  return delay().then(() => genSettleDetail(params));
}

/** 提交mock订单 */
function mockDispatchCommitPay() {
  const {
    delay
  } = require('../_utils/delay');

  return delay().then(() => ({
    data: {
      isSuccess: true,
      tradeNo: '350930961469409099',
      payInfo: '{}',
      code: null,
      transactionId: 'E-200915180100299000',
      msg: null,
      interactId: '15145',
      channel: 'wechat',
      limitGoodsList: null,
    },
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 891,
    success: true,
  }));
}

/** 获取结算数据 */
export function fetchSettleDetail(params) {
  if (config.useMock) {
    return mockFetchSettleDetail(params);
  }

  return new Promise((resolve) => {
    resolve('real api');
  });
}

/* 提交订单 */
export function dispatchCommitPay(params) {
  // if (config.useMock) {
  //   return mockDispatchCommitPay(params);
  // }

  return new Promise((resolve) => {
    wx.request({
      url: 'https://goapi.starfission.com/api/v1/order',
      method: 'POST',
      data: {
        goodsID: params.goodsID,
        paymentKey: "weixin or anykey",
        goodsBuyNum: 1
      },
      header: {
        token: wx.getStorageSync(myData.default.VITE_APP_TOKEN_NAME),
        debug: 1
      },
      success: (res) => {
        // console.log(res);
        resolve(res.data);
      }
    })

  }).then(res => {
    return res;

  });
}

/** 开发票 */
export function dispatchSupplementInvoice() {
  if (config.useMock) {
    const {
      delay
    } = require('../_utils/delay');
    return delay();
  }

  return new Promise((resolve) => {
    resolve('real api');
  });
}

//WECHAT_JSAPI
export const WECHAT_JSAPI = async (params) => {
  // console.log(myData.default.WECHAT_DATA_NAME.openID);
  console.log(wx.getStorageSync(myData.default.WECHAT_DATA_NAME).openID);
  await wx.request({
    url: 'https://goapi.starfission.com/api/v1/pay/wechat_jsapi',
    method: 'POST',
    data: {
      orderID: params.orderID,
      appOrderID: params?.appOrderID,
      openID: wx.getStorageSync(myData.default.WECHAT_DATA_NAME).openID,
      // redirectURL: "www.m.starfission.com"
    },
    header: {
      debug: 1,
      token: wx.getStorageSync(myData.default.VITE_APP_TOKEN_NAME)
    },
    success: (res) => {
      console.log(res);
    }
  })
};