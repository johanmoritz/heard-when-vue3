<template>
  <div id="results">
    <span class="text-contrast">
      Game Over! The final score is...
    </span>
    <p class="player" v-for="player in players" :key="player.displayName">
      {{ player.displayName }} has {{ player.lockedCards.length }} card(s)
    </p>
  </div>
</template>

<script lang="ts">
import { Player } from "firebase/functions/src/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    players: { type: Array as PropType<Array<Player>>, required: true }
  }
});
</script>

<style scoped>
.player {
  background-color: white;
  color: black;
  padding: 0 0.5em;
  font-weight: bold;
}
#results {
  width: fit-content;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
