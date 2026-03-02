<template>
  <div id="app">
    <h1>QuizBlitz</h1>
    <!-- MILESTONE 2 -->
    <StartScreen v-on:start="handleStart" />
    <ScoreBoard v-on:restart="resetGame" :score="score"/>
  </div>
</template>

<script>
// MILESTONE 2
import StartScreen from './components/StartScreen.vue'
import ScoreBoard from './components/ScoreBoard.vue';

export default {
  name: 'App',
  //MILESTONE 2
  components: {
    StartScreen,
    ScoreBoard
  },
  //data returns an object contaiing the reactive variables you want to use in your template or methods
  data() { 
    return {
      score: 0,
      showStartScreen: true
    }
  },
  methods: {
    handleStart() {
      console.log('Play button clicked')
    },

    resetGame(){
      console.log("Game is restarting!")
      this.score = 0
      this.showStartScreen = true
    }
  }
}
</script>