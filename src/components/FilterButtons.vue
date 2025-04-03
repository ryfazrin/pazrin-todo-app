<template>
  <div class="filter-buttons">
    <button
      @click="store.setFilter('all')"
      :class="{ active: store.filter === 'all' }"
    >
      All ({{ store.todos.length }})
    </button>
    <button
      @click="store.setFilter('active')"
      :class="{ active: store.filter === 'active' }"
    >
      Incomplete ({{ activeCount }})
    </button>
    <button
      @click="store.setFilter('completed')"
      :class="{ active: store.filter === 'completed' }"
    >
      Completed ({{ completedCount }})
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTodoStore } from '../stores/todo'

const store = useTodoStore()

const activeCount = computed(() => 
  store.todos.filter(todo => !todo.completed).length
)

const completedCount = computed(() => 
  store.todos.filter(todo => todo.completed).length
)
</script>

<style>
.filter-buttons {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.filter-buttons button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-buttons button:hover {
  background: #f0f0f0;
}

.filter-buttons button.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

@media (max-width: 480px) {
  .filter-buttons {
    gap: 0.3rem;
  }
  
  .filter-buttons button {
    padding: 0.5rem;
    font-size: 0.9rem;
    flex-grow: 1;
  }
}
</style>