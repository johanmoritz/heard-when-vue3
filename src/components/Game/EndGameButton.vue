<template>
  <Btn theme="alert" class="endButton">
    <button @click="quit">End Game</button>
  </Btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Btn from "@/components/Btn.vue";

export default defineComponent({
  components: { Btn },
  props: {
    quit: { type: Function as PropType<() => void>, required: true }
  }
});
</script>

<style>
.endButton {
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  -ms-transform: translate(-50%, 0);
}

@media screen and (max-width: 700px) {
  .endButton {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    transform: translate(0, 0);
    -ms-transform: translate(0, 0);
  }
}
</style>
