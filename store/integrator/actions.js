import Fetch from '@/server/api.js'
export default {
   sendNumber({ commit }, payload) {
    return commit('SET_NUMBER',payload)
  },
  async fetchIntegratorStatements({ commit }, payload) {
    const response=await Fetch.getIntegratorStatements(payload.perPage,payload.page)
    return commit('SET_INTEGRATOR_STATEMENT',response)
  },
  sendCurrentPage({ commit }, payload) {
   return commit('SET_CURRENT_PAGE',payload)
 },
}