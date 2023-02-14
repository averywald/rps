<template>
    <button>
        <img id="menu-icon" src="@/assets/menu-svgrepo-com.svg"/>
    </button>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  
  @Options({
    components: {}
  })
  export default class MenuButton extends Vue {}
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  button {
    display: flex;
    flex-direction: column;
    margin: 1vw;
    padding: 1vw;
    width: fit-content; 
  }

  img#menu-icon {
    width: 3vw;
    height: 3vw;
  }
  </style>
  