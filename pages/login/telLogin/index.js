// pages/login/telLogin/index.js
import initComputed from 'wx-computed'
import {
  regPhone
} from "../../../utils/reg"
import {
  GET_LOGIN_CODE,
  SEND_LOGIN_CODE
} from "../../../services/login/login"
import Toast from 'tdesign-miniprogram/toast/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test: "",
    //begin
    codeSrc: '',
    isAgreePrivacy: false,
    formData: {
      verifyCode: '', //
      mobile: '',
      verifyTime: 0
    },
    isSending: false, //发送中
    isDisabled: true, //按钮是否可用
  },
  computed: {
    test() {
      return this.data.formData.mobile + this.data.formData.verifyCode;
    },
    isDisabled() {
      return (!regPhone.test(this.data.formData.mobile.trim())) || this.data.formData.verifyCode.trim().length == 0
    },
  },
  //在输入框数据变动时执行
  getTelInput(e) {
    let temp = this.data.formData;
    temp.mobile = e.detail.value;
    this.setData({
      formData: temp
    })
    console.log("woow tel", this.data.formData.mobile, this.data.test, this.data.isDisabled);
  },
  getCodeInput(e) {
    let temp = this.data.formData;
    temp.verifyCode = e.detail.value;
    this.setData({
      formData: temp
    })
    console.log("woow tel", this.data.formData.mobile, this.data.test, this.data.isDisabled);
  },
  testLog(e) {
    console.log("test", e);
  },
  //发送验证码（登陆前）
  getLoginCode() {
    new Promise(function (resolve, reject) {
      const res1 = GET_LOGIN_CODE();
      console.log("res1", res1);
      resolve(res1)
    }).then(res => {
      console.log(res)
      this.data.codeSrc = res.verifyCode;
      let temp = this.data.formData;
      temp.verifyTime = res.verifyTime;
      this.setData({
        codeSrc: res.verifyCode,
        formData: temp
      })
    })
  },

  handleSendSms() {
    // let that = this;
    if (this.data.isDisabled) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请先输入正确的手机号和验证码',
      });
      // console.log("11111111");
      return;
    }
    let that = this;
    this.data.isSending = true;
    console.log("??");
    new Promise(function (resolve, reject) {
      console.log("wo");
      const res1 = SEND_LOGIN_CODE(that.data.formData)
      console.log("res1", res1);
      resolve(res1)
    }).then(res => {
      this.data.isSending = false;
      console.log(res)
      if (res.status == 1) {
        let tempFormDataString = JSON.stringify(this.data.formData)
        console.log(tempFormDataString);
        wx.navigateTo({
          url: `/pages/login/telLogin/code/index?formData=${tempFormDataString}`
        })
      } else {
        console.log("false");
        this.data.formData.verifyCode = '';
        this.getLoginCode();
        this.data.isSending = false;
      }
    }).catch(res => {
      console.log("catch");

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    initComputed(this);
    this.getLoginCode();

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