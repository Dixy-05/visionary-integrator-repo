export default {
  // visionary getters
  results: (state) => {
    return state.results.data[0].answers
  },
  statementsChunks: (state) => {
    return state.statementsChunks
  },
  integratorIsComplete: (state) => {
    return state.integratorIsComplete
  },
  allAnswers: (state) => {
    return state.allAnswers
  },
}
