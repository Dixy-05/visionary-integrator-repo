export default {
    SET_NUMBER(state, payload) {
      state[payload.stateProp].push(payload.number)
    },
    SET_VISIONARY_STATEMENT(state, payload) {
      state.visionaryStatements=payload
    },
    SET_CURRENT_PAGE(state, payload) {
      state.currentPage=payload
    },
  }
  