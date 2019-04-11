import { getQueryStr } from '../../../common/utils';

//获取应用实例
const app = getApp();

Page({
  data: {
    from: '',
    addressList: [],
    hasOperate: true,
    iPhoneX: app.globalData.iPhoneX
  },
  onLoad: function (query) {
    //从订单&回寄跳转过来，无操作按钮，从我的跳转过来，有操作按钮
    this.setData({
      hasOperate: query.from === 'my',
      from: query.from
    });
    this.getList();
  },
  onShow: function() {
    if(app.globalData.backFromAddressOperate) {
      app.globalData.backFromAddressOperate = false;
      this.getList();
    }
  },
  getList: function() {
    let self = this;
    app.server.getAddressList({}).then(res => {
      if(!res.status) {
        let list = res.data && res.data.map(item => {
          item.addressText = item.province + item.city + item.district + item.address;
          return item;
        });
        self.setData({
          addressList: list || []
        });
      } else {
        self.setData({
          addressList: []
        });
        wx.showToast({
          title: res.msg,
          icon: 'none'
        });
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          });
        }, 1000)
      }
    })
  },
  handleSetDefault: function(evt) {
    let self = this;
    let params = {
      id: evt.currentTarget.dataset.id
    };
    app.server.setDefaultAddress(params).then(res => {
      if(!res.status) {
        wx.showToast({
          title: '设置默认成功',
          icon: 'success'
        });
        //更新列表
        self.data.addressList.map(item => {
          item.isDefault = item.id === params.id
        })
        self.setData({
          addressList: self.data.addressList
        })
      } else {
        wx.showToast({
          title: res.msg || '设置默认失败',
          icon: 'none'
        });
      }
    })
  },
  handleEdit: function(evt) {
    let curItem = this.data.addressList[evt.currentTarget.dataset.index];
    let params = {
      ...curItem,
      type: 1,
      from: this.data.from
    }
    wx.navigateTo({
      url: '/pages/address/edit/index?' + getQueryStr(params)
    });
  },
  handleDelete: function(evt) {
    let self = this;
    let params = {
      id: evt.currentTarget.dataset.id
    };
    app.server.deleteAddress(params).then(res => {
      if(!res.status) {
        wx.showToast({
          title: '地址删除成功',
          icon: 'success'
        });
        //刷新列表
        self.getList();
      } else {
        wx.showToast({
          title: res.msg || '地址删除失败',
          icon: 'none'
        });
      }
    })
  },
  handleAdd: function() {
    let params = {
      type: '0',
      from: this.data.from
    }
    wx.navigateTo({
      url: '/pages/address/edit/index?' + getQueryStr(params)
    });
  },
  handleChoose: function(evt) {
    if(this.data.hasOperate) {
      return;
    }
    let index = evt.currentTarget.dataset.index;
    app.globalData.location = this.data.addressList[index];
    app.globalData.backFromAddress = true;
    wx.navigateBack({
      delta: 1
    });
  }
})