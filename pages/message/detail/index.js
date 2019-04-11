//获取应用实例
const app = getApp();

Page({
  data: {
    msgInfo: null
  },
  onLoad: function (query) {
    let self = this;
    let params = {
      id: query.id
    };
    app.server.getMsgDetail(params).then(res => {
      if(!res.status) {
        self.setData({
          msgInfo: res.data || null
        });
      } else {
        self.setData({
          msgInfo: null
        });
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  }
});