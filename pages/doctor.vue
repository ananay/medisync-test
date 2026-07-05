<template>
  <div>
    <h1>Doctor — patient panel</h1>
    <div class="card">
      <h2>Patients</h2>
      <table v-if="patients.length">
        <thead><tr><th>Name</th><th>DOB</th><th>Insurance</th><th></th></tr></thead>
        <tbody>
          <tr v-for="p in patients" :key="p.id">
            <td>{{ p.first_name }} {{ p.last_name }}</td>
            <td>{{ p.dob }}</td>
            <td>{{ p.insurance_id }}</td>
            <td><a href="#" @click.prevent="loadRecords(p.id)">Records</a></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card" v-if="records.length">
      <h2>Records for patient #{{ selected }}</h2>
      <table>
        <thead><tr><th>Title</th><th>Type</th><th>Result</th></tr></thead>
        <tbody>
          <tr v-for="r in records" :key="r.id">
            <td><NuxtLink :to="`/records/${r.id}`">{{ r.title }}</NuxtLink></td>
            <td>{{ r.record_type }}</td>
            <td>{{ r.result_value }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card">
      <h2>Prescribe</h2>
      <input v-model.number="rxPatient" type="number" placeholder="Patient id" />
      <input v-model="rxMed" placeholder="Medication" />
      <input v-model="rxDose" placeholder="Dosage" />
      <textarea v-model="rxNotes" rows="2" placeholder="Notes (markdown)"></textarea>
      <button class="btn" @click="prescribe">Create prescription</button>
      <p v-if="rxMsg" class="muted">{{ rxMsg }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const auth = useAuth()
const patients = ref<any[]>([])
const records = ref<any[]>([])
const selected = ref<number | null>(null)
const rxPatient = ref<number>(0)
const rxMed = ref('')
const rxDose = ref('')
const rxNotes = ref('')
const rxMsg = ref('')

onMounted(async () => {
  auth.load()
  if (!auth.token.value) return navigateTo('/login')
  const res: any = await auth.api('/api/patients')
  patients.value = res.patients || []
})

async function loadRecords(pid: number) {
  selected.value = pid
  const res: any = await auth.api(`/api/records?patient=${pid}`)
  records.value = res.records || []
}

async function prescribe() {
  try {
    await auth.api('/api/prescriptions', {
      method: 'POST',
      body: { patientId: rxPatient.value, medication: rxMed.value, dosage: rxDose.value, notes: rxNotes.value },
    })
    rxMsg.value = 'Prescription created.'
  } catch (e: any) {
    rxMsg.value = 'Failed: ' + (e?.data?.statusMessage || e?.message)
  }
}
</script>
