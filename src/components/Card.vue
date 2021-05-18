<template>
  <div class="card" :class="`${theme}-theme ${!locked ? 'un-locked' : ''}`">
    <div class="year">{{ year }}</div>
    <div>"{{ title }}"</div>
    <div>{{ artist }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "Card",
  props: {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    year: { type: Number, required: true },
    theme: { type: String as PropType<"pimary" | "secondary">, required: true },
    locked: { type: Boolean, default: true }
  }
});
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 100px;
  height: 100%;
  min-height: 150px;
  overflow-wrap: break-word;
  text-align: center;
  padding: 5px;
}
.card div {
  margin-top: 10px;
}

.primary-theme {
  background: rgb(228, 207, 20);
  color: black;
}

.secondary-theme {
  background: black;
  color: white;
}

.un-locked {
  opacity: 0.65;
}

.year {
  font-size: 150%;
  font-weight: bold;
}
</style>
