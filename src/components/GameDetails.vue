<template>
  <p class="id">
    Game <b> {{ id }} </b>
  </p>
<p class="status">Status: {{ status }}</p>
<p class="phase">Phase: {{ phase }}</p>
<p class="turn">{{ turn }}'s turn</p>

</template>

<script>

export default ({
  name: "GameDetails",
  props: {
    id: String,
    status: String,
    phase: String,
    turn: String,
    players: Array
  }
  
});
</script>

<style scoped>

.status {
  border-color: #21f344;
  background-color: #efffff;
  border-left: 6px solid;
  border-left-color: rgb(21, 209, 21);
  padding: 10px 10px;
}

.phase {
  background-color: rgb(196, 196, 196);
  padding: 15px 32px;
  font-size: 14px;
  margin: 4px 2px;
  border-radius: 50px;
}

.turn{
  font-variant: small-caps;
  background-color: rgb(196, 196, 196);
  padding: 15px 32px;
  font-size: 14px;
  margin: 4px 2px;
  border-radius: 50px;
}
</style>