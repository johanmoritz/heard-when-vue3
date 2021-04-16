<template>
  <div :v-if="song !== undefined">
    <Card
      id="song.id"
      title="song.title"
      artist="song.artist"
      year="song.year"
    />
    <div class="cards-container">
      <div class="button-card" v-for="(card, index) in cards" :key="index">
        <button class="guess-button" @click="guess(index)">{{ index }}</button>
        <Card
          :id="card.id"
          :title="card.title"
          :artist="card.artist"
          :year="card.year"
        />
      </div>
      <button class="guess-button" @click="guess(numberOfCards)">
        {{ numberOfCards }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";
export default defineComponent({
  name: "Board",
  props: {
    cards: Array,
    song: Object
  },
  components: { Card },
  computed: {
    numberOfCards(): number | undefined {
      return this?.cards?.length;
    }
  },
  methods: {
    guess(index: number) {
      console.log("You guessed: " + index);
    }
  }
});
</script>

<style scoped>
.cards-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.button-card {
  display: flex;
  flex-direction: row;
}
.guess-button {
  opacity: 0;
}
</style>
