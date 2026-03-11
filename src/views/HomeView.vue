<!-- MILESTONE 6
- Move your StartScreen component here and add a <RouterLink> to navigate to /play. 
- The button no longer emits — it navigates. 
-->

<!-- NOTES
- The router is like a traffice controller for the app. 
    - When someone visits a URL the router looks at it and would say like "oh you want /play" and then they'd show you PlayView.vue
    - / -> show HomeView.vue
    - /play -> PlayView.vue
    - /leaderboard -> show LeaderboardView.vue
- We are putting "name: 'play'" in HomeView so that when the button is clicked, instead of emitting to a parent, we 
are now just telling the router to "take me to the route named play"
-->

<template>
  <div class="home">
    <StartScreen v-on:start="startGame"/>
  </div>
</template>

<!-- MILESTONE 12 -->
<script>
    import { useGameStore } from '../stores/gameStore.js'
    import StartScreen from '../components/StartScreen.vue'
    
    export default {
        name: 'HomeView',

    setup() {
        return { store: useGameStore() }
    },

    components: {
        StartScreen
    },

    methods: {
        startGame() {
            this.store.startGame()
            this.$router.push({ name: 'play' })
        }
    }
    }
</script>