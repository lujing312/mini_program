import request from './request';
import { API } from './const';

class server {
  constructor() {
    this._baseUrl = API.BASE_URL;
    //platform为平台区分，小程序为 3
    //1: ios, 2: android, 3: mini, 4: touch, 5: web
    this._defaultHeader = {
      'data-type': 'application/json',
      'platform': 3,
      'appVersion': 1
    };
    this._request = new request;
    this._request.setErrorHandler(this.errorHander);
    this._params = {};
  }

  //设置请求头
  setHeader(header) {
    this._defaultHeader = Object.assign(this._defaultHeader, header);
  }

  //设置数据
  setParams(params) {
    this._params = Object.assign(this._params, params)
  }

  //统一的异常处理方法
  errorHander(res) {
    wx.showToast({
      title: '网络不给力，请稍后再试',
      icon: 'none'
    });
    console.error(res);
  }

  //获取登录用户信息
  login(data) {
    return this._request.postRequest(this._baseUrl + API.LOGIN_INFO, data, this._defaultHeader);
  }

  //订单列表
  getOrderList(data) {
    return this._request.getRequest(this._baseUrl + API.ORDER_LIST, data, this._defaultHeader);
  }

  //订单详情
  getOrderDetail(data) {
    return this._request.postRequest(this._baseUrl + API.ORDER_DETAIL, data, this._defaultHeader);
  }

  //订单详情
  getOrderBoxList(data) {
    return this._request.postRequest(this._baseUrl + API.GET_ORDER_BOX_LIST, data, this._defaultHeader);
  }

  //物流信息
  getExpress(data) {
    return this._request.postRequest(this._baseUrl + API.GET_EXPRESS, data, this._defaultHeader);
  }

  //获取产品列表
  getProductList(data) {
    return this._request.getRequest(this._baseUrl + API.GET_PRODUCT_LIST, data, this._defaultHeader);
  }

  //获取购买海报
  getBuyInfo(data) {
    return this._request.getRequest(this._baseUrl + API.GET_BUY_INFO, data, this._defaultHeader);
  }

  //下单前获取订单信息
  getOrderInfo(data) {
    return this._request.postRequest(this._baseUrl + API.GET_ORDER_INFO, data, this._defaultHeader);
  }

  //提交订单
  submitOrder(data) {
    return this._request.postRequest(this._baseUrl + API.SUBMIT_ORDER, data, this._defaultHeader);
  }

  //获取微信openId
  getOpenId(data) {
    return this._request.postRequest(this._baseUrl + API.GET_OPENID, data, this._defaultHeader);
  }

  //获取签名
  getPaySign(data) {
    return this._request.postRequest(this._baseUrl + API.GET_PAY_SIGN, data, this._defaultHeader);
  }

  //支付后获取订单信息
  getPayOrder(data) {
    return this._request.postRequest(this._baseUrl + API.GET_PAY_ORDER, data, this._defaultHeader);
  }

  //退款
  postRundOrder(data) {
    return this._request.postRequest(this._baseUrl + API.REFUND_ORDER, data, this._defaultHeader);
  }

  //取消订单
  postCancelOrder(data) {
    return this._request.postRequest(this._baseUrl + API.CANCEL_ORDER, data, this._defaultHeader);
  }

  //取消订单
  autoPay(data) {
    return this._request.postRequest(this._baseUrl + API.AUTO_PAY, data, this._defaultHeader);
  }

  //校验优惠券/优惠码
  checkCoupon(data) {
    return this._request.postRequest(this._baseUrl + API.CHECK_COUPON, data, this._defaultHeader);
  }

  //优惠券列表
  getCouponList(data) {
    return this._request.getRequest(this._baseUrl + API.COUPON_LIST, data, this._defaultHeader);
  }

  //可选择优惠券列表
  getCouponSelectList(data) {
    return this._request.postRequest(this._baseUrl + API.COUPON_SELECT_LIST, data, this._defaultHeader);
  }

  //校验用户是否绑定唾液盒
  checkBindPhone(data) {
    return this._request.getRequest(this._baseUrl + API.CHECK_BIND_PHONE, data, this._defaultHeader);
  }

  //校验唾液盒编码
  checkBoxNum(data) {
    return this._request.postRequest(this._baseUrl + API.CHECK_BOX_NUM, data, this._defaultHeader);
  }

  //提交绑定唾液盒
  addBindBox(data) {
    return this._request.postRequest(this._baseUrl + API.ADD_BIND_BOX, data, this._defaultHeader);
  }

