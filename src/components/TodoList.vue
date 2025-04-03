<template>
  <div class="todo-list">
    <TodoItem
      v-for="todo in store.todos"
      :key="todo.id"
      :todo="todo"
    />
  </div>
</template>

<script setup>
import TodoItem from './TodoItem.vue'
import { useTodoStore } from '../stores/todo'

const store = useTodoStore()
</script>