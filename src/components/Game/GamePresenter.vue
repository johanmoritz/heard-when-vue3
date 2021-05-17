<template>
  <div>
    <div>
      <Scoreboard props :game="game" />
      <GameView :msg="msg">
        <div style="display:flex; justify-content: center;">
          <Card
            class="othercardtheme guess-card"
            :class="{ hiddenCardWhenDragged: dragSelected.started }"
            title="---"
            artist="unknown"
            year="?"
            :id="game.currentHiddenCard?.id"
            key="-1"
            :draggable="true"
            @drag="
              () => {
                dragSelected.started = true;
              }
            "
            @dragend="
              () => {
                dragSelected.started = false;
              }
            "
          />
        </div>
        <div class="cards-container">
          <div
            v-for="(card, index) in cards"
            :key="index"
            style="display:flex;"
          >
            <div
              class="guess before"
              @dragover="
                () => {
                  dragSelected.id = card.id;
                  dragSelectedChoice.choice = 'before';
                }
              "
              @dragleave="
                () => {
                  dragSelected.id = -1;
                  dragSelectedChoice.choice = 'none';
                }
              "
              @drop="guess(index)"
              :class="{
                activeGuess: dragSelected.id === card.id,
                inactiveGuess: dragSelected.id !== card.id,
                'activeGuess-on-drop':
                  dragSelected.id === card.id &&
                  dragSelectedChoice.choice === 'before'
              }"
            >
              Before
            </div>
            <Card
              @dragover="
                () => {
                  dragSelected.id = card.id;
                }
              "
              @dragleave="
                () => {
                  dragSelected.id = -1;
                }
              "
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
            <div
              class="guess after"
              @dragover="
                () => {
                  dragSelected.id = card.id;
                  dragSelectedChoice.choice = 'after';
                }
              "
              @dragleave="
                () => {
                  dragSelected.id = -1;
                  dragSelectedChoice.choice = 'none';
                }
              "
              @drop="guess((index + 1) % cards.length)"
              :class="{
                activeGuess: dragSelected.id === card.id,
                inactiveGuess: dragSelected.id !== card.id,
                'activeGuess-on-drop':
                  dragSelected.id === card.id &&
                  dragSelectedChoice.choice === 'after'
              }"
            >
              After
            </div>
          </div>

          <!-- <div class="button-card" v-for="(card, index) in cards" :key="index">
            <button
              class="guess-button"
              @click="guess(index)"
              :disabled="!isPlayerInTurn"
            >
              {{ index === 0 || cards.length === 1 ? `Before` : `Between` }}
            </button>
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
          <button
            v-if="cards.length > 0"
            class="guess-button"
            @click="guess(cards.length)"
            :disabled="!isPlayerInTurn"
          >
            {{ "After" }}
          </button> --->
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
  <h1>{{ dragSelected.id }}</h1>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  computed,
  PropType,
  ref,
  reactive
} from "vue";
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

    const dragSelected = reactive({ id: -1, started: false });
    const dragSelectedChoice = reactive({ choice: "none" } as {
      choice: "before" | "after" | "none";
    });

    return {
      msg,
      song,
      cards,
      isPlayerInTurn,
      user,
      dragSelected,
      dragSelectedChoice
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

.inactiveGuess {
  transition: all 0.1s linear;
  opacity: 0;
  transition: all 0.3s ease;
}

.activeGuess {
  background-color: white;
  transition: all 0.1s linear;
  opacity: 0.4;
  cursor: pointer;
  padding: 20px;
  font-weight: bold;
  font-size: 1.2rem;
}

.activeGuess-on-drop {
  background-color: grey;
}

.before {
  transform-origin: 100% 50%;
}

.after {
  transform-origin: 0% 50%;
}

.guess {
  pointer-events: fill;
}

.hiddenCardWhenDragged {
  opacity: 0.65;
}
</style>
