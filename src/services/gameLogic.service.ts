import Weapon from '@/models/weapon.model';
import Outcome from '@/models/outcome.model';
import Opponent from '@/models/opponent.model';
import store from '@/store';

export default class GameLogicService {
    /**
     * checks to see if a winner has been determined, and the game should be reset
     * @returns if the set of rounds has been spent, or a player has majority wins
     */
    public static isGameOver(): boolean {
        const playerScore = store.getters['playerScore'];
        const cpuScore = store.getters['cpuScore'];
        const bestOf = store.getters['bestOf'];
        const currentRound = store.getters['currentRound'];

        // check if rounds have been all played
        if (currentRound > bestOf) {
            return true;
        }
        // check if someone has the majority wins needed
        return playerScore > (bestOf / 2)
            || cpuScore > (bestOf / 2);
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

    public static reset(): void {
        store.dispatch('reset');
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

        debugger;

        switch (GameLogicService.battle(playerChoice, cpuChoice)) {
            case Outcome.WIN: store.dispatch('playerScored');
            case Outcome.LOSS: store.dispatch('cpuScored');
            case Outcome.TIE: store.dispatch('nobodyScored');
        }

        // wait for animations to finish
        setTimeout(() => {
            if (GameLogicService.isGameOver()) {            
                store.dispatch('endGame', GameLogicService.determineWinner());
                GameLogicService.reset();
            }
        }, 1500);
    }

    /**
     * @returns whether the player won or not
     */
    private static determineWinner(): Opponent {
        const playerScore = store.getters['playerScore'];
        const cpuScore = store.getters['cpuScore'];

        if (playerScore == cpuScore) {
            return Opponent.NONE;
        }
        return playerScore > cpuScore ? Opponent.PLAYER : Opponent.CPU;
    }

    /**
     * @returns randomly selected index, cast into Weapon enum
     */
    private static selectCpuWeapon(): Weapon {
        return Math.floor(Math.random() * 3) as Weapon;
    }

    /**
     * @returns whether the player won, lost or tied
     */
    private static battle(playerChoice: Weapon, cpuChoice: Weapon): Outcome {
        if (playerChoice == cpuChoice) {
            return Outcome.TIE;
        }
        let outcome: Outcome = ((playerChoice + 1) % 3) !== cpuChoice ? Outcome.WIN : Outcome.LOSS;
        return outcome;
    }
}
