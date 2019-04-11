//获取应用实例
const app = getApp();
const RESEND_GAP = 60

Page({
  data: {
    phone: '',
		time: RESEND_GAP,
		reget: false,
		isInputFocus: true,
		code: '',
		typingCodeLength: 0
  },
  onLoad: function (query) {
    this.setData({
      phone: query.phone
    })
    this.setCountdown();
		this.handleSetFocus();
  },
  //验证码输入时获取验证码
	handleInputChange(evt) {
		this.setData({
      code: evt.detail.value,
      typingCodeLength: evt.detail.value.length
    });
    if (this.data.typingCodeLength === 4) {
      this.setData({
        isInputFocus: false
      })
      this.handleSubmit()
    }
	},
	handleSetFocus() {
		this.setData({
			isInputFocus: true
		})
  },
	setCountdown: function (options) {
		let self = this
		let currentTime = self.data.time
		let countdownInterval = setInterval(function () {
			currentTime--;
			self.setData({
				time: currentTime
			})
			if (currentTime <= 0) {
				clearInterval(countdownInterval)
				self.setData({
          time: RESEND_GAP,
          reget: true
				})
			}
		}, 1000)
	},
	handleResendCode:function(){
    let self = this
    let params = {
      phone: this.data.phone
    }
		app.server.getVerificationCode(params).then(res => {
      if(!res.status) {
        self.setData({
          code: '',
          time: RESEND_GAP,
          reget: false,
          typingCodeLength: 0
        })
		    self.handleSetFocus();
        self.setCountdown();
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
	},
  handleSubmit() {
    let self = this
    let params = {
      phone: self.data.phone,
      deviceType: 3,
      verificationCode: self.data.code
    }
    app.server.bindPhone(params).then(res => {
      if(!res.status) {
        //回退
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  }
});