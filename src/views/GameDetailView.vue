<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, usersApi   } from 'vue-router'
import { gamesApi, reviewsApi } from '../services/api'
import ReviewVoteButton from '../components/ReviewVoteButton.vue'

const props = defineProps({ id: { type: [String, Number], required: true } })
const route = useRoute()

const game = ref(null)
const reviews = ref([])
const loading = ref(true)
const error = ref('')

const reviewPage = ref(1) //Reviews are now paginated, showing 4 reviews per page. 
const reviewPageSize = 4

const userMap = computed(() => { 
  return Object.fromEntries(users.value.map((user) => [Number(user.id), user]))
})

const totalReviewPages = computed(() => Math.max(1, Math.ceil(reviews.value.length / reviewPageSize)))

const pagedReviews = computed(() => {
  const start = (reviewPage.value - 1) * reviewPageSize
  return reviews.value.slice(start, start + reviewPageSize)
})

function reviewerName(userId) { //Instead of only showing user ID, it displays the username. 
  return userMap.value[Number(userId)]?.username || `User #${userId}`
}

function setReviewPage(page) {
  if (page < 1 || page > totalReviewPages.value) return
  reviewPage.value = page
}

async function load(id) {
  loading.value = true
  error.value = ''
  reviewPage.value = 1

  try {
    const [{ data: gameData }, { data: reviewData }, { data: userData }] = await Promise.all([
      gamesApi.get(id),
      reviewsApi.list({ gameId: Number(id), _sort: 'createdAt', _order: 'desc' }),
      usersApi.list()
    ])
    game.value = gameData
    reviews.value = reviewData
    users.value = userData
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
        <router-link to="/games" class="btn btn-outline-light btn-sm mt-2">
          <i class="bi bi-arrow-left me-1"></i>Back to games
        </router-link>
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
      <!-- Each review now has its own like/upvote button. -->
      <div v-for="review in pagedReviews" :key="review.id" class="card-tg p-3 p-md-4 mb-3">
        <div class="d-flex flex-column flex-md-row justify-content-between gap-3">
        <div>
      <div>
          <div class="flex-grow-1">
            <div class="d-flex align-items-center gap-2 mb-2 flex-wrap">
              <strong class="fs-5">{{ review.title }}</strong>
              <span class="text-warning" :aria-label="`${review.rating} star rating`">
                <i v-for="n in Number(review.rating)" :key="n" class="bi bi-star-fill"></i>
              </span>
            </div>
            <p class="mb-2">{{ review.body }}</p>
            <small class="text-muted-tg">
              Posted by {{ reviewerName(review.userId) }} · {{ new Date(review.createdAt).toLocaleDateString() }}
            </small>
          </div>
          <div class="review-action-panel text-md-end">
            <ReviewVoteButton :review-id="review.id" />
          </div>
    </section>
  </template>
</template>
