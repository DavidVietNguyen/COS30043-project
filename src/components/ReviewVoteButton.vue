<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { votesApi } from '../services/api'

const props = defineProps({
  reviewId: { type: [String, Number], required: true }
})

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const votes = ref([])
const busy = ref(false)
const error = ref('')

const reviewIdNumber = computed(() => Number(props.reviewId))
const userVote = computed(() => {
  if (!auth.user?.id) return null
  return votes.value.find((vote) => Number(vote.userId) === Number(auth.user.id)) || null
})
const voteCount = computed(() => votes.value.length)
const hasLiked = computed(() => Boolean(userVote.value))

async function loadVotes() {
  error.value = ''
  try {
    const { data } = await votesApi.list({ reviewId: reviewIdNumber.value })
    votes.value = data
  } catch (e) {
    error.value = 'Could not load likes.'
  }
}

async function toggleVote() {
  error.value = ''

  if (!auth.isAuthenticated) {
    router.push({ name: 'login', query: { redirect: route.fullPath } })
    return
  }

  busy.value = true
  try {
    if (hasLiked.value) {
      await votesApi.remove(userVote.value.id)
      votes.value = votes.value.filter((vote) => Number(vote.id) !== Number(userVote.value.id))
    } else {
      const payload = {
        reviewId: reviewIdNumber.value,
        userId: auth.user.id,
        createdAt: new Date().toISOString()
      }
      const { data } = await votesApi.create(payload)
      votes.value = [...votes.value, data]
    }
  } catch (e) {
    if (e.response?.status === 409) {
      await loadVotes()
      error.value = 'You already liked this review.'
    } else {
      error.value = 'Like action failed. Please try again.'
    }
  } finally {
    busy.value = false
  }
}

onMounted(loadVotes)
watch(reviewIdNumber, loadVotes)
</script>

<template>
  <div>
    <button
      class="btn btn-sm"
      :class="hasLiked ? 'btn-accent' : 'btn-outline-light'"
      type="button"
      :disabled="busy"
      :aria-pressed="hasLiked"
      @click="toggleVote"
    >
      <span v-if="busy" class="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>
      <i v-else class="bi me-1" :class="hasLiked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'"></i>
      {{ voteCount }} {{ voteCount === 1 ? 'Like' : 'Likes' }}
    </button>
    <div v-if="error" class="small text-warning mt-1">{{ error }}</div>
  </div>
</template>
