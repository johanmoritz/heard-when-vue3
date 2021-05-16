<template>
  <div id="board-view" class="board">
    <div style="padding: 0px 40px 0px 40px">
      <h2 class="text-contrast">{{ msg }}</h2>
    </div>
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
}
.cards-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: auto;
  
  margin-bottom: 15px;
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
.first-guess-button:disabled {
  color: rgba(112, 111, 111, 0.692);
}

.guess-button {
  opacity: 0;
  transition: all 0.3s ease;
}

.guess-button:hover {
  opacity: 0.4;
  cursor: pointer;
  padding: 20px;
  font-weight: bold;
  font-size: 1.2rem;
}
.guess-button:disabled {
  pointer-events: none;
  opacity: 0.6;
}

</style>
