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
      or
      <span v-if="gameSession === undefined">
        <input
          :disabled="loading"
          :value="modelValue"
          placeholder="Enter Game ID"
          type="text"
          @input="$emit('update:modelValue', $.target.value)"
        />
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
