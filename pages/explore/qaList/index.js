//获取应用实例
const app = getApp();

Page({
  data: {
    list: []
  },
  onLoad: function () {
    this.getList()
  },
  getList: function() {
    let self = this
    app.server.getQAList({}).then(res => {
      if (!res.status) {
        self.setData({
          list: res.data || []
        })
      } else {
        self.setData({
          list: []
        })
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  handleOpenWebview: function(evt) {
    wx.navigateTo({
      url: '/pages/webview/index?url=' + evt.currentTarget.dataset.path
    })
  }
});