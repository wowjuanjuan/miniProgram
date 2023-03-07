import updateManager from './common/updateManager';
import {
  login,
  checksession,
  isLogin
} from './utils/login';

App({
  onLaunch: function () {
    // isLogin();
    // console.log(isLogin());
    if (!isLogin()) {
      login();
    }
  },
  onShow: function () {
    console.log("onShow");
    updateManager();
    // checksession();
    console.log('new', wx.getStorageSync('userData'));
  },
});