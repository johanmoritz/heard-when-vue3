<template>
  <div id="board-view" class="board">
    <h1>{{ msg }}</h1>
    <Board :song="song" :cards="cards" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Board from "@/components/Board.vue";
export default defineComponent({
  name: "GameView",
  props: {
    song: Object,
    cards: Array,
    msg: String
  },
  components: { Board },
  methods: {
    guess(index: number) {
      console.log("You guessed: " + index);
    }
  }
});
</script>

<style scoped>
.board {
  background: rgba(175, 134, 142, 0.8); 
  width: fill;
  height: fill;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 60px;
}
</style>
