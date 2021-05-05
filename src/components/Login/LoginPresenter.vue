<template>
  <LoginView @buttonClicked="signIn" :gameUser="user" />
</template>

<script lang="ts">
import LoginView from "./LoginView.vue";
import userApi, { data } from "@/store/user";
import { toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: {
    LoginView
  },
  setup() {
    const { user } = toRefs(data);
    const model = useStore();
    const router = useRouter();
    const { signIn } = userApi({ model, router });
    return {
      signIn: () => signIn(),
      user
    };
  }
};
</script>
