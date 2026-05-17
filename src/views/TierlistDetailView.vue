<script setup>
defineProps({ id: { type: String, required: true } })
</script>

<template>
  <h2 class="mb-4">Tier List #{{ id }}</h2>
  <div class="alert alert-info">
    <strong>Person 4 TODO:</strong> public view — render S/A/B/C/D rows with game cards.
  </div>
</template>
