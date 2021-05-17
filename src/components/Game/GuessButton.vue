<template>
  <button class="guess-button">
    <slot></slot>
  </button>
</template>

<style>
.guess-button {
  opacity: 0;
  transition: all 0.3s ease;
}
.guess-button:hover {
  opacity: 0.4;
  cursor: pointer;
  padding: 20px;
  font-weight: bold;
  font-size: 1.2rem;
}
.guess-button:disabled {
  pointer-events: none;
  opacity: 0.6;
}
</style>
