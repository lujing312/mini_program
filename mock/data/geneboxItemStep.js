module.exports = {
  status: 0,
  msg: '',
  data: {
    nickName: '测试',
    stepList: [
      {
        statusCode: 1,
        overStep: 1,
        statusName: '唾液管已绑定',
        icon: 'https://static.genebox.cn/icon/lab-step/white-step1.png'
      },
      {
        icon: 'https://static.genebox.cn/icon/lab-step/white-step2.png',
        statusCode: 2,
        overStep: 1,
        statusName: '唾液管回寄中（1-4天）'
      },
      {
        statusName: '实验室确认收件',
        statusCode: 3,
        icon: 'https://static.genebox.cn/icon/lab-step/white-step3.png',
        overStep: 1
      },
      {
        statusCode: 4,
        overStep: 1,
        icon: 'https://static.genebox.cn/icon/lab-step/white-step4.png',
        statusName: 'DNA提取和质检完成',
        errMsg: 'DNA质检未通过，我们会尽快进行一次重新提取操作，若再次不合格我们的客服会与你联系。'
      },
      {
        icon: 'https://static.genebox.cn/icon/lab-step/gray-step5.png',
        statusName: 'DNA扩增中',
        statusCode: 5,
        overStep: 0
      },
      {
        overStep: 0,
        statusCode: 6,
        statusName: 'DNA扩增完成',
        icon: 'https://static.genebox.cn/icon/lab-step/gray-step6.png'
      },
      {
        icon: 'https://static.genebox.cn/icon/lab-step/gray-step7.png',
        statusName: '芯片杂交洗染中',
        overStep: 0,
        statusCode: 7
      },
      {
        icon: 'https://static.genebox.cn/icon/lab-step/gray-step8.png',
        statusCode: 8,
        overStep: 0,
        statusName: '芯片杂交洗染完成'
      },
      {
        overStep: 0,
        icon: 'https://static.genebox.cn/icon/lab-step/gray-step9.png',
        statusCode: 9,
        statusName: '芯片上机检测完成'
      },
      {
        statusCode: 10,
        icon: 'https://static.genebox.cn/icon/lab-step/gray-step10.png',
        overStep: 0,
        statusName: '数据分析中'
      },
      {
        statusCode: 11,
        icon: 'https://static.genebox.cn/icon/lab-step/gray-step11.png',
        statusName: '分析结果生成',
        overStep: 0
      }
    ]
  }
}
