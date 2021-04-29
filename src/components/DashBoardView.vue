<template>
  <div v-if="gameUser !== undefined">
    <Btn class="btn btn-exit" @click="userClicked">
      Sign out {{ userName }}
    </Btn>
    <div v-if="gameSession === undefined">
      <!-- What type do I send game prop as?-->
      Click to
      <Btn class="btn" @click="createGameClicked">
        Create new game
      </Btn>
      or
      <span v-if="gameSession === undefined">
        <input
          :value="modelValue"
          placeholder="Game id"
          type="text"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <Btn class="btn" @click="joinGameClicked">Join game</Btn>
        <!-- fix -->
      </span>
    </div>
  </div>
</template>

<script>
import Btn from "./Btn";

export default {
  name: "DashBoardView",
  components: Btn,
  props: {
    gameUser: Object,
    userName: String,
    gameSession: Object,
    gameID: { type: String, default: "" },
    modelValue: String
  },
  methods: {
    userClicked() {
      this.$emit("buttonClicked");
    },
    createGameClicked() {
      this.$emit("createClicked");
    },
    joinGameClicked() {
      //this.$emit("joinClicked");
      console.log(this.gameID);
    }
  }
};
</script>
