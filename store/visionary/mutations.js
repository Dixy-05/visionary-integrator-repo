// visionary mutations
export default {
    SET_NUMBER(state, payload) {
      state[payload.stateProp].push(payload.number)
    },
    SET_STATEMENTS_CHUNKS(state, payload) {
      state.statementsChunks=payload.response;
      state.isLoading=payload.loading
    },
    SET_IS_LOADING(state, payload) {
      state.isLoading=payload
    },
    SET_INTEGRATOR_IS_COMPLETED(state, payload) {
      state.integratorIsCompleted=payload
    },
    SET_RESULTS(state, payload) {
      state.results=payload
    },
    SET_ANSWERS(state,payload){
      state.allAnswers[payload.index]=payload.answers
    }
  }
  