import _ from 'lodash'
import * as cheerio from "cheerio"


const GET_ROLE_LIST_URL = "https://act-api-takumi-static.mihoyo.com/common/blackboard/zzz_wiki/v1/home/content/list?app_sn=zzz_wiki&channel_id=2"

const GET_ROLE_DETAIL = "https://act-api-takumi-static.mihoyo.com/hoyowiki/zzz/wapi/entry_page?app_sn=zzz_wiki&lang=zh-cn&entry_page_id="

const safeParse = (str, de) => {
  try {
    return JSON.parse(str)
  } catch (error) {
    return de
  }
}
const getDetailsInfo = (res) => {
  try {

    const data = safeParse(res.modules.find(item => item.id === "2").components[0].data)
    return {
      avatar_m: data.tachie_m,
      avatar_pc: data.tachie_pc,
    }
  } catch (error) {

  }
}

const getDestinyInfo = (res) => {
  try {
    return safeParse(res.modules.find(item => item.id === "8").components[0].data).tables[0].row.map(item => {
      return [
        cheerio.load(item[0]).text(),
        cheerio.load(item[1]).text()
      ]
    })
  } catch (error) {

  }
}

const getSkillInfo = (res) => {
  try {
    return safeParse(res.modules.find(item => item.id === "4").components[0].data)
      .list
      .map(item => item.children.map(v => ({
        title: v.title,
        desc: cheerio.load(v.desc).text(),
        icon: v.animated_icon,
      }))).flat()
  } catch (error) {

  }
}

export const getRoleList = async () => {
  const res = await fetch(GET_ROLE_LIST_URL).then(res => res.json()).then(res => res?.data?.list?.[0]?.children).catch(() => [])

  const roloInfoList = res?.find(item => item.name === "代理人")?.list
  if (!roloInfoList) {
    return [];
  }


  const roleList = [];
  for await (const roleInfo of roloInfoList) {
    const attrInfo = safeParse(safeParse(roleInfo.ext)?.c_43.filter.text, [])?.map(item => item.split('/')) || []

    const roleDetails = await fetch(`${GET_ROLE_DETAIL}${roleInfo.content_id}`, {
      headers: {
        'accept':
          'application/json, text/plain, */*',
        'accept-encoding':
          'gzip, deflate, br, zstd',
        'accept-language':
          'zh-CN,zh;q=0.9',
        'connection':
          'keep-alive',
        'host':
          'act-api-takumi-static.mihoyo.com',
        'origin':
          'https://baike.mihoyo.com',
        'referer':
          'https://baike.mihoyo.com/',
        'sec-ch-ua':
          '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
        'sec-ch-ua-mobile':
          '?0',
        'sec-ch-ua-platform':
          "Windows",
        'sec-fetch-dest':
          'empty',
        'sec-fetch-mode':
          'cors',
        'sec-fetch-site':
          'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
        'x-rpc-wiki_app': 'zzz'
      }
    }).then(res => res.json()).then(res => {
      return res.data?.page || {}
    }).catch(() => ({}));
    const details = getDetailsInfo(roleDetails)

    roleList.push({
      id: roleInfo.content_id,
      name: roleInfo.alias_name,
      summary: roleInfo.title,
      icon: roleInfo.icon,
      attrs: attrInfo,
      avatar: {
        m: details?.avatar_m,
        pc: details?.avatar_pc,
      },
      destiny: getDestinyInfo(roleDetails),
      skill: getSkillInfo(roleDetails),
    })
  }

  return roleList
}
