<template>
  <div class="choice-container">
    <p class="text">Do you want to continue guessing or lock your cards?</p>
    <div>
      <button class="button" @click="draw">Draw card</button>
      <button class="button" @click="lock">Lock cards</button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
// import draw and lock functions
export default defineComponent({
  name: "Choice",
  methods: {
    draw() {
      console.log("You chose to continue");
      // Set phase to "listen"
    },
    lock() {
      console.log("You chose to lock your cards");
      // Set currentPlayer to next and set phase to "listen"
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
.button {
  background: rgba(243, 215, 220, 0.8);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border: none;
  font-weight: bold;
  color: #2c3e50;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.text {
  text-align: center;
}
</style>
