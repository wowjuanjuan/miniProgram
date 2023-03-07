import {
  fetchHome
} from '../../../services/home/home';
import {
  fetchGoodsList
} from '../../../services/good/fetchGoods';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    imgSrcs: [],
    tabList: [],
    goodsList: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: 500,
    interval: 5000,
    navigation: {
      type: 'dots'
    },
    fresh: false,
  },

  goodListPagination: {
    index: 0,
    num: 10,
  },

  privateData: {
    tabIndex: 0,
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.init();
  },

  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      this.loadGoodsList(this.data.fresh);
    }
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.loadHomePage();
  },

  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    //当fetchHome调用接口是哥promise时候才用.then
    // fetchHome().then(({
    //   // swiper,
    //   tabList
    // }) => {
    //   this.setData({
    //     tabList,
    //     // imgSrcs: swiper,
    //     pageLoading: false,
    //   });
    //   this.loadGoodsList(true);
    // });
    this.setData({
      tabList: fetchHome().tabList,
      // imgSrcs: swiper,
      pageLoading: false,
    });
    this.loadGoodsList(this.data.fresh);
  },

  tabChangeHandle(e) {
    console.log("我是e", e);
    this.privateData.tabIndex = e.detail.value;
    this.loadGoodsList(this.data.fresh);
  },

  onReTry() {
    this.loadGoodsList(this.data.fresh);
  },

  async loadGoodsList(fresh) {
    console.log("i am fresh", fresh);
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
      this.data.fresh = false;
    }

    this.setData({
      goodsListLoadStatus: 1
    });

    const pageSize = this.goodListPagination.num;
    // console.log("pageindex1", pageIndex);
    let pageIndex =
      this.privateData.tabIndex * pageSize + this.goodListPagination.index + 1;
    console.log("pageindex2", pageIndex);

    if (fresh) {
      pageIndex = 1;
    }
    console.log("pageindex3", pageIndex);

    try {
      console.log("让我康康nextList");
      const nextList = await fetchGoodsList(pageIndex, pageSize);
      console.log("r", this.data.fresh);
      console.log(typeof (nextList), {}, nextList.length);
      if (nextList.length == undefined) {
        console.log(this.data.fresh);
        this.data.fresh = true;
        this.setData({
          goodsListLoadStatus: 0
        })
      }
      console.log("让我康康nextList", nextList, nextList.length);
      this.setData({
        goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
        goodsListLoadStatus: 0,
      });

      this.goodListPagination.index = pageIndex;
      this.goodListPagination.num = pageSize;
    } catch (err) {
      this.setData({
        goodsListLoadStatus: 3
      });
    }
  },

  goodListClickHandle(e) {
    const {
      index
    } = e.detail;
    const {
      spuId
    } = this.data.goodsList[index];
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
    // console.log("id", e.detail, spuId);
  },

  goodListAddCartHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加入购物车',
    });
  },

  // navToSearchPage() {
  //   wx.navigateTo({
  //     url: '/pages/goods/search/index'
  //   });
  // },

  navToActivityDetail({
    detail
  }) {
    const {
      index: promotionID = 0
    } = detail || {};
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  },
});