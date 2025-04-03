import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref(JSON.parse(localStorage.getItem('todos') || '[]'))

  function addTodo({ text, description }) {
    todos.value.push({
      id: Date.now(),
      text,
      description,
      date: new Date().toISOString(),
      completed: false
    })
  }

  function updateTodo(id, { text, description }) {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.text = text
      todo.description = description
    }
  }

  function removeTodo(id) {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }

  function toggleTodo(id) {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
      return todo.completed
    }
  }

  watch(
    todos,
    (newTodos) => {
      localStorage.setItem('todos', JSON.stringify(newTodos))
    },
    { deep: true }
  )

  return { todos, addTodo, removeTodo, toggleTodo, updateTodo }
})