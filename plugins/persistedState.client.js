import createPersistedState from 'vuex-persistedstate'
// import SecureLS from "secure-ls";
// const ls = new SecureLS({ isCompression: false });

export default ({store}) => {
  createPersistedState({
    key: 'vuex',
    paths: ['integrator.allAnswers','visionary.allAnswers','register.user','visionary.integratorIsCompleted','integrator.visionaryIsCompleted'],
    // storage:window.sessionStorage,
    // storage:{
    //         getItem:(key)=>ls.get(key),
    //         setItem:(key,value)=>ls.set(key,value),
    //         removeItem:(key)=>ls.remove(key),
    //         removeAll:()=>ls.removeAll()
    // },
  })(store)
}