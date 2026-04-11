<template>
  <div class="play-view">

    <!-- Timer bar -->
    <div class="timer-bar">
      <div
        class="timer-fill"
        :style="{ width: timerPercent + '%' }"
        :class="{ urgent: store.timeLeft <= 5 }"
      ></div>
    </div>

    <!-- Progress indicator -->
    <p class="progress">
      Question {{ store.progress.current }} of {{ store.progress.total }}
    </p>

    <!-- Question -->
    <QuestionCard
      v-if="store.gameState === 'playing' && store.currentQuestion"
      :question="store.currentQuestion"
      :selectedAnswer="store.selectedAnswer"
      @answer="store.submitAnswer"
    />

    <!-- End screen -->
    <div v-if="store.gameState === 'end'">
    <h2>Game Over</h2>
    <p>You scored {{ store.score }} / {{ store.questions.length }}</p>

    <div v-if="store.token">
      <p>Playing as {{ store.userEmail }}</p>
      <button v-if="!store.scoreSubmitted" @click="store.submitScore()">
        Submit Score
      </button>
      <p v-else>Score submitted ✓</p>
    </div>

    <div v-else>
      <p>
        <RouterLink to="/login">Log in</RouterLink> to save your score to the leaderboard.
      </p>
    </div>

    <button @click="handleRestart">Play Again</button>
  </div>

  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'
import QuestionCard from '../components/QuestionCard.vue'
import ScoreBoard from '../components/ScoreBoard.vue'

export default {
  name: 'PlayView',
  components: { QuestionCard, ScoreBoard },

  setup() {
    const store = useGameStore()
    return { store }
  },

  computed: {
    timerPercent() {
      return (this.store.timeLeft / 15) * 100
    }
  },

  methods: {
    handleRestart() {
      this.store.resetGame()
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.timer-bar {
  width: 100%;
  height: 8px;
  background: #333;
  border-radius: 4px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.timer-fill {
  height: 100%;
  background: #4caf50;
  transition: width 0.9s linear;
}

.timer-fill.urgent {
  background: #e53935;
}

.progress {
  text-align: center;
  color: #aaa;
  margin-bottom: 1rem;
}
</style>