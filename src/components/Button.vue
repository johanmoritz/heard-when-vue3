<template>
  <div class="button" >
      <slot></slot>
  </div>
</template>

<style scoped>

.button {
  background-color: rgb(196, 196, 196);
  border: none;
  padding: 15px 32px;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50px;
  transition-duration: 0.3s;
}

.button:hover {
  background-color: #4caf50; /* Green */
  color: rgba(255, 255, 255, 0.966);
}
</style>