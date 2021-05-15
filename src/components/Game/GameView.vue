<template>
  <div id="board-view" class="board">
    <h2 class="text-contrast">{{ msg }}</h2>
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
  margin: 0 auto;
  padding: 50px 50px 0px 50px;
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
  opacity: 0;
  transition: all 0.3s ease;
}
.guess-button:hover {
  opacity: 0.6;
  cursor: pointer;
  padding: 40px;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
