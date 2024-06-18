<template>
  <div>
    <div class="main-grid">
      <div class="main-grid__row">
        <Step v-for="n in 16" :key="n" :pos="n" effect="hihat" :clear="clear" />
      </div>
      <div class="main-grid__row">
        <Step
          v-for="n in 16"
          :key="n"
          :pos="n"
          effect="cowbell"
          :clear="clear"
        />
      </div>
      <div class="main-grid__row">
        <Step v-for="n in 16" :key="n" :pos="n" effect="clap" :clear="clear" />
      </div>
      <div class="main-grid__row">
        <Step v-for="n in 16" :key="n" :pos="n" effect="snare" :clear="clear" />
      </div>
      <div class="main-grid__row">
        <Step v-for="n in 16" :key="n" :pos="n" effect="kick" :clear="clear" />
      </div>
    </div>
    <div class="main-controls">
      <button class="main-controls__button" @click="play">Play</button>
      <button class="main-controls__button" @click="clearAllSteps">
        Clear
      </button>
      <button class="main-controls__button" @click="reset">Stop</button>
      <div class="main-controls__audio-toggle">
        <img :src="mute" @click="toggleAudio" />
      </div>
    </div>
  </div>
</template>

<script>
import Step from "./Step.vue";
import { mapActions, mapState } from "vuex";
import { soundData } from "../config";

export default {
  name: "Steps",
  beforeMount() {
    this.loadAudioFiles();
  },
  components: {
    Step,
  },
  methods: {
    ...mapActions(["run", "stop", "clearSteps", "toggleMute", "loadAudio"]),
    play() {
      clearInterval(this.playbackLoop);
      this.playbackLoop = setInterval(() => this.run(), 120);
    },
    reset() {
      clearInterval(this.playbackLoop);
      this.stop();
    },
    clearAllSteps() {
      this.clearSteps();
    },
    toggleAudio() {
      this.toggleMute();
      const dummyAudio = new Audio("./audio/silence.wav");
      dummyAudio.play();
    },
    loadAudioFiles() {
      this.loadAudio(soundData);
    },
  },
  computed: mapState({
    position: (state) => state.position,
    clear: (state) => state.clear.clear,
    mute: function (state) {
      if (state.mute.mute === true) {
        return "/images/volume-mute-solid.svg";
      }
      return "/images/volume-up-solid.svg";
    },
  }),
};
</script>

<style scoped>
.main-grid {
  width: 350px;
  margin: 20px auto;
}

.main-grid__row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: space-around;
}

.main-controls {
  width: 350px;
  margin: 20px auto;
  text-align: center;
}

.main-controls__button {
  display: inline-block;
  margin: 0 20px;
}

.main-controls__audio-toggle img {
  height: 20px;
  width: 20px;
  color: gray;
  margin: 10px auto;
}
</style>
