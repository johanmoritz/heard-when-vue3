<template>
  <div class="container">
    <p class="info">Sign in using your Google account</p>
    <button class="button" @click="userClicked">Sign in</button>
  </div>
</template>

<script>
import { signIn } from "./GameDemo.vue";

export default {
  name: "Login",
  props: ["signIn"],
  methods:  {
    userClicked(){
      this.$emit('buttonClicked');
    }

  },   

  setup() {
    const signInAct = signIn;

    return { signInAct };
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

.button {
  background-color: rgb(196, 196, 196);
  border: none;
  box-shadow: 1px 3px 3px rgb(133, 128, 128);
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50px;
  transition-duration: 0.3s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

.button:hover {
  background-color: #4CAF50; /* Green */
  color: rgba(255, 255, 255, 0.966);
}

</style>