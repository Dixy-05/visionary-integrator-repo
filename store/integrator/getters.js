// integrator getters
export default {
  results: (state) => {
    return state.results.data[0].answers
  },
  visionaryIsCompleted: (state) => {
    return state.visionaryIsCompleted
  },
  statementsChunks: (state, g, rs, rootGetters) => {
    return state.statementsChunks
  },
  allAnswers: (state, getters, rootState, rootGetters) => {
    return state.allAnswers
  },
}
