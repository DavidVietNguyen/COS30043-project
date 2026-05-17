<script setup>
// TODO — Person 1: show user's reviews + tier lists (query by userId).
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>

<template>
  <div class="card-tg p-4">
    <h2 class="mb-1">{{ auth.user?.username }}</h2>
    <p class="text-muted-tg small mb-4">Role: {{ auth.user?.role }}</p>
    <div class="alert alert-info">
      <strong>Person 1 TODO:</strong> list this user's reviews and tier lists here.
    </div>
  </div>
</template>
