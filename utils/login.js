import {
  WX_LOGIN
} from '../services/login/login';
let myData = require("../utils/myData");

//登录按钮触发的事件
var login = function () {
  console.log(1);
  var loginInfo = {};
  //调用微信小程序的登录接口
  wx.login({
    success(e) {
      // console.log('i am localstorage', wx.getStorageSync('userData'));
      if (wx.getStorageSync('userData')) {
        return;
      }
      loginInfo.code = e.code; //拿到的code存储在data中
      console.log("wx.login返回参数", e, loginInfo.code);
      WX_LOGIN(loginInfo.code);

      //这里是获取微信用户头像和昵称的
      // wx.showModal({
      //   title: '温馨提示',
      //   content: '微信授权登录后才能正常使用小程序功能',
      //   cancelText: '拒绝',
      //   confirmText: '同意',
      //   success(sucessInfo) {
      //     //调用微信小程序的获取用户信息的接口
      //     wx.getUserProfile({
      //       desc: '用于完善会员资料', // 声明获取用户个人信息后的用途
      //       lang: 'zh_CN',
      //       success(info) {
      //         //把获取到的信息复制到data中的loginInfo中
      //         loginInfo = Object.assign(loginInfo, info);
      //         //调用后台的接口，把所有整合的个人信息传过去
      //         // that.handlerLogin( that.data.loginInfo )
      //         console.log(loginInfo);
      //         console.log(myData);
      //         wx.setStorageSync(myData.default.WECHAT_DATA_NAME, loginInfo)
      //       },
      //       fail(e) {
      //         console.log('获取用户信息失败', e);
      //       },
      //     });
      //   },
      //   fail() {
      //     console.log('拒绝');
      //   },
      //   complete() {},
      // });
    },
    fail(e) {
      console.log('fail', e);
      wx.showToast({
        title: '网络异常',
        duration: 2000,
      });
      return;
    },
  });
};
//判断是否登陆过期
let checksession = function () {
  wx.checkSession({
    success: function (res) {
      console.log(res, '登录未过期');
      wx.showToast({
        title: '登录未过期啊',
      });
    },
    fail: function (res) {
      console.log(res, '登录过期了');
      wx.showModal({
        title: '提示',
        content: '你的登录信息过期了，请重新登录',
      });
      //再次调用wx.login()
      login();
    },
  });
};
//是否过期
const isExpired = () => {
  const expiry = wx.getStorageSync(myData.default.VITE_APP_TOKEN_NAME + 'expiry') || '0';
  if (expiry) {
    return Date.now() - Number(expiry) * 1000 >= 1000 * 60 * 5;
  } else {
    return true;
  }
};
let isLogin = function () {
  // console.log("时间？", isExpired(), "token", wx.getStorageSync(myData.default.VITE_APP_TOKEN_NAME));
  if (wx.getStorageSync(myData.default.VITE_APP_TOKEN_NAME) && !isExpired()) {
    wx.switchTab({
      url: '/pages/home/home',
    })
    return true;
  } else {
    return false
  }
}

module.exports = {
  login,
  checksession,
  isLogin
};