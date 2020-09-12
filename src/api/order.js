import request from '@/utils/request'



// 在线下单
export const online = payload => {
    return request("order_online", "/?c=api", {
        data: payload
    })
}



// 订单地址清洗
export const addrClean = payload => {
    return request("order_addr_clean", "/?c=api", {
        data: payload
    })
}



// 订单列表
export const list = payload => {
    return request("order_list", "/?c=api", {
        data: payload
    })
}




// 获取订单及物流信息
export const detail = payload => {
    return request("order_detail", "/?c=api", {
        data: payload
    })
}



// 订单编辑
export const edit = payload => {
    return request("order_edit", "/?c=api", {
        data: payload
    })
}


// 匹配快递公司
export const expressMatching = payload => {
    return request("order_express_matching", "/?c=api", {
        data: payload
    })
}



// 订单删除
export const del = payload => {
    return request("order_del", "/?c=api", {
        data: payload
    })
}


// 订单导出
export const orderExport = payload => {
    return request("order_export", "/?c=api", {
        data: payload
    })
}