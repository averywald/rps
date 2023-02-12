import Weapon from '@/models/weapon.model';
import Outcome from '@/models/outcomes.model';

export default class GameLogicService {
    private static score = {
        player: 0,
        cpu: 0
    }
    private static roundsPlayed: number = 0;
    private static bestOf: number;

    public static playerScore(): number {
        return GameLogicService.score.player;
    }

    public static cpuScore(): number {
        return GameLogicService.score.cpu;
    }

    public static round(): number {
        return GameLogicService.roundsPlayed;
    }

    /**
     * 
     * @returns if the set of rounds has been spent, or a player has majority wins
     * 
     * @todo check if a player has majority wins
     */
    public static isGameOver(): boolean {
        // check if rounds have been all played
        return GameLogicService.roundsPlayed == GameLogicService.bestOf;
    }

    public static init(bestOf: number = 3): void { 
        GameLogicService.bestOf = bestOf; // set game duration
    }

    /**
     * 
     * @param playerChoice weapon of choice
     * @param cpuChoice random weapon of choice
     * 
     * @todo emit CustomEvent for Vue to consume, when a winner is chosen
     */
    public static runRound(playerChoice: Weapon, cpuChoice: Weapon): void {
        let outcome: Outcome = GameLogicService.battle(playerChoice, cpuChoice);

        if (outcome == Outcome.WIN) {
            GameLogicService.score.player++;
        }

        if (outcome == Outcome.LOSS) {
            GameLogicService.score.cpu++;
        }

        GameLogicService.roundsPlayed++;

        if (GameLogicService.isGameOver()) {
            // emit event to bubble to Vue?
        }
    }

    /**
     * @returns whether the player won, lost or tied
     */
    private static battle(playerChoice: Weapon, cpuChoice: Weapon): Outcome {
        if (playerChoice == cpuChoice) {
            return Outcome.TIE;
        }
        
        return ((playerChoice - cpuChoice + 3) % 3) === 1 ? Outcome.WIN : Outcome.LOSS;
    }

    // private static determineWinner(): boolean { }
}