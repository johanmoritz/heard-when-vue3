<template>
  <span class="text-contrast other-player-msg"
    >These are your cards, {{ userName }}:</span
  >
  <div class="other-player-row">
    <div class="other-player-container">
      <div class="other-player-cards">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    userName: { type: String, required: true }
  }
});
</script>

<style scoped>
.other-player-msg {
  margin-top: 2rem;
}
.other-player-row {
  display: flex;
  justify-content: center;
}
.other-player-container {
  display: flex;
  flex-direction: row;
  height: auto;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: hidden;
}
.other-player-cards {
  display: flex;
  flex-direction: row;
}
.other-player-cards > * {
  margin: 0.5rem;
  transform: scale(0.7);
}
</style>
