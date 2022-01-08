
import Fetch from '@/server/api.js'
export default {
   sendNumber({ commit }, payload) {
    return commit('SET_NUMBER',payload)
  },
  async fetchStatements({ commit }, payload) {
    const res = await Fetch.getVisionaryStatements(payload.perPage,payload.page)
      return commit('SET_STATEMENT',{response:res,loading:false})
  },
  sendCurrentPage({ commit }, payload) {
   return commit('SET_CURRENT_PAGE',payload)
 },
  isLoading({ commit }, payload) {
   return commit('SET_IS_LOADING',payload)
 },
}