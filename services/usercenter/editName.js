var myData = require("../../utils/myData")
export const EDIT_NICKNAME = (nickname) => {
  console.log(wx.getStorageSync('userData'));

  let promise = new Promise(function (resolve, reject) {
    return wx.request({
      url: 'https://api.starfission.com/Account/EditNickname',
      method: 'POST',
      data: {
        nickname
      },
      header: {
        debug: '1', // 默认值
        Accept: 'application/json',
        Authorization: wx.getStorageSync(myData.default.VITE_APP_TOKEN_NAME)
        // 'content-type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        resolve(res)
      },
    });

  })
  return promise.then(res => {
    console.log(res.data);
    return res.data
  })
};