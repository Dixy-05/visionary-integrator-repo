// register mutations
export default {
    SET_USER(state, payload) {
      state.user=payload
    },  
    RESET_STATE(state){
      state.user={}
   
    }

  }
  