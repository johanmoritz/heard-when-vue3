<template>
  <div v-if="player === undefined">
    <p>Sign in using your Google account</p>
    <button @click="signInAct">Sign in</button>
  </div>
</template>

<script>
import { user, signIn } from "./GameDemo.vue";
import { mapGetters } from "vuex";
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";
import { auth } from "../config/firebaseConfig";

export default {
  name: "Login",
  props: ["user", "signIn"],
  /*computed: {
    ...mapGetters(["person"]),
    nextRoute() {
      return this.$route.query.redirect || "/firebase";
    }
  },
  watch: {
    person(auth) {
      if (auth) {
        this.$router.replace(this.nextRoute);
      }
    }
  },*/
  setup() {
    const player = user;
    const signInAct = signIn;
    const router = useRouter();

    onBeforeMount(() => {
      auth.onAuthStateChanged(ok => {
        if (!ok) {
          router.replace("/");
        }
        router.replace("/firebase");
      });
    });

    return { player, signInAct };
  }
};
</script>
