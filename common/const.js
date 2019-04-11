module.exports = {
  //请求地址
  API: {
    BASE_URL: 'https://genebox.cn',
    // BASE_URL: 'http://beta.genebox.cn',
    //同步用户信息接口
    LOGIN_INFO: '/user/loginByWxMiniProgram',
    GET_VERIFICATION_CODE: '/user/getLoginVerificationCodeByPhone',
    CHECK_BIND_PHONE: '/user/bind/check_phone',
    BIND_PHONE: '/user/bind/wx_phone',
    //查询订单接口
    // GET_BUY_INFO: '/buyIndex/buy/home',
    GET_BUY_INFO: '/buyIndex/buy/home_v1',
    GET_PRODUCT_LIST: '/order/product/list',
    GET_ORDER_BOX_LIST: '/order/box/list',
    ORDER_LIST: '/order/list',
    ORDER_DETAIL: '/order/detail',
    GET_EXPRESS: '/user/delivery/progress',
    //下单支付接口
    // GET_ORDER_INFO: '/discount/orderinfo',
    GET_ORDER_INFO: '/discount/orderInfo_v1',
    SUBMIT_ORDER: '/order/preservation',
    GET_OPENID: '/order/wxpub/getOpenId',
    GET_PAY_SIGN: '/order/wxpub/pay',
    GET_PAY_ORDER: '/order/wxpay/orderQuery',
    REFUND_ORDER: '/order/refund',
    CANCEL_ORDER: '/order/cancel',
    AUTO_PAY: '/order/autoPay',
    //优惠券接口
    // CHECK_COUPON: '/discount/check',
    CHECK_COUPON: '/discount/check_v1',
    COUPON_LIST: '/discount/list',
    // COUPON_SELECT_LIST: '/discount/choice/list',
    COUPON_SELECT_LIST: '/discount/choiceList_v1',
    //绑定唾液盒
    CHECK_BOX_NUM: '/user/box/checkBoxNumber',
    ADD_BIND_BOX: '/user/box/bindBoxWithDetail',
    EDIT_BIND_BOX: '/user/box/updateBox',
    // GENEBOX_LIST: '/user/box/getBoxList',
    GENEBOX_LIST: '/user/box/getBoxList_v1',
    // GENEBOX_ITEM_STEP: '/user/box/getGeneTestStep',
    GENEBOX_ITEM_STEP: '/user/box/getGeneTestStep_v1',
    GET_BOX_ITEM: '/user/box/getBoxWithDetail',
    GET_RETURN_INFO: '/user/box/getReturnInfo',
    RETURN_BOX: '/user/box/returnBox',
    //地址接口
    GET_ADDRESS_LIST: '/order/location/list',
    EDIT_ADDRESS: '/order/location/update',
    ADD_ADDRESS: '/order/location/preservation',
    DELETE_ADDRESS: '/order/location/delete',
    SET_DEFAULT_ADDRESS: '/order/location/setDefault',
    //消息
    UNREAD_MSG: '/user/message/getMessageCount',
    SET_MSG_AS_READ: '/user/message/setMessageRead',
    MSG_LIST: '/user/message/messageList',
    MSG_DETAIL: '/user/message/messageDetail',
    //其他
    SUBMIT_ADVICE: '/user/sendFeedback',
    //探索
    EXPLORE: '/public/explore/article',
    QA_LIST: '/public/explore/question',
    //分享
    GET_SHARE_LIST: '/user/share/boxes_last',
    GET_SHARE_QRCODE: '/user/share/qrcode',
    GET_SHARE_BOX_INFO: '/user/share/getParam',
    TIE_SHARE_BOX: '/user/share/tie',
    UNTIE_SHARE_BOX: '/user/share/untie',
    GET_SHARE_BOX_LIST: '/user/share/list'
  },
  //与本人关系列表
  RELATIONSHIP: [{
    value: 0,
    name: '本人'
  }, {
    value: 1,
    name: '丈夫'
  }, {
    value: 2,
    name: '妻子'
  }, {
    value: 3,
    name: '儿子'
  }, {
    value: 4,
    name: '女儿'
  }, {
    value: 5,
    name: '父亲'
  }, {
    value: 6,
    name: '母亲'
  }, {
    value: 7,
    name: '爷爷'
  }, {
    value: 8,
    name: '奶奶'
  }, {
    value: 9,
    name: '外祖父'
  }, {
    value: 10,
    name: '外祖母'
  }, {
    value: 12,
    name: '孙子'
  }, {
    value: 13,
    name: '孙女'
  }, {
    value: 14,
    name: '外孙'
  }, {
    value: 15,
    name: '外孙女'
  }, {
    value: 16,
    name: '哥哥'
  }, {
    value: 17,
    name: '姐姐'
  }, {
    value: 18,
    name: '弟弟'
  }, {
    value: 19,
    name: '妹妹'
  }, {
    value: 99,
    name: '其他'
  }],
  //性别
  SEX_RANGE: [{
    value: 1,
    label: '男'
  }, {
    value: 2,
    label: '女'
  }],
  SEX_MAP: {
    '1': '男',
    '2': '女',
  },
  //检测流程
  TEST_PROCESS: [{
    index: 1,
    icon: 'icon-barcode',
    title: '唾液盒已绑定'
  }, {
    index: 2,
    icon: 'icon-return',
    title: '唾液盒回寄中（1-4天）'
  }, {
    index: 3,
    icon: 'icon-lab-step1',
    title: '实验室确认收件'
  }, {
    index: 4,
    icon: 'icon-lab-step2',
    title: 'DNA提取和质检'
  }, {
    index: 5,
    icon: 'icon-lab-step3',
    title: 'DNA扩增'
  }, {
    index: 6,
    icon: 'icon-lab-step4',
    title: '杂交染色'
  }, {
    index: 7,
    icon: 'icon-lab-step5',
    title: '上机检测完成'
  }, {
    index: 8,
    icon: 'icon-lab-step6',
    title: '数据分析'
  }, {
    index: 9,
    icon: 'icon-lab-step7',
    title: '分析结果已生成'
  }],
  LINK: {
    SERVICE_URL: 'https://static.genebox.cn/static/service.html',
    PRIVACY_URL: 'https://static.genebox.cn/static/privacy.html',
    COUPON_RULES: 'https://static.genebox.cn/static/coupon.html',
    BARCODE_URL: 'https://static.genebox.cn/static/barcode.html'
  },
  HOTLINE: '4006666780'
}