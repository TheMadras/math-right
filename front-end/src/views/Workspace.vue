<template>
  <div class="workspace">
    <Editor />
  </div>
</template>

<script>
// @ is an alias to /src
import Editor from "@/components/Editor.vue";

export default {
  name: "Home",
  components: {
    Editor,
  },
};
</script>

<style scoped>

</style>