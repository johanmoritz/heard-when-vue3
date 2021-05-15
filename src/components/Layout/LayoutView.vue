<template>
  <div v-if="game.status !== 'started'" class="background-image-normal"></div>

  <div id="nav">
    <slot name="nav"> </slot>
  </div>
  <slot name="main"></slot>

  <div id="bottom-left">
    <slot name="bottom-left"> </slot>
  </div>
</template>

<script lang="ts">
//ta emot game some en prop och skicka till div:en
import { Game } from "../../firebase/functions/src/types";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const model = useStore();
    const game = computed(() => model.state.game as Game | undefined);

    return {
      game
    };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
}

.text-contrast {
  color: white;
  font-weight: bold;
  background-color: black;
  display: inline-block;
}

.button {
  color: black;
  background: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border: none;
  color: #2c3e50;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.overlay {
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#loader {
  position: fixed;
  top: 35%;
  left: 50%;
  z-index: 10;
  outline: 9999px solid rgba(0, 0, 0, 0.5);
}

#bottom-left {
  position: fixed;
  bottom: 1em;
  left: 1em;
}
.background-image-normal {
  height: 100vh;
  background-color: rgb(229, 112, 112);
  background-image: url("https://images.unsplash.com/photo-1520884225266-ebc9159f0aab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=100");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  z-index: -1;
}

.background-image-blur {
  height: 100vh;
  background-color: rgb(229, 112, 112);
  background-image: url("https://images.unsplash.com/photo-1520884225266-ebc9159f0aab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=100");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
}
</style>
