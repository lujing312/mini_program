import { splitNumber, getQueryStr } from '../../../common/utils';
import { RELATIONSHIP } from '../../../common/const';
//获取应用实例
const app = getApp();

Page({
  data: {
    showRelationshipForm: false,
    boxNumber: '',
    type: '1',
    nickName: '',
    relationshipIndex: -1,
    relationshipRange: RELATIONSHIP,
    iPhoneX: app.globalData.iPhoneX
  },
  onLoad: function (query) {
    if(query.boxNumber) {
      this.setData({
        boxNumber: splitNumber(query.boxNumber)
      });
    }
  },
  handleRelateChange: function(evt) {
    this.setData({
      showRelationshipForm: evt.detail.value === '2'
    });
    //如果是本人，清空非本人表单数据
    if(evt.detail.value === '1') {
      this.setData({
        relationshipIndex: -1
      })
    }
  },
  handleRelationShipChange: function(evt) {
    this.setData({
      relationshipIndex: evt.detail.value
    });
  },
  handleFormSubmit: function(evt) {
    let value = evt.detail.value;
    let params = {
      boxNumber: this.data.boxNumber.replace(/\s/g, '')
    };
    if(value.nickName === '') {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      });
      return;
    }
    params.nickName = value.nickName;
    if(value.type === '2' && value.relationship === '') {
      wx.showToast({
        title: '请选择与你的关系',
        icon: 'none'
      })
      return;
    }
    //如果关系为本人，relationship 值为 0
    params.relationship = value.type === '1' ? 0 : RELATIONSHIP[value.relationship].value
    //跳转
    wx.navigateTo({
      url: '/pages/bindBox/stepTwo/index?' + getQueryStr(params)
    });
  }
});