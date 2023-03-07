import {
  EDIT_NICKNAME
} from "../../../services/usercenter/editName";
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    nameValue: '',
  },
  onLoad(options) {
    const {
      name
    } = options;
    this.setData({
      nameValue: name,
    });
  },
  onSubmit() {
    let msg = "";
    EDIT_NICKNAME(this.data.nameValue).then(res => {
      console.log(res);
      msg = res.msg;
      Toast({
        context: this,
        selector: '#t-toast',
        message: msg,
      });
    })

    // wx.navigateBack({
    //   backRefresh: true
    // });
  },
  clearContent() {
    this.setData({
      nameValue: '',
    });
  },
});