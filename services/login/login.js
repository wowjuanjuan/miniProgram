// 用户登录
var myData = require("../../utils/myData")
export const WX_LOGIN = (wxCode) => {
  return wx.request({
    url: 'https://api.starfission.com/Account/WXLogin',
    method: 'POST',
    data: {
      wxCode,
      appID: myData.default.appID
    },
    header: {
      debug: '1', // 默认值
      // Accept: 'application/json',
      // 'content-type': 'application/x-www-form-urlencoded',
    },
    success: (res) => {
      console.log(res);
      console.log(wxCode);
      //如果authToken存在的话就存起来，不在的话就去登陆页面
      //此时获取到wxToken先存起


      if (res.data.data.wxUser) {
        wx.setStorageSync(myData.default.WECHAT_DATA_NAME, res.data.data.wxUser)
        // wx.setStorageSync(myData.default.WX_TOKEN_NAME, res.data.data.wxToken);
        wx.navigateTo({
          url: '/pages/home/home',
        })
      }
      return res.data;


      // wx.request({
      //   url: 'https://api.starfission.com/Account/GetUserInfo',
      //   method: 'POST',
      //   header: {
      //     debug: '1', // 默认值
      //     Accept: 'application/json',
      //     Authorization: res.data.data.wxToken
      //     // 'content-type': 'application/x-www-form-urlencoded',
      //   },
      //   success: (res) => {
      //     console.log("热热", res);
      //     wx.setStorageSync('userData', res.data.data);
      //     // resolve(
      //     //   res.data.data
      //     // )
      //   }
      // });
      // console.log("wowwowo", wx.getStorageSync('userData'));
    },
  });
};
//获取登陆前验证码
export const GET_LOGIN_CODE = () => {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://api.starfission.com/Account/GetLoginCode',
      method: "POST",
      header: {
        debug: '1', // 默认值
      },
      success: (res) => {
        resolve(res.data.data)
        // return res.data.data
      },
    })
  }).then(res => {
    return res
  })
}
//发送登录验证码
export const SEND_LOGIN_CODE = (formData) => {
  console.log("1");
  return new Promise(function (resolve, reject) {
    console.log("2");
    wx.request({
      url: 'https://api.starfission.com/Account/SendLoginCode',
      method: "POST",
      data: {
        "verifyCode": formData.verifyCode,
        "verifyTime": formData.verifyTime,
        "mobile": formData.mobile
      },
      header: {
        debug: '1', // 默认值
      },
      success: (res) => {
        console.log(res);
        resolve(res.data)
        // return res.data.data
      },
    })
  }).then(res => {
    return res
  })
}
//手机登录
export const MOBILE_LOGIN = (data) => {
  console.log("1");
  return new Promise(function (resolve, reject) {
    console.log("2");
    wx.request({
      url: 'https://api.starfission.com/Account/MobileLogin',
      method: "POST",
      data: {
        loginCode: data.loginCode,
        mobile: data.mobile,
        // wxToken: data.wxToken
      },
      header: {
        debug: '1', // 默认值
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