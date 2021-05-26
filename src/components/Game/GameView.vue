<template>
  <div id="board-view" class="board">
    <div class="status-block">
      <h2 class="text-contrast">{{ msg }}</h2>
    </div>
    <div class="cards-row">
      <div class="cards-container">
        <slot></slot>
      </div>
    </div>
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
.status-block {
  padding: 0px 40px 0px 40px;
}
.board {
  width: 100vw;
  height: fill;
  margin: 0 auto;
}
.cards-row {
  display: flex;
  justify-content: center;
}
.cards-container {
  display: flex;
  flex-direction: row;
  height: auto;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 15px;
}
.button-card {
  display: flex;
  flex-direction: row;
}
</style>
