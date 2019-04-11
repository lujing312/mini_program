import { splitNumber } from '../../../common/utils';
import { RELATIONSHIP, SEX_MAP } from '../../../common/const';
//获取应用实例
const app = getApp();

Page({
  data: {
    from: '',
    boxNumber: '',
    nickName: '',
    surname: '',
    name: '',
    sex: '',
    sexText: '',
    birthday: '',
    born: '',
    isShare: '',
    bornText: '',
    relationshipInfo: {},
    relationshipRange: RELATIONSHIP,
    iPhoneX: app.globalData.iPhoneX
  },
  onLoad: function (query) {
    let self = this
    if(query.from === 'qrcode' && query.res) {
      app.server.getShareBoxInfo({
        encrypt: decodeURIComponent(query.res)
      }).then(res => {
        if (!res.status) {
          let rsItem = RELATIONSHIP.find(item => item.value == res.data.relationship)
          rsItem['index'] = RELATIONSHIP.findIndex(item => item.value == res.data.relationship)
          //格式化出生地
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
            from: 'qrcode',
            isShare: 2, //从二维码进入，默认是分享
            boxNumber: splitNumber(res.data.boxNumber),
            nickName: res.data.nickName,
            relationshipInfo: rsItem,
            sex: res.data.sex,
            sexText: SEX_MAP[res.data.sex] || '',
            surname: res.data.surname || '',
            name: res.data.name || '',
            birthday: res.data.birthday ? res.data.birthday.replace(/\//g, '-') : '',
            born: born,
            bornText: born.join('-'),
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
    } 
    if (query.from === 'detail'){
      let rsItem = RELATIONSHIP.find(item => item.value == query.relationship)
      rsItem['index'] = RELATIONSHIP.findIndex(item => item.value == query.relationship)
      this.setData({
        from: 'detail',
        isShare: query.isShare,
        boxNumber: splitNumber(query.boxNumber),
        nickName: query.nickName,
        relationshipInfo: rsItem,
        surname: query.surname,
        name: query.name,
        sex: query.sex,
        sexText: SEX_MAP[query.sex] || '',
        birthday: query.birthday.replace(/\//g, '-'),
        born: query.bornText.split('-'),
        bornText: query.bornText
      });
    }
    if (query.from !== 'qrcode' && query.from !== 'detail') {
      let params = {
        boxNumber: query.boxNumber,
        isShare: query.isShare
      };
      app.server.getBoxItem(params).then(res => {
        if(!res.status) {
          let rsItem = RELATIONSHIP.find(item => item.value == res.data.relationship)
          rsItem['index'] = RELATIONSHIP.findIndex(item => item.value == res.data.relationship)
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
            from: 'other',
            isShare: res.data.isShare,
            boxNumber: splitNumber(res.data.boxNumber),
            nickName: res.data.nickName,
            relationshipInfo: rsItem,
            sex: res.data.sex,
            sexText: SEX_MAP[res.data.sex] || '',
            surname: res.data.surname || '',
            name: res.data.name || '',
            birthday: res.data.birthday ? res.data.birthday.replace(/\//g, '-') : '',
            born: born,
            bornText: born.join('-')
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
    }
  },
  handleRelationShipChange: function(evt) {
    this.setData({
      relationshipInfo: RELATIONSHIP[evt.detail.value]
    });
  },
  handleBirthdayChange: function(evt) {
    this.setData({
      birthday: evt.detail.value
    })
  },
  handleBornChange: function(evt) {
    this.setData({
      bornText: evt.detail.value.join('-')
    })
  },
  handleFormSubmit: function(evt) {
    let value = evt.detail.value;
    // 公用参数
    let params = {
      isShare: this.data.isShare,
      boxNumber: this.data.boxNumber.replace(/\s/g, ''),
      sex: this.data.sex,
      relationship: this.data.relationshipInfo.value
    }
    if(value.nickName === '') {
      wx.showToast({
        title: '请填写昵称',
        icon: 'none'
      });
      return;
    }
    params.nickName = value.nickName;
    // 如果是本账号唾液盒，从表单获取修改后的参数值
    if(this.data.isShare == 1) {
      params.surname = value.surname
      params.name = value.name;
      params.birthday = value.birthday.replace(/\-/g, '/');
      params.province = value.born[0] || '';
      params.city = value.born[1] || '';
      params.district = value.born[2] || '';
    }

    // 如果是分享的唾液盒，不能修改以下参数，原封不动提交
    if (this.data.isShare == 2) {
      params.surname = this.data.surname
      params.name = this.data.name
      params.birthday = this.data.birthday.replace(/\-/g, '/')
      params.province = this.data.born[0] || ''
      params.city = this.data.born[1] || ''
      params.district = this.data.born[2] || ''
    }

    if(this.data.from === 'qrcode') {
      app.server.tieShareBox(params).then(res => {
        if(!res.status) {
          wx.showToast({
            title: '绑定成功',
            icon: 'success'
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            });
          }, 1000)
        } else {
          wx.showToast({
            title: res.msg || '绑定失败',
            icon: 'none'
          })
        }
      })
    }
    if(this.data.from !== 'qrcode') {
      app.server.editBindBox(params).then(res => {
        if(!res.status) {
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 2
            })
          }, 1000)
        } else {
          wx.showToast({
            title: res.msg || '修改失败',
            icon: 'none'
          })
        }
      })
    }
  }
});