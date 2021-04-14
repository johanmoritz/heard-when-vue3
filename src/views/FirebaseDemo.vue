<template>
  <game-demo v-bind="{ auth, deck, firestore, functions }"></game-demo>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { functions, firestore, auth } from "@/config/firebaseConfig";
import { Card } from "firebase/functions/src/types";
import GameDemo from "@/components/GameDemo.vue";

function randomReal(args: { min: number; max: number }): number {
  const { min, max } = args;
  return Math.random() * (max - min) + min;
}

function randomInt(args: { min: number; max: number }): number {
  return Math.floor(randomReal(args));
}

function randomOrder<T>(arr: Array<T>): Array<T> {
  let cp = arr.concat([]);
  const result = [];
  while (cp.length !== 0) {
    const iToMove = randomInt({ min: 0, max: cp.length });
    const v = cp[iToMove];
    result.push(v);
    cp = cp.filter((_, i) => i !== iToMove);
  }
  return result;
}

export default defineComponent({
  components: { GameDemo },
  setup() {
    const deck: Array<Card> = [
      { id: 0, title: "Mera Mål!", artist: "Markolio", year: 2000 },
      { id: 1, title: "Daddy DJ", artist: "Daddy DJ", year: 2001 },
      { id: 2, title: "The Ketchup Song", artist: "Las Ketchup", year: 2002 },
      { id: 3, title: "Lose Yourself", artist: "Eminem", year: 2003 },
      { id: 4, title: "Coming True", artist: "Daniel Lindström", year: 2004 },
      { id: 5, title: "Right Here Right Now", artist: "Agnes", year: 2005 },
      { id: 6, title: "Who's Da Man", artist: "Elias Feat", year: 2006 },
      { id: 7, title: "The Worrying Kind", artist: "The Ark", year: 2007 },
      { id: 8, title: "I Kissed A Girl", artist: "Katy Perry", year: 2008 },
      { id: 9, title: "Fairytale", artist: "Alexander Rybak", year: 2009 },
      { id: 10, title: "Waka Waka", artist: "Shakira", year: 2010 },
      { id: 11, title: "What Are Words", artist: "Chris Medina", year: 2011 },
      { id: 12, title: "Euphoria", artist: "Loreen", year: 2012 },
      { id: 13, title: "Wake Me Up!", artist: "Avicii", year: 2013 }
    ];

    Math.random;

    return {
      functions,
      auth,
      firestore,
      deck: randomOrder(deck)
    };
  }
});
</script>
