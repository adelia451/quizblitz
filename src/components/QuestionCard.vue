<!-- MILESTONE 10 2.7.2 -- replaces template -->
<!-- :disabled="selectedAnswer !== null" disables all buttons once an answer has been chosen. 
    This is a cleaner approach than tracking a separate answered flag. 
-->
<template>
  <div class="question-card">
    <p class="question-text">{{ question.question }}</p>
    <div class="answers">
      <button
        v-for="(answer, index) in question.answers"
        :key="index"
        :class="buttonClass(index)"     
        :disabled="selectedAnswer !== null" 
        @click="selectAnswer(index)"
      >
        {{ answer }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'QuestionCard',

    data() {
         return {
            //removed in milestone 10 2.7.2
            // nothing needed here — state comes from props
         }
     },

    // milestone 10 from 2.7.2 - QuestionCard now receives two props instead of one
    props: {
        question: {
            type: Object,
            required: true
            // { question: String, answers: Array, correct: Number }
        },
        selectedAnswer: {   //selectedAnswer comes from the store (store.selectAnswer)
            type: Number,
            default: null
            // null = no answer chosen yet
            // 0/1/2/3 = the index of the button the player clicked
        }
    },

    //milestone 10 2.7.2 - all of this was replaced
    methods: {
        selectAnswer(index) {
            if (this.selectedAnswer !== null) return  // already answered, ignore
            this.$emit('answer', index)
        },
        buttonClass(index) {
            if (this.selectedAnswer === null) return ''
            if (index === this.question.correct) return 'correct'
            if (index === this.selectedAnswer) return 'wrong'
            return ''
        }
    }
}
</script>
