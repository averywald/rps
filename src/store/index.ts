import Vuex, { Store } from 'vuex';
import Weapon from '@/models/weapon.model';
import Opponent from '@/models/opponent.model';

export default new Vuex.Store({
  state: {
    score: {
      player: 0,
      cpu: 0
    },
    bestOf: 3,
    currentRound: {
      number: 1,
      playerChoice: Weapon.NONE,
      cpuChoice: Weapon.NONE
    },
    winner: Opponent.NONE
  },
  mutations: {
    playerChoice(state, weapon: Weapon) {
      state.currentRound.playerChoice = weapon;
    },
    cpuChoice(state, weapon) {
      state.currentRound.cpuChoice = weapon;
    },
    playerWon(state) {
      state.score.player++;
      state.currentRound.number++;
      state.currentRound.playerChoice = Weapon.NONE;
      state.currentRound.cpuChoice = Weapon.NONE;
    },
    cpuWon(state) {
      state.score.cpu++;
      state.currentRound.number++;
      state.currentRound.playerChoice = Weapon.NONE;
      state.currentRound.cpuChoice = Weapon.NONE;
    },
    tie(state) {
      state.currentRound.number++;
      state.currentRound.playerChoice = Weapon.NONE;
      state.currentRound.cpuChoice = Weapon.NONE;
    },
    reset(state) {
      state.score = {
        player: 0,
        cpu: 0
      }
      state.currentRound.number = 1;
      state.winner = Opponent.NONE;
    },
    setGameMode(state, bestOf: number) {
      state.bestOf = bestOf;
    },
    sweetVictory(state, winner: Opponent) {
      state.winner = winner;
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
      return state.currentRound.number;
    },
    bestOf(state) {
      return state.bestOf;
    },
    playerChoice(state): Weapon {
      return state.currentRound.playerChoice;
    },
    cpuChoice(state): Weapon {
      return state.currentRound.cpuChoice;
    },
    winner(state): Opponent {
      return state.winner;
    }
  }
})
