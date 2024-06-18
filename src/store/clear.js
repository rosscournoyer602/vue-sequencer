const state = {
  clear: true
};

const getters = {
  getClear: state => state.clear 
}

const actions = {
  clearSteps: ({ commit }) => {
    commit('setClear', true);
  },
  unclear: ({ commit }) => {
    commit('setClear', false);
  }
}

const mutations = {
    setClear: (state, bool) => state.clear = bool
}

export default {
  state,
  getters,
  actions,
  mutations
}