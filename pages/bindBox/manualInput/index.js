import { splitNumber } from '../../../common/utils';
//获取应用实例
const app = getApp();

Page({
  data: {
    boxNumber: '',
    errmsg: '',
    prevInputVal: '',
    iPhoneX: app.globalData.iPhoneX
  },
  onLoad: function (query) {
    if(query.num) {
      this.setData({
        boxNumber: splitNumber(query.num)
      });
    }
  },
  handleInputChange: function(evt) {
    if(this.data.prevInputVal.length < evt.detail.value.length) {
      this.setData({
        prevInputVal: evt.detail.value
      });
      return splitNumber(evt.detail.value);
    } else {
      this.setData({
        prevInputVal: evt.detail.value
      });
      return evt.detail.value;
    }
  },
  handleNextStep: function(evt) {
    let boxNumber = evt.detail.value.boxNumber.replace(/\s/g, '');
    let self = this;
    if(!boxNumber) {
      this.setData({
        errmsg: '请输入正确编号'
      });
      return;
    }
    let params = {
      boxNumber: boxNumber
    };
    //校验编号
    app.server.checkBoxNum(params).then(res => {
      if(!res.status) {
        wx.navigateTo({
          url: '/pages/bindBox/newStepOne/index?boxNumber=' + boxNumber
        });
      } else {
        self.setData({
          errmsg: res.msg
        });
      }
    })
  }
});