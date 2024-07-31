import { ActionsTodoEnum, TodoMutationsEnum } from "~/constants/Todo";
import type { TodoState, TodoType } from "~/types/Todo";
import { sleep } from "~/utils/sleep";
import { Commit } from "vuex";

const state = {
  loading : false,
  todos: []
};

const getters = {
  completedCount(state: TodoState) {
    return state.todos.filter(todo => todo.completed).length;
  },
  totalCount(state: TodoState) {
    return state.todos.length;
  }
}

const mutations = {
  [TodoMutationsEnum.CreateItem](state: TodoState, todo: TodoType) {
    state.todos.unshift(todo);
  },
  [TodoMutationsEnum.SetItems](state: TodoState, todos: TodoType[]) {
    state.todos = todos;
  },
  [TodoMutationsEnum.CompleteItem](state: TodoState, newTodo: TodoType) {
    const todo = state.todos.findIndex(todo => todo.id === newTodo.id);
    if(todo === -1) return;
    state.todos[todo] = { ...state.todos[todo], ...newTodo };
  },
  [TodoMutationsEnum.SetLoading](state: TodoState, item: boolean) {
    state.loading = item;
  },
  [TodoMutationsEnum.DeleteItem](state: TodoState, todo: TodoType) {
    state.todos = state.todos.filter(item => item.id !== todo.id);
  }
}

const actions = {
  async [ActionsTodoEnum.GetTodoItems]({ commit }: { commit: Commit }) {
    commit(TodoMutationsEnum.SetLoading, true);
    await sleep(1000);
    commit(TodoMutationsEnum.SetLoading, false);
    commit(TodoMutationsEnum.SetItems, [
      {
        id: 1,
        text: 'Create awesome Vue 3 with Vuex 4 video!',
        completed: false
      }
    ]);
  },
}

export default {
  state,
  getters,
  mutations,
  actions
};