<template>
  <LayoutView>
    <template v-slot:background>
      <div
        class="background"
        :class="{ gametheme: isInitialized, othertheme: isOtherPlayer }"
      ></div>
    </template>
    <template v-slot:nav> </template>
    <template v-slot:main>
      <h1 class="text-contrast">Heard When</h1>
      <router-view />
      <Loader id="loader" v-if="loading" />
      <Help id="help-position" />
    </template>

    <template v-slot:bottom-left>
      <Error v-if="error" :msg="error" />
    </template>
  </LayoutView>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted } from "vue";
import { useStore } from "vuex";
import userApi from "@/store/user";
import { useRouter } from "vue-router";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import Help from "@/components/Help.vue";
import LayoutView from "@/components/Layout/LayoutView.vue";

export default defineComponent({
  components: { Loader, Error, LayoutView, Help },
  setup() {
    const model = useStore();
    const router = useRouter();
    const { handleGameUpdates, handleAuthState } = userApi({ model, router });

    const loading = computed(() => model.state.loading as boolean);
    const error = computed(() => model.state.error as string);

    const unsubModel = handleGameUpdates();
    const unsubFb = handleAuthState();

    const isInitialized = computed(() => model.state.game);
    const isOtherPlayer = computed(() =>
        model.state.game &&
        model.state.game.currentPlayer.displayName !== model.state.username
    );

    onUnmounted(() => {
      unsubModel();
      unsubFb();
    });

    return { loading, error, isInitialized, isOtherPlayer };
  }
});
</script>
