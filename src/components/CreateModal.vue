<template>
  <button @click="openModal" class="add-button">
    + New Task
  </button>
</template>

<script setup>
import { useTodoStore } from '../stores/todo'
import Swal from 'sweetalert2'

const store = useTodoStore()

const openModal = async () => {
  const { value: formValues } = await Swal.fire({
    title: 'Create New Task',
    html:
      '<input id="text" class="swal2-input" placeholder="Task title" required>' +
      '<textarea id="description" class="swal2-textarea" placeholder="Description"></textarea>',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Create',
    preConfirm: () => {
      return {
        text: document.getElementById('text').value,
        description: document.getElementById('description').value
      }
    }
  })

  if (formValues) {
    store.addTodo(formValues)
    Swal.fire({
      icon: 'success',
      title: 'Task created!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    })
  }
}
</script>