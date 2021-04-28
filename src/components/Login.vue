<template>
  <div v-if="gameUser === undefined">
    <div class="container">
      <p class="info">Sign in using your Google account</p>
      <Btn>
        <button class="btn" @click="userClicked">Sign in</button>
      </Btn>
    </div>
  </div>
</template>

<script>
import Btn from "./Btn";

export default {
  name: "Login",
  components: Btn,
  props: {
    gameUser: Object
  },
  methods: {
    userClicked() {
      this.$emit("buttonClicked");
    }
  }
};
</script>

<style scoped>
.container {
  background-color: rgb(156, 151, 151);
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
