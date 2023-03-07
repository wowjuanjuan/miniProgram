// pages/login/telLogin/code/index.js
const myData = require("../../../../utils/myData");
import {
  MOBILE_LOGIN,
  SEND_LOGIN_CODE
} from "../../../../services/login/login"
import {
  GET_USER_INFO
} from "../../../../services/userInfo/userInfo"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeData: {
      time: 60,
      messageCode: '', //验证码
      isCountDown: false //倒计时
    },
    formData: {},
    phoneNumberText: "",
    timer: null
  },
  getInput(e) {
    if (e.detail.value.length == 6) {
      let temp = this.data.codeData;
      temp.messageCode = e.detail.value;
      // this.setData({
      //   codeData: temp
      // })
      this.handleLogin(temp.messageCode);
    }
  },
  GET_TOKEN(loginCode, mobile) {
    console.log("begin");
    try {
      new Promise((resolve, reject) => {
        //先获取微信code
        wx.login({
          success: (res) => {
            // wxToken = res.code
            resolve(res.code)
          },
        })
        // console.log(wxToken);
      }).then(
        (res1) => {
          new Promise(function (resolve, reject) {
            console.log(res1);
            //手机登录
            const res = MOBILE_LOGIN({
              loginCode,
              mobile,
              // hannelsKey: getCookie('hannelsKey') || undefined,
              // inviteCode: getCookie('inviteCode') || undefined,
              // wxToken: res1,
            });
            console.log(res);
            resolve(res)
          }).then(res => {
            console.log(res);
            //存储token及过期时间
            wx.setStorageSync(myData.default.VITE_APP_TOKEN_NAME, res.data.authToken);
            console.log(wx.getStorageSync(myData.default.VITE_APP_TOKEN_NAME));
            wx.setStorageSync(myData.default.VITE_APP_TOKEN_NAME + 'expiry', res.data.expiry.toString());
            new Promise(function (resolve, reject) {
              //获取用户信息
              let tempData = GET_USER_INFO();
              resolve(tempData)
              console.log(tempData);
            }).then(res => {
              console.log(res)
              if (res.status == 1) {
                wx.switchTab({
                  url: '/pages/home/home',
                })
              }
            })

          })
        }
      )

    } catch (error) {
      console.log("错误");
      // return Promise.reject(error);
    }
    //在这里调用获取用户信息的接口
    // await this.GET_USER_INFO();
  },
  handleLogin(loginCode) {
    try {
      this.GET_TOKEN(loginCode, this.data.formData.mobile);
      // const returnUrl = window.localStorage.getItem('returnUrl') || '/';
      // console.log(returnUrl);
      // console.log(returnUrl);
      // window.location.href = returnUrl;
    } catch (error) {
      console.log(error);
      console.log('抛出');
    }
  },
  getPhoneNumberText(phoneNumberText) {
    const pre = phoneNumberText?.slice(0, 3);
    const suf = phoneNumberText?.slice(7, 11);
    return pre + '****' + suf;
  },
  countDown() {
    this.data.timer = setInterval(() => {
      let tempObj = this.data.codeData;
      tempObj.time--;
      if (tempObj.time == 0) {
        tempObj.isCountDown = true;
        this.setData({
          codeData: tempObj
        })
        clearInterval(this.data.timer)
      }
      this.setData({
        codeData: tempObj
      })
    }, 1000);
  },
  //重新发送
  sendLoginCodeAgain() {
    if (this.data.codeData.isCountDown) {
      SEND_LOGIN_CODE(this.data.formData)
      let tempObj = this.data.codeData;
      tempObj.isCountDown = false;
      tempObj.time = 60;
      this.setData({
        codeData: tempObj
      })
      this.countDown();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      formData
    } = options;
    const newFormData = JSON.parse(formData || '{}');
    console.log(newFormData);
    const tempMobile = newFormData.mobile
    this.data.formData = newFormData;
    this.setData({
      formData: newFormData,
      phoneNumberText: this.getPhoneNumberText(tempMobile)
    })
    console.log(myData.default.VITE_APP_TOKEN_NAME);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.countDown();

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})