import roleList from '../../../../data/ys/role/server.json' with { type: "json" };

export default {
  async paths() {

    return roleList.map((role) => {
      const idList = roleList.map(item => item.id)
      const baseInfo = {
        idList,
        data: role,
        favModalLocalKey: 'vitepress_game_ys_role_fav_modal',
        favLocalKey: 'vitepress_game_ys_role_fav'
      }

      return [
        {
          params: {
            pkg: role.id,
            ...baseInfo,
          }
        },
        {
          params: {
            pkg: role.name,
            ...baseInfo,
          }
        }
      ]
    }).flat()
  }
}