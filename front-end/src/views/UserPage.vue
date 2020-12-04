<template>
  <div class="user-page">
    <UserProjects v-if="user" />
    <Login v-else />
  </div>
</template>

<script>
import UserProjects from "@/components/UserProjects.vue";
import Login from "@/components/Login.vue";
export default {
  name: "userPage",
  components: {
    UserProjects,
    Login,
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
};
</script>