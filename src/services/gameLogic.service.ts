import Weapon from '@/models/weapon.model';
import Outcome from '@/models/outcomes.model'

import store from '@/store';

export default class GameLogicService {
    /**
     * checks to see if a winner has been determined, and the game should be reset
     * @returns if the set of rounds has been spent, or a player has majority wins
     */
    public static isGameOver(): boolean {
        // check if rounds have been all played
        if (store.getters['currentRound'] > store.getters['bestOf']) {
            return true;
        }

        // check if someone has the majority wins needed
        return store.getters['playerScore'] > store.getters['bestOf'] / 2
            || store.getters['cpuScore'] > store.getters['bestOf'] / 2;
    }

    /**
     * Set up the initial game state;
     * can be used to reset the game, start a new one, etc.
     * 
     * @param bestOf number of total rounds to play; default 3 (in store)
     */
    public static init(bestOf: number = -1): void { 
        if (bestOf != -1 ) {
            store.commit('setGameMode', bestOf);
        }
    }

    /**
     * 
     * @param playerChoice weapon of choice
     * @param cpuChoice random weapon of choice
     */
    public static runRound(playerChoice: Weapon): void {
        let cpuChoice = GameLogicService.selectCpuWeapon();
        // update store, so Paper.js service can update the UI
        store.commit('playerChoice', playerChoice);
        store.commit('cpuChoice', cpuChoice);

        switch (GameLogicService.battle(playerChoice, cpuChoice)) {
            case Outcome.WIN: store.commit('playerWon');
            case Outcome.LOSS: store.commit('cpuWon');
            case Outcome.TIE: store.commit('tie');
        }

        if (GameLogicService.isGameOver()) {            
            let alertString = '';
            switch(GameLogicService.determineWinner()) {
                case Outcome.WIN: alertString = 'Player Won!'
                case Outcome.LOSS: alertString = 'CPU Won...'
                case Outcome.TIE: alertString = 'Nobody Won!!!'
            }
            store.commit('reset'); // reset game state in store
        }
    }

    private static determineWinner(): Outcome {
        if (store.getters['playerScore'] == store.getters['cpuScore']) {
            return Outcome.TIE;
        }
        return store.getters['playerScore'] > store.getters['cpuScore']
            ? Outcome.WIN
            : Outcome.LOSS;
    }

    /**
     * @returns randomly selected index, cast into Weapon enum
     */
    private static selectCpuWeapon(): Weapon {
        return Math.floor(Math.random() * 2) + 1 as Weapon;
    }

    /**
     * @returns whether the player won, lost or tied
     */
    private static battle(playerChoice: Weapon, cpuChoice: Weapon): Outcome {
        // debugger;

        if (playerChoice == cpuChoice) {
            return Outcome.TIE;
        }
        
        return ((playerChoice + 1) % 3) !== cpuChoice ? Outcome.WIN : Outcome.LOSS;
    }
}
