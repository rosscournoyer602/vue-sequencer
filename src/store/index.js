import Vuex from "vuex";
import position from "./position";
import clear from "./clear";
import mute from "./mute";
import load from "./load";

export default new Vuex.Store({
  modules: {
    position,
    clear,
    mute,
    load,
  },
});
