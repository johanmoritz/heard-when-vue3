<template>
  <div class="help-arrow">
    <div class="text">Read instructions here</div>
    <img src="@/assets/arrow.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "HelpArrow"
});
</script>

<style scoped>
.help-arrow {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: white;
  font-size: 90%;
  width: 30vw;
}
.help-arrow img {
  width: 6.5vw;
  padding-right: 5em;
}
.text {
  display: block;
  font-size: 1.8em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.516);
  text-shadow: 3px 3px rgba(0, 0, 0, 0.7);
  padding: 0 6px 0 6px;
}

@media screen and (max-width: 749px) {
  .help-arrow {
    display: none;
  }
}
</style>
