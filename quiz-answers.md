# Quiz 2 Answers
**Name:** Ana Barba
**Date:** 23 March 2026


## Q1

D) The component should emit an event to the parent requesting the change, and the parent should update its own data in response.

## Q2

We would add this to `state` in `gameStore.js` to track whether the last answer was correct, starting as `null` before any answer is given:
```js
lastAnswerCorrect: null
```
We would change update `submitAnswer` like this to set `lastAnswerCorrect` to true or false each time a player clicks an answer, so `QuestionCard` can use it to flash green or red:

```js
submitAnswer(index) {
    const isCorrect = index === this.questions[this.currentIndex].correct
    this.lastAnswerCorrect = isCorrect 
    if (isCorrect) this.score ++
    this.nextQuestion();
}
```

`QuestionCard` should read `lastAnswerCorrect` from the store instead of receive it as a prop from `App.vue` because passing it through `App.vue` would cause prop drilling. It is prop drilling because `App.vue` would have to receive a value from the store and pass it down to `QuestionCard` even though `App.vue` doesn't need it. 

Reading directly from the store keeps components decoupled, meaning `QuestionCard` can access what it needs without depending on a parent to pass it down.
    
## Q3

C) All component instances that call `useGameStore()` share the same state object in memory, meaning a state change in one component affects all others simultaneously.

## Q4

**Part A:**
 The mistake is leaving out `<RouterView />`. The Vue Router knows which component matched the URL but without this has no placeholder to put it in, so nothing would appear.

**Part B:**
```js
<template>
  <div>
     <h1>QuizBlitz</h1>
    <RouterView />
  </div>
</template>
```
`<router-view>` is a placeholder Vue fills in with whichever component matches the current URL.

## Q5

B) Approach B, because `ScoreBoard` only displays data it receives — keeping it decoupled from the store makes it easier to reuse or test in isolation.

## Q6

The error occurs because JavaScript is zero-indexed. If you have 10 questions the indexes are 0-9. When `nextQuestion()` sets `currentIndex` to `questions.length` (which is 10), `state.questions[10]` is undefined because there is no index 10. `state.question[state.questions.length]` is undefined. When the component then tries to access `currentQuestion.text` it is doing `undefined.text` which throws the error.

I chose to fix it inside `nextQuestion()`. I believe this is a better location for the fix because the root cause is `currentIndex` being set to an invalid value in the first place. It is better to fix the source than to patch over it in the getter.

Below is my code from Quizblitz. I only increment `currentIndex` inside the `else` block so that when it's the last question it sets `gameState` to `end` instead of incrementing and going past the valid indexes. 
```js
nextQuestion() { 
      this.selectedAnswer = null 
      this.timeLeft = 15  
      if (this.isLastQuestion) {
         console.log("Final score:", this.score)
        console.log("Game over")
        
        this._stopTimer()
        this.gameState = 'end'
      } else {
        this.currentIndex++
        console.log("Current question:", this.currentIndex + 1)

        this._startTimer()
      }
    }
```

## Q7

B) Using `index` as `:key` is acceptable here because the answers array for a given question does not change while the component is mounted; the risk of key-related bugs only arises when the list can be reordered or items deleted.

## Q8

**Local file approach**
* Advantage: 
It is simpler and would always work. `startGame()` can set `questions` and `gameState` to `playing` immediately without waiting for anything,
* Disadvantage:
The questions are hardcoded, so if you want new questions you have to go into the file and manually change them every time. In other words, it doesn't scale. 

**Remote API approach**
* Advantage:
The questions can be updated from the server without toucing the code so you could have different questions every game without changing anything in the store.
* Disadvantage:
If the API is down, `startGame()` might fail and `questions` could stay as an empty array, which would break the game since `currentQuestion` would be undefined.

**My choice and reasoning:**
I would choose remote API since we are going to add a backend and building toward that goal now makes sense. The local file approach means `questions` is hardcoded and would have to be manually updated every time, which does not scale. With the API, `questions` in the store would be populated from a real database. Since the fetch lives in `startGame()` something might fail if the API is down, but that is a solvable problem and this would be worth handling for the long term of the project. 

## Q9

B) `v-show` hides elements with `display: none` but keeps them mounted, so `startGame()` would need to defend against being called while a game is already in progress, and the game state could persist unexpectedly between screen transitions.

## Q10
**`GameStore.js` changes:**

I added `timeLeft: 15` and `this._startTimer()` to the end
```js
 startGame() { 
      console.log("Play button clicked")
      this.questions = [...questionBank]  
      this.currentIndex = 0
      this.score = 0
      this.gameState = 'playing'
      this.selectedAnswer = null
      this.timeLeft = 15        //HERE---------

      console.log("Current question:", this.currentIndex + 1)
      
      this._startTimer()        //HERE---------
    },
```

I added `_timerInterval: null` to `state`.
```js
 state: () => ({
    questions: [],
    currentIndex: 0,
    score: 0,
    gameState: 'start',    
    selectedAnswer: null,  
    timeLeft: 15,
    _timerInterval: null        //HERE---------
  }),
```
I also added these timer actions `tick()`, `_startTimer()`, and `_stopTimer()`
```js
_startTimer() { 
      this._stopTimer()           
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

    tick() { 
      if (this.timeLeft > 0) {
        this.timeLeft--
      } else {
        this.nextQuestion() 
      }
    },
```

 I also call `_startTimer()` in `startGame()` and `nextQuestion()` and `_stopTimer()` in `submitAnswer()` and when game ends.


**`QuestionCard.vue` changes (template only — to display the countdown):**

I would display it like this:

```js
<p class="question-text">{{ question.question }}</p>
<p>Time left: {{ timeLeft }}</p>             //HERE---------
```
**Why the timer logic belongs in the store, not the component:**

The timer logic belongs in the store and not in `QuestionCard` because `QuestionCard` gets destroyed and recreated every time a new question loads. If the timer interval lived inside `QuestionCard` it would get destroyed with the component and the countdown would break between questions. 

The store lives for the entire app, so `_timerInterval` keeps running reliably. Also the timer isn't just a `QuestionCard` thing because when time runs out, `tick()` calls `nextQuestion()` which affects `gameState` and `currentIndex`. If the timer was in the component it would have no way to trigger those store changes without a chain of emits. Reading `timeLeft` directly from the store means any component that needs it can just access it.

