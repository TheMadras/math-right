<template>
  <div class="user-projects">
    <h1>Welcome {{ username }}</h1>
    <div class="shadow-lg all-content">
      <div class="keep-inline">
        <div class="d-flex flex-row-reverse controls">
          <b-button class="p-2" @click="createNew">Create New</b-button>
          <div class="mr-auto p-2"><h3>Projects</h3></div>
        </div>
      </div>
      <br />
      <div class="files">
        <div v-if="allProjects.length === 0">
          <h2>No Current Projects Saved</h2>
        </div>
        <div v-else>
          <div
            v-for="project in allProjects"
            :key="project._id"
            class="d-flex flex-row list-item"
            @click="openProject(project)"
          >
            <p class="p-2 my-auto">{{ formatInfo(project.title) }}</p>
            <p v-if="windowWidth > 599" class="p-2 my-auto modified">
              Last Modified: {{ formatDate(project.lastEdited) }}
            </p>
            <b-button
              @click.stop="deleteProject(project)"
              class="ml-auto my-auto p-2 delete"
            >
              <p>X</p>
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  name: "userProjects",
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  created() {
    if (this.$root.$data.user != null) {
      this.getProjects();
    }
  },
  computed: {
    username() {
      return this.$root.$data.user.username;
    },
    allProjects() {
      return this.$root.$data.userProjects;
    },
    user() {
      return this.$root.$data.user;
    },
  },
  watch: {
    user(newValue) {
      if (newValue != null) {
        this.getProjects();
      }
    },
    allProjects() {
      this.getProjects();
      this.$root.$data.currentDoc = null;
    },
    windowWidth(newWidth) {
      this.windowWidth = newWidth;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  methods: {
    async createNew() {
      const response = await axios.post("/api/projects", {
        user: this.$root.$data.user,
        title: "Untitled Project",
      });
      this.$root.$data.currentDoc = response.data.project;
      this.$router.push({ name: "Workspace" });
    },
    async deleteProject(project) {
      try {
        await axios.delete("/api/projects/" + project._id);
        this.$root.$data.currentDoc = null;
      } catch (error) {
        this.$root.$data.currentDoc = null;
      }
      this.$root.$data.userProjects = [];
      this.getProjects();
    },
    openProject(project) {
      this.$root.$data.currentDoc = project;
      this.$router.push({ name: "Workspace" });
    },
    formatInfo(name) {
      name = name.substring(0, 35);
      return name;
    },
    formatDate(date) {
      return moment(date).format("ddd, h:mm A");
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    async getProjects() {
      let response = await axios.get(
        "/api/projects/user/" + this.$root.$data.user._id
      );
      this.$root.$data.userProjects = response.data.projects;
    },
  },
};
</script>

<style scoped>
.user-projects {
  padding: 25px;
}

.controls {
  width: 100%;
  margin: auto;
}

.all-content {
  width: 100%;
  padding: 2em;
  margin: auto;
  background-color: whitesmoke;
  border-radius: 25px;
  border-style: solid;
  border-color: rgba(128, 128, 128, 0.452);
  border-width: 0.5px;
  max-width: 1200px;
}

.keep-inline {
  flex: none;
}

.list-item {
  width: 100%;
  padding: 0.15em;
  margin: auto;
  background-color: whitesmoke;
  border-bottom-style: solid;
  border-bottom-color: rgba(128, 128, 128, 0.452);
  border-bottom-width: 0.5px;
  max-width: 1200px;
}

.list-item:hover {
  background: rgba(0, 153, 255, 0.151);
  cursor: pointer;
}

.delete {
  height: 40px;
  width: 30px;
  text-align: center;
  vertical-align: middle;
}

.modified {
  position: absolute;
  margin-left: 28%;
}
</style>