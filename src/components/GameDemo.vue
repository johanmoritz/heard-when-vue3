<template>
  <main>
    <!-- Step 1: Login -->
    <div v-if="user === undefined">
      <button @click="signIn">Sign in</button>
    </div>

    <!-- Step 2: Create or join a game -->
    <div v-if="user !== undefined">
      <button @click="signOut">Sign out {{ username }}</button>

      <div v-if="game === undefined">
        Click to
        <button @click="initialize">
          Create new game
        </button>
        or
        <span v-if="game === undefined">
          <input type="text" placeholder="Game id" v-model="gameId" />
          <button @click="join">Join game</button>
        </span>
      </div>

      <div v-if="game !== undefined">
        <p>
          Game <b> {{ gameId }} </b>
        </p>
        <p>Status: {{ game.status }}</p>
        <p>Phase: {{ game.phase }}</p>
        <p>{{ game.currentPlayer.displayName }}s turn</p>
        <p>
          Players:
          {{ game.players.map(({ displayName }) => displayName).join(", ") }},
        </p>
        <p>
          Player {{ game.currentPlayer.displayName }}s deck:
          {{ game.temporaryCards.map(({ year }) => year).join(", ") }}
        </p>

        <!-- Step 3: Wait for players to join and then start the game. -->
        <div v-if="game.status === 'initialized' && user !== undefined">
          <p>Waiting for players to join...</p>
          <button :disabled="game.currentPlayer.id !== user.uid" @click="start">
            Start game
          </button>
        </div>

        <div v-if="game.status === 'started'">
          <p v-if="game.log.length === 0">Game has begun!</p>
          <!-- Step 4: Wait for your turn and then draw a card or end your turn. -->
          <!-- Step 5: Take a guess. (This is when you should listen to the song) -->
          <div
            v-if="
              game.phase === 'listen' &&
                game.currentPlayer.id === user.uid &&
                game.currentHiddenCard !== undefined
            "
          >
            <MusicPlayerPresenter
              class="music-player"
              :songId="game.currentHiddenCard.uri"
            />
          </div>

          <GamePresenter
            :game="game"
            :guess="guess"
            :draw="draw"
            :lock="lock"
          />
        </div>

        <!-- Step 6: Now the game is over. -->
        <div v-if="game.status === 'finished'">
          The score is
          <p v-for="player in game.players" :key="player.displayName">
            {{ player.displayName }} has {{ player.lockedCards.length }} cards
          </p>
        </div>

        <button @click="quit">End game</button>
      </div>
    </div>
  </main>

  <aside class="log" v-if="game !== undefined">
    <span>Event log:</span>
    <ol>
      <li v-for="(event, i) in game.log" :key="i">
        {{ event._tag }}
      </li>
    </ol>
  </aside>
</template>

<style scoped>
main {
  display: inline-block;
}
aside {
  float: right;
  text-align: left;
}
</style>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onUnmounted,
  PropType,
  computed
} from "vue";
import firebase from "firebase/app";
import { Game, Card } from "../../firebase/functions/src/types";
import { fb } from "@/config/firebaseConfig";
import MusicPlayerPresenter from "@/components/MusicPlayer/MusicPlayerPresenter.vue";
import GamePresenter from "@/components/Game/GamePresenter.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { MusicPlayerPresenter, GamePresenter },
  props: {
    deck: { type: Array as PropType<Array<Card>>, required: true },
    functions: {
      type: Object as PropType<firebase.functions.Functions>,
      required: true
    },
    auth: {
      type: Object as PropType<firebase.auth.Auth>,
      required: true
    },
    firestore: {
      type: Object as PropType<firebase.firestore.Firestore>,
      required: true
    }
  },
  setup(props) {
    const model = useStore();

    const storeCurrentGame = async (args: {
      userId: string;
      gameId: string;
    }) => {
      const { userId, gameId } = args;

      props.firestore
        .collection("user")
        .doc(userId)
        .set({ currentGame: gameId });
    };

    const username = ref("");
    const user = ref<firebase.User | undefined>(undefined);

    const gameId = computed(() => model.state.gameId as string | undefined);
    const game = computed(() => model.state.game as Game | undefined);
    const loading = computed(() => model.state.loading as boolean);
    const error = computed(() => model.state.error as string);
    const data = reactive({ username, user, game, gameId, loading, error });

    const stopWatchingGameChanges = model.watch(
      state => state.game,
      (game: Game | undefined) => {
        if (
          game !== undefined &&
          data.gameId !== undefined &&
          data.user?.uid !== undefined
        ) {
          return storeCurrentGame({
            gameId: data.gameId,
            userId: data.user.uid
          });
        }
      }
    );

    const setUser = (user: firebase.User | null) => {
      if (user !== null) {
        data.user = user;
        data.username = user.email?.split("@")[0] ?? user.uid;
        model.commit("setUsername", data.username);
      }
    };

    const loadCurrentGame = async (args: { userId: string }) => {
      const { userId } = args;

      props.firestore
        .collection("user")
        .doc(userId)
        .get()
        .then(res => res.data())
        .then(result => {
          if (result && result["currentGame"] !== undefined) {
            const gameId = result["currentGame"];
            model.dispatch("rejoinGame", gameId);
          }
        });
    };

    const quit = async () => {
      model.replaceState({});

      if (data.user) {
        props.firestore
          .collection("user")
          .doc(data.user.uid)
          .set({});
      }
    };

    const onSignIn = async () =>
      fb
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() =>
          props.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        )
        .then(() => {
          setUser(props.auth.currentUser);
          if (data.user) {
            loadCurrentGame({ userId: data.user.uid });
          }
        });

    const onSignOut = async () =>
      fb
        .auth()
        .signOut()
        .then(() => {
          data.user = undefined;
          model.replaceState({});
        });

    // Load the state when auth picks up the user
    props.auth.onIdTokenChanged(user => {
      setUser(user);
      if (user) {
        loadCurrentGame({ userId: user.uid });
      } else {
        data.game = undefined;
      }
    });

    // This is a cool 'vue' function
    onUnmounted(() => {
      stopWatchingGameChanges();
    });

    const initialize = () => model.dispatch("initializeGame", props.deck);
    const start = () => model.dispatch("startGame");
    const join = (id: string) => model.dispatch("joinGame", id);
    const draw = () => model.dispatch("drawCard");
    const lock = () => model.dispatch("lockCards");
    const guess = (pos: number) => model.dispatch("guessCard", pos);

    return {
      username,
      user,
      game,
      gameId,
      loading,
      signIn: onSignIn,
      signOut: onSignOut,
      initialize,
      start,
      join,
      draw,
      lock,
      guess,
      quit
    };
  }
});
</script>
