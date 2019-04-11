import login from './login';

const app = getApp();

//微信支付
const wechatPay = (orderInfo, callback) => {
  if(!orderInfo.orderNum) {
    wx.showToast({
      title: '订单不存在',
      icon: 'none',
      duration: 1000
    });
    setTimeout(function() {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
    return;
  }
  //如果实付金额为0，修改订单状态
  if(orderInfo.remainPrice === 0) {
    app.server.autoPay({
      orderNum: orderInfo.orderNum
    }).then(res => {
      if(!res.status) {
        wx.showToast({
          title: '支付成功',
          icon: 'success'
        })
        //执行回调
        typeof callback === 'function' && callback()
      } else {
        wx.showToast({
          title: res.msg || '支付失败',
          icon: 'none'
        })
        setTimeout(function() {
          // wx.navigateBack({
          //   delta: 1
          // })
          //执行回调
          typeof callback === 'function' && callback()
        }, 1000)
      }
    })
    return;
  }
  if(!app.globalData.openId) {
    //唤起微信登录
    login(app);
    return;
  }
  let params = {
    orderNum: orderInfo.orderNum,
    openId: app.globalData.openId
  };
  app.server.getPaySign(params).then(res => {
    //调起微信支付
    wx.requestPayment({
      nonceStr: res.data.nonceStr,
      package: res.data.package,
      paySign: res.data.sign,
      signType: 'MD5',
      timeStamp: res.data.timeStamp,
      success: function(){
        let params = {
          orderNum: orderInfo.orderNum,
          tradeType: 'MINI'
        };
        app.server.getPayOrder(params).then(res => {
          if(!res.status) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 1000,
              success: function() {
                // 执行回调
                typeof callback === 'function' && callback()
              }
            });
          } else {
            wx.showToast({
              title: res.msg || '支付失败',
              icon: 'none'
            })
            setTimeout(function() {
              //执行回调
              typeof callback === 'function' && callback()
            }, 1000)
          }
        })
      },
      fail: function(res){
        wx.showToast({
          title: '已取消支付',
          icon: 'none'
        })
        setTimeout(function() {
          //执行回调
          typeof callback === 'function' && callback()
        }, 1000)
      }
    });
  });
};

export default wechatPay;