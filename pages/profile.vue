<template>
  <div>
    <h1>My profile</h1>
    <div class="card" v-if="user">
      <label>First name</label>
      <input v-model="user.first_name" />
      <label>Last name</label>
      <input v-model="user.last_name" />
      <label>Date of birth</label>
      <input v-model="user.dob" />
      <label>Phone</label>
      <input v-model="user.phone" />
      <label>Address</label>
      <input v-model="user.address" />
      <label>Insurance ID</label>
      <input v-model="user.insurance_id" />
      <button class="btn" @click="save">Save</button>
      <p v-if="msg" class="muted">{{ msg }}</p>
    </div>

    <div class="card">
      <h2>Preferences</h2>
      <label>Theme</label>
      <input v-model="theme" />
      <label>Notifications</label>
      <input v-model="notifications" />
      <button class="btn secondary" @click="saveSettings">Save preferences</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const auth = useAuth()
const user = ref<any>(null)
const msg = ref('')
const theme = ref('light')
const notifications = ref('email')

onMounted(async () => {
  auth.load()
  if (!auth.token.value) return navigateTo('/login')
  const res: any = await auth.api('/api/auth/me')
  user.value = res.user
})

async function save() {
  // Send the edited profile fields as a patch.
  const res: any = await auth.api('/api/profile', {
    method: 'PATCH',
    body: {
      first_name: user.value.first_name,
      last_name: user.value.last_name,
      dob: user.value.dob,
      phone: user.value.phone,
      address: user.value.address,
      insurance_id: user.value.insurance_id,
    },
  })
  user.value = res.user
  msg.value = 'Profile saved.'
}

async function saveSettings() {
  await auth.api('/api/settings', {
    method: 'PATCH',
    body: { theme: theme.value, notifications: notifications.value },
  })
  msg.value = 'Preferences saved.'
}
</script>
