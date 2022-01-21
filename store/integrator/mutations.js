// integrator mutations
export default {
  SET_STATEMENTS_CHUNKS(state, payload) {
    state.statementsChunks=payload.response;
    state.isLoading=payload.loading
  },
  SET_VISIONARY_IS_COMPLETED(state, payload) {
    state.visionaryIsCompleted=payload
  },
  SET_ANSWERS(state,payload){
    state.allAnswers[payload.index]=payload.answers
  },
  SET_RESULTS(state, payload) {
    state.results=payload
  },
  RESET_STATE(state){
    state.visionaryIsCompleted=false
    state.allAnswers=[]
  }

}
