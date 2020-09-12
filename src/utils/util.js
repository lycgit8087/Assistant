
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

  // 检测字符不为空
 function textValidator(val) {
  return val.length>0;
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


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function formatTimetimestamp(timestamp, format) {
  　　const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  　　let returnArr = [];
  　　let date = new Date(timestamp); //13位的时间戳,    如果不是13位的,  就要乘1000,就像这样 let date = new Date(timestamp*1000)
  　　let year = date.getFullYear()
  　　let month = date.getMonth() + 1
  　　let day = date.getDate()
  　　let hour = date.getHours()
  　　let minute = date.getMinutes()
  　　let second = date.getSeconds()
  　　returnArr.push(year, month, day, hour, minute, second);
  　　returnArr = returnArr.map(formatNumber);
  　　for (var i in returnArr) {
    　　format = format.replace(formateArr[i], returnArr[i]);
  }
  　　return format;
}




  module.exports = {
    filter_identical,
    phoneValidator,
    cloneObject,
    userNameValidator,
    sortBy,
    smsValidator,
    textValidator,
    debounce,
    formatTimetimestamp
  };