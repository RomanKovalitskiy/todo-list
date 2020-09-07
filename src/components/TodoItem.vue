<template>
  <v-card :class="['mb-3', { 'order-first': todo.isFixed }]">
    <v-card-title>{{ todo.title }}</v-card-title>
    <div>
      <v-chip v-for="tag in todo.tags" :key="tag" class="ma-2">
        {{ tag }}
      </v-chip>
    </div>
    <v-card-subtitle class="pb-0">{{ getDate(todo.date) }}</v-card-subtitle>
    <v-card-text class="text--primary">
      {{ todo.description }}
    </v-card-text>
    <v-card-actions class="button-actions">
      <v-btn
        icon
        color="error"
        :loading="isLoadingType === 'delete'"
        @click="deleteTodo"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon color="blue" @click="$emit('edit-todo', todo)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        icon
        :color="todo.isFixed ? 'indigo' : 'grey'"
        :loading="isLoadingType === 'fixed'"
        @click="changeFixed"
      >
        <v-icon>mdi-star</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { format } from "date-fns";
import { listTags } from "@/helpers/variable.js";

export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    isLoadingType: null,
  }),
  created() {
    this.tags = listTags;
  },
  methods: {
    getDate(date) {
      return format(date, "dd.MM.yyyy в HH:mm");
    },
    deleteTodo() {
      this.isLoadingType = "delete";
      setTimeout(() => {
        this.$emit("delete-todo", this.todo);
        this.isLoadingType = null;
      }, 2000);
    },
    changeFixed() {
      this.isLoadingType = "fixed";
      setTimeout(() => {
        this.$emit("fixed-todo", this.todo);
        this.isLoadingType = null;
      }, 2000);
    },
  },
};
</script>

<style scoped>
.button-actions {
  justify-content: flex-end;
}
</style>
