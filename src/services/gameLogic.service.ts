import Weapon from '@/models/weapon.model';
import Outcome from '@/models/outcomes.model';
import Score from '@/models/score.model';

export default class GameLogicService {

    private static totalScore: Score
    private static roundsPlayed: number;
    private static bestOf: number;

    public static score(): Score {
        return GameLogicService.totalScore;
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

    /**
     * Set up the initial game state;
     * can be used to reset the game, start a new one, etc.
     * 
     * @param bestOf number of total rounds to play; default 3
     */
    public static init(bestOf: number = 3): Score { 
        GameLogicService.bestOf = bestOf; // set game duration
        GameLogicService.totalScore = {
            player: 0,
            cpu: 0
        };
        GameLogicService.roundsPlayed = 0;

        return GameLogicService.score();
    }

    /**
     * 
     * @param playerChoice weapon of choice
     * @param cpuChoice random weapon of choice
     * 
     * @todo emit CustomEvent for Vue to consume, when a winner is chosen
     * @todo make CPU random weapon choice
     */
    public static runRound(playerChoice: Weapon): void {
        let cpuChoice = GameLogicService.selectCpuWeapon();
        let outcome: Outcome = GameLogicService.battle(playerChoice, cpuChoice);

        if (outcome == Outcome.WIN) {
            GameLogicService.totalScore.player++;
        }

        if (outcome == Outcome.LOSS) {
            GameLogicService.totalScore.cpu++;
        }

        GameLogicService.roundsPlayed++;

        document.dispatchEvent(new CustomEvent('outcome', {
            // use to attach data as prop
            // detail: {} 
        }));

        if (GameLogicService.isGameOver()) {
            // emit event to bubble to Vue?
        }
    }

    /**
     * @returns randomly selected index, cast into Weapon enum
     */
    private static selectCpuWeapon(): Weapon {
        return Math.floor(Math.random() * 2) as Weapon;
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
}
