import request from '@/utils/request'


// 供应商编辑
export const edit = payload => {
    return request("supplier_edit", "/?c=api", {
        data:payload
    })
  }




  // 供应商列表
export const list = payload => {
    return request("supplier_list", "/?c=api", {
        data:payload
    })
  }



    // 获取供应商及下单渠道信息
export const detail = payload => {
    return request("supplier_detail", "/?c=api", {
        data:payload
    })
  }