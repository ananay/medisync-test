<template>
  <div>
    <h1>Book an appointment</h1>
    <div class="card">
      <label>Doctor</label>
      <select v-model.number="doctorId">
        <option v-for="d in doctors" :key="d.id" :value="d.id">Dr. {{ d.first_name }} {{ d.last_name }}</option>
      </select>
      <label>Date / time</label>
      <input v-model="scheduledFor" placeholder="2026-07-15 09:30" />
      <label>Reason</label>
      <input v-model="reason" />
      <button class="btn" @click="book">Book</button>
      <p v-if="msg" class="muted">{{ msg }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const auth = useAuth()
const doctors = ref<any[]>([])
const doctorId = ref<number>(0)
const scheduledFor = ref('')
const reason = ref('')
const msg = ref('')

onMounted(async () => {
  auth.load()
  if (!auth.token.value) return navigateTo('/login')
  const res: any = await auth.api('/api/doctors')
  doctors.value = res.doctors || []
  if (doctors.value.length) doctorId.value = doctors.value[0].id
})

async function book() {
  try {
    await auth.api('/api/appointments', {
      method: 'POST',
      body: { doctorId: doctorId.value, scheduledFor: scheduledFor.value, reason: reason.value },
    })
    msg.value = 'Appointment booked.'
  } catch (e: any) {
    msg.value = 'Failed: ' + (e?.data?.statusMessage || e?.message)
  }
}
</script>
