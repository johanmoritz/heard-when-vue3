<template>
  <h3>Waiting for players...</h3>
  <p class="game-code">{{ gameId }}</p>
  <p>
    <span class="player" v-for="player in players" :key="player.id">{{
      player.displayName
    }}</span>
  </p>
  <Button>
    <button :disabled="loading" @click="startGame">Start the game</button>
  </Button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Button from "@/components/Btn.vue";
import { Player } from "firebase/functions/src/types";

export default defineComponent({
  components: { Button },
  props: {
    players: { type: Array as PropType<Array<Player>>, required: true },
    loading: { type: Boolean, required: true },
    startGame: {
      type: (Object as Function) as PropType<() => void>,
      required: true
    },
    gameId: { type: String, required: true }
  }
});
</script>

<style scoped>
.player {
  background-color: white;
  padding: 0 0.5em;
  font-weight: bold;
}

.player + .player {
  margin-right: 1em;
}

.game-code {
  font-size: 1.5em;
}
</style>
