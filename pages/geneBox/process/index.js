import { getQueryStr } from '../../../common/utils';
//获取应用实例
const app = getApp();

Page({
  data: {
    boxNumber: '',
    nickName: '',
    processList: []
  },
  onLoad: function (query) {
    this.setData({
      boxNumber: query.boxNumber,
      isShare: query.isShare
    });
  },
  onShow: function() {
    this.getBoxItemStep()
  },
  getBoxItemStep: function() {
    let self = this
    app.server.getBoxItemStep({
      boxNumber: self.data.boxNumber
    }).then(res => {
      if(!res.status) {
        self.setData({
          nickName: res.data.nickName,
          processList: res.data.stepList || []
        });
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  handleGotoDetail: function() {
    let params = {
      boxNumber: this.data.boxNumber,
      isShare: this.data.isShare
    }
    wx.navigateTo({
      url: '/pages/geneBox/detail/index?' + getQueryStr(params)
    });
  }
});