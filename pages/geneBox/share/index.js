var QRCode = require('../../../common/qrcode')
import { getQueryStr } from '../../../common/utils';
//获取应用实例
const app = getApp();

Page({
  data: {
    boxNumber: '',
    hasQrcode: false
  },
  onLoad: function (query) {
    this.setData({
      boxNumber: query.boxNumber
    })
    //初始化二维码工具
    this.initQRCodeTool()
    //请求二维码链接
    this.handleRefreshQrcode()
  },
  initQRCodeTool: function() {
    this.qrcode = new QRCode('canvas', {
      text: '',
      width: 160,
      height: 160,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    })
  },
  handleRefreshQrcode: function() {
    let self = this
    app.server.getShareQrcode({
      boxNumber: this.data.boxNumber
    }).then(res => {
      if(!res.status) {
        //生成二维码
        self.qrcode.makeCode(res.data)
        self.setData({
          hasQrcode: true
        })
      } else {
        self.setData({
          hasQrcode: false
        })
        wx.showToast({
          title: '报告未生成无法分享',
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