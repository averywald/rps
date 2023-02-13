import {describe, expect, test} from '@jest/globals';

import Weapon from '@/models/weapon.model';
import Outcome from '@/models/outcome.model';

import GameLogicService from '@/services/gameLogic.service';

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg }
//     })
//     expect(wrapper.text()).to.include(msg)
//   })
// })

describe('GameLogicService', () => {
    test('gives correct outcomes for battle', () => {        
        let protoAccess = Object.getPrototypeOf(GameLogicService);
        
        expect(protoAccess.battle(Weapon.ROCK, Weapon.ROCK)).toBe(Outcome.TIE);
        expect(protoAccess.battle(Weapon.ROCK, Weapon.PAPER)).toBe(Outcome.LOSS);
        expect(protoAccess.battle(Weapon.ROCK, Weapon.SCISSORS)).toBe(Outcome.WIN);

        expect(protoAccess.battle(Weapon.PAPER, Weapon.ROCK)).toBe(Outcome.WIN);
        expect(protoAccess.battle(Weapon.PAPER, Weapon.PAPER)).toBe(Outcome.TIE);
        expect(protoAccess.battle(Weapon.PAPER, Weapon.SCISSORS)).toBe(Outcome.LOSS);

        expect(protoAccess.battle(Weapon.SCISSORS, Weapon.ROCK)).toBe(Outcome.LOSS);
        expect(protoAccess.battle(Weapon.SCISSORS, Weapon.PAPER)).toBe(Outcome.WIN);
        expect(protoAccess.battle(Weapon.SCISSORS, Weapon.SCISSORS)).toBe(Outcome.TIE);
    })
})
