<!-- MILESTONE 7
- Add a simple navigation bar to App.vue that appears on every screen. 
- Use <RouterLink> — not <a href>. 
    - Router links update the URL without a full page reload and automatically receive an router-link-active CSS class when their route is active.
-->

<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/leaderboard">Leaderboard</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
    </nav>
    <RouterView />
  </div>

</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  nav {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: #3d1a5c;
    border-radius: 15px;
    justify-content: center;
    margin-bottom: 2rem;
  }

  nav a {
    color: #e0e0e0;
    text-decoration: none;
  }

  nav a.router-link-active {
    color: #ffb6fd;
    font-weight: bold;
  }
</style>