<template>
  <div v-if="gameUser !== undefined">
    <Button>
      <button class="btn btn-exit" @click="userClicked">
        Sign out {{ userName }}
      </button>
      <div v-if="gameSession === undefined">
        <!-- What type do I send game prop as?-->
        Click to
        <button class="btn" @click="createGameClicked">
          Create new game
        </button>
        or
        <span v-if="gameSession === undefined">
          <input
            :value="modelValue"
            placeholder="Game id"
            type="text"
            @input="$emit('update:modelValue', $event.target.value)"
          />
          <button class="btn" @click="joinGameClicked">Join game</button>
          <!-- fix -->
        </span>
      </div>
    </Button>
  </div>
</template>

<script>
import Button from "@/components/Btn.vue";

export default {
  name: "DashBoardView",
  components: Button,
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
