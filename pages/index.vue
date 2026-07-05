<template>
  <div class="card">
    <h1>Welcome to MediSync</h1>
    <p class="muted">Your secure telehealth patient portal. Manage appointments, view lab results and records, and message your care team.</p>
    <p v-if="!auth.user.value">
      <NuxtLink class="btn" to="/login">Sign in</NuxtLink>
    </p>
    <p v-else>
      <NuxtLink class="btn" to="/dashboard">Go to dashboard</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
const auth = useAuth()
onMounted(() => auth.load())
</script>
