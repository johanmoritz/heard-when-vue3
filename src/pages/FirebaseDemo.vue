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
      {
        id: 0,
        title: "Mera Mål!",
        artist: "Markolio",
        year: 2000,
        uri: "spotify:track:08oSaHoJ7jrFv1kd74ZRT2"
      },
      {
        id: 1,
        title: "Daddy DJ",
        artist: "Daddy DJ",
        year: 2001,
        uri: "spotify:track:0l2c67gYvWLmYkz8l1gbdn"
      },
      {
        id: 2,
        title: "The Ketchup Song",
        artist: "Las Ketchup",
        year: 2002,
        uri: "spotify:track:6UEfyhyfhYQsyipxOd95Ie"
      },
      {
        id: 3,
        title: "Lose Yourself",
        artist: "Eminem",
        year: 2003,
        uri: "spotify:track:7MJQ9Nfxzh8LPZ9e9u68Fq"
      },
      {
        id: 4,
        title: "Coming True",
        artist: "Daniel Lindström",
        year: 2004,
        uri: "spotify:album:6dpsjlCCaRJe4uVq1WJiXb"
      },
      {
        id: 5,
        title: "Right Here Right Now",
        artist: "Agnes",
        year: 2005,
        uri: "spotify:track:5mKLRZYKn8eT8uefTdmy8A"
      },
      {
        id: 6,
        title: "Who's Da Man",
        artist: "Elias Feat Frans",
        year: 2006,
        uri: "spotify:track:3LYpxjR3e1wlVwuqTKuWHp"
      },
      {
        id: 7,
        title: "The Worrying Kind",
        artist: "The Ark",
        year: 2007,
        uri: "spotify:track:5zIxRPGxiOBNRDBu2Upk4i"
      },
      {
        id: 8,
        title: "I Kissed A Girl",
        artist: "Katy Perry",
        year: 2008,
        uri: "spotify:track:14iN3o8ptQ8cFVZTEmyQRV"
      },
      {
        id: 9,
        title: "Fairytale",
        artist: "Alexander Rybak",
        year: 2009,
        uri: "spotify:track:2rzWSywjwzbysCmdOzssFR"
      },
      {
        id: 10,
        title: "Waka Waka",
        artist: "Shakira",
        year: 2010,
        uri: "spotify:track:2Cd9iWfcOpGDHLz6tVA3G4"
      },
      {
        id: 11,
        title: "What Are Words",
        artist: "Chris Medina",
        year: 2011,
        uri: "spotify:track:50A1WCxKycJUHRr4Rz6WrD"
      },
      {
        id: 12,
        title: "Euphoria",
        artist: "Loreen",
        year: 2012,
        uri: "spotify:track:2knr7ikPt4l7bk92qS4ZXW"
      },
      {
        id: 13,
        title: "Wake Me Up!",
        artist: "Avicii",
        year: 2013,
        uri: "spotify:track:0nrRP2bk19rLc0orkWPQk2"
      }
    ];

    return {
      functions,
      auth,
      firestore,
      deck: randomOrder(deck)
    };
  }
});
</script>
