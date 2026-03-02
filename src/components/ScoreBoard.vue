<!-- MILESTONE 2 
INSTRUCTIONS:
    - This component receives one prop: score (a Number). 
    - It displays the final score and a Play Again button. 
    - When Play Again is clicked, it emits "restart".

MY NOTES:
> you can insert JS expressions inside double curly braces
-->

<template> 
    <div class = "score-board"> 
        <!-- heading -->
         <h2>Score Board</h2>
        <!-- display score using the prop -->
        <p>Your score: {{ score }} /  10</p>
        <!-- Play Again button with click handler-->
         <button v-on:click="playAgainButton">Play Again</button>
    </div>
</template>

<script>
export default {
    name: 'ScoreBoard',
    props: {
        score: Number
    },
    methods: {
        // method to emit "restart"
        playAgainButton() {
            this.$emit('restart') //parent listens for event 'restart' is App.vue
        }
    }
}
</script>
