<template>
  <div v-if="gameUser !== undefined">
    <button class="button" @click="userClicked">Sign out {{ userName }}</button>
    <div v-if="gameSession === undefined">
      <!-- What type do I send game prop as?-->
      Click to
      <button class="button" @click="createGameClicked">
        Create new game
      </button>
      or
      <span v-if="gameSession === undefined">
      <!-- <input type="text" placeholder="Game id" v-model="gameId" /> -->
      <button class="button" @click="joinGameClicked">Join game</button>
    </span>
    
    </div>
  </div>
</template>

<script>
export default {
  name: "DashBoardView",
  props: {
    gameUser: Object,
    userName: String,
    gameSession: Object,
    gameID: String
  },
  methods: {
    userClicked() {
      this.$emit("buttonClicked");
    },
    createGameClicked() {
      this.$emit("createClicked");
    },
    joinGameClicked() {
      this.$emit("joinClicked");
    }
  }
};
</script>

<style scoped>

.button {
  background-color: rgb(196, 196, 196);
  border: none;
  padding: 15px 32px;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50px;
  transition-duration: 0.3s;
}

.button:hover {
  background-color: #4caf50; /* Green */
  color: rgba(255, 255, 255, 0.966);
}
</style>