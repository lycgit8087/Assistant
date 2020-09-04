import request from '@/utils/request'



// 代理商添加
export const add = payload => {
    return request("agent_add", "/?c=api", {
        data:payload
    })
  }



  // 代理商编辑
export const edit = payload => {
    return request("agent_edit", "/?c=api", {
        data:payload
    })
  }



  // 代理商删除
export const del = payload => {
    return request("agent_del", "/?c=api", {
        data:payload
    })
  }



    // 代理商删除
export const list = payload => {
    return request("agent_list", "/?c=api", {
        data:payload
    })
  }




      // 代理商删除
export const detail = payload => {
    return request("agent_detail", "/?c=api", {
        data:payload
    })
  }