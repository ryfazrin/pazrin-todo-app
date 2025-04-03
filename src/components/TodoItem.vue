<template>
  <div class="todo-item">
    <input type="checkbox" :checked="todo.completed" @change="handleToggle" class="checkbox" />
    <div class="todo-content">
      <div class="todo-header" :style="showDescription ? { marginBottom: '0.5rem' } : {}">
        <span :class="{ completed: todo.completed }" class="todo-text">
          {{ todo.text }}
        </span>
        <span class="todo-date">
          {{ formatDate(todo.date) }}
        </span>
      </div>
      <div v-if="showDescription" class="todo-description">
        {{ todo.description }}
      </div>
    </div>
    <div class="actions">
      <button v-if="todo.description" @click="toggleDescription" class="desc-button">
        <InformationCircleIcon class="icon" />
      </button>
      <button v-if="!todo.completed" @click="openEditModal" class="edit-button">
        <PencilIcon class="icon" />
      </button>
      <button @click="handleDelete" class="delete-button">
        <TrashIcon class="icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { InformationCircleIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useTodoStore } from '../stores/todo'
import Swal from 'sweetalert2'

const props = defineProps(['todo'])
const store = useTodoStore()
const showDescription = ref(false)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const toggleDescription = () => {
  showDescription.value = !showDescription.value
}

const openEditModal = async () => {
  const { value: formValues } = await Swal.fire({
    title: 'Edit Task',
    html:
      `<input id="text" class="swal2-input" value="${props.todo.text}" required>` +
      `<textarea id="description" class="swal2-textarea">${props.todo.description || ''}</textarea>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Update',
    preConfirm: () => {
      return {
        text: document.getElementById('text').value,
        description: document.getElementById('description').value
      }
    }
  })

  if (formValues) {
    store.updateTodo(props.todo.id, formValues)
    Swal.fire({
      icon: 'success',
      title: 'Task updated!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    })
  }
}

const handleDelete = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })

  if (result.isConfirmed) {
    setTimeout(() => {
      store.removeTodo(props.todo.id)
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Your task has been deleted.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      })
    }, 300)
  }
}

const handleToggle = () => {
  store.toggleTodo(props.todo.id)
  Swal.fire({
    icon: 'success',
    title: props.todo.completed ? 'Task marked incomplete' : 'Task completed!',
    text: props.todo.text,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000
  })
}
</script>

<style>
.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-date {
  font-size: 0.8rem;
  color: #666;
}

.todo-description {
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #444;
}

.desc-button {
  color: #666;
  padding: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
}

.desc-button:hover {
  color: #444;
}
</style>