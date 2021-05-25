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
        Heard When is a multiplayer music trivia game inspired by the Swedish
        board game "När då då?".<br /><br />
        Listen to songs and try to guess their <i>release year</i> relative to
        other songs.
      </p>
      <h3>Requirements</h3>
      <p>
        To play, you need a <i>Google</i> account for signing in and a
        <i>Spotify Premium</i> account for playing the songs.
      </p>
      <h3>Game instructions</h3>
      <p>
        You start with one song card. Choose if you want to draw or lock (ending
        your turn). If you draw and have connected to Spotify, you will hear a
        song via the in-game Spotify player.
      </p>
      <img
        src="@/assets/draw-or-lock-2.png"
        alt="Draw a new card or lock current cards"
      />
      <p>
        Make a guess by hovering and clicking on the adjacent space between or
        next to the card(s). Guessing correctly gives you a loose card and a new
        turn.
        <br /><br />
      </p>
      <img
        src="@/assets/card-before.png"
        alt="Guessing when the song was released"
      />
      <p>
        <i>Locking</i> increases your score by the number of currently loose
        cards and ends your turn. The first player to reach 7 locked cards wins.
      </p>
      <img src="@/assets/won-card.png" alt="Locking current cards" />
      <img
        src="@/assets/score-increased.png"
        alt="Score updated on top-right scoreboard"
      />
      <p>
        An incorrect guess results in losing all loose cards gained during the
        round, as well as your turn. The next player now gets a shot at placing
        the song card correctly.
      </p>
      <img src="@/assets/card-loose.png" alt="Loose cards and locked card" />
      <p>
        When it's not your turn, your cards appear in yellow below the current
        player's cards.
      </p>
      <img
        src="@/assets/cards-other.png"
        alt="Smaller cards during other player's round"
      />
      <p>
        Other players can join the game before it's started by entering the
        GameID shown when the game is created.
      </p>
      <img src="@/assets/gameID.png" alt="Invite players using game ID" />
      <h3>Troubleshooting</h3>
      <p>
        Should the song not play, hit the play button on an external Spotify
        application where you are also signed in. Pause it, then try using the
        in-game player again.
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

#openHelp:before {
  content: 'Read instructions here →';
  color: white;
  background-color: black;
  top: -0.5rem;
  left: -24rem;
  position: absolute;
  height: 1rem;
  font: 2rem/100% Georgia, "Times New Roman", Times, serif;
  padding-bottom: 25px;
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
