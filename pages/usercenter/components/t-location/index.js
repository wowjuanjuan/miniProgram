import {
  getPermission
} from '../../../../utils/getPermission';
import {
  phoneRegCheck
} from '../../../../utils/util';
import Toast from 'tdesign-miniprogram/toast/index';
import {
  addressParse
} from '../../../../utils/addressParse';
import {
  resolveAddress,
  rejectAddress
} from '../../address/edit/util';

Component({
  externalClasses: ['t-class'],
  properties: {
    title: {
      type: String,
    },
    navigator: {
      type: Boolean,
    },
    isCustomStyle: {
      type: Boolean,
      value: false,
    },
    isDisabledBtn: {
      type: Boolean,
      value: false,
    },
    isOrderSure: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    getWxLocation() {
      if (this.properties.isDisabledBtn) return;
      getPermission({
        code: 'scope.address',
        name: '通讯地址'
      }).then(() => {
        console.log("wx.chooseAddress之前");
        wx.chooseAddress({
          success: async (options) => {
            console.log(options);
            const {
              provinceName,
              cityName,
              countyName,
              detailInfo,
              userName,
              telNumber,
            } = options;
            // var countryName = "中国";

            if (!phoneRegCheck(telNumber)) {
              Toast({
                context: this,
                selector: '#t-toast',
                message: '请填写正确的手机号',
              });
              return;
            }

            const target = {
              name: userName,
              phone: telNumber,
              countryName: '中国',
              countryCode: 'chn',
              detailAddress: detailInfo,
              provinceName: provinceName,
              cityName: cityName,
              districtName: countyName,
              isDefault: false,
              isOrderSure: this.properties.isOrderSure,
            };
            console.log("111");
            console.log("???", provinceName, cityName, countyName);

            addressParse(provinceName, cityName, countyName);

            try {
              console.log("222");
              const {
                provinceCode,
                cityCode,
                districtCode
              } =
              await addressParse(provinceName, cityName, countyName);
              console.log("333");

              const params = Object.assign(target, {
                provinceCode,
                cityCode,
                districtCode,
              });
              console.log(params);
              // console.log(this.properties);
              // console.log("???");
              if (this.properties.isOrderSure) {
                console.log(1);
                this.onHandleSubmit(params);
              } else if (this.properties.navigator) {
                console.log(2);
                try {
                  console.log("开始导入");
                  resolveAddress(params);
                  // wx.navigateTo({
                  //   // url: '/address-detail',
                  //   url: '/pages//usercenter/address/list'
                  // })
                  // console.log("结束跳转");
                  // Navigator.gotoPage('/address-detail', params);
                } catch {
                  console.log("导入失败");
                }
                // console.log(Navigator);
                // Navigator.gotoPage('/address-detail', params);
              } else {
                console.log(3);
                this.triggerEvent('change', params);
                console.log(4);
              }
              console.log("444");
            } catch (error) {
              wx.showToast({
                title: '地址解析出错，请稍后再试',
                icon: 'none'
              });
            }
          },
          fail(err) {
            console.warn('未选择微信收货地址', err);
          },
        });
      });
    },

    async queryAddress(addressId) {
      try {
        const {
          data
        } = await apis.userInfo.queryAddress({
          addressId
        });
        return data.userAddressVO;
      } catch (err) {
        console.error('查询地址错误', err);
        throw err;
      }
    },

    findPage(pageRouteUrl) {
      const currentRoutes = getCurrentPages().map((v) => v.route);
      return currentRoutes.indexOf(pageRouteUrl);
    },

    async onHandleSubmit(params) {
      try {
        console.log("yes1");
        const orderPageDeltaNum = this.findPage(
          'pages/order/order-confirm/index',
        );
        console.log("yes2");
        if (orderPageDeltaNum > -1) {
          console.log("yes3");
          wx.navigateBack({
            delta: 1
          });
          resolveAddress(params);
          return;
        }
      } catch (err) {
        rejectAddress(params);
        console.error(err);
      }
    },
  },
});