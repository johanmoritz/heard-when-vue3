<template>
  <div class="choice-container">
    <p class="text">Do you want to continue guessing or lock your cards?</p>
    <div class="choice">
      <Btn><button class="btn" @click="draw">Draw card</button> </Btn>
      <Btn><button class="btn" @click="lock">Lock cards</button> </Btn>
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
  background: rgba(194, 155, 163);
  display: inline-block;
  
  justify-content: center;
  width: 35%;
  margin: 20px;
  padding: 30px;
  }



.choice-container-overlay {
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
