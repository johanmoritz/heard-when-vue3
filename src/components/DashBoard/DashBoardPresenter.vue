<template>
  <DashBoardView
    @buttonClicked="signOut"
    :gameUser="user"
    @createClicked="initialize"
    :userName="username"
    :gameSession="game"
    :gameID="gameId"
    @joinClicked="join"
    v-model="gameId"
  />
</template>

<script lang="ts">
import DashBoardView from "./DashBoardView.vue";
import userApi, { data } from "@/store/user";
import { PropType, toRefs } from "vue";
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
    const { username, game, gameId } = toRefs(model.state);

    const { signOut } = userApi({ model, router });

    const initialize = () => model.dispatch("initializeGame", props.deck);
    const join = (id: string) => model.dispatch("joinGame", id);

    return {
      signOut,
      user,
      initialize,
      username,
      game,
      gameId,
      join
    };
  }
};
</script>
