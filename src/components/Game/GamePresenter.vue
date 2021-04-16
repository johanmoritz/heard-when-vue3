<template>
  <div v-if="game.phase === 'listen' && game.currentHiddenCard !== undefined">
    <GameView>
      <template v-slot:board>
        <div class="cards-container">
          <div class="button-card" v-for="(card, index) in cards" :key="index">
            <button class="guess-button" @click="guess(index)">{{ index }}</button>
            <Card :title="card.title" :artist="card.artist" :year="card.year" />
          </div>
          <button class="guess-button" @click="guess(numberOfCards)">
            {{ numberOfCards }}
          </button>
        </div>
      </template> 
    </GameView>
  </div>
  <div v-else-if="game.phase === 'choice'">
    <ChoiceView />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from "vue";
import GameView from "./GameView.vue";
import ChoiceView from "./ChoiceView.vue";
import { Game } from "../../../firebase/functions/src/types";

// Change phase for different views
game.phase = "listen";

export default defineComponent({
  components: { GameView, ChoiceView },
  props: {
    game: {
      type: Game,
      required: true
    }
  },
  setup(props) {
    const { game } = toRefs(props);

    const msg = computed(() => {
      return game.phase === "listen"
      ? "It's "+game.currentPlayer.id + "'s turn.\n When is the song from?"
      : game.phase === "choice"
      ? "Correct, "+game.currentPlayer.id+", do you want to lock you cards or continue guessing?"; 
    });

    const song = computed(() => {
      return game.currentHiddenCard
    });

    const  
  },
  
});
</script>
