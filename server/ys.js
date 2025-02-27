// 角色
const GET_YS_ROLE_LIST_URL = "https://act-api-takumi-static.mihoyo.com/common/blackboard/ys_obc/v1/home/content/list?app_sn=ys_obc&channel_id=25"
const getYsRoleList = async () => {
    const res = await fetch(GET_YS_ROLE_LIST_URL).then(res => res.json())

    if (res.retcode !== 0) {
        return ;
    }
    return res.data.list[0].list.map(role => ({
        id: role.content_id,
        name: role.title,
        summary: role.summary,
        icon: role.icon,
        filters: JSON.parse(JSON.parse(role.ext).c_25.filter.text).map(item => item.split('/'))
    }))
}
console.log('getYsRoleList', getYsRoleList())