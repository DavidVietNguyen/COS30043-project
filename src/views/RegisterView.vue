<script setup>
// TODO — Person 1: validation, password rules, error handling.
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usersApi } from '../services/api'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

async function register() {
  error.value = ''
  try {
    const exists = await usersApi.list({ username: username.value })
    if (exists.data.length) { error.value = 'Username already taken'; return }
    const { data } = await usersApi.create({
      username: username.value,
      password: password.value,
      role: 'user',
      createdAt: new Date().toISOString()
    })
    auth.setSession({ id: data.id, username: data.username, role: 'user' }, 'demo-token-' + data.id)
    router.replace('/')
  } catch (e) {
    error.value = 'Registration failed'
  }
}
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card-tg p-4">
        <h3 class="mb-3">Create account</h3>
        <p class="text-muted-tg small mb-3">Person 1 stub — replace with proper form + validation.</p>
        <form @submit.prevent="register" novalidate>
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input class="form-control" v-model="username" required minlength="3" maxlength="20" />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" required minlength="4" />
          </div>
          <div v-if="error" class="alert alert-danger py-2 small">{{ error }}</div>
          <button class="btn btn-accent w-100" type="submit">Sign up</button>
        </form>
      </div>
    </div>
  </div>
</template>
