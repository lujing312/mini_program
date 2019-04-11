//获取应用实例
const app = getApp();

Page({
  data: {
    msgList: [],
    openIsRead: 1
  },
  onLoad: function () {
    this.getList();
  },
  onShow: function() {
    //从消息详情返回时，如果之前从消息列表打开的是未读消息，刷新列表
    if(this.data.openIsRead === 0) {
      this.getList();
    }
  },
  getList: function() {
    let self = this;
    app.server.getMsgList({}).then(res => {
      if(!res.status) {
        self.setData({
          msgList: res.data
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  handleOpenDetail: function(evt) {
    this.setData({
      openIsRead: evt.currentTarget.dataset.read
    });
    //跳转
    wx.navigateTo({
      url: '/pages/message/detail/index?id=' + evt.currentTarget.dataset.id
    });
  }
});