<template>
  <div class="scoreboard">
    <span id="scorehead">Scoreboard</span>
    <p v-for="player in game.players" :key="player.id">
      {{ player.displayName }} : {{ player.lockedCards.length }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType } from "vue";
import { Game } from "../../../firebase/functions/src/types";

export default defineComponent({
  name: "ScoreBoard",
  props: {
    game: {
      type: Object as PropType<Game>,
      required: true
    }
  }
});
</script>

<style scoped>
.scoreboard {
  color: white;
  background-color: grey;
  opacity: 0.9;
  display: inline-block;
  position: fixed;
  top: 0;
  right: 0;
  margin: 10px;
  padding: 40px;
  border-radius: 23% 27% 32% 19% / 64% 0% 35% 0%;
  background-image: linear-gradient(-225deg, #bd8787 0%, rgba(255,255,255,0) 40%, rgba(0,255,255,0) 60%, aqua 100%),linear-gradient(45deg, #3023AE 0%, #f09 100%);
}

#scorehead {
  text-decoration: underline;
  font-weight: bold;
}
</style>
