<template>
  <div class="choice-container">
    <p class="text">Do you want to continue guessing or lock your cards?</p>
    <div>
      <button id="button" @click="draw">Draw card</button>
      <button id="button" @click="lock">Lock cards</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Choice",
  props: {
    draw: {
      type: Function as PropType<() => void>,
      required: true
    },
    lock: {
      type: Function as PropType<() => void>,
      required: true
    }
  }
});
</script>

<style scoped>
.choice-container {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background: rgba(194, 155, 163, 0.8);
  top: 0;
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  width: 35%;
  margin: 20px;
  padding: 50px;
}
.text {
  text-align: center;
}
</style>
