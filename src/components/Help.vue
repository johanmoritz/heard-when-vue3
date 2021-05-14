<template>
  <div>
    <Btn>
      <button id="openHelp" @click="modalOpen = true">
        ?
      </button>
    </Btn>

    <div id="help" v-show="modalOpen">
      <Btn id="closeHelp" :theme="'alert'">
        <button @click="modalOpen = false">
          X
        </button>
      </Btn>
      <h2>Help</h2>
      <p style="text-align: center;">
        Are you confused? Don't worry, we've got you.
      </p>
      <h3>About</h3>
      <p>
        <i>Heard When</i> is a music trivia game inspired by the Swedish board
        game "När då då?". <br />
        Songs from Spotify decade playlists are played and the player in turn
        guesses in which order the current song was released by placing it
        relative to other song cards, which correspond to songs from other
        years. The goal is to reach a specific number of song cards at the end
        of the game. <br />
        The game is simple and intuitive and difficulty increases as more cards
        are collected.
      </p>
      <h3>Connection</h3>
      <p>
        To sign in, use a <i>Google account</i>. You will also need a
        <i>Spotify Premium account</i> to play the music in-game. Both of these
        steps will temporarily redirect you to their respective login services.
        <br />
        From the dashboard menu, you can either create a new game session or
        join an existing session by entering its ID.
      </p>
      <h3>Game instructions</h3>
      <p>
        When it's your turn, you will hear a song via the in-game Spotify
        player. Your task is to guess in which order the song was released.
        <br />
        The cards displayed on the board are the cards you have selected so far
        during the current round and they are ordered chronologically. You make
        a guess by clicking on the space between or next to the card(s).
      </p>
      <img src="@/assets/guessSong.png" alt="Guess when the song is from" />
      <p>
        By guessing correctly, you are given the option to "draw" a new card to
        take a shot at another song, or "lock" your cards and surrender your
        turn to the next player.
      </p>
      <img src="@/assets/drawLock.png" alt="Draw new card or lock cards" />
      <p>
        An incorrect guess results in losing all your cards gained during the
        round and the next player gets a chance at placing the song in the
        correct order.
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Btn from "@/components/Btn.vue";

export default {
  components: { Btn },
  setup() {
    const modalOpen = ref(false);
    return {
      modalOpen
    };
  }
};
</script>

<style scoped>
#help {
  background: rgba(194, 155, 163);
  top: 0;
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  height: 100%;
  margin: 0 1rem;
  padding: 0 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  overflow: scroll;
  overflow-x: hidden;
  z-index: 10; /* keep on top of other elements on the page */
  outline: 9999px solid rgba(0, 0, 0, 0.5);
}
#help p {
  text-align: left;
}
#help h2 {
  clear: right;
  margin-top: 0;
}
img {
  border: 2px solid black;
  justify-content: center;
  width: 100%;
  max-width: 400px;
}
#openHelp {
  position: fixed;
  bottom: 2em;
  right: 2em;
}
#closeHelp {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  float: right;
  margin-bottom: 0;
}
@media screen and (max-width: 1000px) {
  .help {
    width: 70%;
  }
  #openHelp {
    top: 2em;
  }
}
</style>
