<script setup>
import { ref, onMounted } from 'vue'
import { gamesApi } from '../services/api'
import GameCard from '../components/GameCard.vue'

const featured = ref([])
const latest = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const [{ data: feat }, { data: all }] = await Promise.all([
      gamesApi.list({ featured: true }),
      gamesApi.list({ _sort: 'year', _order: 'desc', _limit: 8 })
    ])
    featured.value = feat
    latest.value = all
  } catch (e) {
    error.value = 'Could not reach the API. Run `npm run api` in another terminal.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <!-- Hero -->
  <section class="card-tg p-4 p-md-5 mb-5">
    <div class="row align-items-center">
      <div class="col-12 col-md-8">
        <h1 class="display-5 fw-bold">Rank every game.<br/>Roast every review.</h1>
        <p class="lead text-muted-tg mt-3 mb-4">
          Browse thousands of games, write blunt reviews, and build your own S-tier lists.
        </p>
        <router-link to="/games" class="btn btn-accent btn-lg me-2">
          <i class="bi bi-search me-2"></i>Browse games
        </router-link>
        <router-link to="/tierlists/new" class="btn btn-outline-light btn-lg">
          <i class="bi bi-list-stars me-2"></i>Build a tier list
        </router-link>
      </div>
      <div class="col-12 col-md-4 d-none d-md-block text-end">
        <i class="bi bi-controller" style="font-size: 9rem; color: var(--tg-accent); opacity: .4;"></i>
      </div>
    </div>
  </section>

  <div v-if="loading" class="text-center py-5">
    <div class="spinner-border text-danger" role="status"></div>
  </div>

  <div v-else-if="error" class="alert alert-warning">{{ error }}</div>

  <template v-else>
    <section class="mb-5">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h3 class="mb-0"><i class="bi bi-star-fill text-warning me-2"></i>Featured</h3>
        <router-link to="/games" class="small">See all →</router-link>
      </div>
      <div class="row g-3 g-md-4">
        <div v-for="g in featured" :key="g.id" class="col-6 col-md-4 col-lg-3 col-xl-2">
          <GameCard :game="g" />
        </div>
      </div>
    </section>

    <section class="mb-5">
      <h3 class="mb-3"><i class="bi bi-clock-history me-2"></i>Latest releases</h3>
      <div class="row g-3 g-md-4">
        <div v-for="g in latest" :key="g.id" class="col-6 col-md-4 col-lg-3 col-xl-2">
          <GameCard :game="g" />
        </div>
      </div>
    </section>
  </template>
</template>
