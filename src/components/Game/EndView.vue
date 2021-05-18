<template>
  <div class="text-contrast">
    Game Over! The final score is...
    <p v-for="player in players" :key="player.displayName">
      {{ player.displayName }} has {{ player.lockedCards.length }} cards
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
