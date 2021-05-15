<template>
  <div :class="'btn' + (theme === 'alert' ? ' btn-exit' : '')">
    <slot></slot>
  </div>
</template>

<style>
.btn {
  display: inline-block;
}
.btn * {
  color: black;
  background-color: rgb(240, 240, 240);
  border: none;
  padding: 15px 32px;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50px;
  box-shadow: 0 4px rgba(99, 99, 99, 0.342);
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
}

.btn *:disabled {
  cursor: not-allowed;
  color: rgba(112, 111, 111, 0.692);
}

.btn:hover *:not(:disabled),
.btn:active *:not(:disabled) {
  background-color: #4caf50; /* Green */
  color: rgba(255, 255, 255, 0.966);
}

.btn:active *:not(:disabled) {
  box-shadow: 0 2px rgba(43, 42, 42, 0.383);
  transform: scale(0.9);
}

.btn-exit:hover *:not(:disabled),
.btn-exit:active *:not(:disabled) {
  background-color: #af4c4c;
}
.end {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    theme: { type: String as PropType<"alert" | "primary"> }
  }
});
</script>
