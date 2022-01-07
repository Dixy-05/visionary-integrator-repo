export default {
    SET_NUMBER(state, payload) {
      state[payload.stateProp].push(payload.number)
    },
    SET_INTEGRATOR_STATEMENT(state, payload) {
      state.integratorStatements=payload
    },
    SET_CURRENT_PAGE(state, payload) {
      state.currentPage=payload
    },
  }
  