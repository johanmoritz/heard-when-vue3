<template>
  <div id="board-view" class="board">
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
  width: fill;
  height: fill;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 60px;
}
.cards-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
  opacity: 0.2;
}

.guess-button:hover {
  opacity: 0.58;
  
}
</style>
