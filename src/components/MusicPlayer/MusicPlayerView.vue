<template>
  <div class="music-player-container">
    <div class="logo">
      <slot name="spotify"></slot>
    </div>
    <div class="player">
      <b><slot name="status"></slot></b>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.music-player-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: rgba(30, 215, 95, 0.822);
  padding: 0.5em 1em 1em 1em;
  width: 30%;
  color: white;
}
.logo {
  display: flex;
  align-items: center;
  margin: 5px;
}
.player {
  display: inline-block;
  text-align: left;
  margin: 5px;
}
.control-container {
  display: flex;
}
.control {
  position: relative;
  display: inline-block;
  background-color: transparent;
  border: none;
}

.control:disabled {
  filter: grayscale(50%);
  -webkit-filter: grayscale(50%);
  z-index: -1;
}

.control >>> img {
  filter: invert(1);
}

.control:hover >>> img {
  opacity: 50%;
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
