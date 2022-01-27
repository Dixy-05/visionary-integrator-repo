export default {
  SET_STATEMENTS_CHUNKS(state, payload) {
    state.statementsChunks = payload.response
    state.isLoading = payload.loading
  },
  SET_INTEGRATOR_IS_COMPLETED(state, payload) {
    state.integratorIsCompleted = payload
  },
  SET_VISIONARY_IS_COMPLETED(state, payload) {
    state.visionaryIsCompleted = payload
  },
  SET_ANSWERS(state, payload) {
    state.allAnswers[payload.index] = payload.answers
  },
  SET_VISIONARY_RESULTS(state, payload) {
    state.vResults = payload
  },
  SET_INTEGRATOR_RESULTS(state, payload) {
    state.iResults = payload
  },
  RESET_STATE(state) {
    state.integratorIsCompleted = false
    state.visionaryIsCompleted = false
    state.isVisionary = false
    state.allAnswers = []
  },
  IS_VISIONARY(state, payload) {
    state.isVisionary = payload
  },
  RESET_ALL_ANSWERS(state) {
    state.allAnswers = []
  },
}
