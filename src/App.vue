<template>
  <div id="wrapper">
    <div id="dashboard">
      <h2>Player: {{ playerScore }}</h2>
      <h2>CPU: {{ cpuScore }}</h2>
    </div>
    <canvas ref="canvas">alt canvas txt</canvas>
    <div id="svgCache" style="display: none;">
      <!-- order of these should match Weapon enum order 😾 -->
      <RockIcon class="icon"/>
      <PaperIcon class="icon"/>
      <ScissorIcon class="icon"/>
    </div>
    <Button title="menu" v-on:click=""/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Score from '@/models/score.model';

import PaperService from '@/services/paper.service';
import GameLogicService from '@/services/gameLogic.service'

import RockIcon from '@/components/icons/Rock.vue';
import PaperIcon from '@/components/icons/Paper.vue';
import ScissorIcon from '@/components/icons/Scissors.vue';

import Button from '@/components/Button.vue';

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
export default class App extends Vue {
  msg!: string

  private score: Score = {
    player: 0,
    cpu: 0
  }

  get playerScore() {
    return this.score.player;
  }

  get cpuScore() {
    return this.score.cpu;
  }

  beforeMount() {
    GameLogicService.init();
  }

  /**
   * wait for the DOM to load before initializing Paper.js service,
   * since it needs a Canvas element reference to bind to
   */
  mounted() {
    let canvas = this.$refs.canvas as HTMLCanvasElement;
    let icons = Array.from(document.getElementsByClassName('icon'));

    PaperService.init(canvas, icons);

    document.addEventListener('outcome', (event) => {
      console.log(event);
      this.score = GameLogicService.score();
    });
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