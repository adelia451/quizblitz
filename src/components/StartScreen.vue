<!-- MILESTONE 2 
 INSTRUCTIONS:
- This component has no props. 
- It displays a welcome message and a Play button. 
- When Play is clicked, it emits "start" to its parent.
- Read the output. 
    - Does it use $emit? 
    - Does the button have a @click handler? If yes, integrate it.

MY NOTES:
> a component is a reusable piece of the UI - it is an object with special properties like name, data, methods, props, computed, ... 
> a prop is a way to pass data from a parent component to a child component. 
    > my start screen has no props because it doesn't need any external data from the parent
-->

<!-- TEMPLATE: tells Vue that this is the HTML for this component, and we put all UI elements in here -->
<template> 
    <!-- DIV: In Vue a component must return a single root element so we wrap everything in <div>, without it Vue would not know how to render multiple top-level elements -->
    <!-- CLASS: applies CSS classes | card is existing in CSS and start-screen is a custm class I made -->
    <div class = "start-screen card"> 
        <p>Welcome message</p>
        <button v-on:click="playButton">Play</button> <!-- this is @click but I use v-on:click because reading that out reminds me how it works and that its a vue thing-->
    </div>
</template>

<script>
// Every Vue component exports an object that Vue uses to know how the component behaves
// like giving Vue a box with instructions: what to display (tempate), what functions it has (methods), what name it has (name)
export default {
    name: 'StartScreen',
    methods: {
        //Called from template button
        playButton() {   
            //$emit is how a child component tells its parent something happened
            //StartScreen.vue is the child, App.vue is the parent
            this.$emit('start')
        }
    }
}
</script>
