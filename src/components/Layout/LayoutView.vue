<template>
  <div id="nav">
    <slot name="nav"> </slot>
  </div>
  <slot name="main"></slot>
  <div id="bottom-left">
    <slot name="bottom-left"> </slot>
  </div>
  <div id="bottom-right">
    <slot name="bottom-right"></slot>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgba(194, 155, 163);
  background-image: linear-gradient(90deg, rgb(236, 129, 231), rgba(194, 155, 163),rgb(236, 129, 231));
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.button {
  background: rgba(243, 215, 220, 0.8);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border: none;
  color: #2c3e50;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.overlay {
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#bottom-right {
  position: fixed;
  bottom: 2em;
  right: 2em;
}

#bottom-left {
  position: fixed;
  bottom: 1em;
  left: 1em;
}
</style>
