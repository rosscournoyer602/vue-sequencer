const state = {
  mute: true,
  silentFile: new Audio('../audio/silence.wav')
};

const getters = {
  getMute: state => state.mute 
}

const actions = {
  toggleMute: ({ commit }) => {
    state.silentFile.play();
    commit('setMute')
  }
}

const mutations = {
    setMute: (state) => state.mute = !state.mute
}

export default {
  state,
  getters,
  actions,
  mutations
}