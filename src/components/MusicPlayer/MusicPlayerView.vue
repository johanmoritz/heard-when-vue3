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
  color: white;
  margin: auto;
  position: fixed;
  bottom: 1em;
  left: 1em;
  border-radius: 30px;
  padding: 0.3rem 0.4rem 0 0.4rem;
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

.control:hover >>> img {
  transform: scale(1.1);
}

.control:disabled {
  opacity: 0.5;
}

.control >>> img {
  filter: invert(1);
  -webkit-filter: invert(1);
  opacity: 1;
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
