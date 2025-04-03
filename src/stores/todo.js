import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref(JSON.parse(localStorage.getItem('todos') || '[]'))
  const filter = ref('all') // 'all', 'active', 'completed'

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed)
      case 'completed':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })

  function setFilter(newFilter) {
    filter.value = newFilter
  }

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

  return { 
    todos, 
    filter, filteredTodos, setFilter, 
    addTodo, removeTodo, toggleTodo, updateTodo
  }
})