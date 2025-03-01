import roleList from '../../../../data/ys/role/server.json' with { type: "json" };

export default {
  async paths() {

    return roleList.map((role) => {
      return {
        params: {
          pkg: role.id,
          list: roleList,
          data: role
        }
      }
    })
  }
}