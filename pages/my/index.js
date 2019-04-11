import login from '../../common/login';
import { HOTLINE } from '../../common/const';
//获取应用实例
const app = getApp();

Page({
  data: {
    isLogin: false,
    userInfo: {},
    unreadMsgCount: 0
  },
  onShow: function() {
    this.setData({
      isLogin: app.globalData.isLogin,
      userInfo: app.globalData.userInfo
    })
  },
  handleGetUserInfo: function(evt) {
    wx.showLoading({
      title: '登录中...',
      mask: true
    })
    if (evt.detail.userInfo) {
      let self = this;
      //请求登录接口
      login(app, () => {
        wx.hideLoading()
        //修改显示
        self.setData({
          isLogin: true,
          userInfo: evt.detail.userInfo
        })
        //同步到全局
        app.globalData.isLogin = true
        app.globalData.userInfo = evt.detail.userInfo
        //获取未读消息
        app.server.getUnreadMsg({}).then(res => {
          if (!res.status) {
            self.setData({
              unreadMsgCount: res.data.count
            })
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })
      });
    } else {
      this.setData({
        isLogin: false,
        userInfo: {}
      });
      app.globalData.isLogin = false;
      app.globalData.userInfo = {};
      wx.showToast({
        title: '授权失败，部分功能不能用哦',
        icon: 'none',
        duration: 2000
      })
    }
  },
  handleOpenPage: function(evt) {
    wx.navigateTo({
      url: evt.currentTarget.dataset.path + '?from=my'
    })
  },
  handleBindBox: function() {
    app.server.checkBindPhone().then(res => {
      if(!res.status) {
        //已绑定手机号
        wx.showActionSheet({
          itemList: ['扫一扫', '手动输入编号'],
          success: function(res) {
            if(res.tapIndex === 0) {
              wx.scanCode({
                scanType: ['barCode', 'qrCode'],
                success: function(res) {
                  //根据内容跳转不同页面
                  //如果是分享二维码，匹配 share:xxx，跳转编辑唾液盒页面
                  //否则跳转绑定唾液盒页面
                  if(res.result.indexOf('share') > -1) {
                    wx.navigateTo({
                      url: '/pages/geneBox/edit/index?from=qrcode&res=' + encodeURIComponent(res.result)
                    });
                  } else {
                    wx.navigateTo({
                      url: '/pages/bindBox/manualInput/index?num=' + res.result
                    });
                  }
                }
              });
            }
            if(res.tapIndex === 1) {
              wx.navigateTo({
                url: '/pages/bindBox/manualInput/index'
              });
            }
          },
          fail: function(res) {
            console.log(res);
          }
        });
      } else {
        // 未绑定手机号，跳转绑定页面
        wx.navigateTo({
          url: '/pages/mobile/stepOne/index'
        });
        return
      }
    })
  },
  handleContact: function() {
    wx.showActionSheet({
      itemList: ['客服热线：' + HOTLINE],
      success: function(res) {
        if(res.tapIndex === 0) {
          wx.makePhoneCall({
            phoneNumber: HOTLINE
          });
        }
      },
      fail: function(res) {
        console.log(res);
      }
    });
  }
})