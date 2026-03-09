//MILESTONE 10
//currentQuestion — returns questions[0] when the game starts, questions[1] after the first answer, and so on. 
//This is the single object QuestionCard will receive as a prop.

//isLastQuestion — returns true when currentIndex equals the last index in the array. 
// The store will use this to decide whether to advance or end the game.

//progress — returns an object like { current: 3, total: 10 }. 
// The template can use this to display "Question 3 of 10" without any extra logic.

import { defineStore } from 'pinia'
import { questions as questionBank } from '../data/questions.js'

export const useGameStore = defineStore('game', {

  state: () => ({
    questions: [],
    currentIndex: 0,
    score: 0,
    gameState: 'start',    // 'start' | 'playing' | 'end'
    selectedAnswer: null,  // index of the button the player clicked, or null
    timeLeft: 15,
    _timerInterval: null   // internal — managed by the store only
  }),

  getters: {

    // The question the player is currently looking at
    currentQuestion: (state) => state.questions[state.currentIndex],

    // True when the current question is the last one
    isLastQuestion: (state) => state.currentIndex >= state.questions.length - 1,

    // Progress info for the "Question X of Y" display
    progress: (state) => ({
      current: state.currentIndex + 1,
      total: state.questions.length
    })

  },

  actions: {
    // Actions are added in milestone 11
    //MILESTONE 11
    //TIMER HELPERS
    //These are internal actions — the _ prefix is a convention that means "do not call this from outside the store"
    _startTimer() { //always calls _stopTimer() first
      this._stopTimer()           // always clear any existing timer first
      this._timerInterval = setInterval(() => {
        this.tick()
      }, 1000)
    },

    _stopTimer() {
      if (this._timerInterval) {
        clearInterval(this._timerInterval)
        this._timerInterval = null
      }
    },

    tick() { //Called once per second by the interval
      if (this.timeLeft > 0) {
        this.timeLeft--
      } else {
        this.nextQuestion()   // time's up — skip to next, no points
      }
    },

    startGame() { //Called when the player clicks Play
      this.questions = [...questionBank]   // creates new array each game so that original question data is never modified
      this.currentIndex = 0
      this.score = 0
      this.gameState = 'playing'
      this.selectedAnswer = null
      this.timeLeft = 15
      this._startTimer()
    },

    submitAnswer(answerIndex) { //Called when the player clicks an asnwer button
      if (this.selectedAnswer !== null) return  // ignore double-clicks
      this._stopTimer()
      this.selectedAnswer = answerIndex //receives the index of the button that was clicked (0,1,2,3)
      const isCorrect = answerIndex === this.currentQuestion.correct
      if (isCorrect) this.score++
      setTimeout(() => {
        this.nextQuestion()
      }, 1000)
    },

    nextQuestion() { //advances the name or ends it
      this.selectedAnswer = null //reset to null so the next question starts with no button highlighted
      this.timeLeft = 15  // resets to 15 for the question
      if (this.isLastQuestion) {
        this._stopTimer()
        this.gameState = 'end'
      } else {
        this.currentIndex++
        this._startTimer()
      }
    },

    resetGame() {
      this._stopTimer()
      this.questions = []
      this.currentIndex = 0
      this.score = 0
      this.gameState = 'start'
      this.selectedAnswer = null
      this.timeLeft = 15
    }
  }

})