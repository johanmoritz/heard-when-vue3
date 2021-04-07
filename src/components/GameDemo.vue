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
          <div
            v-if="game.phase === 'choice' && game.currentPlayer.id === user.uid"
          >
            <button @click="draw">
              Draw card
            </button>
            <button @click="lock">
              Lock cards
            </button>
          </div>
          <!-- Step 5: Take a guess. (This is when you should listen to the song) -->
          <div
            v-if="
              game.phase === 'listen' &&
                game.currentPlayer.id === user.uid &&
                game.currentHiddenCard !== undefined
            "
          >
            <!-- Imagine that we have spotify integration instead of this: -->
            <p>When is the song '{{ game.currentHiddenCard.title }}' from?</p>
            <button
              v-for="n in game.temporaryCards.length + 1"
              :key="n"
              @click="() => guess(n - 1)"
            >
              {{
                game?.temporaryCards.length === 0
                  ? "Guess"
                  : n - 1 === game?.temporaryCards.length
                  ? `After ${game?.temporaryCards[n - 2].year}`
                  : n - 1 === 0
                  ? `Before ${game?.temporaryCards[0].year}`
                  : `Between ${game?.temporaryCards[n - 2].year} and ${
                      game?.temporaryCards[n - 1].year
                    }`
              }}
            </button>
          </div>
        </div>

        <!-- Step 6: Now the game is over. -->
        <div v-if="game.status === 'finished'">
          The score is
          <p v-for="player in game.players" :key="player.displayName">
            {{ player.displayName }} has {{ player.lockedCards.length }} cards
          </p>
          <button @click="quit">End game</button>
        </div>
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
import { defineComponent, reactive, ref, onUnmounted, PropType } from "vue";
import firebase from "firebase/app";
import { Game, Card } from "../../firebase/functions/src/types";
import * as action from "@/domain/action";
import { fb } from "@/config/firebaseConfig";

export default defineComponent({
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
    const username = ref("");
    const user = ref<firebase.User | undefined>(undefined);
    const game = ref<Game | undefined>(undefined);
    const gameId = ref("");
    const data = reactive({ username, user, game, gameId });

    let unsubscribeFromFirestore = () => {
      /* See below. */
    };

    const setUser = (user: firebase.User | null) => {
      if (user !== null) {
        data.user = user;
        data.username = user.email?.split("@")[0] ?? user.uid;
      }
    };

    const subscribeToGameChanges = (args: { gameId: string }) => {
      const { gameId } = args;
      return props.firestore
        .collection("game")
        .doc(gameId)
        .onSnapshot(s => {
          const gameData = s.data() as Game | undefined;
          if (gameData !== undefined) {
            data.game = gameData;
          }
        });
    };

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
            data.gameId = gameId;
            unsubscribeFromFirestore = subscribeToGameChanges({ gameId });
          }
        });
    };

    const quit = async () => {
      data.gameId = "";
      data.game = undefined;
      unsubscribeFromFirestore();

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
          props.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
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
        });

    const initialize = async () => {
      props.functions
        .httpsCallable("initializeGame")({
          displayName: data.username,
          // Imagine we had som real songs to add :)
          deck: props.deck
        })
        .then(response => {
          const gameId = response.data;
          data.gameId = gameId;
          unsubscribeFromFirestore = subscribeToGameChanges({ gameId });
          if (data.user) {
            storeCurrentGame({ gameId, userId: data.user.uid });
          }
        });
    };

    const start = async () => {
      props.functions.httpsCallable("startGame")({ gameId: data.gameId });
    };

    const join = async () => {
      props.functions
        .httpsCallable("connectToGame")({
          gameId: data.gameId,
          displayName: data.username
        })
        .then(() => {
          unsubscribeFromFirestore = subscribeToGameChanges({
            gameId: data.gameId
          });
          if (data.user) {
            storeCurrentGame({ gameId: data.gameId, userId: data.user.uid });
          }
        });
    };

    const draw = async () => {
      props.functions.httpsCallable("runAction")({
        gameId: data.gameId,
        action: action.drawAction()
      });
    };

    const lock = async () => {
      props.functions.httpsCallable("runAction")({
        gameId: data.gameId,
        action: action.passAction()
      });
    };

    const guess = async (pos: number) => {
      props.functions.httpsCallable("runAction")({
        gameId: data.gameId,
        action: action.guessAction({ hiddenCardPosition: pos })
      });
    };

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
      unsubscribeFromFirestore();
    });

    return {
      username,
      user,
      game,
      gameId,
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
