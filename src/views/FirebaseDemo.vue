<template>
  <game-demo v-bind="{ auth, deck, firestore, functions }"></game-demo>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { functions, firestore, auth } from "@/config/firebaseConfig";
import { Card } from "firebase/functions/src/types";
import GameDemo from "@/components/GameDemo.vue";

export default defineComponent({
  components: { GameDemo },
  setup() {
    const deck: Array<Card> = [
      { id: 0, title: "A song 1", artist: "BSD", year: 2000 },
      { id: 1, title: "A song 2", artist: "BSD", year: 1999 },
      { id: 2, title: "A song 3", artist: "BSD", year: 2001 },
      { id: 3, title: "A song 4", artist: "BSD", year: 2004 },
      { id: 4, title: "A song 5", artist: "BSD", year: 2002 }
    ];

    return {
      functions,
      auth,
      firestore,
      deck
    };
  }
});
</script>
