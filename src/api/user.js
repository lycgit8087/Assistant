import request from '@/utils/request'

//获取短信验证
export const getSms = payload => {
  return request("sms_vcode_get", "/?c=api", {
      data:payload
  })
}


//用户注册绑定
export const userBind = payload => {
    return request("user_bind", "/?c=api", {
        data:payload
    })
  }


  //用户信息展示
export const userInfo = () => {
    return request("user_info", "/?c=api", {})
}



  //更新令牌
  export const tokenUpdate = () => {
    return request("user_token_update", "/?c=api", {})
}