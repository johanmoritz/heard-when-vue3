<template>
  <div v-if="user === undefined">
    <input type="text" name="username" v-model="username" />
    <button @click="signIn">Sign in</button>
  </div>
  <div v-if="user !== undefined">
    <button v-if="user !== undefined" @click="signOut">
      Sign out {{ user.email }}
    </button>
    <button
      v-if="user !== undefined"
      :disabled="game !== undefined"
      @click="initialize"
    >
      Create new game
    </button>
  </div>
  <div v-if="game !== undefined">
    <p>Status: {{ game.status }}</p>
    <p>Phase: {{ game.phase }}</p>

    <div v-if="game.status === 'initialized' && user !== undefined">
      <p>Waiting for players to join...</p>
      <button :disabled="game.currentPlayer.id !== user.uid" @click="start">
        Start game
      </button>
    </div>
    <div v-if="game.status === 'started'">
      <p v-if="game.log.length === 0">Game has begun!</p>
      <button :disabled="game.phase !== 'choice'" @click="draw">
        Draw card
      </button>
      <button :disabled="game.phase !== 'choice'" @click="lock">
        Lock cards
      </button>

      <button :disabled="game.phase !== 'listen'" @click="guess">Guess</button>
      <p v-if="game.currentHiddenCard !== undefined">
        Hidden card: {{ game.currentHiddenCard.title }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onUnmounted } from "vue";
import { fb } from "@/config/firebaseConfig";
import firebase from "firebase/app";

export default defineComponent({
  setup() {
    const functions = fb.functions();
    const auth = fb.auth();
    const firestore = fb.firestore();

    functions.useEmulator("localhost", 5001);
    auth.useEmulator("http://localhost:9099");
    firestore.useEmulator("localhost", 8080);

    const username = ref("");
    const user = ref<firebase.User | undefined>(undefined);
    const game = ref<{} | undefined>(undefined);
    const gameStr = ref("");
    const gameId = ref("");
    const data = reactive({ username, user, game, gameStr, gameId });

    let unsub = () => {
      /* */
    };

    const setUser = (user: firebase.User | null) => {
      if (user !== null) {
        data.user = user;
      }
    };

    setUser(auth.currentUser);

    const onSignIn = async () =>
      auth
        .signInWithEmailAndPassword(
          `${username.value}@example.com`,
          `${username.value}@example.com`
        )
        .then(() => {
          setUser(auth.currentUser);
        });
    const onSignOut = async () =>
      auth.signOut().then(() => {
        data.user = undefined;
      });

    const initialize = async () => {
      functions
        .httpsCallable("initializeGame")({
          displayName: data.username,
          deck: [{ id: 0, title: "A song", artist: "BSD", year: "2000" }],
        })
        .then((response) => {
          const gameId = response.data;
          unsub = firestore
            .collection("game")
            .doc(gameId)
            .onSnapshot((s) => {
              const gameData = s.data();
              if (gameData !== undefined) {
                console.log("data", gameData);
                data.gameId = gameId;
                data.game = gameData;
                data.gameStr = JSON.stringify(gameData);
              }
            });
        });
    };

    const start = async () => {
      functions.httpsCallable("startGame")({ gameId: data.gameId });
    };

    const draw = async () => {
      functions.httpsCallable("runAction")({
        gameId: data.gameId,
        action: { _tag: "drawAction" },
      });
    };

    const lock = async () => {
      functions.httpsCallable("runAction")({
        gameId: data.gameId,
        action: { _tag: "passAction" },
      });
    };

    const guess = async () => {
      functions.httpsCallable("runAction")({
        gameId: data.gameId,
        action: { _tag: "guessAction" },
      });
    };

    onUnmounted(() => {
      unsub();
    });

    return {
      username,
      user,
      game,
      gameStr,
      signIn: onSignIn,
      signOut: onSignOut,
      initialize,
      start,
      draw,
      lock,
      guess,
    };
  },
});
</script>
