<template>
  <div class="choice-container">
    <p class="text">Do you want to continue guessing or lock your cards?</p>
    <Btn>
      <div class="btn">
        <button class="choice-btn" @click="draw">Draw card</button>
      </div>
      <div class="btn">
        <button class="choice-btn" @click="lock">Lock cards</button>
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
  color:black;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background: rgba(228, 207, 20, 0.9);
  top: 0;
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  width: 35%;
  margin: 20px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  -ms-transform: translate(-50%, -50%);
}

.choice-btn {
  color: black;
  background: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border: none;
  color: #2c3e50;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  cursor: pointer;
}
.choice-btn:hover {
  background-color: rgb(42, 41, 36);;
}

.text {
  text-align: center;
  font-weight: bold;
}
</style>
