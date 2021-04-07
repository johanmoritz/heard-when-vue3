<template>
  <div id="welcome">
    <h1>Dashboard</h1>
    <p v-if="user">{{ user.email }} is logged in</p>
    <button @click.prevent.stop="logout()">Logout</button>
  </div>
</template>

<script>
import { auth } from "../config/firebaseConfig";
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    logout() {
      auth
        .signOut()
        .then(() => {
          this.$router.replace("/");
        })
        .catch(err => alert(err.message));
    }
  }
};
</script>
