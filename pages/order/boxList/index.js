//获取应用实例
const app = getApp();

Page({
  data: {
    list: []
  },
  onLoad: function (query) {
    if(!query.id) {
      wx.showToast({
        title: '参数错误',
        icon: 'none'
      })
      return
    } else {
      this.getList(query.id)
    }
  },
  getList: function(id) {
    let self = this;
    let params = {
      orderId: id
    }
    app.server.getOrderBoxList(params).then(res => {
      if (!res.status) {
        self.setData({
          list: res.status === 0 ? res.data : []
        })
      } else {
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