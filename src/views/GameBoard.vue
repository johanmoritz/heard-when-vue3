<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Board msg="Your Board" />
  </div>
</template>

<script>
// @ is an alias to /src
import Board from "@/components/Board.vue";



export default {
  name: "Board",
  components: {
    Board
  },
  computed: {
    name() {
      return this.$store.state.count;
    }
  }
};
</script>
