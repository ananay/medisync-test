<template>
  <div class="card" style="max-width: 460px; margin: 0 auto;">
    <h1>Create account</h1>
    <form @submit.prevent="submit">
      <label>First name</label>
      <input v-model="firstName" />
      <label>Last name</label>
      <input v-model="lastName" />
      <label>Email</label>
      <input v-model="email" type="email" />
      <label>Password</label>
      <input v-model="password" type="password" />
      <button class="btn" type="submit">Register</button>
      <p v-if="error" class="err">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const auth = useAuth()
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

async function submit() {
  error.value = ''
  try {
    const res: any = await $fetch('/api/auth/register', {
      method: 'POST',
      body: { firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value },
    })
    auth.setSession(res.token, res.user)
    navigateTo('/dashboard')
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Registration failed'
  }
}
</script>
