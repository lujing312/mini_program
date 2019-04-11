//获取应用实例
// const app = getApp();

// Page({
//   data: {
//     articleInfo: {
//       carousel: [],
//       article: []
//     },
//     showDownload: true
//   },
//   onShow: function () {
//     this.getArticleInfo()
//   },
//   getArticleInfo: function () {
//     let self = this;
//     app.server.getArticleInfo({}).then(res => {
//       if (!res.status) {
//         self.setData({
//           articleInfo: res.data
//         })
//       } else {
//         self.setData({
//           articleInfo: {
//             carousel: [],
//             article: []
//           }
//         })
//         wx.showToast({
//           title: res.msg,
//           icon: 'none'
//         })
//       }
//     })
//   },
//   handleOpenWebView: function(evt) {
//     let dataset = evt.currentTarget.dataset
//     if (dataset.type === 'native') {
//       wx.navigateTo({
//         url: '/pages/explore/qaList/index'
//       })
//     }
//     if (dataset.type === 'webview') {
//       wx.navigateTo({
//         url: '/pages/webview/index?url=' + dataset.link
//       })
//     }
//   },
//   handleOpenDownload: function() {
//     wx.showToast({
//       title: app.globalData.OS,
//       icon: 'none'
//     })
//   },
//   handleCloseDownload: function() {
//     this.setData({
//       showDownload: false
//     })
//   },
//   onShareAppMessage: function () {
//     return {
//       title: 'Genebox基因宝',
//       imageUrl: 'https://static.genebox.cn/explore/share_explore.png'
//     }
//   }
// });

