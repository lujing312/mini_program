import { getQueryStr } from '../../common/utils';
//获取应用实例
const app = getApp();

Page({
  data: {
    shareList: []
  },
  onShow: function () {
    this.getShareList()
  },
  getShareList: function () {
    let self = this
    app.server.getShareList({}).then(res => {
      if (!res.status) {
        self.setData({
          shareList: res.data || []
        })
      } else {
        self.setData({
          shareList: []
        })
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  handleOpenQrcode: function (evt) {
    let params = {
      boxNumber: evt.currentTarget.dataset.id
    }
    wx.navigateTo({
      url: '/pages/geneBox/share/index?' + getQueryStr(params)
    })
  },
  handleOpenManage: function (evt) {
    let params = {
      boxNumber: evt.currentTarget.dataset.id
    }
    wx.navigateTo({
      url: '/pages/geneBox/manage/index?' + getQueryStr(params)
    })
  },
  handleRemoveBox: function(evt) {
    let self = this
    wx.showModal({
      content: '确定移除该唾液盒吗?',
      confirmColor: '#70aef9',
      success: function(res) {
        if (res.confirm) {
          app.server.untieShareBox({
            boxNumber: evt.currentTarget.dataset.id
          }).then(res => {
            if(!res.status) {
              wx.showToast({
                title: '移除成功',
                icon: 'success'
              })
              //刷新列表
              self.getShareList()
            } else {
              wx.showToast({
                title: res.msg || '移除失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  }
});