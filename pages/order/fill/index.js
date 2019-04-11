import wechatPay from '../../../common/pay';
import { getQueryStr } from '../../../common/utils';
import { LINK } from '../../../common/const';

//获取应用实例
const app = getApp();
const MIN_COUNT = 1;
const MAX_COUNT = 99;

Page({
  data: {
    selectedProductId: '',
    count: 1,
    minCount: MIN_COUNT,
    maxCount: MAX_COUNT,
    discountCode: '',
    invoice: false,
    remark: '',
    location: null,
    productList: [],
    discountInfo: null,
    discountIds: [],
    iPhoneX: app.globalData.iPhoneX
  },
  onLoad: function (query) {
    if(!query.id) {
      wx.showToast({
        title: '产品信息错误',
        icon: 'none'
      })
      return;
    }
    this.setData({
      selectedProductId: query.id,
      discountCode: query.code || ''
    })
  },
  onShow: function() {
    //请求校验代金券
    if(app.globalData.backFromCoupon) {
      this.setData({
        discountIds: app.globalData.discountIds
      });
      app.globalData.backFromCoupon = false;
      this.checkCoupon(2);
      return
    }
    //更新选中的地址
    if(app.globalData.backFromAddress) {
      app.globalData.backFromAddress = false;
      this.setData({
        location: app.globalData.location
      })
      return
    }
    //其他页面返回下单页，刷新数据
    this.getOrderInfo()
  },
  getOrderInfo: function() {
    let self = this
    app.server.getOrderInfo({
      productId: self.data.selectedProductId
    }).then(res => {
      if(!res.status) {
        let location = res.data.location || null;
        let productList = res.data.products || [];
        let discountInfo = res.data.discountInfo || null;
        if(location) {
          location.addressText = location.province + location.city + location.district + location.address;
        }
        //同步当前选中代金券列表到globalData
        let discountIds = (discountInfo && discountInfo.discountIds) || [];
        app.globalData.discountIds = discountIds;
        //更新产品列表选中状态
        productList = productList.map(item => {
          item.selected = item.productId === self.data.selectedProductId
          return item
        })
        //更新页面
        self.setData({
          discountIds: discountIds,
          location: location,
          productList: productList,
          discountInfo: discountInfo,
          activityDiscount1: res.data.activityDiscount1 || '',
          activityDiscount2: res.data.activityDiscount2 || '',
          count: 1
        });
        //如果跳转过来有优惠码，校验优惠码
        self.data.discountCode && self.checkCoupon();
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
  handleOpenAddress: function() {
    wx.navigateTo({
      url: '/pages/address/list/index?from=order'
    })
  },
  handleOpenSelectCoupon: function() {
    let discountIds = this.data.discountInfo.discountIds || [];
    let params = {
      productId: this.data.selectedProductId,
      count: this.data.count,
      discountIds: discountIds.join()
    }
    wx.navigateTo({
      url: '/pages/coupon/select/index?' + getQueryStr(params)
    });
  },
  handleOpenProtocol: function() {
    wx.navigateTo({
      url: '/pages/webview/index?url=' + LINK.SERVICE_URL
    });
  },
  handleSubmit: function(evt) {

    //校验地址
    if(!this.data.location ||
      this.data.location.recipient === '' ||
      this.data.location.mobile === '' ||
      this.data.location.addressText === ''
    ) {
      wx.showToast({
        title: '收货信息为空',
        icon: 'none'
      })
      return;
    }
    
    var params = {
      productIds: JSON.stringify([{
        productId: this.data.selectedProductId,
        count: this.data.count
      }]),
      recipient: this.data.location.recipient,
      mobile: this.data.location.mobile,
      address: this.data.location.addressText,
      discountIds: this.data.discountInfo.discountIds,
      code: evt.detail.value.discountCode.trim(),
      remark: evt.detail.value.remark.trim()
    };

    //下单
    app.server.submitOrder(params).then(res => {
      if(!res.status) {
        //调用支付
        wechatPay(res.data, () => {
          //跳转到订单详情页
          wx.navigateTo({
            url: '/pages/order/detail/index?id=' + res.data.orderId
          });
        })
      } else {
        wx.showToast({
          title: res.msg || '下单失败',
          icon: 'none'
        })
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    })
  },
  handleCountMinus: function() {
    if(this.data.count === MIN_COUNT) {
      return;
    }
    this.setData({
      count: this.data.count - 1
    });
    this.checkCoupon();
  },
  handleCountPlus: function() {
    if(this.data.count === MAX_COUNT) {
      return;
    }
    this.setData({
      count: this.data.count + 1
    });
    this.checkCoupon();
  },
  handleInputCountChange: function(evt) {
    let inputValue = evt.detail.value.trim()
    let inputCount = MIN_COUNT
    if (inputValue && !isNaN(parseInt(inputValue, 10))) {
      inputCount = parseInt(inputValue, 10)
    }
    if (inputCount <= MIN_COUNT) {
      inputCount = MIN_COUNT
    }
    if (inputCount > MAX_COUNT) {
      inputCount = MAX_COUNT
    }
    this.setData({
      count: inputCount
    })
    this.checkCoupon()
  },
  handleSumbitDiscountCode(evt) {
    this.setData({
      discountCode: evt.detail.value.trim()
    });
    this.checkCoupon();
  },
  checkCoupon: function(type) {
    let params = {
      productId: this.data.selectedProductId,
      count: this.data.count,
      discountIds: this.data.discountIds,
      code: this.data.discountCode,
      type: type || 1
    };
    let self = this;

    app.server.checkCoupon(params).then(res => {
      if(!res.status) {
        //更新优惠信息
        self.setData({
          discountInfo: res.data.discountInfo
        });
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        //接口错误，清空优惠码
        setTimeout(function() {
          self.setData({
            discountCode: ''
          })
        }, 1000)
      }
    });
  },
  handleChooseProduct: function(evt) {
    let id = evt.currentTarget.dataset.id
    let productList = this.data.productList.map(item => {
      item.selected = item.productId === id
      return item
    })
    //重置优惠券
    this.data.discountInfo.discountIds = [];
    app.globalData.discountIds = []
    this.setData({
      productList: productList,
      selectedProductId: id,
      discountInfo: this.data.discountInfo,
      discountIds: []
    })
    this.checkCoupon();
  }
});