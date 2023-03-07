import {
  config
} from '../../config/index';
var myData = require("../../utils/myData")

/** 获取商品列表 */
function mockFetchGood(ID = 0) {
  const {
    delay
  } = require('../_utils/delay');
  const {
    genGood
  } = require('../../model/good');
  return delay().then(() => genGood(ID));
}

/** 获取商品列表 */
export function fetchGood(ID = 0) {
  // console.log(ID);
  // if (config.useMock) {
  //   return mockFetchGood(ID);
  // }
  // return new Promise((resolve) => {
  //   resolve('real api');
  // });
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://api.starfission.com/Mall/GetNFTInfo',
      method: 'POST',
      data: {
        goodsID: ID
      },
      header: {
        debug: '1', // 默认值
        Accept: 'application/json',
        Authorization: wx.getStorageSync(myData.default.VITE_APP_TOKEN_NAME)
        // 'content-type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log("让我康康", res);
        let tempInfo = res.data.data;
        // let reg = new RegExp(/^https:.*jpg$/)
        // console.log(tempInfo.goodsBodyMobile);
        // console.log("???", tempInfo.goodsBodyMobile, tempInfo.goodsBodyMobile.match(/https.*\.(mp4|png|jpg)" title/));
        // let descImg = tempInfo.goodsBodyMobile.match(/https.*\.(mp4|png|jpg)" title/)[0].slice(0, tempInfo.goodsBodyMobile.match(/https.*\.(mp4|png|jpg)" title/)[0].length - 7)
        // console.log(descImg);

        resolve({
          tempInfo,
          spuId: tempInfo.goodsID,
          title: tempInfo.goodsName,
          primaryImage: tempInfo.goodsImage,
          images: [
            tempInfo.goodsImage
            // 'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a.png',
            // 'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a2.png',
            // 'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1b.png',
          ],
          minSalePrice: tempInfo.goodsPrice * 100,
          // isSoldOut: false,
          descHtml: tempInfo.goodsBodyMobile,
          desc: [
            // descImg
            // 'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1c.png',
            // 'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1d.png',
          ],
          spuStockQuantity: tempInfo.goodsStock,
          soldNum: tempInfo.buyNum,
          isPutOnSale: 1,
          isAvailable: 1,
          available: 1,


          //
          //skuList为空也能运行，其中skuList内的对象存在的话代表有库存可以购买
          skuList: [{
            skuId: '135676623',
            skuImage: null,
            specInfo: [{
                specId: '127904180600844800',
                specTitle: null,
                specValueId: '127904181506815488',
                specValue: '奶黄色',
              },
              {
                specId: '127904861604820480',
                specTitle: null,
                specValueId: '127904862175246592',
                specValue: '单盘',
              },
            ],
            priceInfo: [{
                priceType: 1,
                price: '129900',
                priceTypeName: '销售价格',
              },
              {
                priceType: 2,
                price: '218000',
                priceTypeName: '划线价格',
              },
            ],
            stockInfo: {
              stockQuantity: tempInfo.goodsStock,
              safeStockQuantity: 0,
              soldQuantity: 0,
            },
            weight: null,
            volume: null,
            profitPrice: null,
          }],
          //应该是选择商品种类
          specList: [{
              specId: '127904180600844800',
              title: '颜色',
              specValueList: [{
                specValueId: '127904181506815488',
                specId: '127904180600844800',
                saasId: '88888888',
                specValue: '默认',
                image: '',
              }, ],
            },
            {
              specId: '127904861604820480',
              title: '类型',
              specValueList: [{
                  specValueId: '127904862175246592',
                  specId: '127904861604820480',
                  saasId: '88888888',
                  specValue: '默认',
                  image: '',
                },
                // {
                //   specValueId: '127904862007474176',
                //   specId: '127904861604820480',
                //   saasId: '88888888',
                //   specValue: '单碗',
                //   image: '',
                // },
                // {
                //   specValueId: '127904861755815680',
                //   specId: '127904861604820480',
                //   saasId: '88888888',
                //   specValue: '盘+碗',
                //   image: '',
                // },
              ],
            },
          ],


        })
      }
    });

  })
  return promise.then(res => {
    console.log(res);
    return res
    // return {
    //   saasId: '88888888',
    //   storeId: '1000',
    //   spuId: '135681622',
    //   title: '简约餐盘耐热家用盘子菜盘套装多颜色简约餐盘耐热家用盘子',
    //   primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a.png',
    //   images: [
    //     'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a.png',
    //     // 'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a2.png',
    //     // 'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1b.png',
    //   ],
    //   minSalePrice: '129900',

    //   desc: [
    //     'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1c.png',
    //     'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1d.png',
    //   ],
    //   // groupIdList: [
    //   //   '14023',
    //   //   '127886732665303040',
    //   //   '127886733101511680',
    //   //   '127886733923595520',
    //   //   '14025',
    //   //   '127886726071855616',
    //   //   '14026',
    //   //   '127886728957538048',
    //   //   '127886727481142784',
    //   //   '127886729779621888',
    //   //   '127886730165497088',
    //   //   '127886730652037376',
    //   //   '127886731440566784',
    //   //   '127886729360190464',
    //   //   '15029',
    //   //   '15030',
    //   // ],
    //   // spuTagList: [{
    //   //   id: null,
    //   //   title: '掌柜热卖',
    //   //   image: null,
    //   // }, ],
    //   skuList: [{
    //       skuId: '135676623',
    //       skuImage: null,
    //       specInfo: [{
    //           specId: '127904180600844800',
    //           specTitle: null,
    //           specValueId: '127904181506815488',
    //           specValue: '奶黄色',
    //         },
    //         {
    //           specId: '127904861604820480',
    //           specTitle: null,
    //           specValueId: '127904862175246592',
    //           specValue: '单盘',
    //         },
    //       ],
    //       priceInfo: [{
    //           priceType: 1,
    //           price: '129900',
    //           priceTypeName: '销售价格',
    //         },
    //         {
    //           priceType: 2,
    //           price: '218000',
    //           priceTypeName: '划线价格',
    //         },
    //       ],
    //       stockInfo: {
    //         stockQuantity: 119,
    //         safeStockQuantity: 0,
    //         soldQuantity: 0,
    //       },
    //       weight: null,
    //       volume: null,
    //       profitPrice: null,
    //     },
    //     {
    //       skuId: '135676624',
    //       skuImage: null,
    //       specInfo: [{
    //           specId: '127904180600844800',
    //           specTitle: null,
    //           specValueId: '127904181506815488',
    //           specValue: '奶黄色',
    //         },
    //         {
    //           specId: '127904861604820480',
    //           specTitle: null,
    //           specValueId: '127904861755815680',
    //           specValue: '盘+碗',
    //         },
    //       ],
    //       priceInfo: [{
    //           priceType: 1,
    //           price: '139900',
    //           priceTypeName: '销售价格',
    //         },
    //         {
    //           priceType: 2,
    //           price: '218000',
    //           priceTypeName: '划线价格',
    //         },
    //       ],
    //       stockInfo: {
    //         stockQuantity: 116,
    //         safeStockQuantity: 0,
    //         soldQuantity: 0,
    //       },
    //       weight: null,
    //       volume: null,
    //       profitPrice: null,
    //     },
    //     {
    //       skuId: '135681623',
    //       skuImage: null,
    //       specInfo: [{
    //           specId: '127904180600844800',
    //           specTitle: null,
    //           specValueId: '127904181506815488',
    //           specValue: '奶黄色',
    //         },
    //         {
    //           specId: '127904861604820480',
    //           specTitle: null,
    //           specValueId: '127904862007474176',
    //           specValue: '单盘',
    //         },
    //       ],
    //       priceInfo: [{
    //           priceType: 1,
    //           price: '139900',
    //           priceTypeName: '销售价格',
    //         },
    //         {
    //           priceType: 2,
    //           price: '218000',
    //           priceTypeName: '划线价格',
    //         },
    //       ],
    //       stockInfo: {
    //         stockQuantity: 122,
    //         safeStockQuantity: 0,
    //         soldQuantity: 0,
    //       },
    //       weight: null,
    //       volume: null,
    //       profitPrice: null,
    //     },
    //   ],
    //   isAvailable: 1,
    //   spuStockQuantity: 357,
    //   soldNum: 23102,
    //   isPutOnSale: 1,
    //   specList: [{
    //       specId: '127904180600844800',
    //       title: '颜色',
    //       specValueList: [{
    //         specValueId: '127904181506815488',
    //         specId: '127904180600844800',
    //         saasId: '88888888',
    //         specValue: '奶黄色',
    //         image: '',
    //       }, ],
    //     },
    //     {
    //       specId: '127904861604820480',
    //       title: '类型',
    //       specValueList: [{
    //           specValueId: '127904862175246592',
    //           specId: '127904861604820480',
    //           saasId: '88888888',
    //           specValue: '单盘',
    //           image: '',
    //         },
    //         {
    //           specValueId: '127904862007474176',
    //           specId: '127904861604820480',
    //           saasId: '88888888',
    //           specValue: '单碗',
    //           image: '',
    //         },
    //         {
    //           specValueId: '127904861755815680',
    //           specId: '127904861604820480',
    //           saasId: '88888888',
    //           specValue: '盘+碗',
    //           image: '',
    //         },
    //       ],
    //     },
    //   ],
    //   promotionList: null,
    //   minProfitPrice: null,
    //   etitle: '',
    // }
  })
}