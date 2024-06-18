const state = {
  position: 0
};

const getters = {
  getCurrentPos: state => state.position 
}

const actions = {
  run: ({ commit }) => {
    if (state.position === 16) {
      commit('setCurrentPos', 1);
    } else {
      commit('setCurrentPos', state.position + 1)
    }
  },
  stop: ({ commit }) => {
    commit('setCurrentPos', 0);
  }
}

const mutations = {
    setCurrentPos: (state, position) => state.position = position
}

export default {
  state,
  getters,
  actions,
  mutations
}