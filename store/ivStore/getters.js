export default {
  // ivStore
  vResults: (state) => {
    return state.vResults.data[0].answers
  },
  iResults: (state) => {
    return state.iResults.data[0].answers
  },
  integratorIsCompleted: (state) => {
    return state.integratorIsCompleted
  },
  visionaryIsCompleted: (state) => {
    return state.visionaryIsCompleted
  },
  statementsChunks: (state) => {
    return state.statementsChunks
  },
  allAnswers: (state) => {
    return state.allAnswers
  },
  isVisionary: (state) => {
    return state.isVisionary
  },
}
