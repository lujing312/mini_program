//获取应用实例
const app = getApp();

Page({
  data: {
    list: []
  },
  onLoad: function (query) {
    let self = this;
    let params = {
      orderId: query.id
    };
    app.server.getExpress(params).then(res => {
      if(!res.status) {
        self.setData({
          list: res.data || []
        });
      } else {
        self.setData({
          list: []
        });
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
  }
});