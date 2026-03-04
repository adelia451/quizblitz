<!-- MILESTONE 3
INSTRUCTIONS: 
        {
        question: "What does CSS stand for?",
        answers: ["Cascading Style Sheets", "Creative Style System", "Computer Style Syntax", "Coloured Screen Sheets"],
        correct: 0
        }
- It receives a single prop called question (the object shape described above). 
- It renders the question text and four answer buttons.
- When a button is clicked, it highlights the correct answer green and the wrong answer red for 1 second, then emits "answer" with true (correct) or false (wrong).
    - Is there a v-for on the buttons with a :key?
    - Is there a data() property managing which button is selected and which is correct?
    - Is setTimeout used with a 1-second delay?
    - Does it $emit('answer', true/false)?
-->

<template> 
    <div class = "question-card"> <!--question-card div that renders the question text-->
        <p>{{question.question}}</p>
        <!--for each answer in the array ANSWERS, make one button automatically, instead of writing 4 separate BUTTON tags-->
        <!--:KEY creates a unique identifier for each button it creates -->
        <!--when button 0 is clicked it calls selectAnswer(0) -->
        <!--:CLASS - this button was clicked AND it is the right answer ... this button was clocked AND it is the wrong answer
            inde = buttons number, selectedIndex = the button clicked, question.correct = the number of the right nswer (0
            correct: is the class name from my CSS that I want to turn on or off from these conditions)
            -->
        <button v-for="(answer, index) in question.answers":key="index" 
                v-on:click="selectAnswer(index)"
                :class="{correct: index === selectedIndex && index === question.correct, wrong: index === selectedIndex && index !== question.correct}">
                {{ answer }}
        </button> 
    </div>
</template>

<script>
export default {
    name: 'QuestionCard',

    data() {
         return {
            selectedIndex: null //means this variable starts empty because its job is to remember which button the user clicked
    //         question: {
    //             question: "What does CSS stand for?",
    //             answers: [ "Cascading Style Sheets", "Creative Style System", "Computer Style Syntax", "Coloured Screen Sheets"],
    //             correct: 0
    //         },
    //         selectedIndex: null //means this variable starts empty because its job is to remember which button the user clicked
         }
     },

    props: {
        question: Object
    },

    methods: {
        //This function runs when a button is clicked. INDEX here is whatever number got passes in from the click.
        selectAnswer(index){
            this.selectedIndex = index //this updates the empty variable from before
            
            //this takes two things, a function to run after the delay and the delay in milliseonds
            //setTimeout(() => { stuff that happens after 1 second }, 1000)
            setTimeout(() => {
                //this following line does the actual checking, calculates true or false and stores it in isCorrect
                const isCorrect = index == this.question.correct //QUESTION.CORRECT is hardcoded to 0 so if it is equal to zero
                this.$emit('answer', isCorrect) //this then takes the true or false that was already calculated and sends it to the parent
                this.selectedIndex = null //resets the selectedIndex
            }, 1000)
        }
    }
}
</script>
