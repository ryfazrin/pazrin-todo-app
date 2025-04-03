import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref(JSON.parse(localStorage.getItem('todos') || '[]'))

  function addTodo(text) {
    todos.value.push({
      id: Date.now(),
      text,
      completed: false
    })
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

  function updateTodo(id, newText) {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) todo.text = newText
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