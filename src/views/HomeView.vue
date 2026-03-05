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
    <StartScreen v-on:start="goToPlay"/>
  </div>
</template>

<script>
    import StartScreen from '../components/StartScreen.vue'
    //import only laods the file BUT for Vue to know what we want to use (which components) I have to put it below
    export default {
    name: 'HomeView',
    components: {
        StartScreen
    },

    methods: {
        goToPlay() {
            //This name is from INDEX.JS
            this.$router.push({ name: 'play' })
        }
    }
    }
</script>