// import { ysApi } from "@server/ys-api";
import { ysApi } from "../../../../server/ys-api"

export default {
  async paths() {
    const res = await ysApi.role;
    
    return res.map((role) => {
      return {
        params: {
          pkg: role.id,
          list: res,
          data: role
        }
      }
    })
  }
}