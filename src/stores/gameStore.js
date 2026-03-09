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
    // Actions are added in the next milestone
  }

})