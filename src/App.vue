<template>
  <div class="container">
    <h1>Pazrin Todo App</h1>
    <CreateModal />
    <FilterButtons />
    <TodoList v-if="store.todos.length" />
    <p v-else class="empty-message">No tasks yet. Add one above!</p>
  </div>
</template>

<script setup>
import CreateModal from './components/CreateModal.vue'
import FilterButtons from './components/FilterButtons.vue'
import TodoList from './components/TodoList.vue'
import { useTodoStore } from './stores/todo'

const store = useTodoStore()
</script>

<style>
.swal2-input, .swal2-textarea {
  width: 100% !important;
  margin: 1rem auto !important;
}

.swal2-textarea {
  height: 100px;
  resize: vertical;
}

.todo-item {
  position: relative;
  transition: all 0.3s ease;
}
</style>