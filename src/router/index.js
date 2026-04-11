// replaced in milestone 13
import { createRouter, createWebHistory } from 'vue-router'
import { useGameStore } from '../stores/gameStore.js'
import HomeView from '../views/HomeView.vue'
import PlayView from '../views/PlayView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/play', name: 'play', component: PlayView },
  { path: '/leaderboard', name: 'leaderboard', component: LeaderboardView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView }
]

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHistory('/quizblitz/'),
  routes
})

router.beforeEach((to) => {
  if (to.name === 'play') {
    const store = useGameStore()
    if (store.gameState !== 'playing') {
      return { name: 'home' }
    }
  }
  return true
})

export default router