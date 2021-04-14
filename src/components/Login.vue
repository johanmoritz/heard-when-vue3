<template>
  <div>
    <p>Sign in using your Google account</p>
    <button @click="signInAct">Sign in</button>
  </div>
</template>

<script>
import { signIn } from "./GameDemo.vue";

export default {
  name: "Login",
  props: ["signIn"],
  setup() {
    const signInAct = signIn;

    return { signInAct };
  }
};
</script>
