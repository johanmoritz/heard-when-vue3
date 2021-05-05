<template>
  <LoginView @buttonClicked="signIn" :gameUser="user" :loading="loading" />
</template>

<script lang="ts">
import LoginView from "./LoginView.vue";
import userApi, { data } from "@/store/user";
import { toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";

export default {
  components: {
    LoginView
  },
  setup() {
    const { user } = toRefs(data);
    const model = useStore();
    const router = useRouter();
    const { signIn } = userApi({ model, router });
    const loading = computed(() => model.state.loading as boolean);
    return {
      signIn: () => signIn(),
      user,
      loading
    };
  }
};
</script>
