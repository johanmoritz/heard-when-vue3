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
  font-size: 1.5em;
  font-weight: bold;
}
</style>
