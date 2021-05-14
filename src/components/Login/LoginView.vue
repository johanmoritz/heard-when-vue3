<template>
  <div v-if="gameUser === undefined">
    <div class="container">
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
.container {
  background-color: rgb(156, 151, 151);
  border-radius: 25px;
  position: relative;
  height: 175px;
  background-image: linear-gradient(90deg, rgb(236, 129, 231), rgb(233, 46, 84),rgb(236, 129, 231));
}

.info {
  color: black;
  text-align: center;
  padding: 15px 32px;
  font-size: large;
  
}
</style>
