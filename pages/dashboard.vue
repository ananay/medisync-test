<template>
  <div>
    <h1>Dashboard</h1>
    <div class="card">
      <h2>Upcoming appointments</h2>
      <table v-if="appointments.length">
        <thead><tr><th>When</th><th>Doctor</th><th>Reason</th><th>Status</th></tr></thead>
        <tbody>
          <tr v-for="a in appointments" :key="a.id">
            <td>{{ a.scheduled_for }}</td>
            <td>Dr. {{ a.doctor_last }}</td>
            <td>{{ a.reason }}</td>
            <td>{{ a.status }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="muted">No appointments.</p>
    </div>

    <div class="card">
      <h2>My records</h2>
      <table v-if="records.length">
        <thead><tr><th>Title</th><th>Type</th><th>Result</th><th></th></tr></thead>
        <tbody>
          <tr v-for="r in records" :key="r.id">
            <td>{{ r.title }}</td>
            <td>{{ r.record_type }}</td>
            <td>{{ r.result_value }}</td>
            <td><NuxtLink :to="`/records/${r.id}`">View</NuxtLink></td>
          </tr>
        </tbody>
      </table>
      <p v-else class="muted">No records.</p>
    </div>

    <div class="card">
      <h2>Import records</h2>
      <p class="muted">Import a FHIR bundle / lab feed from an external URL.</p>
      <input v-model="importUrl" placeholder="https://fhir.example.org/Patient/123/$everything" />
      <button class="btn" @click="doImport">Import from URL</button>
      <p v-if="importMsg" class="muted">{{ importMsg }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const auth = useAuth()
const appointments = ref<any[]>([])
const records = ref<any[]>([])
const importUrl = ref('')
const importMsg = ref('')

onMounted(async () => {
  auth.load()
  if (!auth.token.value) return navigateTo('/login')
  const a: any = await auth.api('/api/appointments')
  appointments.value = a.appointments || []
  const r: any = await auth.api(`/api/records?patient=${auth.user.value?.id}`)
  records.value = r.records || []
})

async function doImport() {
  importMsg.value = 'Importing...'
  try {
    const res: any = await auth.api('/api/fhir/import', { method: 'POST', body: { url: importUrl.value } })
    importMsg.value = `Imported ${res.imported} record(s).`
    const r: any = await auth.api(`/api/records?patient=${auth.user.value?.id}`)
    records.value = r.records || []
  } catch (e: any) {
    importMsg.value = 'Import failed: ' + (e?.data?.statusMessage || e?.message)
  }
}
</script>
