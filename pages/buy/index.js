import login from '../../common/login';
import { getQueryStr } from '../../common/utils'
//获取应用实例
const app = getApp();

Page({
  data: {
    postList: [],
    code: '',
    isLogin: app.globalData.isLogin
  },
  onLoad: function (query) {
    this.setData({
      code: query.code || ''
    })
    this.getBuyInfo()
  },
  onShow: function() {
    this.getBuyInfo()
  },
  getBuyInfo: function() {
    let self = this
    app.server.getBuyInfo({}).then(res => {
      if (!res.status) {
        self.setData({
          postList: res.data.postList
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        self.setData({
          postList: []
        })
      }
    })
  },
  handleOpenProduct: function(evt) {
    this.handleOpenOrderPage(evt.currentTarget.dataset.id)
  },
  handleOpenOrderPage: function(productId) {
    wx.hideLoading()
    let params = {
      id: productId,
      code: this.data.code
    }
    wx.navigateTo({
      url: '/pages/order/fill/index?' + getQueryStr(params)
    });
  },
  handleGetUserInfo: function(evt) {
    if (evt.detail.userInfo) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      let self = this;
      //同步到全局
      app.globalData.isLogin = true
      app.globalData.userInfo = evt.detail.userInfo
      //请求登录接口
      login(app, () => {
        self.handleOpenOrderPage(evt.target.dataset.id)
      })
    } else {
      app.globalData.isLogin = false;
      app.globalData.userInfo = {};
      wx.showToast({
        title: '授权失败，部分功能不能用哦',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: 'Genebox基因宝',
      imageUrl: 'https://static.genebox.cn/explore/share_buy.png'
    }
  }
});