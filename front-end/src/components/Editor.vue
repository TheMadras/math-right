<template>
  <div class="editor">
    <div class="basic">
      <div class="d-flex flex-row controls">
        <input
          class="p-2 my-auto"
          v-if="project.edit"
          v-model="project.title"
          @blur="
            project.edit = false;
            $emit('update');
          "
          @keyup.enter="
            project.edit = false;
            $emit('update');
          "
          v-focus
        />
        <label v-else class="p-2 my-auto" @click="project.edit = true">
          {{ project.title }}
        </label>
        <p v-if="this.windowWidth > 599" class="p-2 my-auto modified">
          Last Saved: {{ formatDate(project.lastEdited) }}
        </p>
        <b-button class="ml-auto p-2 control-button" v-on:click="saveAs()"
          >Save</b-button
        >
        <b-button class="p-2 control-button" v-on:click="convert()"
          >Convert</b-button
        >
      </div>
      <hr class="separate" />
    </div>
    <div class="writing-container" touch-action="none" ref="editor"></div>
  </div>
</template>

<script>
import iink from "iink-js";
import moment from "moment";
import axios from "axios";
export default {
  name: "Editor",
  data() {
    return {
      registeredEditor: null,
      savedFile: null,
      text: null,
      editedTitle: null,
      windowWidth: window.innerWidth,
    };
  },
  created() {
    if (this.$root.$data.currentDoc === null) {
      this.$router.push({ name: "Home" });
    }
  },
  computed: {
    project() {
      return this.$root.$data.currentDoc;
    },
    editing() {
      return this.project.edit;
    },
  },
  watch: {
    editor(newValue) {
      if (this.$root.$data.currentDoc.content != null && newValue != null) {
        this.savedFile = this.$root.$data.currentDoc.content;
        this.loadFile();
      }
    },
    windowWidth(newWidth) {
      this.windowWidth = newWidth;
    },
    async editing(newValue) {
      if (newValue === false) {
        if (this.project.title.length === 0) {
          this.project.title = "Untitled";
        }
        const lastEdited = new Date();
        let response = await axios.put("/api/projects/" + this.project._id, {
          title: this.project.title,
          lastEdited: lastEdited,
        });
        this.$root.$data.currentDoc = response.data.project;
      }
    },
  },
  mounted() {
    this.registeredEditor = iink.register(this.$refs.editor, {
      recognitionParams: {
        type: "MATH",
        protocol: "WEBSOCKET",
        server: {
          scheme: "https",
          host: "webdemoapi.myscript.com",
          applicationKey: "515131ab-35fa-411c-bb4d-3917e00faf60",
          hmacKey: "54b2ca8a-6752-469d-87dd-553bb450e9ad",
        },
        iink: {
          alwaysConnected: true,
          math: {
            mimeTypes: ["application/vnd.myscript.jiix", "application/x-latex"],
          },
          export: {
            jiix: {
              strokes: true,
            },
          },
        },
      },
    });

    this.savedFile = this.$root.$data.currentDoc.content;
    this.loadFile();
    window.addEventListener("resize", this.onResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    editTodo(title) {
      this.editedTitle = title;
    },
    async convert() {
      await this.registeredEditor.convert();
    },
    async saveAs() {
      const exports = this.registeredEditor.exports;
      const lastEdited = new Date();
      if (exports && exports["application/vnd.myscript.jiix"]) {
        this.savedFile = exports["application/vnd.myscript.jiix"];
      } else {
        this.savedFile = null;
      }
      let response = await axios.put("/api/projects/" + this.project._id, {
        content: this.savedFile,
        lastEdited: lastEdited,
      });
      this.$root.$data.currentDoc = response.data.project;
    },
    loadFile() {
      if (this.savedFile) {
        this.registeredEditor.import_(
          this.savedFile,
          "application/vnd.myscript.jiix"
        );
      }
    },
    onResize() {
      this.registeredEditor.resize();
      this.windowWidth = window.innerWidth;
    },
    formatDate(date) {
      return moment(date).format("ddd, h:mm A");
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style
>
.writing-container {
  min-height: 600px;
  min-width: 300px;
  background-color: white;
}
.document {
  background-color: rgb(230, 230, 230);
  width: 100%;
  height: 100%;
}

.separate {
  margin-top: 0.25em;
}

.editor {
  padding: 2em;
}

.basic {
  margin-top: -1.7em;
  margin-bottom: -0.7em;
  flex: none;
}
.control-button {
  margin-left: 2px;
  margin-right: 2px;
}
.modified {
  position: absolute;
  margin-left: 28%;
}
</style>
