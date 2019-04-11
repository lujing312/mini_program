//本地开发调试时引用mock文件
// import './mock/index';

//请求后端服务时
import server from './common/server';

//app.js
App({
	onLaunch: function () {
		let self = this;
		//获取设备信息
		wx.getSystemInfo({
			success: function(res) {
				//iPhone X 宽高 375/812
				//iPhone XS Max 和 iPhone XR 宽高 414/896
				if ((res.screenHeight === 812 && res.screenWidth === 375) ||
					res.screenHeight === 896 && res.screenWidth === 414
				) {
					self.globalData.iPhoneX = true
				}
				let system = res.system && res.system.toLowerCase() || ''
				if(system.indexOf('android') > -1) {
					self.globalData.OS = 'android'
				}
				if(system.indexOf('ios') > -1) {
					self.globalData.OS = 'ios'
				}
			}
		})
	},
	globalData: {
		isLogin: false,
		hasReport: false,
		iPhoneX: false,
		OS: 'ios',
		openId: '',
		unionId: '',
		userInfo: {},
		discountIds: [], //当前选中代金券列表
		backFromCoupon: false,
		location: {}, //当前地址
		backFromAddress: false,
		backFromAddressOperate: false,
		boxInfo: {
			index: 0, //当前选中唾液盒索引
			nick: '',//当前选中唾液盒昵称
			num: '' //当前选中唾液盒编号
		},
		backFromGeneboxSelectList: false,
		categoryInfo: {}, //当前选中表型分类
		categoryIndex: 0, //当前选中表型分类索引值
		phenotypeList: [] //表型列表
	},
	server: new server(this)
});