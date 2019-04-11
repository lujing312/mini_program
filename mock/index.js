import WxRequest from './lib/wxRequest';
import { API } from '../common/const';

import success from './data/success';
import fail from './data/fail';
import checkCoupon from './data/checkCoupon_v1';
import buyInfo from './data/buyInfo';
import productList from './data/productList';
import orderList from './data/orderList';
import orderDetail from './data/orderDetail';
import orderBoxList from './data/orderBoxList';
import orderInfo from './data/orderInfo_v1';
import couponList from './data/couponList';
import couponSelectList from './data/couponSelectList';
import submitOrder from './data/submitOrder';
import paySign from './data/paySign';
import payOrder from './data/payOrder';
import geneboxList from './data/geneboxList';
import geneboxItem from './data/geneboxItem';
import returnInfo from './data/returnInfo';
import express from './data/express';
import addressList from './data/addressList';
import unreadMsg from './data/unreadMsg';
import msgList from './data/msgList';
import msgDetail from './data/msgDetail';
import explore from './data/explore';
import question from './data/question'
import shareList from './data/shareList';
import shareQrcode from './data/shareQrcode';
import shareBoxList from './data/shareBoxList';
import postReturnBox from './data/postReturnBox';
import geneboxItemStep from './data/geneboxItemStep';

//校验用户信息
WxRequest.mock(API.BASE_URL + API.GET_USER_INFO, success);

//校验用户是否绑定手机号
WxRequest.mock(API.BASE_URL + API.CHECK_BIND_PHONE, success);

//产品列表
WxRequest.mock(API.BASE_URL + API.GET_PRODUCT_LIST, productList);
//购买海报
WxRequest.mock(API.BASE_URL + API.GET_BUY_INFO, buyInfo);

//订单列表
WxRequest.mock(API.BASE_URL + API.ORDER_LIST, orderList);
//订单详情
WxRequest.mock(API.BASE_URL + API.ORDER_DETAIL, orderDetail);
//订单详情-获取唾液盒编号
WxRequest.mock(API.BASE_URL + API.GET_ORDER_BOX_LIST, orderBoxList);
//物流信息
WxRequest.mock(API.BASE_URL + API.GET_EXPRESS, express);

//下单前获取订单信息
WxRequest.mock(API.BASE_URL + API.GET_ORDER_INFO, orderInfo);
//提交订单
WxRequest.mock(API.BASE_URL + API.SUBMIT_ORDER, submitOrder);
//获取签名
WxRequest.mock(API.BASE_URL + API.GET_PAY_SIGN, paySign);
//支付后获取订单信息
WxRequest.mock(API.BASE_URL + API.GET_PAY_ORDER, payOrder);
//实付价格为0，修改支付状态
WxRequest.mock(API.BASE_URL + API.AUTO_PAY, success);

//校验订单报价&优惠券等
WxRequest.mock(API.BASE_URL + API.CHECK_COUPON, checkCoupon);
//优惠券列表
WxRequest.mock(API.BASE_URL + API.COUPON_LIST, couponList);
//可选择优惠券列表
WxRequest.mock(API.BASE_URL + API.COUPON_SELECT_LIST, couponSelectList);

//校验唾液盒编码
WxRequest.mock(API.BASE_URL + API.CHECK_BOX_NUM, success);
//提交绑定唾液盒
WxRequest.mock(API.BASE_URL + API.ADD_BIND_BOX, success);
//修改唾液盒信息
WxRequest.mock(API.BASE_URL + API.EDIT_BIND_BOX, success);
//我的基因盒列表
WxRequest.mock(API.BASE_URL + API.GENEBOX_LIST, geneboxList);
//获取单个基因盒
WxRequest.mock(API.BASE_URL + API.GET_BOX_ITEM, geneboxItem);
//获取唾液盒进度
WxRequest.mock(API.BASE_URL + API.GENEBOX_ITEM_STEP, geneboxItemStep);
//获取唾液盒回寄信息
WxRequest.mock(API.BASE_URL + API.GET_RETURN_INFO, returnInfo);
//回寄唾液盒
WxRequest.mock(API.BASE_URL + API.RETURN_BOX, postReturnBox);

//地址列表
WxRequest.mock(API.BASE_URL + API.GET_ADDRESS_LIST, addressList);
//编辑地址
WxRequest.mock(API.BASE_URL + API.EDIT_ADDRESS, success);
//新增地址
WxRequest.mock(API.BASE_URL + API.ADD_ADDRESS, success);
//删除地址
WxRequest.mock(API.BASE_URL + API.DELETE_ADDRESS, success);
//设置默认地址
WxRequest.mock(API.BASE_URL + API.SET_DEFAULT_ADDRESS, success);

//未读消息
WxRequest.mock(API.BASE_URL + API.UNREAD_MSG, unreadMsg);
//消息列表
WxRequest.mock(API.BASE_URL + API.MSG_LIST, msgList);
//消息详情
WxRequest.mock(API.BASE_URL + API.MSG_DETAIL, msgDetail);
//标记为已读
WxRequest.mock(API.BASE_URL + API.SET_MSG_AS_READ, msgDetail);

//意见反馈
WxRequest.mock(API.BASE_URL + API.SUBMIT_ADVICE, fail);

//探索
WxRequest.mock(API.BASE_URL + API.EXPLORE, explore);
//QA列表
WxRequest.mock(API.BASE_URL + API.QA_LIST, question);

//获取分享列表
WxRequest.mock(API.BASE_URL + API.GET_SHARE_LIST, shareList)
//获取分享二维码
WxRequest.mock(API.BASE_URL + API.GET_SHARE_QRCODE, shareQrcode)
//获取分享的唾液盒信息
WxRequest.mock(API.BASE_URL + API.GET_SHARE_BOX_INFO, geneboxItem)
//获取分享列表
WxRequest.mock(API.BASE_URL + API.GET_SHARE_BOX_LIST, shareBoxList)
//绑定唾液盒
WxRequest.mock(API.BASE_URL + API.TIE_SHARE_BOX, success)
//解绑唾液盒
WxRequest.mock(API.BASE_URL + API.UNTIE_SHARE_BOX, success)