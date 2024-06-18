const AudioContext = window.AudioContext || window.webkitAudioContext;

const state = {
  audioContext: new AudioContext(),
  allSoundsLoaded: false,
  soundsReady: 0,
  sounds: {}
};

const getters = {
  getSounds: state => state.sounds,
  getAudioContext: state => state.audioContext
}

const actions = {
  loadAudio: ({ commit }, soundObject) => {
    const keys = Object.keys(soundObject);
    const pathPrefix = './audio/';

    keys.forEach(key => {
      fetch(`${pathPrefix}${soundObject[key]}`).then(result => {
        result.arrayBuffer().then(buffer => {
          state.audioContext.decodeAudioData(buffer, (audioBuffer) => {
            commit('setSounds', {
              ...state.sounds,
              [key]: audioBuffer
            });
            commit('incrementSoundsFinished');
            if (state.soundsReady === keys.length) {
              commit('setAllSoundsLoaded', true);
            }
          });
        });
      });
    })
  }
}

const mutations = {
  setSounds: (state, sounds) => state.sounds = sounds,
  setAllSoundsLoaded: (state, bool) => state.allSoundsLoaded = bool,
  incrementSoundsFinished: (state) => state.soundsReady += 1
}

export default {
  state,
  getters,
  actions,
  mutations
}