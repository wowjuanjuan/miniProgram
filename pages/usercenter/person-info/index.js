import {
  fetchPerson
} from '../../../services/usercenter/fetchPerson';
import {
  phoneEncryption
} from '../../../utils/util';
import Toast from 'tdesign-miniprogram/toast/index';
var myData = require("../../../utils/myData")

Page({
  data: {
    personInfo: {
      avatarUrl: '',
      nickName: '',
      gender: 0,
      phoneNumber: '',
    },
    showUnbindConfirm: false,
    pickerOptions: [{
        name: '男',
        code: '1',
      },
      {
        name: '女',
        code: '2',
      },
    ],
    typeVisible: false,
    genderMap: ['', '男', '女'],
  },
  onLoad() {
    this.init();
  },
  init() {
    this.fetchData();
  },
  //退出登录
  openUnbindConfirm() {
    wx.removeStorageSync(myData.default.VITE_APP_TOKEN_NAME);
    wx.removeStorageSync(myData.default.WX_TOKEN_NAME);
    wx.removeStorageSync(myData.default.WECHAT_DATA_NAME);
    wx.removeStorageSync('userData')
    wx.navigateTo({
      url: '/pages/login/login',
    })
    console.log("beybey");
  },

  fetchData() {
    let personInfo = fetchPerson();
    this.setData({
      personInfo,
      'personInfo.phoneNumber': phoneEncryption(personInfo.mobile)
    })
    // fetchPerson().then((personInfo) => {
    //   console.log("???s", personInfo);
    //   this.setData({
    //     personInfo,
    //     'personInfo.phoneNumber': phoneEncryption(personInfo.mobile)
    //   });
    // });
  },
  onClickCell({
    currentTarget
  }) {
    const {
      dataset
    } = currentTarget;
    const {
      nickname
    } = this.data.personInfo;

    switch (dataset.type) {
      case 'gender':
        this.setData({
          typeVisible: true,
        });
        break;
      case 'name':
        wx.navigateTo({
          url: `/pages/usercenter/name-edit/index?name=${nickname}`,
        });
        break;
      case 'avatarUrl':
        //toModifyAvatar是修改头像功能
        // this.toModifyAvatar();
        break;
      default: {
        break;
      }
    }
  },
  onClose() {
    this.setData({
      typeVisible: false,
    });
  },
  onConfirm(e) {
    const {
      value
    } = e.detail;
    this.setData({
        typeVisible: false,
        'personInfo.gender': value,
      },
      () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '设置成功',
          theme: 'success',
        });
      },
    );
  },
  async toModifyAvatar() {
    try {
      const tempFilePath = await new Promise((resolve, reject) => {
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: (res) => {
            const {
              path,
              size
            } = res.tempFiles[0];
            if (size <= 10485760) {
              resolve(path);
            } else {
              reject({
                errMsg: '图片大小超出限制，请重新上传'
              });
            }
          },
          fail: (err) => reject(err),
        });
      });
      console.log("文件路径", tempFilePath);
      const tempUrlArr = tempFilePath.split('/');
      const tempFileName = tempUrlArr[tempUrlArr.length - 1];
      Toast({
        context: this,
        selector: '#t-toast',
        message: `已选择图片-${tempFileName}`,
        theme: 'success',
      });
    } catch (error) {
      if (error.errMsg === 'chooseImage:fail cancel') return;
      Toast({
        context: this,
        selector: '#t-toast',
        message: error.errMsg || error.msg || '修改头像出错了',
        theme: 'fail',
      });
    }
  },
});