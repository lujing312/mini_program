var __request = wx.request;
var Mock = require('./mock.js');
Object.defineProperty(wx, 'request', { writable: true });
wx.request = function(config) {
  if (typeof Mock._mocked[config.url] == 'undefined') {
    __request(config);
    return;
  }
  var resTemplate = Mock._mocked[config.url].template;
  var response = Mock.mock(resTemplate);
  if (typeof config.success == 'function') {
    config.success({
      statusCode: 200,
      data: response
    });
  }
  if (typeof config.complete == 'function') {
    config.complete({
      statusCode: 200,
      data: response
    });
  }
};
module.exports = Mock;
