<template>
  <div class="todo-item">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="handleToggle"
      class="checkbox"
    />
    <div class="todo-content">
      <input
        v-if="isEditing"
        v-model="editedText"
        @blur="saveEdit"
        @keyup.enter="saveEdit"
        ref="input"
        class="edit-input"
      />
      <span
        v-else
        @click="!todo.completed ? startEdit() : () => {}"
        :class="{ completed: todo.completed }"
        class="todo-text"
      >
        {{ todo.text }}
      </span>
    </div>
    <div class="actions">
      <button @click="startEdit" class="edit-button">
        <PencilIcon v-if="!todo.completed" class="icon" />
      </button>
      <button @click="handleDelete" class="delete-button">
        <TrashIcon class="icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { TrashIcon, PencilIcon } from '@heroicons/vue/24/outline'
import { useTodoStore } from '../stores/todo'
import Swal from 'sweetalert2'

const props = defineProps(['todo'])
const store = useTodoStore()

const isEditing = ref(false)
const editedText = ref(props.todo.text)
const input = ref(null)

const startEdit = () => {
  isEditing.value = true
  editedText.value = props.todo.text
  nextTick(() => input.value.focus())
}

const saveEdit = () => {
  if (editedText.value.trim()) {
    store.updateTodo(props.todo.id, editedText.value.trim())
  }
  isEditing.value = false
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