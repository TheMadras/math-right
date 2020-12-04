<template>
  <div id="app">
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossorigin="anonymous"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </head>
    <b-navbar
      :sticky="true"
      toggleable="lg"
      type="dark"
      variant="info"
      class="bg-dark"
    >
      <b-navbar-brand>
        <router-link class="navbar-brand" to="/">MathRight</router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item active-class="active" to="/" exact> Home </b-nav-item>
          <b-nav-item active-class="active" to="/workspace">
            Workspace
          </b-nav-item>
          <b-nav-item active-class="active" to="/userpage">
            My Projects
          </b-nav-item>
          <b-nav-item to="/userpage" v-if="user" @click.prevent="logout">
            Logout
          </b-nav-item>
          <b-nav-item to="/userpage" v-else> Login </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    logout() {
      this.$root.$data.user = null;
      this.$root.$data.user = null;
      this.$root.$data.currentDoc = null;
      this.$root.$data.userProjects = [];
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
