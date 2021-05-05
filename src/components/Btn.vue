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
  background-color: rgb(196, 196, 196);
  border: none;
  padding: 15px 32px;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50px;
  box-shadow: 0 4px rgb(99, 99, 99);
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
}

.btn:hover *,
.btn:active * {
  background-color: #4caf50; /* Green */
  color: rgba(255, 255, 255, 0.966);
}

.btn:active * {
  box-shadow: 0 2px rgb(43, 42, 42);
  transform: translateY(2px);
}

.btn-exit:hover *,
.btn-exit:active * {
  background-color: #af4c4c;
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
