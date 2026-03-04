<template>
  <div id="app">
    <h1>QuizBlitz</h1>
    <!-- MILESTONE 2 
    StartScreen should show when showStartScreen is true

    -->
    <StartScreen v-if="showStartScreen" v-on:start="handleStart"/>
    <ScoreBoard v-if="!showStartScreen" v-on:restart="resetGame" :score="score"/>
    <!-- MILESTONE 3 
    QuestionCard should show when showStartScreen
    -->
    <QuestionCard v-if="!showStartScreen" v-on:answer="handleAnswer" />
  </div>
</template>

<script>
// MILESTONE 2
import StartScreen from './components/StartScreen.vue'
import ScoreBoard from './components/ScoreBoard.vue';
import QuestionCard from './components/QuestionCard.vue'

export default {
  name: 'App',
  //MILESTONE 2
  components: {
    StartScreen,
    ScoreBoard,
    QuestionCard
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
      console.log("Play button clicked")
      this.showStartScreen = false
    },
    //runs when play is clocked, so we want to hide the start screen
    handleAnswer(isCorrect) {
      console.log(this.score)
        if (isCorrect) {
          console.log("correct: +1")
          this.score++
          console.log(this.score)
        } else {
          console.log("wrong: +0")
          console.log(this.score)
        }
    },
    
    resetGame(){
      console.log("Game is restarting")
      this.score = 0
      this.showStartScreen = true
    }
  }
}
</script>