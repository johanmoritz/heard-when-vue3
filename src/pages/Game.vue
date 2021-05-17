<template>
  <div v-if="game !== undefined && user !== undefined">
    <WaitingAreaPresenter v-if="game.status === 'initialized'" />

    <GamePresenter
      v-if="game.status === 'started'"
      :game="game"
      :guess="guess"
      :draw="draw"
      :lock="lock"
    />
    <MusicPlayerPresenter
      v-if="game.phase === 'listen' && game.currentHiddenCard !== undefined"
      :songId="game.currentHiddenCard.uri"
    />

    <EndView v-if="game.status === 'finished'" :players="game.players" />

    <EndGameButton :quit="quit" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, toRefs } from "vue";
import { Game } from "../../firebase/functions/src/types";
import MusicPlayerPresenter from "@/components/MusicPlayer/MusicPlayerPresenter.vue";
import GamePresenter from "@/components/Game/GamePresenter.vue";
import EndGameButton from "@/components/Game/EndGameButton.vue";
import EndView from "@/components/Game/EndView.vue";
import WaitingAreaPresenter from "@/components/WaitingArea/WaitingAreaPresenter.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import userApi, { data as userData } from "@/store/user";

export default defineComponent({
  components: {
    MusicPlayerPresenter,
    GamePresenter,
    WaitingAreaPresenter,
    EndGameButton,
    EndView
  },
  setup() {
    const model = useStore();
    const router = useRouter();

    const username = ref("");
    const { user } = toRefs(userData);

    const gameId = computed(() => model.state.gameId as string | undefined);
    const game = computed(() => model.state.game as Game | undefined);

    const { quit } = userApi({ model, router });

    const draw = () => model.dispatch("drawCard");
    const lock = () => model.dispatch("lockCards");
    const guess = (pos: number) => model.dispatch("guessCard", pos);

    return {
      username,
      user,
      game,
      gameId,
      draw,
      lock,
      guess,
      quit
    };
  }
});
</script>
