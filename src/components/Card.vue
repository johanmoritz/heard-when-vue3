<template>
  <div class="card">
    <p class="year">{{ year }}</p>
    <p class="details">{{ title }}</p>
    <p class="details">{{ artist }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Card",
  props: {
    id: Number,
    title: String,
    artist: String,
    year: Number
  }
});
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background: rgba(243, 215, 220, 0.8);
  width: 100px;
  height: 150px;
  overflow-wrap: break-word;
}
.details {
  text-align: center;
}
.year {
  font-size: 150%;
  text-align: center;
  font: bold;
}
</style>
