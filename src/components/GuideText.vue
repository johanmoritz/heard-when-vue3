<template>
  <div class="guide">
    <div class="header">Need some help?</div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GuideText",
  props: {
    text: { type: String, required: true }
  }
});
</script>

<style scoped>
.guide-box {
  margin: 1em;
}
.guide {
  position: relative;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 1em;
  padding: 0.7em;
  margin-left: 0.7em;
  margin-bottom: 5em;
  width: 40vw;
  max-width: 280px;
  z-index: 1;
  color: white;
}

.guide:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 0;
  border: 31px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.7);
  border-bottom: 0;
  border-left: 0;
  margin-left: -15.5px;
  margin-bottom: -31px;
}

.header {
  font-size: 130%;
}

@media screen and (max-width: 850px) {
  .guide {
    display: none;
  }
}
</style>
