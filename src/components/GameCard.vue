<script setup>
defineProps({
  game: { type: Object, required: true }
})
</script>

<template>
  <router-link :to="`/games/${game.id}`" class="text-decoration-none">
    <div class="card-tg h-100">
      <img :src="game.cover" :alt="game.title" class="cover-thumb" loading="lazy"
           @error="$event.target.src='https://placehold.co/300x400/171a21/9aa3b2?text=No+Cover'" />
      <div class="p-3">
        <h6 class="mb-1 text-light text-truncate">{{ game.title }}</h6>
        <div class="d-flex align-items-center justify-content-between">
          <span class="badge badge-genre">{{ game.genre }}</span>
          <small class="text-muted-tg">{{ game.year }}</small>
        </div>
      </div>
    </div>
  </router-link>
</template>
