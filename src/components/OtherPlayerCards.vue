<template>
  <div class="other-player-container">
    <p>These are your cards, {{ userName }}:</p>
    <div class="other-player-cards">
      <slot></slot>
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
.otehr-player-container {
  display: flex;
  flex-direction: column;
}
.other-player-cards {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
