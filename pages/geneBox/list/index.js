import { getQueryStr } from '../../../common/utils';
//获取应用实例
const app = getApp();

Page({
  data: {
    geneboxList: []
  },
  onShow: function() {
    let self = this;
    app.server.getGeneboxList({}).then(res => {
      if (!res.status && res.data) {
        //增加进度条
        let list = res.data.map(item => {
          return {
            ...item,
            testProcess: new Array(item.endStatusCode)
          }
        })
        self.setData({
          geneboxList: list
        })
      } else {
        self.setData({
          geneboxList: []
        })
      }
    })
  },
  handleTapCard: function(evt) {
    let curItem = this.data.geneboxList[evt.currentTarget.dataset.index];
    //如果状态出了报告，跳转详情，否则跳转进度页面
    if(curItem.hasReportStatus === 1) {
      wx.navigateTo({
        url: '/pages/geneBox/detail/index?' + getQueryStr(curItem)
      });
    } else {
      wx.navigateTo({
        url: '/pages/geneBox/process/index?' + getQueryStr(curItem)
      });
    }
  }
})