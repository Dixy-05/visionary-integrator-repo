// integrator actions

import { chunk } from 'lodash'
import Fetch from '@/server/api.js'
export default {
   sendNumber({ commit }, payload) {
    return commit('SET_NUMBER',payload)
  },
  async fetchStatements({ commit }, payload) {
    const response = await Fetch.getIntegratorStatements()
    const chunks=chunk(response.data,payload.statementsPerPage)
    return commit('SET_STATEMENTS_CHUNKS',{response:chunks,loading:false})
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
 },
 sendAnswers({commit},payload){
  return commit('SET_ANSWERS',payload)
}

}