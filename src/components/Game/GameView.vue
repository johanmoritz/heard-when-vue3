<template>
  <div id="board-view" class="board" > 
    <h1>{{ msg }}</h1>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GameView",
  props: {
    msg: { type: String, required: true }
  }
});
</script>

<style scoped>
.board {
  background-image: url("https://images.unsplash.com/photo-1529245856630-f4853233d2ea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80");
  width: fill;
  height: fill;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 60px;
  color: rgb(250, 249, 249);
  text-shadow: 1.5px 1.5px #000000;
  
  
}
.cards-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: rgb(44, 62, 80);
  text-shadow: 0px 0px #000000;
  
}
.button-card {
  display: flex;
  flex-direction: row;
}
.first-guess-button {
  width: 100px;
  flex-direction: row;
  justify-content: center;
}
.guess-button {
  opacity: 0.3;
}

.guess-button:hover {
  opacity: 0.6;
  cursor: pointer;
}
</style>
