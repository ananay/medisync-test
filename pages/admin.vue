<template>
  <div>
    <h1>Admin — user management</h1>
    <div class="card">
      <table v-if="users.length">
        <thead><tr><th>ID</th><th>Email</th><th>Role</th><th>Name</th><th>SSN</th><th>Hash</th><th></th></tr></thead>
        <tbody>
          <tr v-for="u in users" :key="u.id">
            <td>{{ u.id }}</td>
            <td>{{ u.email }}</td>
            <td>{{ u.role }}</td>
            <td>{{ u.first_name }} {{ u.last_name }}</td>
            <td>{{ u.ssn }}</td>
            <td class="muted">{{ u.password_hash }}</td>
            <td>
              <select v-model="u.role" @change="changeRole(u)">
                <option>patient</option>
                <option>doctor</option>
                <option>admin</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="muted">{{ status }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const auth = useAuth()
const users = ref<any[]>([])
const status = ref('Loading...')

onMounted(async () => {
  auth.load()
  if (!auth.token.value) return navigateTo('/login')
  try {
    const res: any = await auth.api('/api/admin/users')
    users.value = res.users || []
  } catch (e: any) {
    status.value = 'Could not load users.'
  }
})

async function changeRole(u: any) {
  await auth.api('/api/admin/users', { method: 'PATCH', body: { id: u.id, role: u.role } })
}
</script>
