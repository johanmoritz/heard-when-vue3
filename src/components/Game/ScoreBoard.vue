<template>
  <Btn>
    <button id="open-score" @click="modalOpen = true">Click for Score</button>
  </Btn>

  <div class="scoreboard" v-show="modalOpen" @click="modalOpen = false">
    <span id="scorehead">Scoreboard</span>
    <p v-for="player in game.players" :key="player.id">
      {{ player.displayName }} : {{ player.lockedCards.length }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { Game } from "../../../firebase/functions/src/types";
import Btn from "@/components/Btn.vue";


export default defineComponent({
  components: Btn,
  name: "ScoreBoard",
  props: {
    game: {
      type: Object as PropType<Game>,
      required: true
    }
  },
  setup() {
    const modalOpen = ref(false);
    return {
      modalOpen
    };
  }
});
</script>

<style scoped>

#open-score {
  color: black;
  font-weight: bold;
  background-color: #e4cf14;
  opacity: 0.9;
  display: inline-block;
  position: fixed;
  top: 0;
  right: 0;
  margin: 10px;
  padding: 15px;
  border-radius: 23% 27% 32% 19% / 64% 0% 35% 0%;
  box-shadow: 0 3px rgb(88, 80, 4);
  
}

#open-score:hover {
  color: white;
  background-color: rgb(42, 41, 36);
  box-shadow: 0 4px black;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
}


.scoreboard {
  color: black;
  background-color: grey;
  opacity: 1;
  display: inline-block;
  position: fixed;
  top: 0;
  right: 0;
  margin: 10px;
  padding: 40px;
  border-radius: 23% 27% 32% 19% / 64% 0% 35% 0%;
  background-image: linear-gradient(-225deg, #e4cf14 0%, rgb(233, 144, 54) 40%, rgb(209, 98, 97) 60%, #c88159 100%),linear-gradient(45deg, #29241F 0%, #e4cf14 100%);
}

#scorehead {
  text-decoration: underline;
  font-weight: bold;
}

#close-btn-position {
  float: right;
  top: -2em;
  position: relative;
  right: -2em;
}

#close-score {
  border-radius: 50%;
  font-weight: bold;
  height: 25px;
  width: 25px;
  padding: 0;
  margin: 0;
  font-size: 15px;
  color: rgb(37, 16, 16);
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

@media screen and (max-width: 749px) {
  .scoreboard {
    height: 10%;
    width: 10%;
    margin: 0px;

  }
}
</style>

