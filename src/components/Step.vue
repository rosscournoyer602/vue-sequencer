<template>
  <div
    class="step"
    :class="[
      this.position.position === pos ? 'step--green' : '',
      this.clicked === true ? 'step--clicked' : '',
      this.position.position === pos && this.clicked === true
        ? 'step--played'
        : '',
    ]"
    @click="click"
  ></div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Step",
  data() {
    return {
      clicked: false,
    };
  },
  updated() {
    if (this.position.position === this.$props.pos && this.clicked == true) {
      this.play();
    }
  },
  props: {
    pos: Number,
    effect: String,
    clear: Boolean,
  },
  methods: {
    ...mapActions(["unclear"]),
    ...mapGetters(["getMute", "getSounds", "getAudioContext"]),
    click() {
      this.unclear();
      this.clicked = !this.clicked;
    },
    play() {
      const sounds = this.getSounds();
      const context = this.getAudioContext();
      if (this.getMute() !== true) {
        const sound = context.createBufferSource();
        sound.buffer = sounds[this.effect];
        sound.connect(context.destination);
        sound.start();
      }
    },
  },
  watch: {
    clear(newValue, oldValue) {
      if (oldValue === false && newValue === true) this.clicked = false;
    },
  },
  computed: mapState({
    position: (state) => state.position,
    effectSrc: (state) => {
      switch (this.effect) {
        case "hihat":
          return state.audio.hihat;
        case "cowbell":
          return state.audio.cowbell;
        case "clap":
          return state.audio.clap;
        case "snare":
          return state.audio.snare;
        case "kick":
          return state.audio.kick;
        default:
          return "";
      }
    },
  }),
};
</script>

<style scoped>
.step {
  margin: 5px auto;
  height: 15px;
  width: 15px;
  background-color: rgb(129, 129, 129);
}
.step--green {
  background-color: rgb(83, 243, 83);
}
.step--clicked {
  background-color: aqua;
}
.step--played {
  background-color: hotpink !important;
}
</style>
