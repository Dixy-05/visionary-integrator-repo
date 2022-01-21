// visionary actions
import { chunk } from 'lodash'
import Fetch from '@/server/api.js'
export default {
  async fetchStatements({ commit }, payload) {
    const response = await Fetch.getVisionaryStatements()
    const chunks=chunk(response.data,payload.statementsPerPage)
    return commit('SET_STATEMENTS_CHUNKS',{response:chunks,loading:false})
  },
 integratorIsCompleted({ commit }, payload) {
  return commit('SET_INTEGRATOR_IS_COMPLETED',payload)
},
sendAnswers({commit},payload){
  return commit('SET_ANSWERS',payload)
},
async fetchResults({commit},payload){
  const response= await Fetch.getVisionaryResults(payload)
 return commit('SET_RESULTS',response)
},
resetState({commit}){
  return commit('RESET_STATE')
}
} 