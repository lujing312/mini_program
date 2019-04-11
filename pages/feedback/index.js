import { HOTLINE } from '../../common/const';
//获取应用实例
const app = getApp();

Page({
  data: {
    advice: '',
    iPhoneX: app.globalData.iPhoneX,
    hotline: HOTLINE
  },
  handleSubmit: function(evt) {
    let trimAdvice = evt.detail.value && evt.detail.value.advice.trim() || '';
    if(trimAdvice === '') {
      wx.showToast({
        title: '你还没有输入内容哦',
        icon: 'none'
      })
      return;
    }
    let params = {
      content: trimAdvice
    };
    //提交建议
    app.server.postAdvice(params).then(res => {
      if(!res.status) {
        wx.showToast({
          title: '反馈意见成功',
          icon: 'success'
        });
        setTimeout(function() {
          // 返回上一页
          wx.navigateBack({
            delta: 1
          });
        }, 1000);
      } else {
        wx.showToast({
          title: res.msg || '反馈意见失败',
          icon: 'none'
        });
      }
    })
  }
})