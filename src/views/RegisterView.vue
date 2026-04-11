<template>
  <div class="register">
    <h1>Register</h1>
    
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    
    <button @click="handleSubmit">Register</button>
    
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'

export default {
  name: 'RegisterView',
  
  setup() {
    return { store: useGameStore() }
  },

  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },

  methods: {
    async handleSubmit() {
      try {
        await this.store.register(this.email, this.password)
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>