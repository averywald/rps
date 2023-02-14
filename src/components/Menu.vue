<template>
<div id="wrapper">
    <MenuButton @click="toggleMenu"/>
    <div id="button-container" v-if="showMenu">
        <button @click="reset">Reset Game</button>
        <button @click="setGameMode(3)">Best of 3</button>
        <button @click="setGameMode(5)">Best of 5</button>
        <button @click="setGameMode(-1)">Free</button>
    </div>
</div>
</template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import GameLogicService from '@/services/gameLogic.service';
import MenuButton from '@/components/MenuButton.vue';

@Options({
// props: {},
components: {
    MenuButton
}
})
export default class Menu extends Vue {
    private shouldShowMenu: boolean = false;

    get showMenu(): boolean {
        return this.shouldShowMenu;
    }

    public toggleMenu(): void {
        this.shouldShowMenu = !this.shouldShowMenu;
    }

    public reset(): void {
        GameLogicService.init(null);
    }

    public setGameMode(bestOf: number): void {
        GameLogicService.init(bestOf);
    }
}
</script>

<style scoped>
  div#wrapper {
    display: flex;
    flex-direction: row;
  }

  div#button-container {
    display: flex;
    justify-content: space-evenly;
    width: 100%
  }

  button {
    display: flex;
    margin: 1vw;
    padding: 1vw;
    width: fit-content;
    justify-content: center;
    align-items: center;
  }

  img#menu-icon {
    width: 3vw;
    height: 3vw;
  }
</style>
  