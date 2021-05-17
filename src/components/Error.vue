<template>
  <p class="error">{{ msg }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    msg: String
  }
});
</script>

<style>
.error {
  font-size: 2em;
  font-weight: bolder;
  background-color: rgb(228, 207, 20);
  color: black;
  display: inline-block;
}
@media screen and (max-width: 500px) {
  .error {
    font-size: 1.1em;
  }
}
</style>
