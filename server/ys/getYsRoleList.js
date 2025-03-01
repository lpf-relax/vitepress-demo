import _ from 'lodash'

const GET_YS_ROLE_LIST_URL = "https://act-api-takumi-static.mihoyo.com/common/blackboard/ys_obc/v1/home/content/list?app_sn=ys_obc&channel_id=25"

const GET_YS_ROLE_DETAIL = "https://act-api-takumi-static.mihoyo.com/hoyowiki/genshin/wapi/entry_page?app_sn=ys_obc&lang=zh-cn&entry_page_id="

const safeParse = (str, de) => {
  try {
    return JSON.parse(str)
  } catch (error) {
    return de
  }
}
const getDetailsInfo = (res) => {
  try {

    const data = safeParse(res.modules.find(item => item.name === "基础信息").components[0].data)
    return {
      avatar_m: data.avatar_m,
      avatar_pc: data.avatar_pc,
      attr: data.attr.map(item => ([item.key, Array.isArray(item.value) ? item.value.join() : item.value]))
    }
  } catch (error) {

  }
}

const getDestinyInfo = (res) => {
  try {
    return safeParse(res.modules.find(item => item.name === "命之座").components[0].data).tables[0].row
  } catch (error) {

  }
}

const getSkillInfo = (res) => {
  try {
    return safeParse(res.modules.find(item => item.name === "天赋").components[0].data)
      .list
      .map(item => ({
        title: item.title,
        desc: item.desc,
        icon: item.icon,
      }))
  } catch (error) {

  }
}

export const getYsRoleList = async () => {
  const res = await fetch(GET_YS_ROLE_LIST_URL).then(res => res.json()).catch(() => [])

  if (res.retcode !== 0) {
    return [];
  }

  const roleList = [];
  for await (const role of res.data.list[0].list) {
    const roleDetails = await fetch(`${GET_YS_ROLE_DETAIL}${role.content_id}`).then(res => res.json()).then(res => res.data?.page || {}).catch(() => ({}));

    const details = getDetailsInfo(roleDetails)
    const attrInfo = JSON.parse(JSON.parse(role.ext).c_25.filter.text).map((item) => item.split('/'))
    details?.attr?.forEach(item => {
      if (attrInfo.some(attr => attr[0] === item[0])) {
        return
      }
      attrInfo.push(item)
    })

    roleList.push({
      id: role.content_id,
      name: role.title,
      summary: role.summary,
      icon: role.icon,
      avatar: {
        m: details?.avatar_m,
        pc: details?.avatar_pc,
      },
      attrs: attrInfo,
      destiny: getDestinyInfo(roleDetails),
      skill: getSkillInfo(roleDetails),
    })
  }


  return roleList
}
