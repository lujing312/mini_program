import { LINK } from '../../../common/const'
//获取应用实例
const app = getApp();

Page({
  data: {
    productId: '',
    count: 1,
    couponList: [],
    iPhoneX: app.globalData.iPhoneX
  },
  onLoad: function (query) {
    let discountIds = query.discountIds ? decodeURIComponent(query.discountIds).split(',') : [];
    this.setData({
      productId: query.productId,
      count: query.count || 1
    })
    let params = {
      productId: query.productId,
      count: query.count || 1,
      discountIds: discountIds
    };
    //请求代金券列表
    this.getList(params, -1);
  },
  handleUse: function(evt) {
    let dataset = evt.currentTarget.dataset;
    //如果不可选
    if(dataset.disabled) {
      return;
    }
    //临时更改代金券列表选中值
    this.data.couponList[dataset.idx].checked = !dataset.checked;
    //刷新列表
    this.getList({
      productId: this.data.productId,
      count: this.data.count,
      discountIds: this.getCheckedDiscountIds()
    }, dataset.idx);
  },
  handleSubmit: function() {
    //获取当前选中ids
    app.globalData.discountIds = this.getCheckedDiscountIds();
    app.globalData.backFromCoupon = true;
    //回退到下单页
    wx.navigateBack({
      delta: 1
    });
  },
  getCheckedDiscountIds: function() {
    return this.data.couponList
      .filter(item => item.checked)
      .map(item => item.id);
  },
  getList: function(params, curSelectIndex) {
    let self = this;
    app.server.getCouponSelectList(params).then(res => {
      if(!res.status) {
        let list = res.data && res.data.map(item => {
          item.checked = item.checkStatus === 1;
          item.disabled = item.checkStatus === 2;
          return item;
        });
        self.setData({
          couponList: list || []
        });
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        //恢复代金券列表选中值
        if(this.data.couponList[curSelectIndex]) {
          this.data.couponList[curSelectIndex].checked = false
        }
      }
    })
  },
  handleOpenRules: function() {
    wx.navigateTo({
      url: '/pages/webview/index?url=' + LINK.COUPON_RULES
    });
  }
})