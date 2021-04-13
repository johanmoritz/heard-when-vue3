<template>
    <div v-if= "user === undefined">
        <button @click="signIn">Sign in</button>
    </div> 
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  props: {
    user: Object,
    signIn: Function 
  }
});

</script>
