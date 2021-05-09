<template>
  <div class="choice-container">
    <p class="text">Do you want to continue guessing or lock your cards?</p>
    <Btn>
    <div class="btn">
      <button class="button" @click="draw">Draw card</button>
    </div>
    <div class="btn">   
      <button class="button" @click="lock">Lock cards</button>
    </div>
    </Btn>
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
  background: rgba(194, 155, 163);
  top: 0;
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  width: 35%;
  margin: 20px;
  padding: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  -ms-transform: translate(-50%, -50%);
}
.text {
  text-align: center;
}
</style>
