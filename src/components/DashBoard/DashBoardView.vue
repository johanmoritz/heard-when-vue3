<template>
  <div v-if="gameUser !== undefined">
    <Btn :theme="'alert'">
      <button :disabled="loading" @click="userClicked">
        Sign out {{ userName }}
      </button>
    </Btn>
    <div v-if="gameSession === undefined">
      Click to
      <Btn>
        <button :disabled="loading" @click="createGameClicked">
          Create new game
        </button>
      </Btn>
      or
      <span v-if="gameSession === undefined">
        <input
          :disabled="loading"
          :value="modelValue"
          placeholder="Game id"
          type="text"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <Btn>
          <button :disabled="loading" @click="joinGameClicked">
            Join game
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
