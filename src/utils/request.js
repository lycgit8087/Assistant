import axios from 'axios';
import { Toast,Notify  } from 'vant';
import api from '../api'
import qs from 'qs'
import router from '../router'
let requestCount = 0;
let loadingInstance = null
let timer;
const root = process.env.API_ROOT;
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

const codeMessage = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

// 处理接口（系统）和网络异常
const errorHandler = error => {
  if (error && error.response) {
    const { response } = error
    const errorText = codeMessage[response.status] || response.statusText
    const { status, url } = response

    Notify({
      message: `请求错误${errorText} ${status}: ${url}`,
      type: 'danger',
      duration: 3 * 1000
    })
  } else {
    Notify({
      message: `网络异常`,
      type: 'danger',
      duration: 3 * 1000
    })
  }
}

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // console.log(config.headers.action)
    if(config.headers.action!="token_get"&&requestCount === 0&&config.headers.action!="qrcode_get"){
        loadingInstance=  Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration:0
          })
    }
    requestCount++
    const token = localStorage.getItem("token");
    config.baseURL = ''
    config.url = root + config.url;
    config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
    config.timeout = 15000  //超时时间
    config.data = qs.stringify(config.data);
    if(config.headers.action.indexOf("token")==-1){
      //设置请求头
    config.headers = {
        'Content-Type':'application/x-www-form-urlencoded',
        "action":config.headers.action,
        "token":token
      }
    }else{
      if(config.headers.action =="user_token_update"){
        config.headers = {
          'Content-Type':'application/x-www-form-urlencoded',
          "action":"user_token_update",
          "token":token

        }
      }else{
        config.headers = {
          'Content-Type':'application/x-www-form-urlencoded',
          "action":config.headers.action,
        }
      }

     
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

function tryHideLoading() {
  requestCount-- 
  //采用setTimeout是为了解决一个请求结束后紧接着有另一请求发起导致loading闪烁的问题
  timer = setTimeout(() => {    
    if (requestCount === 0) {
      if(loadingInstance){
        loadingInstance.clear()
        clearTimeout(timer)
      }
     
    }
  })
}

//http response 拦截器
axios.interceptors.response.use(
  response => {
      const token_time = parseInt(localStorage.getItem("token_time")) ;
      let now_time=Date.parse(new Date())
      let is_get_token=((token_time-now_time)/60000)<10&&((token_time-now_time)/60000)>0
      
      if(is_get_token&&token_time){
          api.user.tokenUpdate().then(res=>{
            localStorage.setItem("token",res.token)
            localStorage.setItem("token_time",res.token_expires)
          })
      }
      tryHideLoading()

      if(response.data.response_code==-1){
        let errmessage = response.data.response_msg.toLowerCase()
        if(errmessage.indexOf("token")!=-1){
            Notify({
                message: response.data.response_msg,
                type: 'warning',
                duration: 3 * 1000
              })
          localStorage.setItem("token", "");
          let indexUrl=localStorage.getItem("indexUrl")
          window.location.href=indexUrl
        }else{
          Notify({
            message: errmessage,
            type: 'warning',
            duration: 3 * 1000
          })
          
        return Promise.reject(response)

        }      
      }else{
        return response.data;

      }
  },
  error => {
    tryHideLoading()
    errorHandler(error)
    return Promise.reject(error)
  }
)



 export default function(action,url, params = {}) {
  const defaultConfig = {
    url,
    method: 'POST',
    timeout: 1000 * 20,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      action:action
    },
    baseURL: process.env.API_ROOT,
    withCredentials: true, // 允许cookie跨域
    useToken: true, // 是否需要token
    useErrorTips: true // 默认系统提示
  }
  const newConfig =Object.assign(defaultConfig,params) 
  // token 开关
  // if (newConfig.useToken) {
  //   const token = storage.get(ACCESS_TOKEN)
  //   newConfig.headers = {
  //     token,
  //     ...newConfig.headers
  //   }
  // }
  return axios(newConfig)
}



