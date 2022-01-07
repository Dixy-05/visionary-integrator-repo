
import Fetch from '@/server/api.js'
export default {
   sendNumber({ commit }, payload) {
    return commit('SET_NUMBER',payload)
  },
  async fetchVisionaryStatements({ commit }, payload) {
    const response=await Fetch.getVisionaryStatements(payload.perPage,payload.page)
    return commit('SET_VISIONARY_STATEMENT',response)
  },
  sendCurrentPage({ commit }, payload) {
   return commit('SET_CURRENT_PAGE',payload)
 },
}