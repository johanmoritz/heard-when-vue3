<template>
  <div class="home">
    <GamePresenter />
  </div>
</template>

<script>
// @ is an alias to /src
import GamePresenter from "@/components/Game/GamePresenter.vue";

export default {
  name: "Home",
  components: {
    GamePresenter
  },
  computed: {
    name() {
      return this.$store.state.count;
    }
  }
};
</script>
