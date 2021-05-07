<template>
  <LayoutView>
    <template v-slot:nav> </template>
    <template v-slot:main>
      <router-view />
      <Help />
    </template>

    <template v-slot:bottom-left>
      <Error v-if="error" :msg="error" />
    </template>

    <template v-slot:bottom-right>
      <Loader v-if="loading" />
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

    onUnmounted(() => {
      unsubModel();
      unsubFb();
    });

    return { loading, error };
  }
});
</script>
