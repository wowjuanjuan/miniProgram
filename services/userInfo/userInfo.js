//获取用户信息
const myData = require("../../utils/myData");
export const GET_USER_INFO = () => {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://api.starfission.com/Account/GetUserInfo',
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
    if (res.status == 1) {
      let data = res.data;
      console.log(data);
      wx.setStorageSync('userData', data)
    }
    return res;
  })
}