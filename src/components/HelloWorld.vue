<template>
  <div id="wrapper">
    <div id="dashboard">
      <h2>Player: {{ playerScore }}</h2>
      <h2>CPU: {{ cpuScore }}</h2>
    </div>
    <canvas ref="canvas">alt canvas txt</canvas>
    <div id="svgCache" style="display: none;">
      <RockIcon class="icon"/>
      <PaperIcon class="icon"/>
      <ScissorIcon class="icon"/>
    </div>
    <Button title="menu" v-on:click=""/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PaperService from '@/services/paper.service';
import GameLogicService from '@/services/gameLogic.service'

import RockIcon from './icons/Rock.vue';
import PaperIcon from './icons/Paper.vue';
import ScissorIcon from './icons/Scissors.vue';

import Button from './Button.vue';

@Options({
  props: {
    msg: String
  },
  components: {
    RockIcon,
    PaperIcon,
    ScissorIcon,
    Button
  }
})
/**
 * @todo create dashboard component, displaying shootout style best-of config
 * @todo implement menu, button to open, etc.
 */
export default class HelloWorld extends Vue {
  msg!: string

  get playerScore() {
    return GameLogicService.playerScore();
  }

  get cpuScore() {
    return GameLogicService.cpuScore();
  }

  beforeMount() {
    GameLogicService.init();
  }

  mounted() {
    let canvas = this.$refs.canvas as HTMLCanvasElement;
    let icons = Array.from(document.getElementsByClassName('icon'));

    PaperService.init(canvas, icons);
  }
}
</script>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: column;
}

#dashboard {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

canvas, canvas[resize] {
  width: 100vw;
  height: 100%;
}
</style>
