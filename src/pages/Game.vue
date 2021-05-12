<template>
  <main>
    <div v-if="game !== undefined && user !== undefined">
      <div v-if="game.status === 'initialized'">
        <WaitingAreaPresenter />
      </div>

      <div v-if="game.status === 'started'">
        <GamePresenter
          :game="game"
          :guess="guess"
          :draw="draw"
          :lock="lock"
          :username="username"
        />
        <div
          v-if="game.phase === 'listen' && game.currentHiddenCard !== undefined"
        >
          <MusicPlayerPresenter
            class="music-player"
            :songId="game.currentHiddenCard.uri"
          />
        </div>
      </div>

      <div v-if="game.status === 'finished'">
        The score is
        <p v-for="player in game.players" :key="player.displayName">
          {{ player.displayName }} has {{ player.lockedCards.length }} cards
        </p>
      </div>

      <Btn>
        <div class="btn btn-exit">
          <button @click="quit">End game</button>
        </div>
      </Btn>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed, toRefs } from "vue";
import { Game } from "../../firebase/functions/src/types";
import MusicPlayerPresenter from "@/components/MusicPlayer/MusicPlayerPresenter.vue";
import GamePresenter from "@/components/Game/GamePresenter.vue";
import WaitingAreaPresenter from "@/components/WaitingArea/WaitingAreaPresenter.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import userApi, { data as userData } from "@/store/user";

export default defineComponent({
  components: { MusicPlayerPresenter, GamePresenter, WaitingAreaPresenter },
  setup() {
    const model = useStore();
    const router = useRouter();

    const username = ref("");
    const { user } = toRefs(userData);

    const gameId = computed(() => model.state.gameId as string | undefined);
    const game = computed(() => model.state.game as Game | undefined);
    const error = computed(() => model.state.error as string);

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
