<template>
  <div class="todo-item">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="store.toggleTodo(todo.id)"
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
        @dblclick="startEdit"
        :class="{ completed: todo.completed }"
        class="todo-text"
      >
        {{ todo.text }}
      </span>
    </div>
    <button @click="store.removeTodo(todo.id)" class="delete-button">
      <TrashIcon class="icon" />
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { useTodoStore } from '../stores/todo'

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
</script>