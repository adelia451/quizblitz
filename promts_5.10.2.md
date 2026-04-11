**Phase 5**
**Week 10**
**Class 2**

### Homework — Front-End Authentication
**Prompt**
I've created `src/views/LoginView.vue` and `src/views/RegisterView.vue`. Each needs a simple form with email and password fields that call `store.login()` or `store.register()` and redirect to / on success. Can you explain how to do this so I can write it? Also let me know which files I've previously done this in so I can reference them? 

**What I used/changed**
They explained that I've used `setup()` and `useGameStore()` in `PlayView.vue` and `HomeView.vue`. Also that I used `$router.push({ name: '...' })` in `HomeView.vue` and `PlayView.vue`. They also stated that, "The store import path will be `'../stores/gameStore.js'` since you're in `src/views/` — same as PlayView and HomeView!" I just looked back at old files to figure out this part, and in retrospect I could've figured out where the information was but it had been a while since I looked at this part because we had been working on the server side. After completing `LoginView.vue`, I used it as a reference for `RegisterView.vue`. 

