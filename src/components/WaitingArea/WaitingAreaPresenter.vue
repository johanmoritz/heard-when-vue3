<template>
  <WaitingAreaView
    :players="players"
    :loading="loading"
    :startGame="startGame"
    :gameId="gameId"
    :isGameCreator="isGameCreator"
  />
</template>

<script lang="ts">
import { Player } from "firebase/functions/src/types";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import WaitingAreaView from "./WaitingAreaView.vue";
import { data as userData } from "@/store/user";

export default defineComponent({
  components: { WaitingAreaView },
  setup() {
    const model = useStore();

    const players = computed(
      () => model.state.game?.players as Array<Player> | undefined
    );
    const loading = computed(() => model.state.loading as boolean);
    const gameId = computed(() => model.state.gameId as string);
    const startGame = () => model.dispatch("startGame");

    const isGameCreator = computed(
      () =>
        userData.user &&
        userData.user.uid === model.state.game?.currentPlayer.id
    );

    return { players, loading, gameId, startGame, isGameCreator };
  }
});
</script>
