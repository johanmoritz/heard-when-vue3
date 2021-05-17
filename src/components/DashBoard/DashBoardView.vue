<template>
  <div v-if="gameUser !== undefined">
    <p>
      <Btn :theme="'alert'">
        <button :disabled="loading" @click="userClicked">
          Sign Out
        </button>
      </Btn>
    </p>
    <div class="text-contrast" v-if="gameSession === undefined">
      <Btn>
        <button :disabled="loading" @click="createGameClicked">
          Create Game
        </button>
      </Btn>
      <br class="screen-br" />or<br class="screen-br" /><br class="screen-br" />
      <span v-if="gameSession === undefined">
        <input
          :disabled="loading"
          :value="modelValue"
          placeholder="Enter Game ID"
          type="text"
          @input="$emit('update:modelValue', $event.target.value)"
          class="game-id-field"
        />
        <br class="screen-br" /><br class="screen-br" />
        <Btn>
          <button :disabled="loading" @click="joinGameClicked">
            Join Game
          </button>
        </Btn>
      </span>
    </div>
  </div>
</template>

<script>
import Btn from "@/components/Btn.vue";

export default {
  name: "DashBoardView",
  components: { Btn },
  props: {
    gameUser: Object,
    userName: String,
    gameSession: Object,
    gameID: { type: String, default: "" },
    modelValue: String,
    loading: { type: Boolean, default: false }
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

<style>
.screen-br {
  display: none;
}
@media screen and (max-width: 500px) {
  .screen-br {
    display: inline-block;
  }
}
.game-id-field {
  margin-left: 1rem;
}
</style>
