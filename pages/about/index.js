import { LINK } from '../../common/const';

Page({
  data: {
    serviceUrl: LINK.SERVICE_URL,
    privacyUrl: LINK.PRIVACY_URL
  },
  handleOpenPage: function(evt) {
    wx.navigateTo({
      url: evt.currentTarget.dataset.path
    })
  }
})