<template>
  <h2 class="text-contrast wait-disp">Waiting for players...</h2>
  <p class="game-code text-contrast wait-disp">
    <strong>GameID:</strong> {{ gameId }}
  </p>
  <p class="text-contrast wait-disp">
    Current players:
    <span class="player" v-for="player in players" :key="player.id">{{
      player.displayName
    }}</span>
  </p>
  <Btn>
    <button :disabled="loading || !isGameCreator" @click="startGame">
      Start Game
    </button>
  </Btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Btn from "@/components/Btn.vue";
import { Player } from "firebase/functions/src/types";

export default defineComponent({
  components: { Btn },
  props: {
    players: { type: Array as PropType<Array<Player>>, required: true },
    loading: { type: Boolean, required: true },
    startGame: {
      type: (Object as Function) as PropType<() => void>,
      required: true
    },
    gameId: { type: String, required: true },
    isGameCreator: { type: Boolean, required: true }
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

.player + .player {
  margin-right: 1em;
}

.game-code {
  font-size: 1.5em;
}

.wait-disp {
  display: block; /*needed so that all items aren't on a single line */
  width: fit-content; /*prevents bg color from spanning whole div width*/
  margin: auto; /* centers elements*/
  margin-bottom: 2rem;
}
</style>
