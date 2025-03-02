import roleList from '../../../../data/ys/role/server.json' with { type: "json" };

export default {
  async paths() {

    return roleList.map((role) => {
      const idList = roleList.map(item => item.id)

      return {
        params: {
          pkg: role.id,
          idList,
          data: role
        }
      }
    })
  }
}