<template>
  <div class="form">
    <p v-if="!user"><a href="/">Login</a></p>
    <h1>Register</h1>
    <form @submit.prevent="register()">
      <input
        type="email"
        placeholder="Email"
        v-model="userData.email"
        required
      /><br />
      <input
        type="password"
        placeholder="Password"
        v-model="userData.password"
        required
      /><br />
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <button>Register</button>
      <p v-if="successMessage">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
import { auth } from "../config/firebaseConfig";
import { mapGetters } from "vuex";

export default {
  name: "Register",
  computed: {
    ...mapGetters(["user"]),
    nextRoute() {
      return this.$route.query.redirect || "/dashboard";
    }
  },
  watch: {
    user(auth) {
      if (auth) {
        this.$router.replace(this.nextRoute);
      }
    }
  },
  data() {
    return {
      userData: {
        email: "",
        password: ""
      },
      successMessage: "",
      errorMessage: ""
    };
  },
  methods: {
    register() {
      auth
        .createUserWithEmailAndPassword(
          this.userData.email,
          this.userData.password
        )
        .then(() => {
          this.successMessage = "Registration successful!";
        })
        .catch(err => {
          this.errorMessage = err.message;
        });
    }
  }
};
</script>
