import wechatPay from '../../../common/pay';
import { getQueryStr } from '../../../common/utils';
//获取应用实例
const app = getApp();

Page({
  data: {
    orderList: []
  },
  onShow: function () {
    this.getOrderList()
  },
  getOrderList: function() {
    let self = this;
    //请求当前用户订单列表
    app.server.getOrderList({}).then(res => {
      if (!res.status) {
        self.setData({
          orderList: res.data || []
        })
      } else {
        self.setData({
          orderList: []
        })
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  handleOpenDetail: function(evt) {
    let params = {
      id: evt.currentTarget.dataset.id,
      type: evt.currentTarget.dataset.type
    }
    wx.navigateTo({
      url: '/pages/order/detail/index?' + getQueryStr(params)
    });
  },
  handleOpenExpress: function(evt) {
    wx.navigateTo({
      url: '/pages/order/express/index?id=' + evt.currentTarget.dataset.id
    })
  },
  handlePay: function(evt) {
    let self = this
    //唤起微信支付
    wechatPay(evt.currentTarget.dataset.orderinfo, () => {
      //刷新当前页面
      self.getOrderList()
    });
  }
})