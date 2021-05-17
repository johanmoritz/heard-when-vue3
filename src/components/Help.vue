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
        This is a multiplayer music trivia game inspired by the Swedish board
        game "När då då?".<br /><br />

        Listen to songs and try to guess their <i>year</i> relative to other
        songs
      </p>
      <h3>Requirements</h3>
      <p>
        To play you need a <i>Google</i> account for signing in and a
        <i>Spotify Premium</i> account for playing the songs
      </p>
      <h3>Game instructions</h3>
      <p>
        You start with one song card. Choose if you want to draw or lock
        (and end your turn). If you draw and have connected Spotify you will hear a song via the in-game
        Spotify player
      </p>
      <img
        src="@/assets/draw-or-lock-2.png"
        alt="Guess when the song is from"
      />
      <p>
        Make a guess by hovering and clicking on the adjacent space between or
        next to the card(s). Guessing correctly gives you a card and a new turn.
        <br /><br />
      </p>
      <img src="@/assets/card-before.png" alt="Guess when the song is from" />
      <p>
        <i>Locking</i> increases your score by the number of current cards and ends your turn
      </p>
      <img src="@/assets/won-card.png" alt="Draw new card or lock cards" />
      <img src="@/assets/score-increased.png" alt="Draw new card or lock cards" />
      <p>
        An incorrect guess results in losing all loose cards gained during the
        current round, as well as your turn.
      </p>
      <img src="@/assets/card-loose.png" alt="Draw new card or lock cards" />
      <p>
        When not playing your cards appear in yellow below the other players
      </p>
      <img src="@/assets/cards-other.png" alt="Draw new card or lock cards" />
      <p>
        You can invite other players by sending them the GameID shown
      </p>
      <img src="@/assets/gameID.png" alt="Draw new card or lock cards" />
      <h3>Troubleshooting</h3>
      <p>
        Should the song not play, hit the play button on an external Spotify
        application where you are also signed in. Pause it then try using the
        in-game player again
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
