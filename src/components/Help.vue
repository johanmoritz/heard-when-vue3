<template>
  <div>
    <Btn>
      <button id="openHelp" @click="modalOpen = true">?</button>
    </Btn>

    <div class="help" v-show="modalOpen">
      <Btn class="btn-exit" id="close-btn-position">
        <button id="closeHelp" @click="modalOpen = false">X</button>
      </Btn>
      <h2>About</h2>
      <p>
        <i>Heard When</i> is a multiplayer music trivia game inspired by the
        Swedish board game "När då då?". <br /><br />
        Listening to songs from Spotify decade playlists, the player in turn
        guesses when the current song was released by placing it relative to
        other displayed song cards.
      </p>
      <h3>Connection</h3>
      <p>
        To sign in, use a <i>Google account</i>. You will also need to connect a
        <i>Spotify Premium account</i> to the in-game music player. Both of
        these steps will temporarily redirect you to their respective services.
        <br /><br />Should the song not play, hit the play button on an external
        Spotify application where you are also signed in, pause it and try using
        the in-game player again.
      </p>
      <h3>Game instructions</h3>
      <p>
        When it's your turn, you will hear a song via the in-game Spotify
        player. Make a guess by clicking on the space between or next to the
        card(s).
      </p>
      <img src="@/assets/guessSong.png" alt="Guess when the song is from" />
      <p>
        By guessing correctly, you are given the option to "draw" a new card to
        take a shot at another song. Or, you can "lock" your cards, which
        increases your score by the number of cards you have guessed correctly
        during the current round, but also surrenders your turn to the next
        player.
      </p>
      <img src="@/assets/drawLock.png" alt="Draw new card or lock cards" />
      <p>
        An incorrect guess results in losing all the cards gained during the
        current round, as well as your turn.
      </p>
      <p>
        <br /><br />
        <b>Background image</b> by gotafli:
        <a href="https://unsplash.com/photos/qyzWgOSa_WU"
          >https://unsplash.com/photos/qyzWgOSa_WU</a
        >
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
.help {
  background: rgb(228, 207, 20);
  /*background:black;
  color: white;*/
  text-align: center;
  top: 0;
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  width: 45%;
  height: 100%;
  margin: 0 1rem;
  padding: 0 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  overflow: scroll;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10; /* keep on top of other elements on the page */
  outline: 9999px solid rgba(0, 0, 0, 0.5);
}
.help p {
  text-align: left;
}
.help h2 {
  margin-top: 1.5rem;
}
img {
  border: 2px solid black;
  justify-content: center;
  width: 100%;
  max-width: 400px;
}
#openHelp {
  border-radius: 50%;
  font-size: 25px;
  font-weight: bold;
  background-color: rgb(228, 207, 20);
  box-shadow: 0 4px rgb(88, 80, 4);
  padding: 10px;
  height: 60px;
  width: 60px;
  position: fixed;
  bottom: 1em;
  right: 1em;
}
#openHelp:hover {
  background-color: rgb(42, 41, 36);
  box-shadow: 0 4px black;
}
#close-btn-position {
  float: right;
  top: 1rem;
  margin: 0;
  padding: 0;
  position: -webkit-sticky; /* Safari */
  position: sticky;
}
#closeHelp {
  border-radius: 50%;
  font-weight: bold;
  height: 40px;
  width: 40px;
  padding: 0;
  margin: 0;
  font-size: 20px;
  color: rgb(37, 16, 16);
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
@media screen and (max-width: 1000px) {
  .help {
    width: 70%;
  }
}
</style>
