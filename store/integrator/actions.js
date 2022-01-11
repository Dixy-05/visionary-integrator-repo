// integrator actions
import Fetch from '@/server/api.js'
export default {
   sendNumber({ commit }, payload) {
    return commit('SET_NUMBER',payload)
  },
  async fetchStatements({ commit }, payload) {
    const res = await Fetch.getIntegratorStatements(payload.perPage,payload.page)
      return commit('SET_STATEMENT',{response:res,loading:false})
  },
  isLoading({ commit }, payload) {
   return commit('SET_IS_LOADING',payload)
 },
  visionaryIsCompleted({ commit }, payload) {
   return commit('SET_VISIONARY_IS_COMPLETED',payload)
 },
 async fetchResults({commit},payload){
    const response= await Fetch.getIntegratorResults(payload)
   return commit('SET_RESULTS',response)
 }
}