
// 根据相同一项组成新数据

 function filter_identical(arr, name) {
    var map = arr.reduce((p, c) => [p[c[name]] = p[c[name]] || [], p[c[name]].push(c), p][2], {})
    var result = Object.keys(map).map(i => map[i])
    let new_result = []
    for (let i in result) {
      new_result.push({
        title: result[i][0][name],
        data: result[i]
      })
    }
    return new_result
  }

  // 检测用户名
 function userNameValidator(val) {
    return /^[\u4E00-\u9FA5]{2,4}$/.test(val);
  }

  // 检测一位以上中文
 function textValidator(val) {
  return /[A-Za-z0-9]|[\u4e00-\u9fa5]|[\u4e00-\u9fa5][\w\W]/.test(val);
}

//   检测手机号码
 function phoneValidator(val) {
    return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(val);
  }
//   检测六位数验证码

  function  smsValidator(val) {
    return /\d{6}/.test(val);
  }


// 深度克隆对象
 function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  function sortBy(field) {
    return (x, y) => {
        var a = x[field].toLowerCase();
        var b = y[field].toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
}

// 防抖函数		1.搜索功能   2.window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次。

 function debounce(fn, delay){
  let timeout = null
  return function(){
    let args = arguments
    if(timeout) window.clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}




  module.exports = {
    filter_identical,
    phoneValidator,
    cloneObject,
    userNameValidator,
    sortBy,
    smsValidator,
    textValidator,
    debounce
  };