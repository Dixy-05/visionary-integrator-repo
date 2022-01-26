// integrator getters
export default {
  results: (state) => {
    return state.results.data[0].answers
  },
  statementsChunks: (state) => {
    return state.statementsChunks
  },
  visionaryIsComplete: (state) => {
    return state.visionaryIsComplete
  },
  allAnswers: (state) => {
    return state.allAnswers
  },
}
