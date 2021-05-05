<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  </div>
  <router-view />

  <Loader id="loading" v-if="loading" />
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted } from "vue";
import { useStore } from "vuex";
import userApi from "@/store/user";
import { useRouter } from "vue-router";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  components: { Loader },
  setup() {
    const model = useStore();
    const router = useRouter();
    const { handleGameUpdates, handleAuthState } = userApi({ model, router });

    const loading = computed(() => model.state.loading as boolean);
    const error = computed(() => model.state.error as string);

    const unsubModel = handleGameUpdates();
    const unsubFb = handleAuthState();

    onUnmounted(() => {
      unsubModel();
      unsubFb();
    });

    return { loading, error };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgba(194, 155, 163);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.button {
  background: rgba(243, 215, 220, 0.8);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border: none;
  color: #2c3e50;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.overlay {
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#loading {
  position: fixed;
  bottom: 2em;
  right: 2em;
}
</style>
