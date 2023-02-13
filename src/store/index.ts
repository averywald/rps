import Vuex from 'vuex';
import Score from '@/models/score.model';

export default new Vuex.Store({
  state: {
    score: {
      player: 0,
      cpu: 0
    },
    bestOf: 3,
    currentRound: 0, 
  },
  mutations: {
    updateScore(state, score: Score) {
      state.score = score;
      state.currentRound++;
    },
    reset(state) {
      state.score = {
        player: 0,
        cpu: 0
      }
      state.currentRound = 0
    },
    setGameMode(state, bestOf: number) {
      state.bestOf = bestOf;
    }
  },
  // actions: {},
  getters: {
    cpuScore(state) {
      return state.score.cpu;
    },
    playerScore(state) {
      return state.score.player;
    },
    totalScore(state) {
      return state.score;
    },
    currentRound(state) {
      return state.currentRound;
    },
    bestOf(state) {
      return state.bestOf;
    }
  }
})
