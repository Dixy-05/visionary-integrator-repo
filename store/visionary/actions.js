// visionary actions
import { chunk } from 'lodash'
import Fetch from '@/server/api.js'
export default {
   sendNumber({ commit }, payload) {
    return commit('SET_NUMBER',payload)
  },
  async fetchStatements({ commit }, payload) {
    const response = await Fetch.getVisionaryStatements()
    const chunks=chunk(response.data,payload.statementsPerPage)
    return commit('SET_STATEMENTS_CHUNKS',{response:chunks,loading:false})
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
},
sendAnswers({commit},payload){
  return commit('SET_ANSWERS',payload)
}

} 