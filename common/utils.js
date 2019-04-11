//生成随机字符串
export const getRandomStr = () => {
  return Math.random().toString(36).substr(2);
}

/**
 * 将对象 key 值按 ASCII 码从小到大排序后输出
 * 如：
 * 输入：{s:1,a:2,ab:3,b:4}
 * 输出：{a:2,ab:3,b:4,s:1}
 */
export const orderObjByKey = (obj) => {
  if(!obj) {
    return {};
  }

  //获取对象所有 key 并按 ASCII 码排序
  let keys = Object.keys(obj).sort(),
    res = {};

  for(let i = 0, len = keys.length; i < len; i++) {
    let item = keys[i];
    //过滤掉值为 undefined 的
    if(obj[item] !== undefined) {
      res[item] = obj[item];
    }
  }

  return res;
}

/**
 * 将对象转为 get 请求字符串格式
 * 如：
 * 输入：{a:1,b:2}
 * 输出：'a=1&b=2'
 */
export const getQueryStr = (obj) => {
  if(!obj) {
    return '';
  }
  
  let keys = Object.keys(obj),
    res = '';

  for(let i = 0, len = keys.length; i < len; i++) {
    let item = keys[i];
    res += '&' + item + '=' + (obj[item] === undefined ? '' : obj[item]);
  }

  return res.substr(1);
}

// 将数字字符串按 4 个数字分隔
export const splitNumber = num => {
  if(num) {
    return num.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ');
  } else {
    return num;
  }
}