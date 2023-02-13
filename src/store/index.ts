import Vuex from 'vuex';
import Weapon from '@/models/weapon.model';
import Opponent from '@/models/opponent.model';

export default new Vuex.Store({
  state: {
    score: {
      player: 0,
      cpu: 0
    },
    bestOf: 3,
    currentRound: 1,
    selection: {
      player: Weapon.NONE,
      cpu: Weapon.NONE
    },
    winner: Opponent.NONE
  },
  mutations: {
    playerChoice(state, weapon: Weapon) {
      state.selection.player = weapon;
    },
    cpuChoice(state, weapon: Weapon) {
      state.selection.cpu = weapon;
    },
    playerScore(state, score: number) {
      state.score.player = score;
    },
    cpuScore(state, score: number) {
      state.score.cpu = score;
    },
    nextRound(state, round: number) {
      state.currentRound = round;
    },
    resetScore(state) {
      state.score = {
        player: 0,
        cpu: 0
      }
    },
    resetRound(state) {
      state.currentRound = 1;
    },
    resetWinner(state) {
      state.winner = Opponent.NONE;
    },
    setGameMode(state, bestOf: number) {
      state.bestOf = bestOf;
    },
    sweetVictory(state, opponent: Opponent) {
      state.winner = opponent;
    }
  },
  actions: { 
    // apply delay on actions for "rock, paper, scissors, shoot!" animation
    playerScored(context) {
      setTimeout(() => {
        context.commit('playerScore', this.getters['playerScore'] + 1);
      }, 1000);
    },
    cpuScored(context) {
      setTimeout(() => {
        context.commit('cpuScore', this.getters['cpuScore'] + 1);
      }, 1000);
    },
    nobodyScored(context) {
      setTimeout(() => {
        context.commit('nextRound', this.getters['currentRound'] + 1);
      }, 1000);
    },
    reset(context) {
      context.commit('resetScore');
      context.commit('resetRound');
      context.commit('resetWinner');
    },
    endGame(context, opponent: Opponent) {
      context.commit('sweetVictory', opponent);
    }
  },
  getters: {
    cpuScore(state): number {
      return state.score.cpu;
    },
    playerScore(state): number {
      return state.score.player;
    },
    currentRound(state): number {
      return state.currentRound;
    },
    bestOf(state): number {
      return state.bestOf;
    },
    playerChoice(state): Weapon {
      return state.selection.player;
    },
    cpuChoice(state): Weapon {
      return state.selection.cpu;
    },
    winner(state): Opponent {
      return state.winner;
    }
  }
})
