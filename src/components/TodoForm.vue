<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      v-model="newTodo"
      placeholder="Add a new task"
      class="todo-input"
    />
    <button type="submit" class="add-button">Add</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todo'

const newTodo = ref('')
const store = useTodoStore()

const handleSubmit = () => {
  if (newTodo.value.trim()) {
    store.addTodo(newTodo.value.trim())
    newTodo.value = ''
  }
}
</script>