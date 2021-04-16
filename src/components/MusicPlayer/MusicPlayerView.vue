<template>
  <div class="music-player">
    <b><slot name="status"></slot></b>
    <div>
      <slot> </slot>
    </div>
  </div>
</template>

<style scoped>
.music-player {
  display: inline-block;
  text-align: left;
  background-color: lightgreen;
  padding: 0.5em;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    actionText: Object as JSX.Element
  }
});
</script>
