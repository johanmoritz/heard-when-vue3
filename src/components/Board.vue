<template>
    <div class="hello">
    <h1>{{ msg }}</h1>
    </div>


</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Board",
  props: {
    msg: String
  }
});
</script>