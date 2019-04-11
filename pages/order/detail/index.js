import wechatPay from '../../../common/pay';
import { HOTLINE } from '../../../common/const';
//获取应用实例
const app = getApp();

Page({
  data: {
    orderId: '',
    orderType: '',
    orderInfo: null,
    statusProcess: [2003, 5010, 5030, 6000],
    iPhoneX: app.globalData.iPhoneX
  },
  onLoad: function (query) {
    //同步数据到当前示例  
    this.setData({
      orderId: query.id,
      orderType: query.type
    });
    //请求订单详情
    this.getOrderDetail()
  },
  getOrderDetail: function() {
    let self = this
    //请求订单详情
    let params = {
      orderId: this.data.orderId,
      type: this.data.orderType
    };
    app.server.getOrderDetail(params).then(res => {
      if(!res.status) {
        self.setData({
          orderInfo: res.data || null
        })
      } else {
        self.setData({
          orderInfo: null
        })
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          });
        }, 1000)
      }
    })
  },
  handleOpenExpress: function(evt) {
    wx.navigateTo({
      url: '/pages/order/express/index?id=' + evt.currentTarget.dataset.id
    })
  },
  handleOpenBoxList: function(evt) {
    wx.navigateTo({
      url: '/pages/order/boxList/index?id=' + evt.currentTarget.dataset.id
    })
  },
  handlePayOrder: function(evt) {
    let self = this
    //唤起微信支付
    wechatPay(evt.currentTarget.dataset.orderinfo, () => {
      //刷新当前页面
      self.getOrderDetail()
    });
  },
  handleFeedback: function() {
    wx.makePhoneCall({
      phoneNumber: HOTLINE
    });
  },
  handleCancelOrder: function(evt) {
    let self = this;
    wx.showModal({
      content: '是否取消订单？',
      confirmColor: '#70aef9',
      success: function(res) {
        if (res.confirm) {
          let params = {
            orderId: evt.currentTarget.dataset.id
          }
          app.server.postCancelOrder(params).then(res => {
            if(!res.status) {
              wx.showToast({
                title: '订单取消成功',
                icon: 'success'
              })
              //刷新数据
              self.getOrderDetail()
            } else {
              wx.showToast({
                title: res.msg || '订单取消失败',
                icon: 'none'
              })
            }
          });
        }
      },
      fail: function(err) {
        console.log(err); 
      }
    })
  },
  handleRundOrder: function(evt) {
    let self = this;
    wx.showModal({
      content: '是否退款？',
      confirmColor: '#70aef9',
      success: function() {
        let params = {
          orderId: evt.currentTarget.dataset.id
        }
        app.server.postRundOrder(params).then(res => {
          if(!res.status) {
            wx.showToast({
              title: '订单退款成功，退款将会在1-7个工作日内返回到原账户',
              icon: 'none',
              duration: 3000
            })
            //刷新数据
            self.getOrderDetail()
          } else {
            wx.showToast({
              title: res.msg || '订单退款失败',
              icon: 'none'
            })
          }
        });
      },
      fail: function(err) {
        console.log(err); 
      }
    })
  }
})