<template>
    <button>
        {{ text }}
    </button>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  
  @Options({
    props: {
      title: String
    },
    components: {}
  })
  export default class Button extends Vue {
    title!: string

    get text() {
        return this.title;
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  button {
    display: flex;
    flex-direction: column;
    margin: 1vw;
    padding: 1vw;
  }
  </style>
  