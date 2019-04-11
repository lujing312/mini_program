//获取应用实例
const app = getApp();

Page({
  data: {
    type: 0,
    from: '',
    id: '',
    recipient: '',
    mobile: '',
    province: '',
    city: '',
    district: '',
    address: '',
    isDefault: false,
    area: [],
    areaText: '',
    iPhoneX: app.globalData.iPhoneX
  },
  onLoad: function (query) {
    //编辑，赋值
    if(query.type === '1') {
      //格式化地址
      let area = []
      if(query.province) {
        area.push(query.province)
      }
      if(query.city) {
        area.push(query.city)
      }
      if(query.district) {
        area.push(query.district)
      }
      this.setData({
        type: '1',
        from: query.from,
        id: query.id,
        recipient: query.recipient,
        mobile: query.mobile,
        province: query.province,
        city: query.city,
        district: query.district,
        address: query.address,
        isDefault: query.isDefault,
        area: area,
        areaText: area.join('-')
      });
    }
    //新建，清空数据
    if(query.type === '0') {
      this.setData({
        type: '0',
        from: query.from,
        id: '',
        recipient: '',
        mobile: '',
        province: '',
        city: '',
        district: '',
        address: '',
        isDefault: false,
        area: [],
        areaText: ''
      });
    }
  },
  handleRegionChange(evt) {
    this.setData({
      area: evt.detail.value || [],
      areaText: evt.detail.value.join('-')
    });
  },
  handleSubmit: function(evt) {
    var formData = evt.detail.value;

    var params = {
      recipient: formData.recipient.trim(),
      mobile: formData.mobile.trim(),
      province: formData.area[0],
      city: formData.area[1],
      district: formData.area[2],
      address: formData.address.trim()
    }

    if(!params.recipient) {
      let recipientErrMsg = this.data.from === 'return' ? '请输入寄件人' : '请输入收件人'
      wx.showToast({
        title: recipientErrMsg,
        icon: 'none'
      })
      return;
    }
    if(!/^1\d{10}$/g.test(params.mobile)) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none'
      })
      return;
    }
    if(!formData.area.length) {
      wx.showToast({
        title: '请选择所在地区',
        icon: 'none'
      })
      return;
    }
    if(!params.address) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      return;
    }

    //新建提交
    if(this.data.type === '0') {
      app.server.addAddress(params).then(res => {
        if(!res.status) {
          wx.showToast({
            title: '新增地址成功',
            icon: 'success'
          });
          setTimeout(function() {
            // 返回上一页
            app.globalData.backFromAddressOperate = true;
            wx.navigateBack({
              delta: 1
            });
          }, 1000);
        } else {
          wx.showToast({
            title: res.msg || '新增地址失败',
            icon: 'none'
          });
        }
      })
    }

    //编辑提交
    if(this.data.type === '1') {
      params.id = this.data.id;
      app.server.editAddress(params).then(res => {
        if(!res.status) {
          wx.showToast({
            title: '修改地址成功',
            icon: 'success'
          });
          setTimeout(function() {
            // 返回上一页
            app.globalData.backFromAddressOperate = true;
            wx.navigateBack({
              delta: 1
            });
          }, 1000);
        } else {
          wx.showToast({
            title: res.msg || '修改地址失败',
            icon: 'none'
          });
        }
      })
    }
  }
})