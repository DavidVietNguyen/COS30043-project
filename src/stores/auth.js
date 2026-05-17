import { defineStore } from 'pinia'

// STUB — Person 1 (Auth & Profiles) owns this store.
// Replace with real register / login flow against /api/users.
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('tg_user') || 'null'),
    token: localStorage.getItem('tg_token') || null
  }),
  getters: {
    isAuthenticated: (s) => !!s.token,
    isAdmin: (s) => s.user?.role === 'admin'
  },
  actions: {
    setSession(user, token) {
      this.user = user
      this.token = token
      localStorage.setItem('tg_user', JSON.stringify(user))
      localStorage.setItem('tg_token', token)
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('tg_user')
      localStorage.removeItem('tg_token')
    }
  }
})
