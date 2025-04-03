<template>
  <div class="container">
    <h1>Todo App</h1>
    <TodoForm />
    
    <TodoList v-if="store.todos.length" />
    <p v-else class="empty-message">No tasks yet. Add one above!</p>
  </div>
</template>

<script setup>
  import TodoForm from './components/TodoForm.vue'
  import TodoList from './components/TodoList.vue'
  import { useTodoStore } from './stores/todo'

  const store = useTodoStore()
</script>