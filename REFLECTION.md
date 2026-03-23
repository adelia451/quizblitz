### Written submission: REFLECTION.md

**Q1 -- Props**

Props allow a component to be abstracted over its data, meaning the component can display different content depending on what is passed in. Basically, props act like parameters, allowing the component to work with different inputs instead of having values hardcoded inside of it. This reminds me of function parameters in functional programming, where a function can be resued with different values, which is why I think of it as a kind of abstraction (props would be like parameters, components would be like functions).

Instead of the data living hardcoded inside the component, the data flows down from the store to the parent to the child. 

We pass data down through the props rather than importing `useGameStore` directly inside `QuestionCard` because `QuestionCard` is more of a presentational component, its only job is to display a question and buttons. It's simpler and more readable to keep the display parts separate from the logic using props. All the calculating and functioning parts live in the store, which keeps the components neater and focused on display only. ScoreBoard for example doesn't know or care about how the score is calculated, it just receives a number and displays it. 

**Q2 -- $emit**

`$emit` is how a child component communicates with its parent that something happened. It takes the event name and can also take some data to send along. For example, in `questionCard.vue` where I have `this.$emit('answer', index)` it is telling the parent that there is an event called `'answer'` and that it's sending the `index` number with it. 

The parents are in the `views` folder while the children are in the `components` folder (in this app). For example, in `PlayView.vue`, the parent listens to the child with `@answer="store.submitAnswer"` inside the `<QuestionCard>` tag which is a reference to the component `QuestionCard.vue`, which is where the child lives. And in that `QuestionCard.vue` where the child lives, we use`$emit` in,  "`this.$emit('answer', index)`".  When the child says "answer", the parent in `PlayView` is going to hear it and run `store.submitAnswer` with that information from the child. Same with `index`.

If I forgot to handle the emitted event in the parent nothing crashes. It would just be like if the child shouted into the void and the parent didn't hear it because there wasn't that `@answer` listener in the view file for the parent to be able hear the child. That definitely doesn't stop the child from shouting, just makes it so that the parent can't hear. Basically in the end, because `PlayView` couldn't listen for `answer`, clicking a button would do nothing and no score would be updated and there would be no next question. 

**Q3 -- Pinia store**

Before Pinia we started with `App.vue` that had `questions`, `currentIndex`, `score`, and `gameState`. `App.vue` owned the game state, meaning it was responsible for that data and controlled it, and everything else had to ask `App.vue` for it. So, an issue we had was that if any of the other components needed the score, `App.vue` had to pass the score through props to every component in between, even components that didn't need to receive the score. That process of passing down data through components just to get it somewhere else is prop drilling. 

Then we moved everything to `PlayView.vue`, but when the navbar wanted to know the score, or the leaderboard needed it, I'd have to pass it through components that don't care. As the component tree grows and more views and components are added, this problem would get worse and worse. 

Now we have `gameStore.js` so that any component that actually needs it can just do `useGameStore()` and access things like `score`, `gameState`, and anything else directly instead of passing through middle-men type components. In other words, the store owns the state instead so components don't need to ask a parent, they just read directly from the store. If I had to put it differently, it would be like taking a direct flight instead of having layovers in places you don't care about staying in. 

**Q4 -- Vue Router**

I recall traditional multi-page websites being multiple HTML files linked together, so when you click a link the browser sends a request to a server and gets back a whole new HTML file, which is why the page fully reloads. It seems that instead, with these Single-Page Applications, there is only one HTML file and JavaScript controls what gets displayed on it instead of actually switching pages. 

Navigation doesn't reload the page because you're never actually switching pages, JavaScript is just swapping out what's displayed inside `<RouterView>`. Router, like it sounds, routes you to the right output. Components like `HomeView` and `PlayView` use `this.$router.push()` to tell the router which view to show next, without ever asking the server for a whole new page.

`App.vue` has `<RouterView>` which is basically a placeholder that Vue fills in with whichever component matches the current URL. So when you're on `/` it fills in `HomeView`, and on `/play` it fills in `PlayView`.

**Q5 -- v-if vs v-show**

`v-show` and `v-if` both take away and show elements but the difference is how they "hide" them.

`v-show` is the one that literally "hides" elements. It keeps the element on the page and just toggles between displaying and not displaying it. I think about like this; the word "show" implies the existence of something that has the opposite effect, and the opposite of show is to hide. Furthermore, hiding something doesn't take it away, just makes it not visible. 

`v-if` actually removes the element from the DOM completely while the condition is false, so when the condition is true it is like it gets created again. It is more like literally removing and recreating something than just "hiding" it. 

`v-if` is the better choice in `QuestionCard` or `ScoreBoard` because those are entire screens that are never needed at the same time. There's no reason to keep `ScoreBoard` in the DOM while you're answering questions, it's just wasting memory. 

`v-show` would make more sense for something small that toggles frequently, like a dropdown menu or some smaller feature that changes while the greater part of the screen remains the same, where recreating the whole screen every time would be inefficient. But for whole screens that completely replace each other, `v-if` is cleaner because it removes what you don't need entirely. 
