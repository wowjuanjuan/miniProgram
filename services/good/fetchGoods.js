import {
  config
} from '../../config/index';

/** 获取商品列表 */
function mockFetchGoodsList(pageIndex = 1, pageSize = 20) {
  const {
    delay
  } = require('../_utils/delay');
  const {
    getGoodsList
  } = require('../../model/goods');
  return delay().then(() =>
    getGoodsList(pageIndex, pageSize).map((item) => {
      return {
        spuId: item.spuId,
        thumb: item.primaryImage,
        title: item.title,
        price: item.minSalePrice,
        originPrice: item.maxLinePrice,
        tags: item.spuTagList.map((tag) => tag.title),
      };
    }),
  );
}

/** 获取商品列表 */
export function fetchGoodsList(pageIndex = 1, pageSize = 10) {
  // if (config.useMock) {
  //   return mockFetchGoodsList(pageIndex, pageSize);
  // }
  var goodList = {};
  // console.log("我是pageIndex", pageIndex);

  // resolve('real api');
  console.log("我是nft列表");
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://api.starfission.com/Mall/GetNFTList',
      method: 'POST',
      data: {
        page: pageIndex
      },
      header: {
        debug: '1', // 默认值
        Accept: 'application/json',
        // 'content-type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log("我是nft列表", res);
        // console.log(app);
        let tempGoodList = res.data.data.list;
        console.log("让我康康", tempGoodList, typeof tempGoodList);
        if (tempGoodList.length > 0) {
          goodList = tempGoodList.map((item) => {
            return {
              spuId: item.goodsID,
              thumb: item.goodsThumbImage,
              title: item.goodsName,
              price: item.goodsPrice,
              // originPrice: "temp",
              tags: ["test1"],
            };
          })
        }
        resolve(goodList)
      }
    });

  })
  return promise.then(res => {
    console.log(res);
    return res
  })

}