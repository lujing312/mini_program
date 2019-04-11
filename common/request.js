//对wx.request统一封装
class request {
  constructor() {
    this._header = {};
  }

  //设置统一的异常处理
  setErrorHandler(handler) {
    this._errorHandler = handler;
  }

  //GET类型的网络请求
  getRequest(url, data, header = this._header) {
    return this.sendRequest(url, data, header, 'GET');
  }

  //POST类型的网络请求
  postRequest(url, data, header = this._header) {
    return this.sendRequest(url, data, header, 'POST');
  }

  //网络请求
  sendRequest(url, data, header, method) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: header,
        method: method,
        success: res => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            if (typeof this._errorHandler === 'function') {
              this._errorHandler(res);
            }
            reject(res);
          }
        },
        fail: res => {
          if (typeof this._errorHandler === 'function') {
            this._errorHandler(res);
          }
          reject(res);
        }
      });
    });
  }
}

export default request;