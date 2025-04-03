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
import Swal from 'sweetalert2'

const newTodo = ref('')
const store = useTodoStore()

const handleSubmit = () => {
  if (newTodo.value.trim()) {
    store.addTodo(newTodo.value.trim())
    
    Swal.fire({
      icon: 'success',
      title: 'Task created!',
      text: 'Your new task has been added',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    })

    newTodo.value = ''
  }
}
</script>