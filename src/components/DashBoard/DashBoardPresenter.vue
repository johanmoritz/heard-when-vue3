<template>
  <DashBoardView
    @buttonClicked="signOut"
    :gameUser="user"
    @createClicked="initialize"
    :userName="username"
    :gameSession="game"
    @joinClicked="join"
    v-model="gameIdRaw"
  />
</template>

<script lang="ts">
import DashBoardView from "./DashBoardView.vue";
import userApi, { data } from "@/store/user";
import { PropType, toRefs, ref } from "vue";
import { Card } from "firebase/functions/src/types";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: {
    DashBoardView
  },
  props: {
    deck: { type: Array as PropType<Array<Card>>, required: true }
  },
  setup(props: { deck: Array<Card> }) {
    const model = useStore();
    const router = useRouter();
    const { user } = toRefs(data);
    const { username, game } = toRefs(model.state);

    const gameIdRaw = ref("");

    const { signOut } = userApi({ model, router });

    const initialize = () => model.dispatch("initializeGame", props.deck);
    const join = () => model.dispatch("joinGame", gameIdRaw.value);

    return {
      signOut,
      user,
      initialize,
      username,
      game,
      gameIdRaw,
      join
    };
  }
};
</script>
