<template>
  <div v-if="gameUser === undefined">
    <div class="login-container">
      <p class="info">Sign in using your Google account</p>
      <Btn>
        <button :disabled="loading" @click="userClicked">Sign in</button>
      </Btn>
    </div>
  </div>
</template>

<script>
import Btn from "@/components/Btn.vue";

export default {
  name: "LoginView",
  components: { Btn },
  props: {
    gameUser: Object,
    loading: { type: Boolean, default: false }
  },
  methods: {
    userClicked() {
      this.$emit("buttonClicked");
    }
  }
};
</script>

<style scoped>
.login-container {
  
  border-radius: 25px;
  position: relative;
  height: 175px;
}

.info {
  color: black;
  text-align: center;
  padding: 15px 32px;
  font-size: large;
}
</style>
