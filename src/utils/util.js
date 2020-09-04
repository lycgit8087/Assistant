
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

//   检测手机号码
 function validator(val) {
    return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(val);
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




  module.exports = {
    filter_identical,
    validator,
    cloneObject,
    sortBy
  };