// visionary actions
import Fetch from '@/server/api.js'
export default {
   sendNumber({ commit }, payload) {
    return commit('SET_NUMBER',payload)
  },
  async fetchStatements({ commit }, payload) {
    const res = await Fetch.getVisionaryStatements(payload.perPage,payload.page)
      return commit('SET_STATEMENT',{response:res,loading:false})
  },
  isLoading({ commit }, payload) {
   return commit('SET_IS_LOADING',payload)
 },
 integratorIsCompleted({ commit }, payload) {
  return commit('SET_INTEGRATOR_IS_COMPLETED',payload)
},
async fetchResults({commit},payload){
  const response= await Fetch.getVisionaryResults(payload)
 return commit('SET_RESULTS',response)
}

} 