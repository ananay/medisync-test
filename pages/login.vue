<template>
  <div class="card" style="max-width: 420px; margin: 0 auto;">
    <h1>Sign in</h1>
    <form @submit.prevent="submit">
      <label>Email</label>
      <input v-model="email" type="text" autocomplete="username" />
      <label>Password</label>
      <input v-model="password" type="password" autocomplete="current-password" />
      <button class="btn" type="submit">Sign in</button>
      <p v-if="error" class="err">{{ error }}</p>
    </form>
    <p class="muted">No account? <NuxtLink to="/register">Register</NuxtLink></p>
    <p class="muted">Demo: john.doe@example.com / patient123</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const auth = useAuth()
const email = ref('')
const password = ref('')
const error = ref('')

async function submit() {
  error.value = ''
  try {
    const res: any = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    auth.setSession(res.token, res.user)
    navigateTo('/dashboard')
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Login failed'
  }
}
</script>
