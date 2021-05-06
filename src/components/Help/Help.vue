<template>
  <div>
    <button class="btn" @click="modalOpen = true">
      Help
    </button>

    <div class="help" v-show="modalOpen">
      <h2>Help1</h2>
      <p style="text-align: center;">
        Are you confused? Don't worry, we've got you.
      </p>
      <h2>Help2</h2>
      <h2>Help3</h2>
      <h2>Help4</h2>
      <h3>About</h3>
      <p>
        Heard When is a music trivia game inspired by the Swedish board game
        "När då då?". <br />
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
      <button class="btn btn-exit" @click="modalOpen = false">
        Close
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const modalOpen = ref(false);
    return {
      modalOpen
    };
  }
};
</script>

<style>
.help {
  box-shadow: 0 0 10rem 3rem rgba(0, 0, 0, 0.7);
  background: rgba(194, 155, 163);
  top: 0;
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  width: 35%;
  margin: 20px;
  padding: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.help p {
  text-align: left;
}

.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}

img {
  border: 1px solid black;
  justify-content: center;
}
</style>
