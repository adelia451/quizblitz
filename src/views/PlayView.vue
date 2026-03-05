<!-- MILESTONE 6
- This view contains your QuestionCard and the game state that was previously in App.vue (questions, currentIndex, score, gameState). 
- When the game ends, use this.$router.push({ name: 'home' }) to return to the start screen (the leaderboard redirect will come once scores are real in Week 9).
- Move your startGame(), handleAnswer(), and resetGame() methods here. 
- Call this.startGame() in the mounted() lifecycle hook so the game begins automatically when the player navigates to /play.
-->

<template>
    <div class="play">
        <h1>QuizBlitz</h1>
        <QuestionCard 
            v-if="gameState === 'playing'" 
            :question="questions[currentIndex]"
            v-on:answer="handleAnswer" 
        />
        <ScoreBoard 
            v-else
                :score="score"
                v-on:restart="resetGame" 
        />
    </div>
</template>

<script>
import ScoreBoard from '../components/ScoreBoard.vue'
import QuestionCard from '../components/QuestionCard.vue'

export default {
    name: 'PlayView',
  
    components: {
        ScoreBoard,
        QuestionCard
    },

    //data returns an object contaiing the reactive variables you want to use in your template or methods
    data() {
        return {
            questions: [
            { question: "What does CSS stand for?", answers: ["Cascading Style Sheets", "Creative Style System", "Computer Style Syntax", "Coloured Screen Sheets"], correct: 0 },
            { question: "What is the capital of France?", answers: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
            { question: "How many sides does a hexagon have?", answers: ["5", "6", "7", "8"], correct: 1 },
            { question: "What planet is closest to the sun?", answers: ["Venus", "Earth", "Mars", "Mercury"], correct: 3 },
            { question: "What is 12 x 12?", answers: ["124", "144", "132", "148"], correct: 1 },
            { question: "What ocean is the largest?", answers: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
            { question: "How many days are in a leap year?", answers: ["365", "366", "364", "367"], correct: 1 },
            { question: "What is the fastest land animal?", answers: ["Lion", "Horse", "Cheetah", "Leopard"], correct: 2 },
            { question: "How many continents are there?", answers: ["5", "6", "7", "8"], correct: 2 },
            { question: "What gas do plants absorb?", answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 }
        ],
            currentIndex: 0,
            score: 0,
            gameState: "playing" // "start" 
        }
    },

    methods: {
        startGame() {
            console.log("Play button clicked")
            this.gameState = "playing" //sets gameState to "playing"
            this.currentIndex = 0 //resets currentIndex to 0
            console.log("Current question: ", this.currentIndex + 1)
        },
        
        //runs when play is clicked, so we want to hide the start screen
        handleAnswer(isCorrect){
            //console.log("Score: ", this.score)
                if (isCorrect) {
                    console.log("Correct: +1")
                    this.score++
                    console.log("Score: ", this.score)
                } else {
                    console.log("Wrong: +0")
                    console.log("Score: ", this.score)
                }
                this.currentIndex++ 
                
                if (this.currentIndex < this.questions.length) {
                    console.log("Current question: ", this.currentIndex + 1)
                }

                if (this.currentIndex === this.questions.length) {
                    console.log ("Final score: ", this.score)
                    
                    this.gameState = "end"
                    console.log("Game over")
                }
        },

        resetGame() {
            console.log("Game is restarting")
            //When the game ends, use this.$router.push({ name: 'home' }) to return to the start screen (the leaderboard redirect will come once scores are real in Week 9).
            //this.gameState = "start"
            this.$router.push({name: 'home'})   
        }
    },

    //Call this.startGame() in the mounted() lifecycle hook so the game begins automatically when the player navigates to /play
    mounted() {
        this.startGame()
        }
}
</script>
