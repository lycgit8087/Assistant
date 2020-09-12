import request from '@/utils/request'



// 下单渠道添加
export const linkAdd = payload => {
    return request("order_links_add", "/?c=api", {
        data: payload
    })
}


//   下单渠道编辑
export const linkEdit = payload => {
    return request("order_links_edit", "/?c=api", {
        data: payload
    })
}


//   下单渠道删除
export const linkDele = payload => {
    return request("order_links_del", "/?c=api", {
        data: payload
    })
}


//   下单渠道列表

export const linkList = payload => {
    return request("order_links_list", "/?c=api", {
        data: payload
    })
}


//   下单渠道分享

export const linkShareConfig = payload => {
    return request("order_links_share_config", "/?c=api", {
        data: payload
    })
}