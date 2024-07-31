<script setup lang="ts">
import type { TodoType } from "~/types/Todo";
import TodoItem from "./TodoItem.vue";
import store from "~/store";

const todos: ComputedRef<TodoType[]> = computed(() => store.state.todos.todos);

</script>

<template>
  <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
</template>