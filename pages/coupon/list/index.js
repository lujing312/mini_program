import { LINK } from '../../../common/const'
//获取应用实例
const app = getApp();

Page({
  data: {
    couponList: []
  },
  onLoad: function () {
    let self = this;
    //请求代金券列表
    app.server.getCouponList({}).then(res => {
      if (!res.status) {
        self.setData({
          couponList: res.data || []
        });
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
    })
  },
  handleUse: function(evt) {
    if(evt.currentTarget.dataset.status !== 1) {
      return;
    }
    wx.navigateTo({
      url: '/pages/order/fill/index'
    });
  },
  handleOpenRules: function() {
    wx.navigateTo({
      url: '/pages/webview/index?url=' + LINK.COUPON_RULES
    });
  }
})