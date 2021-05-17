<template>
  <div>
    <div>
      <Scoreboard props :game="game" />
      <GameView :msg="msg">
        <div class="button-card" v-for="(card, index) in cards" :key="index">
          <GuessButton @click="guess(index)" :disabled="!isPlayerInTurn">{{
            index === 0 || cards.length === 1 ? `Before` : `Between`
          }}</GuessButton>
          <Card
            :class="{
              mycardtheme: isPlayerInTurn,
              othercardtheme: !isPlayerInTurn,
              'semi-transparent': !game.currentPlayer.lockedCards.some(c => {
                return c.id === card.id;
              })
            }"
            :title="card.title"
            :artist="card.artist"
            :year="card.year"
            :id="card.id"
          />
        </div>
        <GuessButton
          v-if="cards.length > 0"
          @click="guess(cards.length)"
          :disabled="!isPlayerInTurn"
        >
          After
        </GuessButton>
      </GameView>
    </div>

    <ChoiceView
      v-if="game.phase === 'choice' && isPlayerInTurn"
      :draw="draw"
      :lock="lock"
    />

    <OtherPlayerCards
      :userName="user.displayName"
      v-if="
        !isPlayerInTurn && user !== undefined && user.lockedCards.length !== 0
      "
    >
      <Card
        v-for="card in user.lockedCards"
        :key="card"
        class="other-card mycardtheme small-spaced"
        :title="card.title"
        :artist="card.artist"
        :year="card.year"
        :id="card.id"
      />
    </OtherPlayerCards>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, PropType } from "vue";
import GameView from "./GameView.vue";
import ChoiceView from "./ChoiceView.vue";
import Scoreboard from "./ScoreBoard.vue";
import GuessButton from "./GuessButton.vue";
import OtherPlayerCards from "@/components/OtherPlayerCards.vue";
import { Game } from "../../../firebase/functions/src/types";
import Card from "@/components/Card.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    GameView,
    ChoiceView,
    Card,
    Scoreboard,
    OtherPlayerCards,
    GuessButton
  },
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
    const model = useStore();

    const isPlayerInTurn = computed(() => {
      return game.value.currentPlayer.displayName === model.state.username;
    });

    const msg = computed(() => {
      return game.value.phase === "listen" && isPlayerInTurn.value
        ? "It's your turn, " +
            game.value.currentPlayer.displayName +
            ".\n When is the song from?"
        : !isPlayerInTurn.value
        ? "It's " + game.value.currentPlayer.displayName + "'s turn."
        : "";
    });

    const song = computed(() => {
      return game.value.currentHiddenCard;
    });

    const cards = computed(() => {
      return game.value.temporaryCards;
    });

    const user = computed(() => {
      return game.value.players.find(player => {
        return player.displayName === model.state.username;
      });
    });

    return {
      msg,
      song,
      cards,
      isPlayerInTurn,
      user
    };
  }
});
</script>

<style>
.small-spaced {
  margin: 10px;
}

.semi-transparent {
  opacity: 0.65;
}
</style>
