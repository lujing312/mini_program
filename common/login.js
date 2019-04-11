const login = (app, callback) => {
  wx.login({
    success: loginRes => {
      wx.getUserInfo({
        success: function(res) {
          let params = {
            ...app.globalData.userInfo,
            code: loginRes.code,
            rawData: res.rawData,
            signature: res.signature,
            encryptedData: res.encryptedData,
            iv: res.iv
          }
          //请求登录接口
          app.server.login(params).then(res => {
            if (!res.status) {
              //缓存openId和unionId
              app.globalData.openId = res.data.openId;
              app.globalData.unionId = res.data.unionId;
              //将用户登录信息设置到请求头
              app.server.setHeader({
                utt: res.data.utt,
                utk: res.data.utk,
                utv: res.data.utv
              });
              typeof callback === 'function' && callback();
            } else {
              wx.hideLoading()
            }
          });
        },
        fail: () => {
          wx.hideLoading()
          app.globalData.isLogin = false;
        }
      })
    },
    fail: () => {
      wx.hideLoading()
      app.globalData.isLogin = false;
    }
  });
};

export default login;