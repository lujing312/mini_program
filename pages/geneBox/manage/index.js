import { getQueryStr } from '../../../common/utils';
//获取应用实例
const app = getApp();

Page({
  data: {
    boxNumber: '',
    list: []
  },
  onLoad: function (query) {
    this.setData({
      boxNumber: query.boxNumber
    })
    this.getShareBoxList()
  },
  getShareBoxList: function() {
    let self = this
    app.server.getShareBoxList({
      boxNumber: this.data.boxNumber
    }).then(res => {
      if(!res.status) {
        self.setData({
          list: res.data || []
        })
      } else {
        self.setData({
          list: []
        })
      }
    })
  },
  handleUntieShare: function(evt) {
    let self = this
    wx.showModal({
      content: '确定解除该账号的绑定吗?',
      confirmColor: '#70aef9',
      success: function(res) {
        if (res.confirm) {
          app.server.untieShareBox({
            boxNumber: self.data.boxNumber,
            binderId: evt.currentTarget.dataset.id
          }).then(res => {
            if(!res.status) {
              wx.showToast({
                title: '解绑成功',
                icon: 'success'
              })
              //刷新列表
              self.getShareBoxList()
            } else {
              wx.showToast({
                title: res.msg || '解绑失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  }
});