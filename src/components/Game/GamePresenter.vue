<template>
  <div>
    <div v-if="game.phase === 'listen' && song !== undefined">
      <GameView :msg="msg">
        <div class="cards-container">
          <button
            v-if="cards.length === 0"
            class="first-guess-button"
            @click="guess(0)"
          >
            First guess is free!
          </button>
          <div class="button-card" v-for="(card, index) in cards" :key="index">
            <button class="guess-button" @click="guess(index)">
              {{ index === 0 || cards.length === 1 ? `Before` : `Between` }}
            </button>
            <Card
              :title="card.title"
              :artist="card.artist"
              :year="card.year"
              :id="card.id"
            />
          </div>
          <button
            v-if="cards.length > 0"
            class="guess-button"
            @click="guess(cards.length)"
          >
            {{ "After" }}
          </button>
        </div>
      </GameView>
    </div>
    <div v-if="game.phase === 'choice'">
      <ChoiceView :draw="draw" :lock="lock" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, PropType } from "vue";
import GameView from "./GameView.vue";
import ChoiceView from "./ChoiceView.vue";
import { Game } from "../../../firebase/functions/src/types";
import Card from "@/components/Card.vue";

export default defineComponent({
  components: { GameView, ChoiceView, Card },
  props: {
    game: {
      type: Object as PropType<Game>,
      required: true
    },
    guess: {
      type: Function as PropType<(n: number) => void>,
      required: true
    },
    draw: {
      type: Function as PropType<() => void>,
      required: true
    },
    lock: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup(props) {
    const { game } = toRefs(props);

    const msg = computed(() => {
      return game.value.phase === "listen"
        ? "It's " +
            game.value.currentPlayer.displayName +
            "'s turn.\n When is the song from?"
        : game.value.phase === "choice"
        ? "Correct, " +
          game.value.currentPlayer.displayName +
          ", do you want to lock you cards or continue guessing?"
        : "";
    });

    const song = computed(() => {
      return game.value.currentHiddenCard;
    });

    const cards = computed(() => {
      return game.value.temporaryCards;
    });

    return {
      msg,
      song,
      cards
    };
  }
});
</script>
