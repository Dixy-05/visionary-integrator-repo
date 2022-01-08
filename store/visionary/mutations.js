export default {
    SET_NUMBER(state, payload) {
      state[payload.stateProp].push(payload.number)
    },
    SET_STATEMENT(state, payload) {
      state.statements=payload.response;
      state.isLoading=payload.loading
    },
    SET_CURRENT_PAGE(state, payload) {
      state.currentPage=payload
    },
    SET_IS_LOADING(state, payload) {
      state.isLoading=payload
    },
  }
  