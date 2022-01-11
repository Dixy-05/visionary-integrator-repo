// register actions
import Fetch from '@/server/api.js'
export default {
   async registerUser({ commit }, payload) {
    const response=await Fetch.registerUser(payload)
    console.log('actionsRegister:',response.data)
    return commit('SET_USER',response)
  },
} 