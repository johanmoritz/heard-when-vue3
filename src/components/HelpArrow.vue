<template>
  <div class="help-arrow">
    <a>Read instructions here → </a>
  </div>
</template>

<style scoped>

.help-arrow {
  color: white;
  background-color: black;
  top: -0.5rem;
  left: -24rem;
  position: fixed;
  height: 1rem;
  font-size: large;
  padding-bottom: 25px;
}
</style>


<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "HelpArrow",
  props: {
    text: { type: String}
  }
});
</script>

