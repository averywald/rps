import Weapon from '@/models/weapon.model';
import Outcome from '@/models/outcome.model';
import Opponent from '@/models/opponent.model';
import store from '@/store';

export default class GameLogicService {

    /**
     * Set up the initial game state;
     * can be used to reset the game, start a new one, etc.
     * 
     * @param bestOf number of total rounds to play; default 3 (in store)
     */
    public static init(bestOf: number | null): void { 
        store.dispatch('reset', bestOf ? bestOf : store.getters['bestOf']);
    }

    /**
     * 
     * @param playerChoice weapon of choice
     * @param cpuChoice random weapon of choice
     */
    public static runRound(playerChoice: Weapon): void {
        const bestOf = store.getters['bestOf'];
        const cpuChoice = GameLogicService.randomWeapon();

        // update store, so Paper.js service can update the UI
        store.dispatch('playerSelectedWeapon', playerChoice);
        store.dispatch('cpuSelectedWeapon', cpuChoice);

        switch (GameLogicService.battle(playerChoice, cpuChoice)) {
            case Outcome.WIN: 
                store.dispatch('playerScored');
                break;
            case Outcome.LOSS: 
                store.dispatch('cpuScored');
                break;
            case Outcome.TIE: 
                store.dispatch('nobodyScored');
                break;
            default: 
                break;
        }

        // wait for animations to finish
        setTimeout(() => {
            if (GameLogicService.isGameOver()) {            
                store.dispatch('endGame', GameLogicService.determineWinner());
                GameLogicService.init(bestOf);
            }
        }, 1500);
    }

    /**
     * checks to see if a winner has been determined, and the game should be reset
     * @returns if the set of rounds has been spent, or a player has majority wins
     */
    public static isGameOver(): boolean {
        const playerScore = store.getters['playerScore'];
        const cpuScore = store.getters['cpuScore'];
        const bestOf = store.getters['bestOf'];
        const currentRound = store.getters['currentRound'];

        // check not in "forever mode"
        if (bestOf != -1) {
            // check if rounds have been all played
            if (currentRound > bestOf) {
                return true;
            }
            // check if someone has the majority wins needed
            return playerScore > (bestOf / 2)
                || cpuScore > (bestOf / 2);
        }

        return false;
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
    private static randomWeapon(): Weapon {
        return Math.round((Math.random() * 20) / 10) as Weapon;
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
