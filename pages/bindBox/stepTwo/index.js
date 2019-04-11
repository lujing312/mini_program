import { splitNumber } from '../../../common/utils';
import { SEX_RANGE } from '../../../common/const';
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
    relationship: 0,
    sexRange: SEX_RANGE,
    iPhoneX: app.globalData.iPhoneX
  },
  onLoad: function (query) {
    this.setData({
      relationship: query.relationship || 0,
      nickName: query.nickName || '',
      boxNumber: splitNumber(query.boxNumber)
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
      boxNumber: this.data.boxNumber.replace(/\s/g, ''),
      nickName: this.data.nickName,
      relationship: this.data.relationship
    }

    if(value.surname === '') {
      wx.showToast({
        title: '请填写姓氏',
        icon: 'none'
      });
      return;
    }
    params.surname = value.surname
    if(value.name === '') {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      });
      return;
    }
    params.name = value.name;
    if(value.sex === '') {
      wx.showToast({
        title: '请选择性别',
        icon: 'none'
      });
      return;
    }
    params.sex = SEX_RANGE[value.sex].value;
    if(value.birthday === '') {
      wx.showToast({
        title: '请选择生日',
        icon: 'none'
      });
      return;
    }
    params.birthday = value.birthday.replace(/\-/g, '/');
    if(!value.born.length) {
      wx.showToast({
        title: '请选择出生地',
        icon: 'none'
      });
      return;
    }
    params.province = value.born[0];
    params.city = value.born[1];
    params.district = value.born[2] || '';
    //请求
    app.server.addBindBox(params).then(res => {
      if(!res.status) {
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        });
        setTimeout(function() {
          wx.navigateBack({
            delta: 3
          })
        }, 1000)
      } else {
        wx.showToast({
          title: res.msg || '提交失败',
          icon: 'none'
        });
      }
    })
  }
});