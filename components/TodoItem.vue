<script setup lang="ts">
import { TodoMutationsEnum } from "~/constants/Todo";
import store from "~/store";

const props = defineProps({
  todo: {
    type: Object as () => ({
      id: Number,
      text: String,
      completed: Boolean
    }),
    required: true
  }
});

const toggleCompletion = () => {
  store.commit(TodoMutationsEnum.CompleteItem, {
    id: props.todo.id,
    completed: !props.todo.completed,
  });
};

const deleteTodo = () => {
  store.commit(TodoMutationsEnum.DeleteItem, {
    id: props.todo.id
  });
};

</script>

<template>
  <div
    class="flex items-center bg-white rounded-md shadow-md m-2 p-1 border-4"
    :class="todo.completed ? 'border-green-500' : 'border-white'"
  >
    <div class="flex-shrink-0 m-1 ml-3 align-middle">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="toggleCompletion"
      />
    </div>
    <div class="ml-6">
      <h4 class="text-xl text-gray-900 leading-tight">{{ todo.text }}</h4>
    </div>
    <button @click="deleteTodo" class="ml-auto px-3 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition duration-300 ease-in-out">
      Delete
    </button>
  </div>
</template>
