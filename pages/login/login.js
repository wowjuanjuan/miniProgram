// pages/login/login.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getPhoneNumber(e) {
    console.log(e);
    if (
      false
      //如果这里获取到authToken就跳转到首页，再获取一下userData数据存起来
    ) {
        
    }
  },
  goToTelLogin() {
    wx.navigateTo({
      url: '/pages/login/telLogin/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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