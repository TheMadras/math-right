<template>
  <div class="login">
    <h1>Login to MathRight</h1>
    <div class="shadow-lg background">
      <form class="pure-form">
        <fieldset>
          <legend>Enter your Username</legend>
        </fieldset>
        <fieldset>
          <b-input
            placeholder="username"
            v-model="username"
            class="username-input"
          />
        </fieldset>
        <fieldset>
          <b-button
            type="submit"
            class="pure-button pure-button-primary button-style"
            @click.prevent="login"
          >
            Login
          </b-button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "login",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    async login() {
      this.$root.$data.user = this.username;
      try {
        let response = await axios.post("/api/users", {
          username: this.username,
        });
        this.$root.$data.user = response.data.user;
        this.$root.$data.username = response.data.user.username;
      } catch (error) {
        console.log(error.response.data.message);
        this.$root.$data.user = null;
      }
    },
  },
};
</script>

<style scoped>
.login {
  padding: 20px;
}
.background {
  width: 100%;
  padding: 2em;
  margin: auto;
  background-color: whitesmoke;
  border-radius: 25px;
  border-style: solid;
  border-color: rgba(128, 128, 128, 0.452);
  border-width: 0.5px;
  max-width: 600px;
}
.username-input {
  width: 75%;
  margin: auto;
}
.button-style {
  margin-top: 10px;
}
</style>