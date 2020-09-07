<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ titleTodo }}</span>
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submit"
      >
        <v-text-field
          v-model="todo.title"
          :rules="nameRules"
          label="Title"
          required
        />
        <Autocomplete v-model="todo.tags" @remove-tag="removeTag" />
        <v-textarea
          v-model="todo.description"
          label="Description"
          auto-grow
          rows="3"
          :rules="nameRules"
        />
        <v-checkbox v-model="todo.isFixed" label="Fixed TODO?" />
        <v-row justify="space-around">
          <v-btn
            color="error"
            class="mr-4"
            :disabled="isLoading"
            @click="$emit('close')"
            >cancel</v-btn
          >
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            type="submit"
            :loading="isLoading"
          >
            save
          </v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { listTags } from "@/helpers/variable.js";
import Autocomplete from "./Autocomplete.vue";

export default {
  name: "FormForTodo",
  components: {
    Autocomplete,
  },
  props: {
    dataTodo: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    valid: true,
    isLoading: false,
    todo: {},
  }),
  computed: {
    titleTodo() {
      return `${this.isEdit ? "Editing" : "Create"} Todo`;
    },
    isEdit() {
      return !!this.dataTodo.id;
    },
  },
  created() {
    this.todo = this.setData(this.isEdit ? this.dataTodo : {});
    this.nameRules = [(v) => !!v || "Name is required"];
    this.tags = listTags;
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.todo.date = new Date();
        this.isLoading = true;
        setTimeout(() => {
          // eslint-disable-next-line no-unused-expressions
          this.isEdit
            ? this.$emit("replaceTodo", { ...this.todo })
            : this.$emit("newTodo", { ...this.todo });
          this.isLoading = false;
        }, 3000);
      }
    },
    removeTag(tag) {
      const index = this.todo.tags.indexOf(tag);
      if (index >= 0) this.todo.tags.splice(index, 1);
    },
    setData(data) {
      return {
        id: data.id || Date.now(),
        title: data.title || "",
        tags: data.tags || [],
        description: data.description || "",
        isFixed: data.isFixed || false,
      };
    },
  },
};
</script>
