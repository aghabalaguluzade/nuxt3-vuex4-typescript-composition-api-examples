<script setup lang="ts">
import NewItem from '@/components/NewItem.vue';
import TodoList from '@/components/TodoList.vue';
import store from '~/store';
import { ActionsTodoEnum } from '~/constants/Todo';

const loading = computed(() => store.state.todos.todos.loading);
const completedCount = computed(() => store.getters.completedCount);
const totalCount = computed(() => store.getters.totalCount);

onMounted(() => {
  store.dispatch(ActionsTodoEnum.GetTodoItems);
});

</script>
<template>
  <div class="container mx-auto mt-4">
    <h1 class="text-3xl text-center p-2 font-bold">
      Vue 3 Todo App with Typescript and Vuex 4
    </h1>

    <div v-if="loading">
      <h3 class="text-center mt-4">Loading...</h3>
    </div>
    <div v-else>
      <p class="text-center mt-2">
        {{ completedCount }} of {{ totalCount }} completed.
      </p>
      <NewItem />
      <TodoList />
    </div>
  </div>
</template>