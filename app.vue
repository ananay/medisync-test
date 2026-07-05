<template>
  <div class="app">
    <header class="topbar">
      <NuxtLink to="/" class="brand">MediSync</NuxtLink>
      <nav>
        <template v-if="auth.user.value">
          <NuxtLink to="/dashboard">Dashboard</NuxtLink>
          <NuxtLink to="/messages">Messages</NuxtLink>
          <NuxtLink to="/book">Book</NuxtLink>
          <NuxtLink to="/profile">Profile</NuxtLink>
          <NuxtLink v-if="isStaff" to="/doctor">Doctor</NuxtLink>
          <NuxtLink v-if="isAdmin" to="/admin">Admin</NuxtLink>
          <a href="#" @click.prevent="doLogout">Logout ({{ auth.user.value.role }})</a>
        </template>
        <template v-else>
          <NuxtLink to="/login">Login</NuxtLink>
          <NuxtLink to="/register">Register</NuxtLink>
        </template>
      </nav>
    </header>
    <main class="content">
      <NuxtPage />
    </main>
    <footer class="footer">MediSync Telehealth — demo environment</footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
const auth = useAuth()
onMounted(() => auth.load())
const isAdmin = computed(() => auth.user.value?.role === 'admin')
const isStaff = computed(() => auth.user.value?.role === 'doctor' || auth.user.value?.role === 'admin')
function doLogout() {
  auth.logout()
  navigateTo('/login')
}
</script>

<style>
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #f4f6f8; color: #1c2733; }
.app { min-height: 100vh; display: flex; flex-direction: column; }
.topbar { display: flex; align-items: center; gap: 1rem; background: #0b6e7a; color: #fff; padding: 0.75rem 1.25rem; }
.brand { font-weight: 700; font-size: 1.2rem; color: #fff; text-decoration: none; margin-right: auto; }
.topbar nav { display: flex; gap: 1rem; }
.topbar a { color: #d7f1f4; text-decoration: none; }
.topbar a:hover { color: #fff; }
.content { flex: 1; max-width: 980px; width: 100%; margin: 1.5rem auto; padding: 0 1rem; }
.footer { text-align: center; padding: 1rem; color: #6b7785; font-size: 0.85rem; }
.card { background: #fff; border: 1px solid #e2e8ee; border-radius: 8px; padding: 1.25rem; margin-bottom: 1rem; }
.btn { background: #0b6e7a; color: #fff; border: none; padding: 0.55rem 1rem; border-radius: 6px; cursor: pointer; }
.btn:hover { background: #095863; }
.btn.secondary { background: #e2e8ee; color: #1c2733; }
input, textarea, select { width: 100%; padding: 0.5rem; border: 1px solid #cbd5df; border-radius: 6px; margin-bottom: 0.6rem; font-family: inherit; }
label { font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 0.2rem; }
table { width: 100%; border-collapse: collapse; }
th, td { text-align: left; padding: 0.5rem; border-bottom: 1px solid #eef2f5; font-size: 0.9rem; }
h1 { font-size: 1.5rem; }
.err { color: #b00020; font-size: 0.85rem; }
.muted { color: #6b7785; font-size: 0.85rem; }
a { color: #0b6e7a; }
</style>
