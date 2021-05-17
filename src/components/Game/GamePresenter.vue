<template>
  <div>
    <div>
      <!-- 
      skapa div

      läsa in spelare 
        skapa <li> element för varje spelare
          för varje <li> skriva spelares namn + antal kort
      upprepa varje gång en "action" görs
      -->
      <Scoreboard props :game="game" />
      <GameView :msg="msg">
        <div class="cards-container">
          <Btn>
            <div class="btn">
              <button
                v-if="cards.length === 0"
                class="first-guess-button"
                @click="guess(0)"
                :disabled="!isPlayerInTurn"
              >
                First draw is free!
              </button>
            </div>
          </Btn>

          <div class="button-card" v-for="(card, index) in cards" :key="index">
            <button
              class="guess-button"
              @click="guess(index)"
              :disabled="!isPlayerInTurn"
            >
              {{ index === 0 || cards.length === 1 ? `Before` : `Between` }}
            </button>
            <div
              v-bind:style="[
                game.currentPlayer.lockedCards.some(c => {
                  return c.id === card.id;
                })
                  ? { opacity: 1 }
                  : { opacity: 0.65 }
              ]"
            >
              <Card
                :class="{
                  mycardtheme: isPlayerInTurn,
                  othercardtheme: !isPlayerInTurn
                }"
                :title="card.title"
                :artist="card.artist"
                :year="card.year"
                :id="card.id"
              />
            </div>
          </div>
          <button
            v-if="cards.length > 0"
            class="guess-button"
            @click="guess(cards.length)"
            :disabled="!isPlayerInTurn"
          >
            {{ "After" }}
          </button>
        </div>
      </GameView>
    </div>
    <div class="player-position">
      <slot></slot>
    </div>
    <div v-if="game.phase === 'choice'">
      <div v-if="isPlayerInTurn">
        <ChoiceView :draw="draw" :lock="lock" />
      </div>
    </div>
    <div
      v-if="!isPlayerInTurn && user !== undefined && userCards !== undefined"
    >
      <div v-if="userCards.length !== 0">
        <OtherPlayerCards :userName="user.displayName">
          <div v-for="card in userCards" :key="card" style="margin:10px">
            <Card
              class="other-card mycardtheme"
              :title="card.title"
              :artist="card.artist"
              :year="card.year"
              :id="card.id"
            />
          </div>
        </OtherPlayerCards>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, PropType } from "vue";
import GameView from "./GameView.vue";
import ChoiceView from "./ChoiceView.vue";
import Scoreboard from "./ScoreBoard.vue";
import OtherPlayerCards from "@/components/OtherPlayerCards.vue";
import { Game } from "../../../firebase/functions/src/types";
import Card from "@/components/Card.vue";
import { data as userData } from "@/store/user";
import { useStore } from "vuex";

export default defineComponent({
  components: { GameView, ChoiceView, Card, Scoreboard, OtherPlayerCards },
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
        :"";
    });

    const song = computed(() => {
      return game.value.currentHiddenCard;
    });

    const cards = computed(() => {
      return game.value.temporaryCards;
    });

    const user = game.value.players.find(player => {
      return player.displayName === model.state.username;
    });

    const userCards = user?.lockedCards;

    return {
      msg,
      song,
      cards,
      isPlayerInTurn,
      user,
      userCards
    };
  }
});
</script>
