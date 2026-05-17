<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { gamesApi } from '../services/api'
import GameCard from '../components/GameCard.vue'

const allGames = ref([])
const loading = ref(true)
const error = ref('')

// Filters / search / sort
const search = ref('')
const genre = ref('')
const sort = ref('title-asc')

// Pagination
const page = ref(1)
const pageSize = 12

onMounted(async () => {
  try {
    const { data } = await gamesApi.list()
    allGames.value = data
  } catch (e) {
    error.value = 'Could not load games. Is the API running on port 3001?'
  } finally {
    loading.value = false
  }
})

const genres = computed(() => {
  const set = new Set(allGames.value.map((g) => g.genre))
  return Array.from(set).sort()
})

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  let list = allGames.value.filter((g) => {
    const matchesQ = !q || g.title.toLowerCase().includes(q) || g.developer.toLowerCase().includes(q)
    const matchesG = !genre.value || g.genre === genre.value
    return matchesQ && matchesG
  })
  const [key, dir] = sort.value.split('-')
  list.sort((a, b) => {
    let cmp
    if (key === 'year') cmp = a.year - b.year
    else cmp = a.title.localeCompare(b.title)
    return dir === 'asc' ? cmp : -cmp
  })
  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))

const paged = computed(() => {
  const start = (page.value - 1) * pageSize
  return filtered.value.slice(start, start + pageSize)
})

watch([search, genre, sort], () => { page.value = 1 })

function go(p) {
  if (p < 1 || p > totalPages.value) return
  page.value = p
}
</script>

<template>
  <h1 class="mb-4">Browse games</h1>

  <!-- Filters bar -->
  <div class="card-tg p-3 mb-4">
    <div class="row g-2 g-md-3">
      <div class="col-12 col-md-6">
        <label class="form-label small text-muted-tg">Search</label>
        <input v-model="search" class="form-control" type="search" placeholder="Title or developer..." />
      </div>
      <div class="col-6 col-md-3">
        <label class="form-label small text-muted-tg">Genre</label>
        <select v-model="genre" class="form-select">
          <option value="">All genres</option>
          <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
        </select>
      </div>
      <div class="col-6 col-md-3">
        <label class="form-label small text-muted-tg">Sort</label>
        <select v-model="sort" class="form-select">
          <option value="title-asc">Title (A → Z)</option>
          <option value="title-desc">Title (Z → A)</option>
          <option value="year-desc">Year (newest)</option>
          <option value="year-asc">Year (oldest)</option>
        </select>
      </div>
    </div>
  </div>

  <div v-if="loading" class="text-center py-5">
    <div class="spinner-border text-danger" role="status"></div>
  </div>
  <div v-else-if="error" class="alert alert-warning">{{ error }}</div>
  <template v-else>
    <p class="text-muted-tg small mb-3">{{ filtered.length }} games</p>

    <div v-if="paged.length === 0" class="text-center py-5 text-muted-tg">
      <i class="bi bi-emoji-frown" style="font-size: 3rem;"></i>
      <p class="mt-3">No games match your filters.</p>
    </div>

    <div class="row g-3 g-md-4">
      <div v-for="g in paged" :key="g.id" class="col-6 col-md-4 col-lg-3 col-xl-2">
        <GameCard :game="g" />
      </div>
    </div>

    <!-- Pagination -->
    <nav v-if="totalPages > 1" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: page === 1 }">
          <button class="page-link" @click="go(page - 1)" aria-label="Previous">‹</button>
        </li>
        <li v-for="p in totalPages" :key="p" class="page-item" :class="{ active: p === page }">
          <button class="page-link" @click="go(p)">{{ p }}</button>
        </li>
        <li class="page-item" :class="{ disabled: page === totalPages }">
          <button class="page-link" @click="go(page + 1)" aria-label="Next">›</button>
        </li>
      </ul>
    </nav>
  </template>
</template>
