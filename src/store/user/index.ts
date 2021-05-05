import * as fb from "@/config/firebaseConfig";
import { Game } from "firebase/functions/src/types";
import { reactive, Ref, ref } from "vue";
import firebase from "firebase";
import { Store } from "vuex";
import { Router } from "vue-router";

const user: Ref<firebase.User | undefined> = ref(undefined);
// const { router } = reactive({ router: router });
export const data = reactive({ user });

export default function({
  model,
  router
}: {
  model: Store<any>;
  router: Router;
}) {
  async function storeCurrentGame(args: { userId: string; gameId: string }) {
    const { userId, gameId } = args;

    return fb.firestore
      .collection("user")
      .doc(userId)
      .set({ currentGame: gameId });
  }

  function handleGameUpdates() {
    const stopWatchingGameChanges = model.watch(
      state => ({ game: state.game, gameId: state.gameId }),
      (args: { game: Game | undefined; gameId: string | undefined }) => {
        const { game, gameId } = args;
        if (
          game !== undefined &&
          gameId !== undefined &&
          data.user?.uid !== undefined
        ) {
          if (game.status === "initialized") {
            router.push("/play");
          }
          return storeCurrentGame({
            gameId,
            userId: data.user.uid
          });
        }
      }
    );
    return stopWatchingGameChanges;
  }

  const setUser = (user: firebase.User | null) => {
    if (user !== null) {
      data.user = user;
      const username = user.email?.split("@")[0] ?? user.uid;
      model.commit("setUsername", username);
    }
  };

  async function loadCurrentGame(args: { userId: string }) {
    const { userId } = args;

    return fb.firestore
      .collection("user")
      .doc(userId)
      .get()
      .then(res => res.data())
      .then(result => {
        if (result && result["currentGame"] !== undefined) {
          const gameId = result["currentGame"];
          model.dispatch("rejoinGame", gameId).then(() => router.push("/play"));
        }
      });
  }

  async function quit() {
    model.replaceState({ loading: false });
    router.push("/me");

    if (data.user) {
      return fb.firestore
        .collection("user")
        .doc(data.user.uid)
        .set({});
    }
  }

  async function signIn() {
    return fb.auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() =>
        fb.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      )
      .then(() => {
        setUser(fb.auth.currentUser);
        if (data.user) {
          loadCurrentGame({ userId: data.user.uid }).then(() =>
            router.push("/me")
          );
        }
      });
  }

  async function signOut() {
    return fb.auth.signOut().then(() => {
      data.user = undefined;
      model.replaceState({ loading: false });
      router.push("/");
    });
  }

  // Load the state when auth picks up the user
  function handleAuthState() {
    return fb.auth.onIdTokenChanged(user => {
      setUser(user);
      if (user) {
        loadCurrentGame({ userId: user.uid }).then(() => router.push("/me"));
      }
    });
  }

  return {
    handleGameUpdates,
    handleAuthState,
    quit,
    signIn,
    signOut
  };
}
