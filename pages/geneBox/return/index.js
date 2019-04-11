//获取应用实例
const app = getApp();

Page({
  data: {
    recipientInfo: null,
    senderInfo: null,
    boxList: [],
    selectedBoxList: [],
    iPhoneX: app.globalData.iPhoneX,
    dialogShow: false
  },
  onLoad: function () {
    this.getReturnInfo()
  },
  onShow: function() {
    if (app.globalData.backFromAddress) {
      this.setData({
        senderInfo: app.globalData.location
      })
    }
  },
  getReturnInfo: function() {
    let self = this
    app.server.getReturnInfo({}).then(res => {
      if (!res.status && res.data) {
        self.setData({
          recipientInfo: res.data.recipientInfo || null,
          senderInfo: res.data.senderInfo || null,
          boxList: res.data.boxList.map(item => {
            item.select = false
            return item
          })
        })
      } else {
        wx.showToast({
          title: res.msg || '获取回寄信息失败',
          icon: 'none'
        })
        //回退到前一页
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    })
  },
  handleSelectItem: function(evt) {
    let dataset = evt.currentTarget.dataset
    //修改选中状态
    this.data.boxList[dataset.index].select = !dataset.select;
    //获取已选中编号列表
    let selectedBoxList = this.data.boxList
      .filter(item => item.select)
      .map(item => item.boxNumber)
    //更新数据
    this.setData({
      boxList: this.data.boxList,
      selectedBoxList: selectedBoxList
    })
  },
  handleSelectAddress: function() {
    wx.navigateTo({
      url: '/pages/address/list/index?from=return'
    })
  },
  handleReturnBox: function() {
    let self = this
    if (!self.data.senderInfo) {
      wx.showToast({
        title: '还没有寄件人信息哦',
        icon: 'none'
      })
      return
    }
    if (self.data.selectedBoxList.length === 0) {
      wx.showToast({
        title: '还没有选择唾液盒哦',
        icon: 'none'
      })
      return
    }
    self.setData({
      dialogShow: true
    })
  },
  handleTrueButton: function() {
    let self = this
    app.server.postReturnBox({
      senderInfo: self.data.senderInfo,
      boxNumbers: self.data.selectedBoxList
    }).then(res => {
      if (!res.status) {
        wx.showToast({
          title: res.msg || '回寄下单成功，顺丰小哥将会尽快上门',
          icon: 'none',
          duration: 2000
        })
        self.setData({
          dialogShow: false
        })
      } else {
        wx.showToast({
          title: res.msg || '回寄失败，请稍后再试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  handleReturnButton: function() {
    this.setData({
      dialogShow: false
    })
  },
  handleDialogBackgroud: function() {
    this.setData({
      dialogShow: false
    })
  }
});
