<template>
  <div class="scoreboard">
    Score board:
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
  background-color: grey;
  opacity: 0.6;
  display: inline-block;
  float: right;
  padding: 10px;
 
}
</style>
