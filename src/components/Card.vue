<template>
  <div class="card">
    <div class="year">{{ year }}</div>
    <div>"{{ title }}"</div>
    <div>{{ artist }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Card",
  props: {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    year: { type: Number, required: true }
  }
});
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background: black;
  color: white;
  width: 100px;
  height: 150px;
  overflow-wrap: break-word;
  text-align: center;
  padding: 5px;
}
.card div {
  margin-top: 10px;
}
.year {
  font-size: 150%;
  font-weight: bold;
}
</style>
