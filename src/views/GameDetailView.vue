<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { gamesApi, reviewsApi } from '../services/api'

const props = defineProps({ id: { type: [String, Number], required: true } })
const route = useRoute()

const game = ref(null)
const reviews = ref([])
const loading = ref(true)
const error = ref('')

async function load(id) {
  loading.value = true
  error.value = ''
  try {
    const [{ data: g }, { data: r }] = await Promise.all([
      gamesApi.get(id),
      reviewsApi.list({ gameId: id, _sort: 'createdAt', _order: 'desc' })
    ])
    game.value = g
    reviews.value = r
  } catch (e) {
    error.value = 'Game not found.'
  } finally {
    loading.value = false
  }
}

onMounted(() => load(props.id))
watch(() => route.params.id, (id) => { if (id) load(id) })
</script>

<template>
  <div v-if="loading" class="text-center py-5">
    <div class="spinner-border text-danger" role="status"></div>
  </div>

  <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

  <template v-else-if="game">
    <div class="row g-4 mb-5">
      <div class="col-12 col-md-4 col-lg-3">
        <img :src="game.cover" :alt="game.title" class="img-fluid rounded shadow-lg"
             @error="$event.target.src='https://placehold.co/300x400/171a21/9aa3b2?text=No+Cover'" />
      </div>
      <div class="col-12 col-md-8 col-lg-9">
        <h1 class="display-6 fw-bold mb-2">{{ game.title }}</h1>
        <div class="mb-3">
          <span class="badge badge-genre me-2">{{ game.genre }}</span>
          <span class="text-muted-tg">{{ game.developer }} &middot; {{ game.year }}</span>
        </div>
        <p class="lead">{{ game.summary }}</p>
        <div class="mb-3">
          <strong class="text-muted-tg small d-block mb-1">Platforms</strong>
          <span v-for="p in game.platforms" :key="p" class="badge badge-genre me-1">{{ p }}</span>
        </div>
      </div>
    </div>

    <section>
      <h3 class="mb-3">Reviews <span class="text-muted-tg">({{ reviews.length }})</span></h3>
      <div class="alert alert-info">
        <strong>Person 3 TODO:</strong> render review list with star ratings, pagination, and a "write a review" form for authenticated users.
      </div>

      <!-- Provisional review list so Person 3 can see what the data looks like -->
      <div v-for="r in reviews" :key="r.id" class="card-tg p-3 mb-2">
        <div class="d-flex justify-content-between">
          <strong>{{ r.title }}</strong>
          <span class="text-warning">
            <i v-for="n in r.rating" :key="n" class="bi bi-star-fill"></i>
          </span>
        </div>
        <p class="mb-1 small">{{ r.body }}</p>
        <small class="text-muted-tg">{{ new Date(r.createdAt).toLocaleDateString() }}</small>
      </div>
    </section>
  </template>
</template>
