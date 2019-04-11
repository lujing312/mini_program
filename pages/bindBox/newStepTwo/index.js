import { splitNumber } from '../../../common/utils';
import { RELATIONSHIP, SEX_MAP } from '../../../common/const';
const app = getApp();

Page({
  data: {
    boxNumber: '',
    nickName: '',
    surname: '',
    name: '',
    sex: '',
    sexText: '',
    birthday: '',
    born: '',
    bornText: '',
    relationshipInfo: {},
    relationshipRange: RELATIONSHIP,
  },
  onLoad: function (query) {
    let rsItem = RELATIONSHIP.find(item => item.value == query.relationship)
    this.setData({
      boxNumber: splitNumber(query.boxNumber),
      nickName: query.nickName,
      relationship: query.relationship,
      relationshipInfo: rsItem,
      sex: query.sex,
      sexText: SEX_MAP[query.sex] || '',
      surname: query.surname,
      name: query.name,
      birthday: query.birthday,
      born: query.born.split('-'),
      bornText: query.born
    });
  },
  handleFormSubmit: function() {
    let params = {
      boxNumber: this.data.boxNumber.replace(/\s/g, ''),
      nickName: this.data.nickName,
      relationship: this.data.relationship,
      sex: this.data.sex,
      surname: this.data.surname || '',
      name: this.data.name || '',
      birthday: this.data.birthday ? this.data.birthday.replace(/\-/g, '/') : '',
      province: this.data.born[0] || '',
      city: this.data.born[1] || '',
      district: this.data.born[2] || ''
    }

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