import roleList from '../../../../data/starRail/role/server.json' with { type: "json" };

export default {
  async paths() {

    return roleList.map((role) => {
      const idList = roleList.map(item => item.id)

      return {
        params: {
          pkg: role.id,
          idList,
          data: role,
          favModalLocalKey: 'vitepress_game_star_rail_role_fav_modal',
          favLocalKey: 'vitepress_game_star_rail_role_fav',
        }
      }
    })
  }
}