  //修改唾液盒信息
  editBindBox(data) {
    return this._request.postRequest(this._baseUrl + API.EDIT_BIND_BOX, data, this._defaultHeader);
  }

  //我的基因盒列表
  getGeneboxList(data) {
    return this._request.getRequest(this._baseUrl + API.GENEBOX_LIST, data, this._defaultHeader);
  }

  //获取单个基因盒
  getBoxItem(data) {
    return this._request.postRequest(this._baseUrl + API.GET_BOX_ITEM, data, this._defaultHeader);
  }

  //获取单个基因盒
  getBoxItemStep(data) {
    return this._request.postRequest(this._baseUrl + API.GENEBOX_ITEM_STEP, data, this._defaultHeader);
  }

  //地址列表
  getAddressList(data) {
    return this._request.getRequest(this._baseUrl + API.GET_ADDRESS_LIST, data, this._defaultHeader);
  }

  //编辑地址
  editAddress(data) {
    return this._request.postRequest(this._baseUrl + API.EDIT_ADDRESS, data, this._defaultHeader);
  }

  //新增地址
  addAddress(data) {
    return this._request.postRequest(this._baseUrl + API.ADD_ADDRESS, data, this._defaultHeader);
  }

  //删除地址
  deleteAddress(data) {
    return this._request.postRequest(this._baseUrl + API.DELETE_ADDRESS, data, this._defaultHeader);
  }

  //设置默认地址
  setDefaultAddress(data) {
    return this._request.postRequest(this._baseUrl + API.SET_DEFAULT_ADDRESS, data, this._defaultHeader);
  }

  //获取未读消息数
  getUnreadMsg(data) {
    return this._request.getRequest(this._baseUrl + API.UNREAD_MSG, data, this._defaultHeader);
  }

  //设置消息为已读
  setMsgAsRead(data) {
    return this._request.postRequest(this._baseUrl + API.SET_MSG_AS_READ, data, this._defaultHeader);
  }

  //消息列表
  getMsgList(data) {
    return this._request.getRequest(this._baseUrl + API.MSG_LIST, data, this._defaultHeader);
  }

  //消息详情
  getMsgDetail(data) {
    return this._request.postRequest(this._baseUrl + API.MSG_DETAIL, data, this._defaultHeader);
  }

  //意见反馈
  postAdvice(data) {
    return this._request.postRequest(this._baseUrl + API.SUBMIT_ADVICE, data, this._defaultHeader);
  }

  //探索首页
  getArticleInfo(data) {
    return this._request.getRequest(this._baseUrl + API.EXPLORE, data, this._defaultHeader);
  }
  
  //Q&A分类列表
  getQAList(data) {
    return this._request.getRequest(this._baseUrl + API.QA_LIST, data, this._defaultHeader);
  }

  //获取回寄唾液盒信息
  getReturnInfo(data) {
    return this._request.getRequest(this._baseUrl + API.GET_RETURN_INFO, data, this._defaultHeader);
  }

  //获取回寄唾液盒信息
  postReturnBox(data) {
    return this._request.postRequest(this._baseUrl + API.RETURN_BOX, data, this._defaultHeader);
  }

  //获取分享列表
  getShareList(data) {
    return this._request.getRequest(this._baseUrl + API.GET_SHARE_LIST, data, this._defaultHeader);
  }

  //获取分享二维码
  getShareQrcode(data) {
    return this._request.postRequest(this._baseUrl + API.GET_SHARE_QRCODE, data, this._defaultHeader);
  }

  //获取已分享唾液盒列表
  getShareBoxList(data) {
    return this._request.getRequest(this._baseUrl + API.GET_SHARE_BOX_LIST, data, this._defaultHeader);
  }

  //获取分享的唾液信息
  getShareBoxInfo(data) {
    return this._request.postRequest(this._baseUrl + API.GET_SHARE_BOX_INFO, data, this._defaultHeader);
  }

  //绑定分享的唾液盒
  tieShareBox(data) {
    return this._request.postRequest(this._baseUrl + API.TIE_SHARE_BOX, data, this._defaultHeader);
  }

  //解绑分享的唾液盒
  untieShareBox(data) {
    return this._request.postRequest(this._baseUrl + API.UNTIE_SHARE_BOX, data, this._defaultHeader);
  }

  //获取手机号验证码
  getVerificationCode(data) {
    return this._request.postRequest(this._baseUrl + API.GET_VERIFICATION_CODE, data, this._defaultHeader);
  }

  //绑定手机号
  bindPhone(data) {
    return this._request.postRequest(this._baseUrl + API.BIND_PHONE, data, this._defaultHeader);
  }
}
export default server;