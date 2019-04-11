//获取应用实例
const app = getApp();

Page({
  data: {
    url: ''
  },
  onLoad: function (option) {
    if(option.url) {
      this.setData({
        url: option.url + '?_=' + Date.now()
      })
    } else {
      wx.showToast({
        title: '参数错误',
        icon: 'none'
      })
    }
  }
})