import Vuex, { ActionContext } from 'vuex';
import Weapon from '@/models/weapon.model';
import Opponent from '@/models/opponent.model';

/**
 * model for the "state" prop of the vuex store;
 * 
 * used to get a matching vuex "context" param
 * in marooned functions
 */
interface IStoreState {
  score: {
    player: number;
    cpu: number;
  };
  bestOf: number;
  currentRound: number;
  selection: {
    player: Weapon;
    cpu: Weapon
  },
  winner: Opponent;
}

/**
 * ends a round of RPS; nullify weapon selection
 * 
 * @param context the vuex dispatch context to call mutations by
 */
function refreshRound(context: ActionContext<IStoreState, IStoreState>, round: number): void {
  context.commit('resetWeaponSelection');
  context.commit('setCurrentRound', round);
}

/**
 * define the vuex store's state
 * 
 * @note implements IStoreState
 */
const stateModel = {
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
};

export default new Vuex.Store({
  state: stateModel,
  mutations: {
    setPlayerWeaponSelection(state, weapon: Weapon) {
      state.selection.player = weapon;
    },
    setCpuWeaponSelection(state, weapon: Weapon) {
      state.selection.cpu = weapon;
    },
    setPlayerScore(state, score: number) {
      state.score.player = score;
    },
    setCpuScore(state, score: number) {
      state.score.cpu = score;
    },
    setCurrentRound(state, round: number) {
      state.currentRound = round;
    },
    setBestOf(state, bestOf: number) {
      state.bestOf = bestOf;
    },
    setWinner(state, opponent: Opponent) {
      state.winner = opponent;
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
    }
  },
  actions: { 
    playerSelectedWeapon(context, weapon: Weapon) {
      context.commit('setPlayerWeaponSelection', weapon);
    },
    cpuSelectedWeapon(context, weapon: Weapon) {
      context.commit('setCpuWeaponSelection', weapon);
    },
    // apply delay on actions for "rock, paper, scissors, shoot!" animation
    playerScored(context) {
      setTimeout(() => {
        context.commit('setPlayerScore', this.getters['playerScore'] + 1);
        const round = this.getters['currentRound'];
        refreshRound(context, round + 1);
      }, 1000);
    },
    cpuScored(context) {
      setTimeout(() => {
        context.commit('setCpuScore', this.getters['cpuScore'] + 1);
        const round = this.getters['currentRound'];
        refreshRound(context, round + 1);
      }, 1000);
    },
    nobodyScored(context) {
      setTimeout(() => {
        context.commit('setCurrentRound', this.getters['currentRound'] + 1);
        const round = this.getters['currentRound'];
        refreshRound(context, round + 1);
      }, 1000);
    },
    reset(context, bestOf: number) {
      context.commit('resetScore');
      context.commit('resetRound');
      context.commit('resetWinner');
      context.commit('resetWeaponSelection');
      context.commit('setBestOf', bestOf ? bestOf : 3);
    },
    endGame(context, opponent: Opponent) {
      context.commit('setWinner', opponent);
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
