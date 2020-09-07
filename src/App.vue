<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>ToDo List</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container v-if="isLoading" fill-height class="justify-center">
        <div class="text-center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          />
        </div>
      </v-container>
      <v-container v-else>
        <div v-if="isNotTodo" class="d-flex flex-column align-center mt-5">
          <h2 class="text-center">Create TODO</h2>
          <v-btn dark fab color="pink" class="mt-4" @click="isShowForm = true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <div v-else class="d-flex flex-column">
          <v-text-field
            v-model="searchText"
            placeholder="Write text to search"
            solo
            class="order-first"
          />
          <Autocomplete
            v-model="chosenTags"
            class="order-first mb-5"
            @remove-tag="removeTag"
          />
          <todoItem
            v-for="todo in listTodoFilter"
            :key="todo.id"
            :todo="todo"
            @edit-todo="editTodo"
            @delete-todo="deleteTodo"
            @add-todo="addTodo"
            @fixed-todo="fixedTodo"
          />
        </div>
      </v-container>
    </v-main>
    <v-btn
      v-if="!isNotTodo"
      dark
      fab
      class="add-button"
      color="pink"
      @click="isShowForm = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-if="isShowForm" :value="true" persistent max-width="600px">
      <FormForTodo
        :data-todo="chosenTodo"
        @close="closeForm"
        @newTodo="addTodo"
        @replaceTodo="replaceTodo"
      />
    </v-dialog>
  </v-app>
</template>

<script>
import { listTags } from "@/helpers/variable.js";
import FormForTodo from "./components/FormForTodo.vue";
import TodoItem from "./components/TodoItem.vue";
import Autocomplete from "./components/Autocomplete.vue";

export default {
  name: "App",
  components: { FormForTodo, TodoItem, Autocomplete },
  data: () => ({
    isShowForm: false,
    isLoading: true,
    searchText: "",
    chosenTags: [],
    chosenTodo: {},
    listTodo: [],
  }),
  computed: {
    isNotTodo() {
      return !this.listTodo.length;
    },
    listTodoFilter() {
      return this.listTodo.filter(
        (todo) =>
          todo.description
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) &&
          todo.tags.filter((tag) => this.chosenTags.includes(tag)).length
      );
    },
  },
  created() {
    this.chosenTags = [...listTags];
    setTimeout(() => {
      this.listTodo = [
        {
          id: "1",
          title: "1",
          tags: ["later"],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          isFixed: false,
          date: new Date(),
        },
        {
          id: "2",
          title: "2",
          tags: ["tomorrow"],
          description:
            "Rem dignissimos error, quo, necessitatibus tempore quaerat consequuntur iusto magnam vel ad inventore asperiores officia molestias! Esse aliquid consectetur quasi temporibus officiis?",
          isFixed: true,
          date: new Date(),
        },
      ];
      this.isLoading = false;
    }, 2000);
  },
  methods: {
    addTodo(todo) {
      this.listTodo.push(todo);
      this.isShowForm = false;
    },
    deleteTodo(id) {
      const index = this.listTodo.findIndex((todo) => todo.id === id);
      this.listTodo.splice(index, 1);
    },
    editTodo(todo) {
      this.chosenTodo = { ...todo, tags: [...todo.tags] };
      this.isShowForm = true;
    },
    closeForm() {
      this.isShowForm = false;
      this.chosenTodo = {};
    },
    fixedTodo(todo) {
      this.listTodo.find((item) => item.id === todo.id).isFixed = !todo.isFixed;
    },
    replaceTodo(todo) {
      const index = this.listTodo.findIndex((item) => item.id === todo.id);
      this.listTodo.splice(index, 1, todo);
      this.isShowForm = false;
    },
    removeTag(tag) {
      const index = this.chosenTags.indexOf(tag);
      if (index >= 0) this.chosenTags.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.add-button {
  position: fixed;
  right: 15px;
  bottom: 15px;
}
.button-actions {
  justify-content: flex-end;
}
</style>
