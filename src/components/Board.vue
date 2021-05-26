<template>
  <div :v-if="song !== undefined">
    <Card
      :id="song.id"
      :title="song.title"
      :artist="song.artist"
      :year="song.year"
    />
    <div class="cards-container">
      <div class="button-card" v-for="(card, index) in cards" :key="index">
        <button class="guess-button" @click="guess(index)">{{ index }}</button>
        <Card
          :title="card.title"
          :artist="card.artist"
          :year="card.year"
          :id="card.id"
        />
      </div>
      <button class="guess-button" @click="guess(numberOfCards)">
        {{ numberOfCards }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Card as CardType } from "firebase/functions/src/types";
import { defineComponent, PropType } from "vue";
import Card from "@/components/Card.vue";
export default defineComponent({
  name: "Board",
  props: {
    cards: { type: Array as PropType<Array<CardType>>, required: true },
    song: { type: Object as PropType<CardType>, required: true },
    guess: {
      type: Function as PropType<(n: number) => void>,
      required: true
    }
  },
  components: { Card },
  computed: {
    numberOfCards(): number {
      return this.cards.length;
    }
  }
});
</script>

<style scoped>
.cards-container {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.button-card {
  display: flex;
  flex-direction: row;
}
.guess-button {
  opacity: 0;
}
</style>
