<template>
  <div v-if="user === undefined">
    <input
      type="text"
      name="username"
      placeholder="username"
      v-model="username"
    />
    <button @click="signIn">Sign in</button>
  </div>
  <div v-if="user !== undefined">
    <button @click="signOut">Sign out {{ user.email }}</button>

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
      <p>{{ gameId }}</p>
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
      <div v-if="game.status === 'initialized' && user !== undefined">
        <p>Waiting for players to join...</p>
        <button :disabled="game.currentPlayer.id !== user.uid" @click="start">
          Start game
        </button>
      </div>
      <div v-if="game.status === 'started'">
        <p v-if="game.log.length === 0">Game has begun!</p>
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
        <div
          v-if="
            game.phase === 'listen' &&
              game.currentPlayer.id === user.uid &&
              game.currentHiddenCard !== undefined
          "
        >
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

      <div v-if="game.status === 'finished'">
        The score is
        <p v-for="player in game.players" :key="player.displayName">
          {{ player.displayName }} has {{ player.lockedCards.length }} cards
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onUnmounted } from "vue";
import { fb } from "@/config/firebaseConfig";
import firebase from "firebase/app";
import { GameDocument } from "../../firebase/functions/src/types";

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
    const game = ref<GameDocument.Game | undefined>(undefined);
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
          deck: [
            { id: 0, title: "A song 1", artist: "BSD", year: "2000" },
            { id: 1, title: "A song 2", artist: "BSD", year: "1999" },
            { id: 2, title: "A song 3", artist: "BSD", year: "2001" },
            { id: 3, title: "A song 4", artist: "BSD", year: "2004" },
            { id: 4, title: "A song 5", artist: "BSD", year: "2002" }
          ]
        })
        .then(response => {
          const gameId = response.data;
          unsub = firestore
            .collection("game")
            .doc(gameId)
            .onSnapshot(s => {
              const gameData = s.data() as GameDocument.Game | undefined;
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

    const join = async () => {
      functions
        .httpsCallable("connectToGame")({
          gameId: data.gameId,
          displayName: data.username
        })
        .then(() => {
          unsub = firestore
            .collection("game")
            .doc(data.gameId)
            .onSnapshot(s => {
              const gameData = s.data() as GameDocument.Game | undefined;
              if (gameData !== undefined) {
                console.log("data", gameData);
                data.game = gameData;
                data.gameStr = JSON.stringify(gameData);
              }
            });
        });
    };

    const draw = async () => {
      functions.httpsCallable("runAction")({
        gameId: data.gameId,
        action: { _tag: "drawAction" }
      });
    };

    const lock = async () => {
      functions.httpsCallable("runAction")({
        gameId: data.gameId,
        action: { _tag: "passAction" }
      });
    };

    const guess = async (pos: number) => {
      console.log("guess", pos);
      functions.httpsCallable("runAction")({
        gameId: data.gameId,
        action: { _tag: "guessAction", hiddenCardPosition: pos }
      });
    };

    onUnmounted(() => {
      unsub();
    });

    return {
      username,
      user,
      game,
      gameId,
      gameStr,
      signIn: onSignIn,
      signOut: onSignOut,
      initialize,
      start,
      join,
      draw,
      lock,
      guess
    };
  }
});
</script>
