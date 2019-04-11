import { splitNumber, getQueryStr } from '../../../common/utils';
import { RELATIONSHIP, SEX_RANGE } from '../../../common/const';
//获取应用实例
const app = getApp();

Page({
  data: {
    boxNumber: '',
    nickName: '',
    surname: '',
    name: '',
    sex: '',
    birthday: '',
    born: '',
    relationship: -1,
    relationshipRange: RELATIONSHIP,
    sexRange: SEX_RANGE
  },
  onLoad: function (query) {
    if(query.boxNumber) {
      this.setData({
        boxNumber: splitNumber(query.boxNumber)
      });
    }
  },
  handleRelationShipChange: function(evt) {
    this.setData({
      relationship: evt.detail.value
    });
  },
  handleBirthdayChange: function(evt) {
    this.setData({
      birthday: evt.detail.value
    })
  },
  handleSexChange: function(evt) {
    this.setData({
      sex: evt.detail.value
    })
  },
  handleBornChange: function(evt) {
    this.setData({
      born: evt.detail.value.join('-')
    })
  },
  handleFormSubmit: function(evt) {
    let value = evt.detail.value;
    let params = {
      boxNumber: this.data.boxNumber.replace(/\s/g, '')
    };
    if(!value.nickName) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      });
      return;
    }
    params.nickName = value.nickName;    

    if(!value.relationship) {
      wx.showToast({
        title: '请选择与你的关系',
        icon: 'none'
      });
      return;
    }
    params.relationship = RELATIONSHIP[value.relationship].value

    if(!value.sex) {
      wx.showToast({
        title: '请选择性别',
        icon: 'none'
      });
      return;
    }
    params.sex = SEX_RANGE[value.sex].value;

    //可选参数
    params.surname = value.surname
    params.name = value.name
    params.birthday = value.birthday
    params.born = value.born ? value.born.join('-') : ''

    //跳转到确认页
    wx.navigateTo({
      url: '/pages/bindBox/newStepTwo/index?' + getQueryStr(params)
    });
  }
});