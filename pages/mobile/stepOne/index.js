import { LINK } from '../../../common/const';
//获取应用实例
const app = getApp();

Page({
  data: {
    phone: '',
    errmsg: ''
  },
  handleInputChange: function(evt) {
    if(evt.detail.value === '') {
      this.setData({
        errmsg: ''
      });
    }
  },
  handleNextStep: function(evt) {
    let phone = evt.detail.value.phone.replace(/\s/g, '');
    let self = this;
    if(!phone) {
      this.setData({
        errmsg: '请输入手机号'
      });
      return;
    }
    let params = {
      phone: phone
    };
    //发送验证码
    app.server.getVerificationCode(params).then(res => {
      if(!res.status) {
        wx.navigateTo({
          url: '/pages/mobile/stepTwo/index?phone=' + phone
        });
      } else {
        self.setData({
          errmsg: res.msg
        });
      }
    })
  },
  handleOpenProtocol() {
    wx.navigateTo({
      url: '/pages/webview/index?url=' + LINK.PRIVACY_URL
    });
  }
});