import { RELATIONSHIP, SEX_MAP } from '../../../common/const';
import { getQueryStr } from '../../../common/utils';
//获取应用实例
const app = getApp();

Page({
  data: {
    boxNumber: '',
    nickName: '',
    relationshipInfo: {},
    surname: '',
    name: '',
    sex: '',
    sexText: '',
    birthday: '',
    bornText: '',
    statusCode: '',
    isShare: '',
    iPhoneX: app.globalData.iPhoneX
  },
  onLoad: function (query) {
    let self = this;
    let params = {
      boxNumber: query.boxNumber,
      isShare: query.isShare
    };
    app.server.getBoxItem(params).then(res => {
      if(!res.status && res.data) {
        let rsItem = RELATIONSHIP.find(item => item.value == res.data.relationship)
        //格式化出生日期
        let born = []
        if(res.data.province) {
          born.push(res.data.province)
        }
        if(res.data.city) {
          born.push(res.data.city)
        }
        if(res.data.district) {
          born.push(res.data.district)
        }
        self.setData({
          boxNumber: res.data.boxNumber,
          nickName: res.data.nickName,
          relationshipInfo: rsItem,
          sex: res.data.sex,
          sexText: SEX_MAP[res.data.sex] || '',
          surname: res.data.surname || '',
          name: res.data.name || '',
          birthday: res.data.birthday ? res.data.birthday.replace(/\//g, '-') : '',
          bornText: born.join('-'),
          statusCode: res.data.statusCode,
          isShare: res.data.isShare
        });
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          });
        }, 1000)
      }
    })
  },
  handleEdit: function() {
    let params = {
      boxNumber: this.data.boxNumber,
      nickName: this.data.nickName,
      relationship: this.data.relationshipInfo.value,
      sex: this.data.sex,
      surname: this.data.surname,
      name: this.data.name,
      birthday: this.data.birthday,
      bornText: this.data.bornText,
      isShare: this.data.isShare
    };
    wx.navigateTo({
      url: '/pages/geneBox/edit/index?from=detail&' + getQueryStr(params)
    })
  }
})