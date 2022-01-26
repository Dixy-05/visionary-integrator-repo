import Fetch from '@/server/api.js'
import { chunk } from 'lodash'

export default {
  async vFetchStatements({ commit }, payload) {
    const response = await Fetch.getVisionaryStatements()
    const chunks = chunk(response.data, payload.statementsPerPage)
    return commit('SET_STATEMENTS_CHUNKS', { response: chunks, loading: false })
  },
  async iFetchStatements({ commit }, payload) {
    const response = await Fetch.getIntegratorStatements()
    const chunks = chunk(response.data, payload.statementsPerPage)
    return commit('SET_STATEMENTS_CHUNKS', { response: chunks, loading: false })
  },
  integratorIsCompleted({ commit }, payload) {
    return commit('SET_INTEGRATOR_IS_COMPLETED', payload)
  },
  visionaryIsCompleted({ commit }, payload) {
    return commit('SET_VISIONARY_IS_COMPLETED', payload)
  },
  sendAnswers({ commit }, payload) {
    return commit('SET_ANSWERS', payload)
  },
  async vFetchResults({ commit }, payload) {
    const response = await Fetch.getVisionaryResults(payload)
    return commit('SET_RESULTS', response)
  },
  async iFetchResults({ commit }, payload) {
    const response = await Fetch.getIntegratorResults(payload)
    return commit('SET_RESULTS', response)
  },
  resetState({ commit }) {
    return commit('RESET_STATE')
  },
  isVisionary({ commit }, payload) {
    return commit('IS_VISIONARY', payload)
  },
}
